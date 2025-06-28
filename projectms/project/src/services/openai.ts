const OPENAI_API_KEY = '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';

export async function analyzeArtwork(description: string, language: string = 'en'): Promise<string> {
  try {
    const prompt = `As an expert art historian and curator, provide a detailed, engaging analysis of this artwork: "${description}". 

Include:
- Historical context and period
- Artist background and significance
- Artistic techniques and style
- Cultural and social impact
- Emotional themes and symbolism
- Why this piece matters in art history

Write in a conversational, accessible tone that would engage both art novices and enthusiasts. Keep it informative yet captivating, around 200-300 words.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing artwork:', error);
    return 'I apologize, but I encountered an issue analyzing this artwork. Please try again or contact support.';
  }
}

export async function generateModernInterpretation(description: string): Promise<string> {
  try {
    const prompt = `Create a modern, contemporary reinterpretation of this classic artwork: "${description}". 
    
Style it as if it were created by a cutting-edge digital artist in 2025, incorporating:
- Modern digital art techniques
- Contemporary themes and symbolism
- Vibrant, futuristic color palettes
- Abstract or surreal elements
- Technology-inspired motifs
    
Make it visually striking and imaginative while maintaining the essence of the original piece.`;

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        size: '1024x1024',
        quality: 'standard',
        n: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`DALL-E API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('Error generating modern interpretation:', error);
    return '';
  }
}

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  if (targetLanguage === 'en') return text;
  
  try {
    // Using a simple translation service for demo purposes
    // In production, you'd use Google Translate API
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`);
    const data = await response.json();
    return data.responseData.translatedText || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}
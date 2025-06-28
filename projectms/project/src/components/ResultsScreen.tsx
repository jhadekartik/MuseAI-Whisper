import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Download, Palette, Volume2, VolumeX } from 'lucide-react';

interface ResultsScreenProps {
  data: {
    originalImage: string;
    description: string;
    analysis: string;
    modernImage: string;
    timestamp: Date;
  };
  onNavigate: (screen: string) => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ data, onNavigate }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModern, setShowModern] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MuseAI Whisper - Art Analysis',
          text: 'Check out this amazing art analysis from MuseAI Whisper!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      // Stop audio
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      // Start audio
      const utterance = new SpeechSynthesisUtterance(data.analysis);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('upload')}
              className="btn-secondary mr-4 p-3"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold text-white font-lora">
              Art Analysis
            </h1>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={toggleAudio}
              className="btn-secondary p-3"
              title={isPlaying ? 'Stop narration' : 'Play narration'}
            >
              {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button onClick={handleShare} className="btn-secondary p-3">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Original Image */}
              <div className="glass-effect rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white font-lora">
                    Original Artwork
                  </h2>
                  <button
                    onClick={() => setShowModern(!showModern)}
                    className="btn-secondary flex items-center"
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    {showModern ? 'Show Original' : 'Show Modern'}
                  </button>
                </div>
                
                <div className="relative overflow-hidden rounded-xl">
                  <motion.img
                    key={showModern ? 'modern' : 'original'}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={showModern ? data.modernImage : data.originalImage}
                    alt={showModern ? 'Modern interpretation' : 'Original artwork'}
                    className="w-full h-80 object-cover"
                  />
                </div>
                
                <p className="text-white/70 text-sm mt-3">
                  {showModern 
                    ? 'AI-generated modern interpretation' 
                    : 'Your uploaded artwork'
                  }
                </p>
              </div>

              {/* Quick Actions */}
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 font-lora">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="btn-secondary text-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Save Analysis
                  </button>
                  <button 
                    onClick={() => onNavigate('gallery')}
                    className="btn-secondary text-sm"
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    View Gallery
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Analysis Section */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-effect rounded-2xl p-8"
            >
              <h2 className="text-2xl font-semibold text-white mb-6 font-lora">
                AI Analysis & Insights
              </h2>

              <div className="space-y-6">
                {/* User Description */}
                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="text-white font-medium mb-2">Your Description:</h3>
                  <p className="text-white/80 text-sm italic">"{data.description}"</p>
                </div>

                {/* AI Analysis */}
                <div className="space-y-4">
                  <h3 className="text-white font-medium">Expert Analysis:</h3>
                  <div className="text-white/90 leading-relaxed space-y-4">
                    {data.analysis.split('\n\n').map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.2 }}
                        className="text-sm"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </div>

                {/* Metadata */}
                <div className="border-t border-white/10 pt-4 mt-6">
                  <div className="flex justify-between text-white/60 text-xs">
                    <span>Analysis completed</span>
                    <span>{data.timestamp.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Continue Journey */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 font-lora">
              Continue Your Art Journey
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => onNavigate('upload')}
                className="btn-primary"
              >
                Analyze Another Artwork
              </button>
              <button
                onClick={() => onNavigate('gallery')}
                className="btn-secondary"
              >
                Explore Gallery
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
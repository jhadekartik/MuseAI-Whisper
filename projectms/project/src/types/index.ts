export interface ArtworkAnalysis {
  id: string;
  title: string;
  artist: string;
  period: string;
  style: string;
  description: string;
  culturalContext: string;
  techniques: string[];
  emotions: string[];
  modernInterpretation?: string;
  modernImageUrl?: string;
  timestamp: Date;
}

export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark' | 'auto';
  narrationSpeed: number;
  voiceEnabled: boolean;
}

export interface GalleryItem {
  id: string;
  originalImage: string;
  modernImage: string;
  title: string;
  analysis: ArtworkAnalysis;
  isFavorite: boolean;
}
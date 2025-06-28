import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Palette, Volume2, Moon, Sun, Monitor } from 'lucide-react';

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onNavigate }) => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [narrationSpeed, setNarrationSpeed] = useState(1);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const themes = [
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'dark', name: 'Dark', icon: Moon },
    { id: 'auto', name: 'Auto', icon: Monitor },
  ];

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
          className="flex items-center mb-8"
        >
          <button
            onClick={() => onNavigate('home')}
            className="btn-secondary mr-4 p-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold text-white font-lora">
            Settings
          </h1>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Language Settings */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <Globe className="w-6 h-6 text-primary-400 mr-3" />
              <h2 className="text-2xl font-semibold text-white font-lora">
                Language & Region
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                    language === lang.code
                      ? 'bg-primary-500/20 border border-primary-400/50'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-white font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Theme Settings */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <Palette className="w-6 h-6 text-primary-400 mr-3" />
              <h2 className="text-2xl font-semibold text-white font-lora">
                Appearance
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {themes.map((themeOption) => {
                const IconComponent = themeOption.icon;
                return (
                  <button
                    key={themeOption.id}
                    onClick={() => setTheme(themeOption.id)}
                    className={`flex flex-col items-center space-y-3 p-6 rounded-xl transition-all duration-300 ${
                      theme === themeOption.id
                        ? 'bg-primary-500/20 border border-primary-400/50'
                        : 'bg-white/5 hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                    <span className="text-white font-medium">{themeOption.name}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Audio Settings */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <Volume2 className="w-6 h-6 text-primary-400 mr-3" />
              <h2 className="text-2xl font-semibold text-white font-lora">
                Audio & Narration
              </h2>
            </div>

            <div className="space-y-6">
              {/* Voice Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium mb-1">Voice Narration</h3>
                  <p className="text-white/60 text-sm">Enable AI voice reading of art analysis</p>
                </div>
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                    voiceEnabled ? 'bg-primary-500' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                      voiceEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Narration Speed */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium">Narration Speed</h3>
                  <span className="text-primary-400 font-medium">{narrationSpeed}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={narrationSpeed}
                  onChange={(e) => setNarrationSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-white/60 text-sm mt-2">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-2xl p-8"
          >
            <h2 className="text-2xl font-semibold text-white font-lora mb-6">
              About MuseAI Whisper
            </h2>
            
            <div className="space-y-4 text-white/80">
              <p>
                MuseAI Whisper is your personal AI art companion, designed to make art 
                accessible, engaging, and educational for everyone.
              </p>
              <p>
                Powered by advanced AI technology, we analyze artworks, provide cultural 
                context, and create modern interpretations to help you discover the 
                stories behind every masterpiece.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white font-medium mb-2">Version</h4>
                  <p className="text-white/60">1.0.0</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white font-medium mb-2">Build</h4>
                  <p className="text-white/60">2025.01.28</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Save Settings */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <button className="btn-primary px-12 py-4">
              Save Settings
            </button>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #0ea5e9, #ec4899);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #0ea5e9, #ec4899);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default SettingsScreen;
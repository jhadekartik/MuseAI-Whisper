import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Palette, Globe, Settings } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Camera,
      title: 'Scan Artwork',
      description: 'Point your camera at any artwork for instant AI analysis',
      action: () => onNavigate('scan'),
    },
    {
      icon: Upload,
      title: 'Upload Image',
      description: 'Upload a photo of artwork from your device',
      action: () => onNavigate('upload'),
    },
    {
      icon: Palette,
      title: 'Living Gallery',
      description: 'Explore our dynamic AI-powered art gallery',
      action: () => onNavigate('gallery'),
    },
    {
      icon: Globe,
      title: 'Virtual Tours',
      description: 'Take guided tours through famous museums',
      action: () => onNavigate('tours'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
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

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <img
              src="/ChatGPT Image Jun 28, 2025, 12_33_22 AM.png"
              alt="MuseAI Whisper"
              className="w-16 h-16 mr-4"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-white font-lora">
              <span className="gradient-text">MuseAI</span>{' '}
              <span className="text-white">Whisper</span>
            </h1>
          </div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Discover the stories behind every masterpiece with your personal AI art companion. 
            Explore, learn, and reimagine art like never before.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6 text-center cursor-pointer group hover:scale-105 transition-all duration-300"
              onClick={feature.action}
            >
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 font-lora">
                {feature.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <button
            onClick={() => onNavigate('upload')}
            className="btn-primary text-lg px-12 py-4 mb-6"
          >
            Start Your Art Journey
          </button>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => onNavigate('settings')}
              className="btn-secondary"
            >
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold gradient-text font-lora">10K+</div>
            <div className="text-white/60">Artworks Analyzed</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text font-lora">50+</div>
            <div className="text-white/60">Languages Supported</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text font-lora">99%</div>
            <div className="text-white/60">Accuracy Rate</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeScreen;
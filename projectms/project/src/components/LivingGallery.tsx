import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, RotateCcw, Heart, Info } from 'lucide-react';

interface LivingGalleryProps {
  onNavigate: (screen: string) => void;
}

const LivingGallery: React.FC<LivingGalleryProps> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(0);

  // Sample gallery items (in a real app, these would come from your database)
  const galleryItems = [
    {
      id: 1,
      title: "The Starry Night",
      artist: "Vincent van Gogh",
      year: "1889",
      original: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      modern: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "A swirling night sky over a village, painted in van Gogh's distinctive style.",
    },
    {
      id: 2,
      title: "Girl with a Pearl Earring",
      artist: "Johannes Vermeer",
      year: "1665",
      original: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800",
      modern: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "A mysterious portrait of a girl wearing an exotic dress and a large pearl earring.",
    },
    {
      id: 3,
      title: "The Great Wave",
      artist: "Katsushika Hokusai",
      year: "1831",
      original: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      modern: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "A powerful wave threatening boats off the coast of Kanagawa.",
    },
    {
      id: 4,
      title: "The Persistence of Memory",
      artist: "Salvador Dalí",
      year: "1931",
      original: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800",
      modern: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Melting clocks in a dreamlike landscape, exploring the nature of time.",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSelectedArtwork((prev) => (prev + 1) % galleryItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, galleryItems.length]);

  const currentArtwork = galleryItems[selectedArtwork];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
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
              onClick={() => onNavigate('home')}
              className="btn-secondary mr-4 p-3"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold text-white font-lora">
              Living Gallery
            </h1>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="btn-secondary p-3"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setSelectedArtwork(0)}
              className="btn-secondary p-3"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Main Gallery Display */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Artwork Display */}
            <div className="lg:col-span-2">
              <motion.div
                key={selectedArtwork}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="glass-effect rounded-2xl p-6"
              >
                <div className="relative">
                  <img
                    src={currentArtwork.original}
                    alt={currentArtwork.title}
                    className="w-full h-96 object-cover rounded-xl"
                  />
                  
                  {/* Overlay Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
                    <h2 className="text-2xl font-bold text-white font-lora mb-2">
                      {currentArtwork.title}
                    </h2>
                    <p className="text-white/80">
                      {currentArtwork.artist} • {currentArtwork.year}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-colors">
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <p className="text-white/90 leading-relaxed">
                    {currentArtwork.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-white/60 text-sm mb-2">
                    <span>Gallery Progress</span>
                    <span>{selectedArtwork + 1} / {galleryItems.length}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((selectedArtwork + 1) / galleryItems.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Gallery Navigation */}
            <div className="space-y-6">
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 font-lora">
                  Gallery Collection
                </h3>
                <div className="space-y-3">
                  {galleryItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      onClick={() => setSelectedArtwork(index)}
                      className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                        index === selectedArtwork
                          ? 'bg-primary-500/20 border border-primary-400/50'
                          : 'hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img
                        src={item.original}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">
                          {item.title}
                        </p>
                        <p className="text-white/60 text-xs">
                          {item.artist}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Gallery Stats */}
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 font-lora">
                  Gallery Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Artworks</span>
                    <span className="text-white font-medium">{galleryItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Favorites</span>
                    <span className="text-white font-medium">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Time Spent</span>
                    <span className="text-white font-medium">12 min</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 font-lora">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => onNavigate('upload')}
                    className="w-full btn-primary text-sm"
                  >
                    Add New Artwork
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    Export Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivingGallery;
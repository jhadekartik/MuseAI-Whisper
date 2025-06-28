import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, ArrowLeft, Loader2 } from 'lucide-react';
import { analyzeArtwork, generateModernInterpretation } from '../services/openai';

interface UploadScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ onNavigate }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAnalyze = async () => {
    if (!description.trim()) {
      alert('Please provide a description of the artwork');
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysis = await analyzeArtwork(description);
      const modernImage = await generateModernInterpretation(description);
      
      onNavigate('results', {
        originalImage: preview,
        description,
        analysis,
        modernImage,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
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
            Upload Artwork
          </h1>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-2xl p-8"
            >
              <h2 className="text-2xl font-semibold text-white mb-6 font-lora">
                Select Your Artwork
              </h2>

              {!preview ? (
                <div className="space-y-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/30 rounded-xl p-12 text-center cursor-pointer hover:border-primary-400 transition-colors duration-300 group"
                  >
                    <Upload className="w-16 h-16 text-white/50 mx-auto mb-4 group-hover:text-primary-400 transition-colors" />
                    <p className="text-white/70 text-lg mb-2">
                      Click to upload an image
                    </p>
                    <p className="text-white/50 text-sm">
                      Supports JPG, PNG, WebP up to 10MB
                    </p>
                  </div>

                  <div className="text-center">
                    <span className="text-white/50">or</span>
                  </div>

                  <button
                    onClick={() => onNavigate('camera')}
                    className="w-full btn-secondary flex items-center justify-center"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Use Camera
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Selected artwork"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => {
                        setPreview('');
                        setSelectedFile(null);
                        setDescription('');
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full btn-secondary"
                  >
                    Choose Different Image
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </motion.div>

            {/* Description Section */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-effect rounded-2xl p-8"
            >
              <h2 className="text-2xl font-semibold text-white mb-6 font-lora">
                Describe the Artwork
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-white/80 mb-2">
                    What do you see in this artwork?
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the artwork, its style, colors, subjects, or any details you notice..."
                    className="w-full h-32 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-primary-400 transition-colors resize-none"
                  />
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="text-white font-medium mb-2">💡 Tips for better analysis:</h3>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Mention the style (realistic, abstract, impressionist, etc.)</li>
                    <li>• Describe colors, lighting, and composition</li>
                    <li>• Note any people, objects, or scenes depicted</li>
                    <li>• Include the artist's name if you know it</li>
                  </ul>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={!description.trim() || isAnalyzing}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    'Analyze Artwork'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadScreen;
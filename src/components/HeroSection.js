"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Play, Plus, Info, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const { user, addToWatchlist, isInWatchlist } = useAuth();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedMovie();
  }, []);

  const fetchFeaturedMovie = async () => {
    try {
      const response = await fetch('/api/movies');
      const data = await response.json();
      setFeaturedMovie(data.featured);
    } catch (error) {
      console.error('Error fetching featured movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToList = () => {
    if (user && featuredMovie) {
      addToWatchlist(featuredMovie);
    }
  };

  if (loading || !featuredMovie) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-black">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${featuredMovie.backdrop})`
          }}
        />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            {/* Netflix Series/Movie Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-3 mb-4"
            >
              <span className="text-red-600 font-bold text-2xl">NETFLIX</span>
              <span className="text-gray-300 text-lg">{featuredMovie.rating}</span>
            </motion.div>

            {/* Logo or Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              {featuredMovie.logo ? (
                <img 
                  src={featuredMovie.logo} 
                  alt={featuredMovie.title}
                  className="h-20 md:h-32 lg:h-40"
                />
              ) : (
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  {featuredMovie.title}
                </h1>
              )}
            </motion.div>

            {/* Movie Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-4 mb-4 text-white"
            >
              <span className="text-green-500 font-semibold">97% Match</span>
              <span>{featuredMovie.year}</span>
              <span className="border border-gray-400 px-2 py-1 text-xs">
                {featuredMovie.rating}
              </span>
              <span>{featuredMovie.duration}</span>
              <span className="border border-gray-400 px-2 py-1 text-xs">HD</span>
            </motion.div>

            {/* Genres */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex space-x-2 mb-6"
            >
              {featuredMovie.genre?.slice(0, 3).map((genre, index) => (
                <span key={index} className="text-gray-300">
                  {genre}{index < 2 && featuredMovie.genre.length > index + 1 ? ' •' : ''}
                </span>
              ))}
            </motion.div>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-lg"
            >
              {featuredMovie.description}
            </motion.p>
            
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href={`/watch/${featuredMovie.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-white hover:bg-gray-200 text-black font-semibold py-3 px-8 rounded transition-colors"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Play
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-gray-600/80 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded transition-colors backdrop-blur-sm"
              >
                <Info className="w-6 h-6 mr-2" />
                More Info
              </motion.button>

              {user && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToList}
                  className={`flex items-center font-semibold py-3 px-8 rounded transition-colors backdrop-blur-sm ${
                    isInWatchlist(featuredMovie.id)
                      ? 'bg-white text-black'
                      : 'bg-gray-600/80 hover:bg-gray-600 text-white'
                  }`}
                >
                  <Plus className="w-6 h-6 mr-2" />
                  {isInWatchlist(featuredMovie.id) ? 'Added' : 'My List'}
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Volume Control */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => setMuted(!muted)}
            className="absolute bottom-40 right-8 w-12 h-12 bg-gray-900/80 hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
          >
            {muted ? (
              <VolumeX className="w-6 h-6 text-white" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Age rating overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-8 right-8 bg-gray-800/90 px-3 py-2 rounded"
      >
        <span className="text-white text-sm font-medium">{featuredMovie.rating}</span>
      </motion.div>
    </div>
  );
}
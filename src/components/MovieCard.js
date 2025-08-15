"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Play, Plus, Check, Info } from 'lucide-react';
import Link from 'next/link';

export default function MovieCard({ movie, size = 'medium' }) {
  const { user, addToWatchlist, removeFromWatchlist, isInWatchlist } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  const inWatchlist = user && isInWatchlist(movie.id);

  const handleWatchlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return;
    
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const sizeClasses = {
    small: 'aspect-[2/3] w-32',
    medium: 'aspect-[2/3] w-48',
    large: 'aspect-[2/3] w-64'
  };

  return (
    <motion.div 
      className={`relative group cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:z-10 ${sizeClasses[size]}`}
      onHoverStart={() => setShowDetails(true)}
      onHoverEnd={() => setShowDetails(false)}
      whileHover={{ scale: 1.05 }}
    >
      <Link href={`/watch/${movie.id}`}>
        <div className="relative h-full">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 20 }}
            className="absolute inset-0 flex flex-col justify-end p-4"
          >
            {/* Title and metadata */}
            <div className="mb-3">
              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                {movie.title}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <span className="bg-gray-700 px-2 py-1 rounded text-xs">{movie.rating}</span>
                <span>{movie.year}</span>
                <div className="flex space-x-1">
                  {movie.genre?.slice(0, 2).map((genre, index) => (
                    <span key={index} className="text-gray-400">
                      {genre}{index < 1 && movie.genre.length > 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Play className="w-4 h-4 text-black ml-0.5" />
              </motion.button>

              {user && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWatchlistToggle}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                    inWatchlist 
                      ? 'bg-white border-white text-black' 
                      : 'border-gray-400 text-gray-400 hover:border-white hover:text-white'
                  }`}
                >
                  {inWatchlist ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 border-2 border-gray-400 text-gray-400 rounded-full flex items-center justify-center hover:border-white hover:text-white transition-colors"
              >
                <Info className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Quick play button (always visible on hover) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showDetails ? 1 : 0, scale: showDetails ? 1 : 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
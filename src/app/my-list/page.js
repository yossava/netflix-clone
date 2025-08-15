"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import MovieCard from '@/components/MovieCard';
import { motion } from 'framer-motion';
import { Heart, Clock } from 'lucide-react';

export default function MyListPage() {
  const { user, watchlist } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-24 flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl text-white mb-4">Please sign in to view your list</h1>
            <p className="text-gray-400 mb-8">You need to be logged in to see your saved movies and shows.</p>
            <button
              onClick={() => router.push('/')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-8 h-8 text-red-600 fill-current" />
              <h1 className="text-4xl font-bold text-white">My List</h1>
            </div>
            <p className="text-gray-400 text-lg">
              {watchlist.length === 0 
                ? "Your list is empty. Add movies and shows you want to watch later."
                : `${watchlist.length} ${watchlist.length === 1 ? 'title' : 'titles'} saved`
              }
            </p>
          </div>

          {/* Watchlist Content */}
          {watchlist.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <Clock className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                <h2 className="text-2xl text-white mb-4">Your list is empty</h2>
                <p className="text-gray-400 mb-8">
                  Browse movies and TV shows to add them to your list. You can find the + button when you hover over any title.
                </p>
                <button
                  onClick={() => router.push('/browse')}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded transition-colors"
                >
                  Browse Movies
                </button>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
            >
              {watchlist.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Recently Added Section */}
          {watchlist.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-8">Recently Added</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {watchlist.slice(-6).reverse().map((movie, index) => (
                  <motion.div
                    key={`recent-${movie.id}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <MovieCard movie={movie} size="small" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {watchlist.length > 0 && (
            <div className="mt-16 bg-gray-900/50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => router.push('/browse')}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded transition-colors"
                >
                  Browse More
                </button>
                <button
                  onClick={() => {
                    const randomMovie = watchlist[Math.floor(Math.random() * watchlist.length)];
                    router.push(`/watch/${randomMovie.id}`);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded transition-colors"
                >
                  Surprise Me
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
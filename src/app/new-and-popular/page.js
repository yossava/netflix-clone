"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import MovieCard from '@/components/MovieCard';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Star } from 'lucide-react';

export default function NewAndPopularPage() {
  const [content, setContent] = useState({
    trending: [],
    newReleases: [],
    popular: []
  });
  const [activeTab, setActiveTab] = useState('trending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/movies');
      const data = await response.json();
      const allMovies = data.categories.flatMap(cat => cat.movies);
      
      // Simulate different categories
      const shuffled = [...allMovies].sort(() => Math.random() - 0.5);
      
      setContent({
        trending: shuffled.slice(0, 12),
        newReleases: shuffled.slice(12, 24),
        popular: shuffled.slice(0, 15)
      });
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'trending', label: 'Trending Now', icon: TrendingUp },
    { id: 'newReleases', label: 'New Releases', icon: Calendar },
    { id: 'popular', label: 'Top 10', icon: Star }
  ];

  const getCurrentContent = () => {
    return content[activeTab] || [];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-20 flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">New & Popular</h1>
            <p className="text-gray-400 text-lg">
              Stay up to date with the latest releases and trending content
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-8 mb-8 border-b border-gray-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-600 text-white'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Grid */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'popular' ? (
              // Top 10 List View
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-6">Top 10 in Your Country Today</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {getCurrentContent().slice(0, 10).map((movie, index) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900/80 transition-colors"
                    >
                      <div className="text-6xl font-bold text-gray-700 select-none min-w-[80px]">
                        {index + 1}
                      </div>
                      <div className="flex-shrink-0">
                        <img
                          src={movie.image}
                          alt={movie.title}
                          className="w-20 h-28 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-lg mb-2 truncate">
                          {movie.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                          <span>{movie.year}</span>
                          <span>•</span>
                          <span className="border border-gray-600 px-2 py-1 text-xs">
                            {movie.rating}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          {movie.genre?.slice(0, 2).map((genre, idx) => (
                            <span key={idx} className="text-gray-400 text-sm">
                              {genre}{idx < 1 && movie.genre.length > 1 ? ',' : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              // Grid View for Trending and New Releases
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {activeTab === 'trending' ? 'Trending Now' : 'New This Week'}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {getCurrentContent().map((movie, index) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="relative">
                        {activeTab === 'trending' && index < 3 && (
                          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                            #{index + 1}
                          </div>
                        )}
                        {activeTab === 'newReleases' && (
                          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                            NEW
                          </div>
                        )}
                        <MovieCard movie={movie} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Coming Soon Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Coming This Month</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Mystery Movie #1", date: "Coming Dec 15", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop" },
                { title: "Action Series #2", date: "Coming Dec 22", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop" },
                { title: "Drama Film #3", date: "Coming Dec 29", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=450&fit=crop" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 rounded-lg p-6 hover:bg-gray-900/80 transition-colors"
                >
                  <div className="flex space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-28 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{item.date}</p>
                      <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition-colors">
                        Remind Me
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
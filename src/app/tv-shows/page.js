"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import MovieCard from '@/components/MovieCard';
import { motion } from 'framer-motion';
import { Tv, Filter } from 'lucide-react';

export default function TVShowsPage() {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    filterAndSortShows();
  }, [shows, selectedGenre, sortBy]);

  const fetchShows = async () => {
    try {
      const response = await fetch('/api/movies');
      const data = await response.json();
      const allMovies = data.categories.flatMap(cat => cat.movies);
      
      // For demo purposes, treat all content as TV shows
      // In a real app, you'd have a separate endpoint or field to distinguish
      setShows(allMovies);
      
      // Extract unique genres
      const allGenres = allMovies.flatMap(movie => movie.genre || []);
      const uniqueGenres = [...new Set(allGenres)];
      setGenres(['all', ...uniqueGenres]);
      
    } catch (error) {
      console.error('Error fetching TV shows:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortShows = () => {
    let filtered = [...shows];

    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(show => 
        show.genre?.includes(selectedGenre)
      );
    }

    // Sort shows
    switch (sortBy) {
      case 'year':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'rating':
        // Random sort for demo since we don't have actual ratings
        filtered.sort(() => Math.random() - 0.5);
        break;
      default: // popular
        // Keep original order
        break;
    }

    setFilteredShows(filtered);
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
            <div className="flex items-center space-x-3 mb-4">
              <Tv className="w-8 h-8 text-red-600" />
              <h1 className="text-4xl font-bold text-white">TV Shows</h1>
            </div>
            <p className="text-gray-400 text-lg">
              Binge-watch your favorite series and discover new ones
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 p-6 bg-gray-900/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-white font-medium">Filters:</span>
            </div>
            
            {/* Genre Filter */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="popular">Popular</option>
              <option value="year">Release Year</option>
              <option value="title">A-Z</option>
              <option value="rating">Rating</option>
            </select>

            <div className="text-gray-400 text-sm self-center ml-auto">
              {filteredShows.length} shows found
            </div>
          </div>

          {/* Shows Grid */}
          {filteredShows.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">
                No TV shows found matching your criteria.
              </p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
            >
              {filteredShows.map((show, index) => (
                <motion.div
                  key={show.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MovieCard movie={show} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
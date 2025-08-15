"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/header';
import MovieCard from '@/components/MovieCard';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState(query);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
    fetchGenres();
  }, [query]);

  useEffect(() => {
    filterResults();
  }, [selectedGenre]);

  const fetchGenres = async () => {
    try {
      const response = await fetch('/api/movies');
      const data = await response.json();
      const allMovies = data.categories.flatMap(cat => cat.movies);
      const allGenres = allMovies.flatMap(movie => movie.genre || []);
      const uniqueGenres = [...new Set(allGenres)];
      setGenres(['all', ...uniqueGenres]);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const filterResults = () => {
    if (selectedGenre === 'all') return;
    
    const filtered = searchResults.filter(movie =>
      movie.genre?.includes(selectedGenre)
    );
    setSearchResults(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchTerm)}`);
      performSearch(searchTerm);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-6">Search Netflix</h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative mb-6">
              <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search for movies, TV shows, actors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-white pl-12 pr-4 py-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </form>

            {/* Search Stats and Filters */}
            {query && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <p className="text-gray-300">
                    {loading ? 'Searching...' : `${searchResults.length} results for "${query}"`}
                  </p>
                </div>
                
                {searchResults.length > 0 && (
                  <div className="flex items-center space-x-3">
                    <Filter className="w-5 h-5 text-gray-400" />
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
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Results */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
            </div>
          ) : query && searchResults.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <Search className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                <h2 className="text-2xl text-white mb-4">No results found</h2>
                <p className="text-gray-400 mb-8">
                  We couldn&apos;t find anything matching &quot;{query}&quot;. Try different keywords or browse our categories.
                </p>
                <div className="space-y-4">
                  <p className="text-gray-300 font-medium">Suggestions:</p>
                  <ul className="text-gray-400 space-y-2">
                    <li>• Check your spelling</li>
                    <li>• Try different keywords</li>
                    <li>• Use more general terms</li>
                    <li>• Browse our movie and TV show categories</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
            >
              {searchResults.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Default search page (no query)
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <Search className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                <h2 className="text-2xl text-white mb-4">Search Netflix</h2>
                <p className="text-gray-400 mb-8">
                  Find your next favorite movie or TV show. Search by title, genre, actor, or director.
                </p>
                
                {/* Popular searches */}
                <div className="text-left">
                  <p className="text-gray-300 font-medium mb-4">Popular searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance'].map((genre) => (
                      <button
                        key={genre}
                        onClick={() => {
                          setSearchTerm(genre);
                          performSearch(genre);
                        }}
                        className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-full text-sm transition-colors"
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-20 flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
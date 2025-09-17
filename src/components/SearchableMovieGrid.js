'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import MovieCard from './MovieCard';

export default function SearchableMovieGrid({ movies = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [isGridView, setIsGridView] = useState(true);

  // Extract unique genres from movies (React useMemo hook)
  const genres = useMemo(() => {
    const allGenres = movies.flatMap(movie => movie.genre || []);
    return ['all', ...new Set(allGenres)];
  }, [movies]);

  // Filter and sort movies (React useMemo for performance)
  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (movie.description && movie.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesGenre = selectedGenre === 'all' || 
                          (movie.genre && movie.genre.includes(selectedGenre));
      return matchesSearch && matchesGenre;
    });

    // Sort movies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'year':
          return (b.year || 0) - (a.year || 0);
        case 'rating':
          return (b.vote_average || 0) - (a.vote_average || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [movies, searchTerm, selectedGenre, sortBy]);

  // Debounced search (React custom hook pattern)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('all');
    setSortBy('title');
  };

  return (
    <div className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Search & Filter Movies
          <span className="text-sm font-normal text-gray-400 ml-4">
            ({filteredAndSortedMovies.length} results)
          </span>
        </h2>

        {/* Search and Filter Controls */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search Input */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Genre Filter */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 capitalize"
            >
              {genres.map(genre => (
                <option key={genre} value={genre} className="capitalize">
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="title">Sort by Title</option>
              <option value="year">Sort by Year</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Clear Filters</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">View:</span>
                <button
                  onClick={() => setIsGridView(true)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    isGridView ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setIsGridView(false)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    !isGridView ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  List
                </button>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex items-center space-x-2">
              {searchTerm && (
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                  Search: {searchTerm}
                </span>
              )}
              {selectedGenre !== 'all' && (
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm capitalize">
                  {selectedGenre}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredAndSortedMovies.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={clearFilters}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={
            isGridView 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
              : "space-y-4"
          }>
            {filteredAndSortedMovies.map((movie) => (
              <div key={movie.id} className={isGridView ? "" : "bg-gray-900 rounded-lg p-4 flex space-x-4"}>
                {isGridView ? (
                  <MovieCard 
                    title={movie.title} 
                    duration={movie.duration} 
                    description={movie.description} 
                    image={movie.image} 
                    vote_average={movie.vote_average}
                  />
                ) : (
                  <>
                    <div className="w-32 h-48 flex-shrink-0">
                      <img 
                        src={movie.image} 
                        alt={movie.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-2">{movie.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{movie.year} • {movie.duration}</p>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-3">{movie.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                          {movie.vote_average}
                        </span>
                        {movie.genre && movie.genre.slice(0, 2).map((genre, i) => (
                          <span key={i} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
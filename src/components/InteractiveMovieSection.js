'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

export default function InteractiveMovieSection({ title = "Interactive Section", movies = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  
  // Simulate loading state (React useEffect hook)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Load favorites from localStorage (Next.js client-side storage)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('netflix-favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
  }, []);

  // Save favorites to localStorage (React state management)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('netflix-favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 5 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= movies.length - 5 ? 0 : prev + 1));
  };

  const toggleFavorite = (movieId) => {
    setFavorites(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  if (isLoading) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">{title}</h2>
        <div className="flex space-x-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="min-w-[150px] md:min-w-[200px] aspect-[2/3] bg-gray-800 rounded-md animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12 relative group">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
        {title} 
        <span className="ml-2 text-sm bg-red-600 px-2 py-1 rounded">
          {favorites.length} favorites
        </span>
      </h2>
      
      <div className="relative">
        {/* Previous Button */}
        <button 
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Previous movies"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Movie Cards Container */}
        <div className="overflow-hidden">
          <div 
            className="flex space-x-4 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (200 + 16)}px)` }}
          >
            {movies.map((movie) => (
              <div key={movie.id} className="min-w-[150px] max-w-[150px] md:min-w-[200px] md:max-w-[200px] relative">
                <MovieCard 
                  title={movie.title} 
                  duration={movie.duration} 
                  description={movie.description} 
                  image={movie.image} 
                  vote_average={movie.vote_average}
                />
                
                {/* Favorite Toggle Button */}
                <button
                  onClick={() => toggleFavorite(movie.id)}
                  className={`absolute top-2 right-2 z-20 p-2 rounded-full transition-colors duration-300 ${
                    favorites.includes(movie.id) 
                      ? 'bg-red-600 text-white' 
                      : 'bg-black/50 text-gray-300 hover:bg-red-600 hover:text-white'
                  }`}
                  aria-label={favorites.includes(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  ♥
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button 
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Next movies"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(Math.max(1, movies.length - 4))].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i === currentIndex ? 'bg-red-600' : 'bg-gray-600 hover:bg-gray-400'
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
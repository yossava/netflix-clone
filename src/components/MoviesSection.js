"use client";

import { useState, useEffect } from 'react';
import MovieCard from "./MovieCard";
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MoviesSection() {
  const [movieCategories, setMovieCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies');
      const data = await response.json();
      setMovieCategories(data.categories);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const MovieRow = ({ category, index }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    
    const scrollContainer = (direction) => {
      const container = document.getElementById(`scroll-${index}`);
      const scrollAmount = 400;
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
      
      setTimeout(() => {
        setCanScrollLeft(newPosition > 0);
        setCanScrollRight(newPosition < container.scrollWidth - container.clientWidth);
      }, 300);
    };

    return (
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-white mb-6 px-4">{category.title}</h3>
        <div className="relative group">
          {/* Left scroll button */}
          {canScrollLeft && (
            <button
              onClick={() => scrollContainer('left')}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          
          {/* Right scroll button */}
          {canScrollRight && (
            <button
              onClick={() => scrollContainer('right')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
          
          {/* Movie cards container */}
          <div
            id={`scroll-${index}`}
            className="flex space-x-4 overflow-x-auto scrollbar-hide px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {category.movies.map((movie, movieIndex) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: movieIndex * 0.1 }}
                className="flex-shrink-0"
              >
                <MovieCard movie={movie} size="medium" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-48 mb-8"></div>
            <div className="flex space-x-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-48 h-72 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto">
        {movieCategories.map((category, index) => (
          <MovieRow key={index} category={category} index={index} />
        ))}
      </div>
    </section>
  );
}
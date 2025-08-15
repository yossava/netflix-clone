"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/header';
import MovieCard from '@/components/MovieCard';
import { motion } from 'framer-motion';
import { 
  Play, 
  Plus, 
  Check, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Download,
  ArrowLeft,
  Star
} from 'lucide-react';

export default function WatchPage() {
  const params = useParams();
  const router = useRouter();
  const { user, addToWatchlist, removeFromWatchlist, isInWatchlist } = useAuth();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchMovie(params.id);
    }
  }, [params.id]);

  const fetchMovie = async (id) => {
    try {
      // Fetch specific movie
      const movieResponse = await fetch(`/api/movies?id=${id}`);
      const movieData = await movieResponse.json();
      
      // Fetch all movies for related content
      const allMoviesResponse = await fetch('/api/movies');
      const allMoviesData = await allMoviesResponse.json();
      
      setMovie(movieData);
      
      // Get related movies (same genre)
      const allMovies = allMoviesData.categories.flatMap(cat => cat.movies);
      const related = allMovies
        .filter(m => m.id !== parseInt(id) && 
          m.genre.some(g => movieData.genre?.includes(g)))
        .slice(0, 12);
      
      setRelatedMovies(related);
    } catch (error) {
      console.error('Error fetching movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWatchlistToggle = () => {
    if (!user || !movie) return;
    
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const handlePlayClick = () => {
    setShowPlayer(true);
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

  if (!movie) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-20 flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-2xl text-white mb-4">Movie not found</h1>
            <button
              onClick={() => router.back()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-screen">
        {showPlayer ? (
          // Video Player (Mock)
          <div className="w-full h-full bg-black flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-20 h-20 mx-auto mb-4 opacity-50" />
                <p className="text-xl">Video Player Placeholder</p>
                <p className="text-gray-400 mt-2">In a real app, this would be a video player</p>
                <button
                  onClick={() => setShowPlayer(false)}
                  className="mt-4 bg-red-600 hover:bg-red-700 px-6 py-2 rounded"
                >
                  Close Player
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Movie Info
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${movie.backdrop || movie.image})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 w-full">
                <button
                  onClick={() => router.back()}
                  className="flex items-center text-white hover:text-gray-300 mb-8 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                
                <div className="max-w-2xl">
                  {movie.logo ? (
                    <img src={movie.logo} alt={movie.title} className="h-24 md:h-32 mb-6" />
                  ) : (
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                      {movie.title}
                    </h1>
                  )}
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-white">8.5</span>
                    </div>
                    <span className="text-gray-300">{movie.year}</span>
                    <span className="border border-gray-400 px-2 py-1 text-xs text-gray-300">
                      {movie.rating}
                    </span>
                    <span className="text-gray-300">{movie.duration}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genre?.map((genre, index) => (
                      <span
                        key={index}
                        className="bg-gray-800/80 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    {movie.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePlayClick}
                      className="flex items-center bg-white hover:bg-gray-200 text-black font-semibold px-8 py-3 rounded transition-colors"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Play
                    </motion.button>

                    {user && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleWatchlistToggle}
                        className={`flex items-center font-semibold px-8 py-3 rounded border-2 transition-colors ${
                          isInWatchlist(movie.id)
                            ? 'bg-white border-white text-black'
                            : 'border-gray-400 text-white hover:border-white'
                        }`}
                      >
                        {isInWatchlist(movie.id) ? (
                          <>
                            <Check className="w-5 h-5 mr-2" />
                            In My List
                          </>
                        ) : (
                          <>
                            <Plus className="w-5 h-5 mr-2" />
                            Add to List
                          </>
                        )}
                      </motion.button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center border-2 border-gray-400 text-white hover:border-white px-6 py-3 rounded transition-colors"
                    >
                      <ThumbsUp className="w-5 h-5" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center border-2 border-gray-400 text-white hover:border-white px-6 py-3 rounded transition-colors"
                    >
                      <ThumbsDown className="w-5 h-5" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center border-2 border-gray-400 text-white hover:border-white px-6 py-3 rounded transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Related Movies */}
      {!showPlayer && relatedMovies.length > 0 && (
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-8">More Like This</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {relatedMovies.map((relatedMovie, index) => (
                <motion.div
                  key={relatedMovie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MovieCard movie={relatedMovie} size="small" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
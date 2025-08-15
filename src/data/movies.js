import { movieApi } from '@/lib/movieApi';

// Featured movie - will be fetched from API
export const getFeaturedMovie = async () => {
  try {
    const movie = await movieApi.getFeaturedMovie();
    return {
      ...movie,
      trailer: "https://www.youtube.com/watch?v=b9EkMc79ZSU"
    };
  } catch (error) {
    console.error('Error fetching featured movie:', error);
    return {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      backdrop: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop",
      trailer: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
      year: 2016,
      rating: "TV-14",
      duration: "4 Seasons",
      genre: ["Sci-Fi", "Drama", "Thriller"]
    };
  }
};

// Movie categories - will be fetched from API
export const getMovieCategories = async () => {
  try {
    const [trending, popular, topRated, actionMovies, comedies] = await Promise.all([
      movieApi.getTrendingMovies(),
      movieApi.getPopularMovies(),
      movieApi.getTopRatedMovies(),
      movieApi.getMoviesByGenre('Action'), // Action genre
      movieApi.getMoviesByGenre('Comedy')  // Comedy genre
    ]);

    return [
      {
        title: "Trending Now",
        movies: trending.slice(0, 20)
      },
      {
        title: "Popular on Netflix",
        movies: popular.slice(0, 20)
      },
      {
        title: "Top Rated",
        movies: topRated.slice(0, 20)
      },
      {
        title: "Action & Adventure",
        movies: actionMovies.slice(0, 20)
      },
      {
        title: "Comedies",
        movies: comedies.slice(0, 20)
      },
      {
        title: "Netflix Originals",
        movies: trending.slice(5, 25) // Use different slice of trending for variety
      }
    ];
  } catch (error) {
    console.error('Error fetching movie categories:', error);
    // Return fallback data if API fails
    return [
      {
        title: "Trending Now",
        movies: movieApi.generateFallbackMovies(20)
      },
      {
        title: "Popular on Netflix",
        movies: movieApi.generateFallbackMovies(20)
      },
      {
        title: "Action & Adventure",
        movies: movieApi.generateFallbackMovies(20)
      },
      {
        title: "Comedies",
        movies: movieApi.generateFallbackMovies(20)
      }
    ];
  }
};

// Function to get all movies from categories
export const getAllMovies = async () => {
  try {
    const categories = await getMovieCategories();
    return categories.flatMap(category => category.movies);
  } catch (error) {
    console.error('Error getting all movies:', error);
    return movieApi.generateFallbackMovies(50);
  }
};

// Function to get movie by ID
export const getMovieById = async (id) => {
  try {
    return await movieApi.getMovieDetails(id);
  } catch (error) {
    console.error('Error getting movie by ID:', error);
    return movieApi.generateFallbackMovies(1)[0];
  }
};

// Function to search movies
export const searchMovies = async (query) => {
  try {
    return await movieApi.searchMovies(query);
  } catch (error) {
    console.error('Error searching movies:', error);
    const fallbackMovies = movieApi.generateFallbackMovies(20);
    return fallbackMovies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
    );
  }
};
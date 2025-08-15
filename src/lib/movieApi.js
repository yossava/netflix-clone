// Movie API service - supports IMDB API from imdbapi.dev
const IMDB_BASE_URL = 'https://api.imdbapi.dev';

// For demo purposes - in production, use environment variables
const IMDB_API_KEY = process.env.IMDB_API_KEY || 'demo_key';



// Genre mapping
const GENRE_MAP = {
  28: "Action",
  12: "Adventure", 
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

class MovieApiService {
  constructor() {
    this.baseUrl = IMDB_BASE_URL;
    this.apiKey = IMDB_API_KEY;
  }

  // Format IMDB movie data to match our app's structure
  formatMovie(movie) {
    // Handle both IMDB API format and fallback format
    if (movie.primaryTitle) {
      // IMDB API format - convert runtimeSeconds to minutes
      const runtimeMinutes = movie.runtimeSeconds ? Math.round(movie.runtimeSeconds / 60) : null;
      
      return {
        id: movie.id,
        title: movie.primaryTitle,
        description: movie.plot || `A ${movie.type} from ${movie.startYear}. ${movie.genres ? movie.genres.join(', ') + '.' : ''}`,
        image: movie.primaryImage?.url || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=300&h=450&fit=crop`,
        backdrop: movie.primaryImage?.url || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=1920&h=1080&fit=crop`,
        year: movie.startYear || 2023,
        rating: this.getRandomRating(),
        duration: runtimeMinutes ? `${runtimeMinutes} min` : `${Math.floor(Math.random() * 60) + 90} min`,
        genre: movie.genres || ["Drama"],
        vote_average: movie.rating?.aggregateRating || Math.floor(Math.random() * 40) / 10 + 6,
        type: movie.type || 'movie'
      };
    } else {
      // Fallback format (existing format)
      return {
        id: movie.id,
        title: movie.title || movie.name,
        description: movie.overview || movie.description,
        image: movie.poster_path || movie.image || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=300&h=450&fit=crop`,
        backdrop: movie.backdrop_path || movie.backdrop || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=1920&h=1080&fit=crop`,
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : movie.year || 2023,
        rating: movie.rating || this.getRandomRating(),
        duration: movie.runtime ? `${movie.runtime} min` : movie.duration || `${Math.floor(Math.random() * 60) + 90} min`,
        genre: movie.genre_ids ? movie.genre_ids.map(id => GENRE_MAP[id]).filter(Boolean) : movie.genre || ["Drama"],
        vote_average: movie.vote_average || Math.floor(Math.random() * 5) + 6
      };
    }
  }

  getRandomRating() {
    const ratings = ["G", "PG", "PG-13", "R", "TV-14", "TV-MA"];
    return ratings[Math.floor(Math.random() * ratings.length)];
  }

  async fetchFromIMDB(endpoint, params = {}) {
    const queryParams = new URLSearchParams(params);
    const url = `${this.baseUrl}${endpoint}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    console.log('🎬 IMDB API Call:', {
      endpoint,
      params,
      fullUrl: url,
      baseUrl: this.baseUrl
    });
    
    try {
      console.log('📡 Making IMDB API request to:', url);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📊 IMDB API Response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ IMDB API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ IMDB API Success:', {
        dataType: typeof data,
        hasTitles: !!data?.titles,
        titleCount: data?.titles?.length || 0,
        sampleData: data?.titles?.[0] || data
      });
      
      return data;
      
    } catch (error) {
      console.error('🚨 IMDB API Error:', {
        message: error.message,
        stack: error.stack?.split('\n')[0],
        endpoint,
        url
      });
      return null;
    }
  }

  async getTrendingMovies() {
    console.log('🔥 Getting trending movies...');
    try {
      const data = await this.fetchFromIMDB('/titles', {
        type: 'movie',
        limit: 20
      });
      if (data?.titles) {
        console.log('✅ Trending movies from API:', data.titles.length);
        return data.titles.filter(movie => movie.type === 'movie').map(movie => this.formatMovie(movie));
      }
    } catch (error) {
      console.log('⚠️  Trending movies fallback:', error?.message);
    }
    
    console.log('📝 Using fallback trending movies (20 items)');
    return this.generateFallbackMovies(20);
  }

  async getPopularMovies() {
    console.log('⭐ Getting popular movies...');
    try {
      const data = await this.fetchFromIMDB('/titles', {
        limit: 30
      });
      if (data?.titles) {
        // Filter for movies and sort by rating
        const movies = data.titles
          .filter(movie => movie.type === 'movie' && movie.rating?.aggregateRating >= 7)
          .sort((a, b) => (b.rating?.aggregateRating || 0) - (a.rating?.aggregateRating || 0))
          .slice(0, 20);
        console.log('✅ Popular movies from API:', movies.length);
        return movies.map(movie => this.formatMovie(movie));
      }
    } catch (error) {
      console.log('⚠️  Popular movies fallback:', error?.message);
    }
    
    console.log('📝 Using fallback popular movies (20 items)');
    return this.generateFallbackMovies(20);
  }

  async getTopRatedMovies() {
    console.log('🏆 Getting top rated movies...');
    try {
      const data = await this.fetchFromIMDB('/titles', {
        limit: 50
      });
      if (data?.titles) {
        // Filter for highly rated movies
        const topRated = data.titles
          .filter(movie => movie.type === 'movie' && movie.rating?.aggregateRating >= 8.5)
          .sort((a, b) => (b.rating?.aggregateRating || 0) - (a.rating?.aggregateRating || 0))
          .slice(0, 20);
        console.log('✅ Top rated movies from API:', topRated.length);
        return topRated.map(movie => this.formatMovie(movie));
      }
    } catch (error) {
      console.log('⚠️  Top rated movies fallback:', error?.message);
    }
    
    console.log('📝 Using fallback top rated movies (20 items)');
    return this.generateFallbackMovies(20);
  }

  async getMoviesByGenre(genre) {
    console.log(`🎭 Getting ${genre} movies...`);
    try {
      const data = await this.fetchFromIMDB('/titles', {
        limit: 100
      });
      if (data?.titles) {
        // Filter movies by genre (case-insensitive)
        const genreMovies = data.titles
          .filter(movie => 
            movie.type === 'movie' && 
            movie.genres && 
            movie.genres.some(g => g.toLowerCase().includes(genre.toLowerCase()))
          )
          .slice(0, 20);
        console.log(`✅ ${genre} movies from API:`, genreMovies.length);
        return genreMovies.map(movie => this.formatMovie(movie));
      }
    } catch (error) {
      console.log(`⚠️  ${genre} movies fallback:`, error?.message);
    }
    
    console.log(`📝 Using fallback ${genre} movies (20 items)`);
    return this.generateFallbackMovies(20);
  }

  async searchMovies(query) {
    console.log('🔍 Searching movies for:', query);
    try {
      const data = await this.fetchFromIMDB('/titles', {
        limit: 100
      });
      if (data?.titles) {
        // Search in title and plot
        const results = data.titles
          .filter(movie => 
            movie.type === 'movie' &&
            (movie.primaryTitle?.toLowerCase().includes(query.toLowerCase()) ||
             movie.plot?.toLowerCase().includes(query.toLowerCase()) ||
             movie.genres?.some(g => g.toLowerCase().includes(query.toLowerCase())))
          )
          .slice(0, 20);
        console.log('✅ Search results from API:', results.length);
        return results.map(movie => this.formatMovie(movie));
      }
    } catch (error) {
      console.log('⚠️  Search fallback:', error?.message);
    }
    
    console.log('📝 Using fallback search in generated movies');
    // Simple search in fallback data
    const allMovies = this.generateFallbackMovies(50);
    const results = allMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
    );
    console.log('📝 Fallback search found:', results.length, 'matches');
    return results;
  }

  async getMovieDetails(id) {
    console.log('🎯 Getting movie details for:', id);
    try {
      // Try to find the movie in the titles list first
      const data = await this.fetchFromIMDB('/titles', {
        limit: 100
      });
      if (data?.titles) {
        const movie = data.titles.find(m => m.id === id);
        if (movie) {
          console.log('✅ Found movie details from API');
          return this.formatMovie(movie);
        }
      }
    } catch (error) {
      console.log('⚠️  Movie details fallback:', error?.message);
    }
    
    console.log('📝 Using fallback movie details');
    // Return a detailed fallback movie
    return this.generateFallbackMovies(1)[0];
  }

  generateFallbackMovies(count) {
    const movieTitles = [
      "The Dark Knight", "Inception", "Interstellar", "Pulp Fiction", "The Shawshank Redemption",
      "The Godfather", "Forrest Gump", "The Matrix", "Goodfellas", "The Lord of the Rings",
      "Star Wars", "Jurassic Park", "Titanic", "Avatar", "The Avengers", "Iron Man",
      "Spider-Man", "Batman", "Superman", "Wonder Woman", "Black Panther", "Captain America",
      "Thor", "Guardians of the Galaxy", "Doctor Strange", "Ant-Man", "Captain Marvel",
      "The Incredibles", "Finding Nemo", "Toy Story", "Monsters Inc", "Up", "WALL-E",
      "Inside Out", "Coco", "Frozen", "Moana", "Zootopia", "Big Hero 6", "Tangled",
      "The Lion King", "Beauty and the Beast", "Aladdin", "The Little Mermaid",
      "Casablanca", "Citizen Kane", "Gone with the Wind", "Lawrence of Arabia",
      "Vertigo", "Psycho", "Singin' in the Rain", "Some Like It Hot"
    ];

    const genres = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller"];
    const ratings = ["G", "PG", "PG-13", "R", "TV-14", "TV-MA"];

    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      title: movieTitles[index % movieTitles.length] + (index >= movieTitles.length ? ` ${Math.ceil((index + 1) / movieTitles.length)}` : ''),
      description: `An amazing ${genres[Math.floor(Math.random() * genres.length)].toLowerCase()} movie that will keep you entertained from start to finish. This compelling story features outstanding performances and stunning visuals.`,
      image: `https://images.unsplash.com/photo-${1440404653325 + index}?w=300&h=450&fit=crop`,
      backdrop: `https://images.unsplash.com/photo-${1440404653325 + index}?w=1920&h=1080&fit=crop`,
      year: 2018 + (index % 6),
      rating: ratings[Math.floor(Math.random() * ratings.length)],
      duration: `${Math.floor(Math.random() * 60) + 90} min`,
      genre: [
        genres[Math.floor(Math.random() * genres.length)],
        genres[Math.floor(Math.random() * genres.length)]
      ].filter((v, i, a) => a.indexOf(v) === i), // Remove duplicates
      vote_average: Math.floor(Math.random() * 40) / 10 + 6 // 6.0 to 10.0
    }));
  }

  async getFeaturedMovie() {
    console.log('🎯 Getting featured movie...');
    try {
      const trending = await this.getTrendingMovies();
      console.log('✅ Featured movie selected from trending');
      return trending[0];
    } catch (error) {
      console.log('⚠️  Featured movie fallback:', error?.message);
      console.log('📝 Using fallback featured movie');
      return this.generateFallbackMovies(1)[0];
    }
  }
}

export const movieApi = new MovieApiService();
export default movieApi;
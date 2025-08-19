# Session 5: API Integration & Real Movie Data
**Duration:** 90 minutes  
**Prerequisites:** Sessions 1-4 completed, authentication system working  
**Objective:** Integrate real IMDB API data and implement data fetching patterns

---

## 📋 Session Overview
- **0-10 min:** Review authentication system and introduce API concepts
- **10-35 min:** Create API service layer and data transformation
- **35-60 min:** Implement real IMDB API integration with error handling
- **60-80 min:** Add loading states and data caching
- **80-90 min:** Test integration and session review

---

## 🎯 Learning Outcomes
By the end of this session, students will:
- Understand API integration patterns in React/Next.js
- Create reusable API service layers
- Handle asynchronous data fetching
- Implement error boundaries and fallback data
- Add loading states for better user experience

---

## 🛠️ Pre-Session Checklist

### Teacher Preparation:
- [ ] Test IMDB API endpoints beforehand
- [ ] Prepare fallback data examples
- [ ] Review async/await concepts
- [ ] Have network debugging tools ready

### Student Requirements:
- [ ] Authentication system from Session 4 working
- [ ] Understanding of JavaScript promises/async-await
- [ ] Basic knowledge of APIs and HTTP requests

---

## 📚 Session Activities

### Activity 1: API Concepts & Service Layer Setup (25 minutes)

#### Step 1: Review Previous Work & API Introduction
**Teacher explains API integration concepts:**

1. **What are APIs?**
   - Application Programming Interface
   - Way for applications to communicate
   - Request → Process → Response pattern

2. **Real vs Mock Data:**
   - Currently using static data
   - APIs provide dynamic, real-world data
   - Need to handle loading and error states

3. **API Integration Strategy:**
   ```
   Component → API Service → External API → Data Transformation → Component
   ```

#### Step 2: Test IMDB API Endpoint
**Teacher demonstrates API testing:**

```bash
# Test the IMDB API endpoint
curl "https://api.imdbapi.dev/titles?limit=10"
```

**Expected Response Structure:**
```json
{
  "titles": [
    {
      "id": "tt13443470",
      "type": "movie",
      "primaryTitle": "Wednesday",
      "primaryImage": {
        "url": "https://m.media-amazon.com/images/..."
      },
      "startYear": 2022,
      "genres": ["Comedy", "Crime", "Fantasy"],
      "rating": {
        "aggregateRating": 8.0
      },
      "plot": "Movie description..."
    }
  ]
}
```

#### Step 3: Create API Service Layer
**Students create:** `src/lib/movieApi.js`

```javascript
// Movie API service - handles all external API calls
class MovieApiService {
  constructor() {
    this.baseUrl = 'https://api.imdbapi.dev';
  }

  // Format IMDB API data to match our app's structure
  formatMovie(movie) {
    if (movie.primaryTitle) {
      // IMDB API format
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
      // Fallback format
      return {
        id: movie.id,
        title: movie.title || movie.name,
        description: movie.overview || movie.description,
        image: movie.poster_path || movie.image || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=300&h=450&fit=crop`,
        backdrop: movie.backdrop_path || movie.backdrop || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=1920&h=1080&fit=crop`,
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : movie.year || 2023,
        rating: movie.rating || this.getRandomRating(),
        duration: movie.runtime ? `${movie.runtime} min` : movie.duration || `${Math.floor(Math.random() * 60) + 90} min`,
        genre: movie.genre || [\"Drama\"],
        vote_average: movie.vote_average || Math.floor(Math.random() * 5) + 6
      };
    }
  }

  getRandomRating() {
    const ratings = ["G", "PG", "PG-13", "R", "TV-14", "TV-MA"];
    return ratings[Math.floor(Math.random() * ratings.length)];
  }

  // Main API fetch function with error handling
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

  // Get trending movies
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

  // Get popular movies
  async getPopularMovies() {
    console.log('⭐ Getting popular movies...');
    try {
      const data = await this.fetchFromIMDB('/titles', {
        limit: 30
      });
      if (data?.titles) {
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

  // Generate fallback data when API fails
  generateFallbackMovies(count) {
    const movieTitles = [
      "The Dark Knight", "Inception", "Interstellar", "Pulp Fiction", "The Shawshank Redemption",
      "The Godfather", "Forrest Gump", "The Matrix", "Goodfellas", "The Lord of the Rings",
      "Star Wars", "Jurassic Park", "Titanic", "Avatar", "The Avengers", "Iron Man",
      "Spider-Man", "Batman", "Superman", "Wonder Woman", "Black Panther"
    ];

    const genres = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller"];
    const ratings = ["G", "PG", "PG-13", "R", "TV-14", "TV-MA"];

    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      title: movieTitles[index % movieTitles.length] + (index >= movieTitles.length ? ` ${Math.ceil((index + 1) / movieTitles.length)}` : ''),
      description: `An amazing ${genres[Math.floor(Math.random() * genres.length)].toLowerCase()} movie that will keep you entertained from start to finish.`,
      image: `https://images.unsplash.com/photo-${1440404653325 + index}?w=300&h=450&fit=crop`,
      backdrop: `https://images.unsplash.com/photo-${1440404653325 + index}?w=1920&h=1080&fit=crop`,
      year: 2018 + (index % 6),
      rating: ratings[Math.floor(Math.random() * ratings.length)],
      duration: `${Math.floor(Math.random() * 60) + 90} min`,
      genre: [genres[Math.floor(Math.random() * genres.length)]],
      vote_average: Math.floor(Math.random() * 40) / 10 + 6
    }));
  }
}

// Export singleton instance
export const movieApi = new MovieApiService();
export default movieApi;
```

**Teacher explains key concepts:**

1. **Service Layer Pattern:**
   - Separates API logic from components
   - Centralizes data transformation
   - Makes testing easier

2. **Error Handling:**
   - Try-catch blocks for network errors
   - Graceful fallback to local data
   - Detailed logging for debugging

3. **Data Transformation:**
   - `formatMovie()` normalizes different data formats
   - Consistent interface for components
   - Handles missing or incomplete data

### Activity 2: Implement Data Fetching in Components (25 minutes)

#### Step 4: Update Movie Data Layer
**Students update:** `src/data/movies.js`

```javascript
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
```

#### Step 5: Add Missing API Methods
**Students update `src/lib/movieApi.js` to add missing methods:**

```javascript
// Add these methods to the MovieApiService class

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
```

#### Step 6: Update Home Page (Already Implemented)
**The current `src/app/page.js` already has the correct structure:**

```javascript
"use client";

import Header from "@/components/header";
import HeroSection from "@/components/HeroSection";
import LoginModal from "@/components/LoginModal";
import MoviesSection from "@/components/MoviesSection";
import { useState } from "react";

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Header onLoginClick={handleLoginClick} />
      <div className="">
        <HeroSection />
        <MoviesSection />
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
```

**Key differences from documentation:**
- Uses client-side components with "use client"
- Includes LoginModal state management
- MoviesSection handles its own data fetching
- Simpler structure focusing on component composition
```

**Teacher explains the current architecture:**
- Components use "use client" for interactivity
- Data fetching happens in individual components
- Each component manages its own loading states
- Modal state is managed at the page level

### Activity 3: Add Loading States & Error Handling (25 minutes)

#### Step 7: Create Loading Component
**Students create:** `src/components/LoadingSpinner.js`

```javascript
export default function LoadingSpinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-600 border-t-netflix-red`}></div>
    </div>
  )
}
```

#### Step 8: Create Movie Cards Skeleton
**Students create:** `src/components/MovieCardSkeleton.js`

```javascript
export default function MovieCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-40 md:w-48 lg:w-56">
      <div className="aspect-[2/3] bg-gray-700 rounded-lg animate-pulse"></div>
      <div className="mt-2 space-y-2">
        <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse"></div>
      </div>
    </div>
  )
}
```

#### Step 9: Review Existing Component Architecture
**The current implementation already includes the data fetching patterns we need:**

1. **MoviesSection Component** (`src/components/MoviesSection.js`)
   - Handles its own data fetching with `useEffect`
   - Includes loading states and error handling
   - Fetches from `/api/movies` endpoint
   - Displays movie categories with proper loading skeletons

2. **HeroSection Component** (`src/components/HeroSection.js`)
   - Fetches featured movie data independently
   - Shows loading spinner while fetching
   - Handles API errors gracefully
   - Integrates with authentication for watchlist features

3. **Current Data Flow:**
   ```
   Page Component → Individual Components → API Routes → movieApi Service
   ```

**Key benefits of this architecture:**
- Components are self-contained and reusable
- Each component manages its own loading state
- Error handling is localized to each component
- No complex state management needed at page level

### Activity 4: Test API Integration & Add Caching (20 minutes)

#### Step 12: Test Real API Integration
**Students test the following:**

1. **Open Browser DevTools Console**
   - Should see API request logs with emojis
   - Check for successful API responses
   - Verify data transformation

2. **Test Loading States**
   - Refresh page to see skeleton loading
   - Check smooth transition to real data

3. **Test Error Handling**
   - Temporarily break API URL to test error state
   - Verify "Try Again" button works
   - Restore correct URL

4. **Test Data Quality**
   - Real movie titles should appear
   - Images should load properly
   - Hover effects should work on real data

**Common Issues:**
| Issue | Cause | Solution |
|-------|-------|----------|
| CORS errors | Browser security | API should handle CORS properly |
| No data loading | API endpoint down | Fallback data should appear |
| Slow loading | Network issues | Loading states should show |
| Images not loading | Invalid image URLs | Check image URL in formatMovie |

#### Step 13: Review API Service Structure
**The current `src/lib/movieApi.js` provides:**

1. **Comprehensive fallback system**
   - Generates realistic movie data when API fails
   - Maintains app functionality even without internet

2. **Multiple API methods**
   - `getTrendingMovies()` - Popular current movies
   - `getPopularMovies()` - Highly rated movies  
   - `getTopRatedMovies()` - Best rated content
   - `getMoviesByGenre()` - Genre-specific content
   - `searchMovies()` - Search functionality
   - `getFeaturedMovie()` - Hero section content

3. **Error handling patterns**
   - Try-catch blocks for network issues
   - Console logging for debugging
   - Graceful degradation to fallback data

4. **Data transformation**
   - Converts API responses to consistent format
   - Handles missing or incomplete data
   - Provides realistic placeholder content

### Activity 5: Session Review & Next Steps (10 minutes)

#### Step 14: Review API Integration
**Students verify complete functionality:**

1. **Real Data Loading:**
   - Movie titles from IMDB API
   - Proper image URLs
   - Realistic ratings and years

2. **Error Handling:**
   - Graceful fallback to local data
   - User-friendly error messages
   - Retry functionality

3. **Performance:**
   - Loading states during fetch
   - Cached responses for repeat requests
   - Smooth user experience

#### Step 15: Debug Common Issues
**Teacher helps students debug:**

1. **Console Logs:**
   - Check for API request logs
   - Verify successful responses
   - Look for error messages

2. **Network Tab:**
   - Inspect actual API calls
   - Check response data
   - Verify caching behavior

3. **Performance:**
   - Check loading time
   - Verify cache hits
   - Test error scenarios

---

## 🎯 Session Accomplishments

### ✅ What We Built:
- Complete API service layer with error handling
- Real IMDB movie data integration
- Loading states and skeleton screens
- Error boundaries with retry functionality
- Simple caching system for performance
- Data transformation layer

### ✅ Technical Skills Learned:
- API integration patterns in React/Next.js
- Async/await and Promise handling
- Error boundary implementation
- Loading state management
- Data caching strategies
- Service layer architecture
- Server vs Client component data fetching

### ✅ Files Created/Modified:
- `src/lib/movieApi.js` - Complete API service layer
- `src/data/movies.js` - Updated for real API integration
- `src/hooks/useMovies.js` - Custom hook for data fetching
- `src/components/LoadingSpinner.js` - Loading indicator
- `src/components/MovieCardSkeleton.js` - Skeleton loader
- `src/components/MoviesContainer.js` - Client-side data container
- `src/app/page.js` - Updated for new architecture

---

## 📚 Homework & Next Session

### Practice Exercises:
1. **Add more API endpoints**
   - Implement genre-specific movie fetching
   - Add movie detail API calls
   - Create search API integration

2. **Enhance caching**
   - Add localStorage caching
   - Implement cache expiration policies
   - Add cache size limits

3. **Improve error handling**
   - Add network timeout handling
   - Implement exponential backoff
   - Add offline detection

### Next Session Preview:
**Session 6: "Routing & Navigation"**
- Implement Next.js App Router
- Create dynamic movie detail pages
- Build search and browse pages
- Add navigation between pages

### Additional Resources:
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [React Data Fetching Patterns](https://react.dev/reference/react/Suspense)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

**Session Complete!** Students now have a fully functional API integration with real movie data, proper error handling, and performance optimizations.
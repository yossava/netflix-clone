# Session 6: Routing & Navigation
**Duration:** 90 minutes  
**Prerequisites:** Sessions 1-5 completed, API integration working  
**Objective:** Implement Next.js App Router with dynamic pages and navigation

---

## 📋 Session Overview
- **0-10 min:** Review API integration and introduce routing concepts
- **10-30 min:** Create dynamic movie detail pages with parameters
- **30-55 min:** Build search page with URL parameters
- **55-75 min:** Create browse and category pages
- **75-90 min:** Implement navigation and page transitions

---

## 🎯 Learning Outcomes
By the end of this session, students will:
- Understand Next.js App Router file-based routing
- Create dynamic routes with parameters
- Handle URL search parameters
- Implement page navigation and linking
- Build a complete multi-page application

---

## 🛠️ Pre-Session Checklist

### Teacher Preparation:
- [ ] Review Next.js App Router concepts
- [ ] Prepare route examples and diagrams
- [ ] Test dynamic routing patterns
- [ ] Have URL parameter examples ready

### Student Requirements:
- [ ] API integration from Session 5 working
- [ ] Real movie data loading successfully
- [ ] Understanding of React components and props

---

## 📚 Session Activities

### Activity 1: Routing Concepts & Dynamic Pages (20 minutes)

#### Step 1: Review & Routing Introduction
**Teacher explains Next.js routing concepts:**

1. **File-Based Routing:**
   ```
   src/app/
   ├── page.js           # / (home)
   ├── about/page.js     # /about
   ├── movies/page.js    # /movies
   └── watch/[id]/page.js # /watch/123 (dynamic)
   ```

2. **Dynamic Routes:**
   - `[id]` - captures URL segment as parameter
   - `[...slug]` - catches all remaining segments
   - `[[...slug]]` - optional catch-all

3. **Navigation Methods:**
   - `<Link>` component for client-side navigation
   - `useRouter` hook for programmatic navigation
   - `redirect()` for server-side redirects

#### Step 2: Create Movie Detail Page Structure
**Students create directory structure:**

```bash
# Create dynamic route directory
mkdir -p src/app/watch/[id]
```

#### Step 3: Create Movie Detail Page
**Students create:** `src/app/watch/[id]/page.js`

```javascript
import { notFound } from 'next/navigation'
import { movieApi } from '@/lib/movieApi'

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const movie = await getMovieDetails(params.id)
  
  if (!movie) {
    return {
      title: 'Movie Not Found'
    }
  }

  return {
    title: `${movie.title} - Netflix Clone`,
    description: movie.description,
    openGraph: {
      title: movie.title,
      description: movie.description,
      images: [movie.image],
    },
  }
}

// Fetch movie data
async function getMovieDetails(id) {
  try {
    // In a real app, this would fetch specific movie by ID
    const trending = await movieApi.getTrendingMovies()
    const popular = await movieApi.getPopularMovies()
    const allMovies = [...trending, ...popular]
    
    // Find movie by ID (convert to string for comparison)
    const movie = allMovies.find(m => m.id.toString() === id.toString())
    return movie
  } catch (error) {
    console.error('Error fetching movie details:', error)
    return null
  }
}

export default async function MovieDetailPage({ params }) {
  const movie = await getMovieDetails(params.id)

  if (!movie) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        
        {/* Content */}
        <div className="relative z-10 flex items-center h-full px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {movie.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-6 text-sm">
              <span className="bg-netflix-red px-2 py-1 rounded">{movie.rating}</span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{movie.vote_average}</span>
              </div>
            </div>
            
            <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-300">
              {movie.description}
            </p>
            
            <div className="flex items-center space-x-2 mb-8">
              <span className="text-gray-400">Genres:</span>
              {movie.genre.map((genre, index) => (
                <span key={index} className="bg-gray-700 px-2 py-1 rounded text-sm">
                  {genre}
                </span>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
                <span className="mr-2">▶</span>
                Play Movie
              </button>
              <button className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition-all">
                + Add to My List
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Movie Details Section */}
      <div className="px-4 md:px-8 lg:px-16 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About {movie.title}</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {movie.description}
            </p>
            
            {/* Additional Info */}
            <div className="space-y-3 text-sm">
              <div className="flex">
                <span className="text-gray-400 w-24">Type:</span>
                <span>{movie.type || 'Movie'}</span>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-24">Year:</span>
                <span>{movie.year}</span>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-24">Duration:</span>
                <span>{movie.duration}</span>
              </div>
              <div className="flex">
                <span className="text-gray-400 w-24">Rating:</span>
                <span>{movie.rating}</span>
              </div>
            </div>
          </div>
          
          <div>
            <img 
              src={movie.image} 
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Teacher explains key concepts:**

1. **Dynamic Parameters:**
   - `params.id` contains the URL parameter
   - Automatic parameter parsing by Next.js
   - Type conversion needed for comparison

2. **Metadata Generation:**
   - SEO-friendly dynamic titles
   - Open Graph tags for social sharing
   - Async metadata generation

3. **Error Handling:**
   - `notFound()` function for 404 errors
   - Graceful handling of missing movies

#### Step 4: Create Not Found Page
**Students create:** `src/app/watch/[id]/not-found.js`

```javascript
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-netflix-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-4">Movie Not Found</h2>
        <p className="text-gray-400 mb-8">
          Sorry, we couldn't find the movie you're looking for.
        </p>
        <Link 
          href="/"
          className="bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded font-semibold transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
```

### Activity 2: Search Page with URL Parameters (25 minutes)

#### Step 5: Create Search Page
**Students create:** `src/app/search/page.js`

```javascript
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { searchMovies } from '@/data/movies'
import MovieCard from '@/components/MovieCard'
import LoadingSpinner from '@/components/LoadingSpinner'

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Get query from URL on mount
  useEffect(() => {
    const urlQuery = searchParams.get('q') || ''
    setQuery(urlQuery)
    if (urlQuery) {
      performSearch(urlQuery)
    }
  }, [searchParams])

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return
    
    setIsLoading(true)
    setHasSearched(true)
    
    try {
      const results = await searchMovies(searchQuery)
      setSearchResults(results)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    
    // Update URL with search query
    router.push(`/search?q=${encodeURIComponent(query)}`)
    performSearch(query)
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  const handleMoviePlay = (movie) => {
    router.push(`/watch/${movie.id}`)
  }

  const handleMovieInfo = (movie) => {
    router.push(`/watch/${movie.id}`)
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <div className="px-4 md:px-8 lg:px-16 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Search Movies</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-4 max-w-2xl">
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for movies..."
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-netflix-red"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-netflix-red hover:bg-red-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Search Results */}
        {!isLoading && hasSearched && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {searchResults.length > 0 
                ? `Found ${searchResults.length} results for "${searchParams.get('q')}"`
                : `No results found for "${searchParams.get('q')}"`
              }
            </h2>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {searchResults.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onPlay={handleMoviePlay}
                    onMoreInfo={handleMovieInfo}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">
                  Try searching for different keywords
                </p>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!hasSearched && !isLoading && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              Enter a search term to find movies
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchContent />
    </Suspense>
  )
}
```

**Teacher explains search page concepts:**

1. **URL Parameters:**
   - `useSearchParams()` to read URL query parameters
   - `router.push()` to update URL with search query
   - SEO-friendly URLs with search terms

2. **Suspense Boundary:**
   - Required for `useSearchParams()` in client components
   - Handles loading state during navigation
   - Better user experience

3. **Search UX:**
   - Form submission updates URL
   - Results persist on page refresh
   - Loading states during search

#### Step 6: Add Search to Header
**Students update:** `src/components/header.js`

```javascript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import LoginModal from './LoginModal'

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <>
      <header className="bg-netflix-black p-4 sticky top-0 z-40 border-b border-gray-800">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-netflix-red text-2xl font-bold">
            NETFLIX
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-6 mx-8">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="/browse" className="text-white hover:text-gray-300 transition-colors">
              Browse
            </Link>
            <Link href="/movies" className="text-white hover:text-gray-300 transition-colors">
              Movies
            </Link>
            <Link href="/tv-shows" className="text-white hover:text-gray-300 transition-colors">
              TV Shows
            </Link>
            {isAuthenticated && (
              <Link href="/my-list" className="text-white hover:text-gray-300 transition-colors">
                My List
              </Link>
            )}
          </nav>

          {/* Search and Auth */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden sm:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:border-netflix-red text-sm w-48"
              />
            </form>

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <img 
                  src={user?.avatar} 
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white text-sm hidden sm:inline">
                  {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-netflix-red hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}
```

### Activity 3: Browse and Category Pages (20 minutes)

#### Step 7: Create Browse Page
**Students create:** `src/app/browse/page.js`

```javascript
import MoviesContainer from '@/components/MoviesContainer'

export const metadata = {
  title: 'Browse Movies - Netflix Clone',
  description: 'Browse all movies and TV shows',
}

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse All</h1>
        <MoviesContainer />
      </div>
    </div>
  )
}
```

#### Step 8: Create Movies Category Page
**Students create:** `src/app/movies/page.js`

```javascript
'use client'

import { useState, useEffect } from 'react'
import { movieApi } from '@/lib/movieApi'
import MovieCard from '@/components/MovieCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useRouter } from 'next/navigation'

export default function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true)
        const [trending, popular] = await Promise.all([
          movieApi.getTrendingMovies(),
          movieApi.getPopularMovies()
        ])
        
        // Combine and deduplicate movies
        const allMovies = [...trending, ...popular]
        const uniqueMovies = allMovies.filter((movie, index, self) => 
          index === self.findIndex(m => m.id === movie.id)
        )
        
        setMovies(uniqueMovies)
      } catch (err) {
        setError('Failed to load movies')
        console.error('Error fetching movies:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const handleMoviePlay = (movie) => {
    router.push(`/watch/${movie.id}`)
  }

  const handleMovieInfo = (movie) => {
    router.push(`/watch/${movie.id}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-black text-white flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-netflix-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-netflix-red hover:bg-red-700 text-white px-6 py-2 rounded font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <h1 className="text-3xl font-bold mb-8">Movies</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPlay={handleMoviePlay}
              onMoreInfo={handleMovieInfo}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
```

#### Step 9: Create TV Shows Page
**Students create:** `src/app/tv-shows/page.js`

```javascript
'use client'

import { useState, useEffect } from 'react'
import { movieApi } from '@/lib/movieApi'
import MovieCard from '@/components/MovieCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useRouter } from 'next/navigation'

export default function TVShowsPage() {
  const [shows, setShows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setIsLoading(true)
        // For now, use movie data but could filter by type
        const trending = await movieApi.getTrendingMovies()
        setShows(trending.slice(0, 24)) // Show subset for TV shows
      } catch (err) {
        console.error('Error fetching TV shows:', err)
        setShows([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchShows()
  }, [])

  const handleShowPlay = (show) => {
    router.push(`/watch/${show.id}`)
  }

  const handleShowInfo = (show) => {
    router.push(`/watch/${show.id}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-black text-white flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <h1 className="text-3xl font-bold mb-8">TV Shows</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {shows.map((show) => (
            <MovieCard
              key={show.id}
              movie={show}
              onPlay={handleShowPlay}
              onMoreInfo={handleShowInfo}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
```

### Activity 4: Navigation & Page Transitions (15 minutes)

#### Step 10: Update Movie Cards for Navigation
**Students update:** `src/components/MovieCard.js`

```javascript
'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function MovieCard({ movie, onPlay, onMoreInfo }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const handlePlayClick = (e) => {
    e.stopPropagation()
    
    if (!isAuthenticated) {
      alert('Please sign in to play movies')
      return
    }
    
    if (onPlay) {
      onPlay(movie)
    } else {
      router.push(`/watch/${movie.id}`)
    }
  }

  const handleMoreInfoClick = (e) => {
    e.stopPropagation()
    
    if (onMoreInfo) {
      onMoreInfo(movie)
    } else {
      router.push(`/watch/${movie.id}`)
    }
  }

  const handleCardClick = () => {
    router.push(`/watch/${movie.id}`)
  }

  return (
    <div 
      className="group relative cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
      onClick={handleCardClick}
    >
      {/* Movie Poster */}
      <div className="aspect-[2/3] relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300">
        <img 
          src={movie.image} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              <button 
                onClick={handlePlayClick}
                className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center"
              >
                <span className="mr-1">▶</span>
                Play
              </button>
              <button 
                onClick={handleMoreInfoClick}
                className="bg-gray-700 bg-opacity-80 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-gray-600 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Movie Info */}
      <div className="mt-2 space-y-1 px-1">
        <h3 className="text-white font-semibold text-sm truncate group-hover:text-netflix-red transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">{movie.year}</span>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-gray-300">{movie.rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
```

#### Step 11: Test Navigation Flow
**Students test complete navigation:**

1. **Home Page Navigation:**
   - Click on movie cards
   - Navigate to detail pages
   - Test back/forward browser buttons

2. **Search Navigation:**
   - Search from header
   - Click on search results
   - Test URL parameters

3. **Category Navigation:**
   - Browse different categories
   - Test responsive navigation
   - Verify all links work

**Navigation Test Checklist:**
- [ ] Home → Movie Detail → Back
- [ ] Search → Results → Movie Detail
- [ ] Browse → Categories → Movie Detail
- [ ] Header navigation between sections
- [ ] URL parameters preserved correctly

#### Step 12: Add Loading States for Navigation
**Students create:** `src/app/loading.js`

```javascript
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Loading() {
  return (
    <div className="min-h-screen bg-netflix-black flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  )
}
```

---

## 🎯 Session Accomplishments

### ✅ What We Built:
- Dynamic movie detail pages with URL parameters
- Search page with URL query parameters
- Browse and category pages
- Complete navigation system
- SEO-friendly routing with metadata
- Loading and error states

### ✅ Technical Skills Learned:
- Next.js App Router file-based routing
- Dynamic route parameters
- URL search parameters handling
- Programmatic navigation with useRouter
- Link component for client-side navigation
- Metadata generation for SEO
- Suspense boundaries for async components

### ✅ Files Created/Modified:
- `src/app/watch/[id]/page.js` - Dynamic movie detail pages
- `src/app/watch/[id]/not-found.js` - 404 error page
- `src/app/search/page.js` - Search page with URL parameters
- `src/app/browse/page.js` - Browse all content
- `src/app/movies/page.js` - Movies category page
- `src/app/tv-shows/page.js` - TV shows category page
- `src/app/loading.js` - Global loading component
- `src/components/header.js` - Updated with navigation links
- `src/components/MovieCard.js` - Added navigation on click

---

## 📚 Homework & Next Session

### Practice Exercises:
1. **Add more dynamic routes**
   - Create genre-specific pages (`/genre/[name]`)
   - Add year-based filtering (`/movies/[year]`)
   - Implement user profile pages (`/profile/[section]`)

2. **Enhance search functionality**
   - Add search filters (genre, year, rating)
   - Implement search suggestions
   - Add search history

3. **Improve navigation UX**
   - Add breadcrumb navigation
   - Implement page transitions
   - Add loading skeletons for each page

### Next Session Preview:
**Session 7: "User Features & Local Storage"**
- Create My List functionality
- Implement user watchlist
- Add viewing history
- User preferences and settings

### Additional Resources:
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Dynamic Routes Guide](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [useRouter Hook Reference](https://nextjs.org/docs/app/api-reference/functions/use-router)

**Session Complete!** Students now have a fully functional multi-page application with proper routing, navigation, and SEO optimization.
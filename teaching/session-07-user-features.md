# Session 7: User Features & Local Storage
**Duration:** 90 minutes  
**Prerequisites:** Sessions 1-6 completed, routing and navigation working  
**Objective:** Implement user-specific features like watchlist, viewing history, and preferences

---

## 📋 Session Overview
- **0-10 min:** Review navigation system and introduce user features
- **10-35 min:** Create My List/Watchlist functionality with localStorage
- **35-60 min:** Build user profile page with preferences
- **60-80 min:** Add viewing history and continue watching
- **80-90 min:** Session review and data persistence patterns

---

## 🎯 Learning Outcomes
By the end of this session, students will:
- Implement watchlist functionality with data persistence
- Create user profile and preferences management
- Build viewing history tracking
- Understand localStorage patterns and best practices
- Create user-specific UI components

---

## 🛠️ Pre-Session Checklist

### Teacher Preparation:
- [ ] Review localStorage concepts and browser APIs
- [ ] Prepare data persistence examples
- [ ] Test user flow scenarios
- [ ] Have debugging tools ready for localStorage

### Student Requirements:
- [ ] Navigation system from Session 6 working
- [ ] Authentication from Session 4 functioning
- [ ] Movie detail pages accessible
- [ ] Understanding of React state management

---

## 📚 Session Activities

### Activity 1: Watchlist/My List Implementation (25 minutes)

#### Step 1: Review & User Features Introduction
**Teacher explains user feature concepts:**

1. **User-Specific Data:**
   - Watchlist/favorites
   - Viewing history
   - User preferences
   - Progress tracking

2. **Data Persistence Options:**
   - localStorage - client-side storage
   - sessionStorage - session only
   - Cookies - server/client access
   - Database - production apps

3. **User Experience Patterns:**
   - Add/remove from lists
   - Visual feedback for saved items
   - Sync across sessions

#### Step 2: Create Watchlist Context
**Students create:** `src/context/WatchlistContext.js`

```javascript
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const WatchlistContext = createContext()

export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider')
  }
  return context
}

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([])
  const [viewingHistory, setViewingHistory] = useState([])
  const { user, isAuthenticated } = useAuth()

  // Load user's watchlist from localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      const savedWatchlist = localStorage.getItem(`watchlist_${user.id}`)
      const savedHistory = localStorage.getItem(`history_${user.id}`)
      
      if (savedWatchlist) {
        try {
          setWatchlist(JSON.parse(savedWatchlist))
        } catch (error) {
          console.error('Error parsing watchlist:', error)
          setWatchlist([])
        }
      }
      
      if (savedHistory) {
        try {
          setViewingHistory(JSON.parse(savedHistory))
        } catch (error) {
          console.error('Error parsing viewing history:', error)
          setViewingHistory([])
        }
      }
    } else {
      setWatchlist([])
      setViewingHistory([])
    }
  }, [isAuthenticated, user])

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`watchlist_${user.id}`, JSON.stringify(watchlist))
    }
  }, [watchlist, isAuthenticated, user])

  // Save viewing history to localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`history_${user.id}`, JSON.stringify(viewingHistory))
    }
  }, [viewingHistory, isAuthenticated, user])

  // Add movie to watchlist
  const addToWatchlist = (movie) => {
    if (!isAuthenticated) {
      alert('Please sign in to add movies to your list')
      return false
    }

    if (isInWatchlist(movie.id)) {
      return false // Already in watchlist
    }

    setWatchlist(prev => [...prev, {
      ...movie,
      addedAt: new Date().toISOString()
    }])
    return true
  }

  // Remove movie from watchlist
  const removeFromWatchlist = (movieId) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId))
  }

  // Check if movie is in watchlist
  const isInWatchlist = (movieId) => {
    return watchlist.some(movie => movie.id === movieId)
  }

  // Add to viewing history
  const addToHistory = (movie) => {
    if (!isAuthenticated || !movie) return

    setViewingHistory(prev => {
      // Remove if already exists to avoid duplicates
      const filtered = prev.filter(item => item.id !== movie.id)
      
      // Add to beginning of array (most recent first)
      return [{
        ...movie,
        watchedAt: new Date().toISOString(),
        progress: 0 // In a real app, this would track actual progress
      }, ...filtered].slice(0, 50) // Keep only last 50 items
    })
  }

  // Get continue watching (recent history)
  const getContinueWatching = () => {
    return viewingHistory.slice(0, 12) // Return last 12 items
  }

  const value = {
    watchlist,
    viewingHistory,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    addToHistory,
    getContinueWatching
  }

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  )
}
```

#### Step 3: Add WatchlistProvider to Layout
**Students update:** `src/app/layout.js`

```javascript
import { AuthProvider } from '@/context/AuthContext'
import { WatchlistProvider } from '@/context/WatchlistContext'
import './globals.css'

export const metadata = {
  title: 'Netflix Clone',
  description: 'A Netflix clone built with Next.js and Tailwind CSS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AuthProvider>
          <WatchlistProvider>
            {children}
          </WatchlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
```

#### Step 4: Update MovieCard with Watchlist Actions
**Students update:** `src/components/MovieCard.js`

```javascript
'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useWatchlist } from '@/context/WatchlistContext'

export default function MovieCard({ movie, onPlay, onMoreInfo, showRemove = false }) {
  const { isAuthenticated } = useAuth()
  const { addToWatchlist, removeFromWatchlist, isInWatchlist, addToHistory } = useWatchlist()
  const router = useRouter()

  const inWatchlist = isInWatchlist(movie.id)

  const handlePlayClick = (e) => {
    e.stopPropagation()
    
    if (!isAuthenticated) {
      alert('Please sign in to play movies')
      return
    }
    
    // Add to viewing history
    addToHistory(movie)
    
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

  const handleWatchlistClick = (e) => {
    e.stopPropagation()
    
    if (!isAuthenticated) {
      alert('Please sign in to add movies to your list')
      return
    }

    if (showRemove || inWatchlist) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
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
        
        {/* Watchlist Indicator */}
        {inWatchlist && (
          <div className="absolute top-2 right-2 bg-netflix-red text-white text-xs px-2 py-1 rounded">
            ♥
          </div>
        )}
        
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
                onClick={handleWatchlistClick}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                  inWatchlist || showRemove
                    ? 'bg-netflix-red text-white hover:bg-red-700'
                    : 'bg-gray-700 bg-opacity-80 text-white hover:bg-gray-600'
                }`}
              >
                {inWatchlist || showRemove ? '−' : '+'}
              </button>
              <button 
                onClick={handleMoreInfoClick}
                className="bg-gray-700 bg-opacity-80 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-gray-600 transition-colors"
              >
                i
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
            <span className="text-gray-300">{movie.vote_average}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Teacher explains watchlist features:**
- Visual indicator for watchlisted movies
- Toggle add/remove functionality
- User feedback for authentication requirements
- History tracking on play action

### Activity 2: My List Page Implementation (25 minutes)

#### Step 5: Create My List Page
**Students create:** `src/app/my-list/page.js`

```javascript
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useWatchlist } from '@/context/WatchlistContext'
import MovieCard from '@/components/MovieCard'

export default function MyListPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const { watchlist } = useWatchlist()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-netflix-red"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <h1 className="text-3xl font-bold mb-2">My List</h1>
        <p className="text-gray-400 mb-8">Movies and shows you've added</p>
        
        {watchlist.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl mb-4 text-gray-400">Your list is empty</h2>
            <p className="text-gray-500 mb-8">
              Add movies and shows to your list by clicking the + button
            </p>
            <button
              onClick={() => router.push('/browse')}
              className="bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded font-semibold transition-colors"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-400">
              {watchlist.length} {watchlist.length === 1 ? 'item' : 'items'} in your list
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {watchlist.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  showRemove={true}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
```

#### Step 6: Add Continue Watching to Home Page
**Students update:** `src/app/page.js`

```javascript
import Header from '@/components/header'
import HeroSection from '@/components/HeroSection'
import MoviesContainer from '@/components/MoviesContainer'
import ContinueWatching from '@/components/ContinueWatching'

export default function Home() {
  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Header />
      <HeroSection />
      <ContinueWatching />
      <MoviesContainer />
    </div>
  )
}
```

#### Step 7: Create Continue Watching Component
**Students create:** `src/components/ContinueWatching.js`

```javascript
'use client'

import { useAuth } from '@/context/AuthContext'
import { useWatchlist } from '@/context/WatchlistContext'
import MovieCard from './MovieCard'

export default function ContinueWatching() {
  const { isAuthenticated } = useAuth()
  const { getContinueWatching } = useWatchlist()

  if (!isAuthenticated) {
    return null
  }

  const continueWatching = getContinueWatching()

  if (continueWatching.length === 0) {
    return null
  }

  return (
    <section className="px-4 md:px-8 lg:px-16 py-8">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
        Continue Watching
      </h2>
      
      <div className="relative group">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
          {continueWatching.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-40 md:w-48 lg:w-56">
              <MovieCard movie={movie} />
              {/* Progress bar */}
              <div className="mt-1 bg-gray-700 rounded-full h-1">
                <div 
                  className="bg-netflix-red h-1 rounded-full" 
                  style={{ width: `${movie.progress || 10}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Activity 3: User Profile & Preferences (25 minutes)

#### Step 8: Create User Profile Page
**Students create:** `src/app/profile/page.js`

```javascript
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useWatchlist } from '@/context/WatchlistContext'

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const { watchlist, viewingHistory } = useWatchlist()
  const router = useRouter()
  
  const [preferences, setPreferences] = useState({
    autoplay: true,
    adultContent: false,
    language: 'en',
    emailNotifications: true
  })

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (user) {
      const savedPreferences = localStorage.getItem(`preferences_${user.id}`)
      if (savedPreferences) {
        try {
          setPreferences(JSON.parse(savedPreferences))
        } catch (error) {
          console.error('Error loading preferences:', error)
        }
      }
    }
  }, [user])

  const handlePreferenceChange = (key, value) => {
    const newPreferences = {
      ...preferences,
      [key]: value
    }
    setPreferences(newPreferences)
    
    if (user) {
      localStorage.setItem(`preferences_${user.id}`, JSON.stringify(newPreferences))
    }
  }

  const handleSignOut = () => {
    logout()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-netflix-red"></div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Information */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Profile</h2>
            
            <div className="flex items-center mb-6">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span>My List</span>
                <span className="text-gray-400">{watchlist.length} items</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span>Viewing History</span>
                <span className="text-gray-400">{viewingHistory.length} items</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Member Since</span>
                <span className="text-gray-400">
                  {new Date(user.id).toLocaleDateString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full mt-6 bg-netflix-red hover:bg-red-700 text-white py-2 px-4 rounded font-semibold transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Preferences */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Preferences</h2>
            
            <div className="space-y-6">
              {/* Autoplay */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Autoplay</label>
                  <p className="text-sm text-gray-400">Automatically play next episode</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.autoplay}
                    onChange={(e) => handlePreferenceChange('autoplay', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-netflix-red"></div>
                </label>
              </div>

              {/* Adult Content */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Adult Content</label>
                  <p className="text-sm text-gray-400">Show mature content</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.adultContent}
                    onChange={(e) => handlePreferenceChange('adultContent', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-netflix-red"></div>
                </label>
              </div>

              {/* Language */}
              <div>
                <label className="font-medium block mb-2">Language</label>
                <select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-netflix-red"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Email Notifications</label>
                  <p className="text-sm text-gray-400">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications}
                    onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-netflix-red"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Viewing History Section */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          
          {viewingHistory.length === 0 ? (
            <p className="text-gray-400">No viewing history yet</p>
          ) : (
            <div className="space-y-3">
              {viewingHistory.slice(0, 10).map((movie) => (
                <div key={`${movie.id}-${movie.watchedAt}`} className="flex items-center space-x-4 py-2">
                  <img 
                    src={movie.image} 
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{movie.title}</h3>
                    <p className="text-sm text-gray-400">
                      Watched {new Date(movie.watchedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => router.push(`/watch/${movie.id}`)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    Watch Again
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

### Activity 4: Enhanced Movie Detail Page (15 minutes)

#### Step 9: Update Movie Detail Page with Watchlist
**Students update:** `src/app/watch/[id]/page.js`

```javascript
import { notFound } from 'next/navigation'
import { movieApi } from '@/lib/movieApi'
import MovieDetailClient from '@/components/MovieDetailClient'

// Keep existing generateMetadata and getMovieDetails functions...

export default async function MovieDetailPage({ params }) {
  const movie = await getMovieDetails(params.id)

  if (!movie) {
    notFound()
  }

  return <MovieDetailClient movie={movie} />
}
```

#### Step 10: Create Movie Detail Client Component
**Students create:** `src/components/MovieDetailClient.js`

```javascript
'use client'

import { useAuth } from '@/context/AuthContext'
import { useWatchlist } from '@/context/WatchlistContext'

export default function MovieDetailClient({ movie }) {
  const { isAuthenticated } = useAuth()
  const { addToWatchlist, removeFromWatchlist, isInWatchlist, addToHistory } = useWatchlist()

  const inWatchlist = isInWatchlist(movie.id)

  const handlePlay = () => {
    if (!isAuthenticated) {
      alert('Please sign in to play movies')
      return
    }
    
    addToHistory(movie)
    alert(`Playing: ${movie.title}`)
  }

  const handleWatchlist = () => {
    if (!isAuthenticated) {
      alert('Please sign in to add movies to your list')
      return
    }

    if (inWatchlist) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
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
              <button 
                onClick={handlePlay}
                className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <span className="mr-2">▶</span>
                Play Movie
              </button>
              <button 
                onClick={handleWatchlist}
                className={`px-8 py-3 rounded font-semibold transition-colors ${
                  inWatchlist
                    ? 'bg-gray-600 bg-opacity-70 text-white hover:bg-opacity-90'
                    : 'bg-gray-600 bg-opacity-70 text-white hover:bg-opacity-90'
                }`}
              >
                {inWatchlist ? '✓ In My List' : '+ Add to My List'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Movie Details Section - keep existing content */}
      <div className="px-4 md:px-8 lg:px-16 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About {movie.title}</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {movie.description}
            </p>
            
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

### Activity 5: Session Review & Data Patterns (10 minutes)

#### Step 11: Test Complete User Flow
**Students test the following user scenarios:**

1. **Watchlist Flow:**
   - Add movies to watchlist
   - View My List page
   - Remove items from watchlist
   - Check persistence after page refresh

2. **Viewing History:**
   - Play movies to add to history
   - Check Continue Watching section
   - View history in profile

3. **Profile Management:**
   - Update preferences
   - View account statistics
   - Test settings persistence

**Data Persistence Test:**
- [ ] Watchlist survives browser refresh
- [ ] Viewing history tracks correctly
- [ ] Preferences save and load
- [ ] Multiple users have separate data

#### Step 12: Review localStorage Best Practices
**Teacher explains data management concepts:**

1. **Data Structure:**
   ```javascript
   // User-specific keys
   watchlist_${userId}
   history_${userId}
   preferences_${userId}
   ```

2. **Error Handling:**
   - Try-catch for JSON parsing
   - Graceful fallbacks for corrupted data
   - Storage quota management

3. **Performance Considerations:**
   - Limit history size (50 items)
   - Debounce rapid updates
   - Use useCallback for event handlers

---

## 🎯 Session Accomplishments

### ✅ What We Built:
- Complete watchlist/My List functionality
- User profile with preferences management
- Viewing history tracking
- Continue watching feature
- Data persistence with localStorage
- User-specific data isolation

### ✅ Technical Skills Learned:
- localStorage patterns and best practices
- Context API for complex state management
- User data persistence strategies
- Form handling for preferences
- User authentication integration
- Data normalization and storage

### ✅ Files Created/Modified:
- `src/context/WatchlistContext.js` - User data management
- `src/app/my-list/page.js` - Watchlist page
- `src/app/profile/page.js` - User profile and preferences
- `src/components/ContinueWatching.js` - History-based recommendations
- `src/components/MovieDetailClient.js` - Client-side movie details
- `src/components/MovieCard.js` - Enhanced with watchlist features
- `src/app/layout.js` - Added WatchlistProvider

---

## 📚 Homework & Next Session

### Practice Exercises:
1. **Enhance user features**
   - Add rating system for movies
   - Implement watch progress tracking
   - Create favorite genres preferences

2. **Improve data management**
   - Add data export/import functionality
   - Implement data cleanup utilities
   - Add storage usage monitoring

3. **User experience improvements**
   - Add undo functionality for removals
   - Implement bulk actions for lists
   - Add sorting and filtering options

### Next Session Preview:
**Session 8: "Performance & Deployment"**
- Image optimization and lazy loading
- Code splitting and bundle optimization
- SEO improvements and metadata
- Production deployment strategies

### Additional Resources:
- [Web Storage API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [React Context Best Practices](https://react.dev/learn/passing-data-deeply-with-context)
- [User Experience Patterns](https://uxplanet.org/ux-design-patterns-for-web-apps-36f4b48f1eb9)

**Session Complete!** Students now have a fully functional user-centric application with personal data management and preferences.
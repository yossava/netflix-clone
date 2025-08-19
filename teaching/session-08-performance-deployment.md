# Session 8: Performance Optimization & Deployment
**Duration:** 90 minutes  
**Prerequisites:** Sessions 1-7 completed, full application functionality  
**Objective:** Optimize application performance and deploy to production

---

## 📋 Session Overview
- **0-10 min:** Review application and introduce performance concepts
- **10-30 min:** Image optimization and lazy loading implementation
- **30-50 min:** Code splitting and bundle optimization
- **50-70 min:** SEO improvements and metadata optimization
- **70-90 min:** Production deployment and final testing

---

## 🎯 Learning Outcomes
By the end of this session, students will:
- Implement image optimization techniques
- Understand code splitting and lazy loading
- Optimize SEO with proper metadata
- Deploy application to production (Vercel)
- Monitor performance and fix common issues

---

## 🛠️ Pre-Session Checklist

### Teacher Preparation:
- [ ] Review performance optimization concepts
- [ ] Set up Vercel deployment account
- [ ] Prepare performance testing tools
- [ ] Have lighthouse and dev tools ready

### Student Requirements:
- [ ] Complete Netflix clone from Sessions 1-7
- [ ] GitHub account for deployment
- [ ] Understanding of web performance basics
- [ ] Completed user features working

---

## 📚 Session Activities

### Activity 1: Performance Analysis & Image Optimization (20 minutes)

#### Step 1: Performance Audit with Lighthouse
**Teacher demonstrates performance analysis:**

1. **Open Chrome DevTools**
   - Navigate to Lighthouse tab
   - Run performance audit
   - Analyze results and recommendations

2. **Common Performance Issues:**
   - Large image files
   - Unoptimized JavaScript bundles
   - Missing meta tags
   - Slow API responses

**Students run Lighthouse audit:**
```bash
# In browser DevTools:
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Generate report for Performance, Accessibility, SEO
# 4. Note scores and recommendations
```

#### Step 2: Implement Next.js Image Optimization
**Students update:** `src/components/MovieCard.js`

```javascript
'use client'

import Image from 'next/image'
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
      {/* Optimized Movie Poster */}
      <div className="aspect-[2/3] relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300">
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          priority={false}
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

**Teacher explains Image optimization:**
- `Image` component vs regular `img` tag
- Automatic lazy loading
- Responsive image sizes
- Blur placeholder for better UX
- WebP format conversion

#### Step 3: Configure Next.js Image Domains
**Students update:** `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'm.media-amazon.com',
      'image.tmdb.org'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Enable static exports for deployment flexibility
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
}

module.exports = nextConfig
```

#### Step 4: Implement Lazy Loading for Movie Sections
**Students update:** `src/components/MoviesSection.js`

```javascript
'use client'

import { useState, useEffect, useRef } from 'react'
import MovieCard from './MovieCard'

export default function MoviesSection({ title, movies, onPlay, onMoreInfo }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="px-4 md:px-8 lg:px-16 py-8">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
        {title}
      </h2>
      
      <div className="relative group">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
          {isVisible ? (
            movies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-40 md:w-48 lg:w-56">
                <MovieCard 
                  movie={movie}
                  onPlay={onPlay}
                  onMoreInfo={onMoreInfo}
                />
              </div>
            ))
          ) : (
            // Skeleton loading while not visible
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-40 md:w-48 lg:w-56">
                <div className="aspect-[2/3] bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="mt-2 space-y-2">
                  <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-netflix-black to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-netflix-black to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </section>
  )
}
```

### Activity 2: Code Splitting & Bundle Optimization (20 minutes)

#### Step 5: Implement Dynamic Imports for Heavy Components
**Students update:** `src/components/LoginModal.js`

```javascript
'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { useAuth } from '@/context/AuthContext'

// Lazy load heavy form validation library if needed
const FormValidator = lazy(() => import('./FormValidator'))

export default function LoginModal({ isOpen, onClose }) {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [showAdvancedValidation, setShowAdvancedValidation] = useState(false)
  
  const { login, signup, isLoading } = useAuth()

  // Existing form handlers...
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (isLoginMode) {
      const result = await login(formData.email, formData.password)
      if (result.success) {
        onClose()
        setFormData({ email: '', password: '', confirmPassword: '' })
      } else {
        setError(result.error)
      }
    } else {
      const result = await signup(formData.email, formData.password, formData.confirmPassword)
      if (result.success) {
        onClose()
        setFormData({ email: '', password: '', confirmPassword: '' })
      } else {
        setError(result.error)
      }
    }
  }

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
    setError('')
    setFormData({ email: '', password: '', confirmPassword: '' })
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-netflix-black bg-opacity-90 p-8 rounded-lg w-full max-w-md border border-gray-700">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isLoginMode ? 'Sign In' : 'Sign Up'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-netflix-red text-white"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-netflix-red text-white"
              placeholder="Enter your password"
              autoComplete={isLoginMode ? 'current-password' : 'new-password'}
            />
          </div>

          {/* Confirm Password Field (only for signup) */}
          {!isLoginMode && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-netflix-red text-white"
                placeholder="Confirm your password"
                autoComplete="new-password"
              />
            </div>
          )}

          {/* Advanced Validation (lazy loaded) */}
          {showAdvancedValidation && (
            <Suspense fallback={<div className="animate-pulse h-8 bg-gray-700 rounded"></div>}>
              <FormValidator formData={formData} />
            </Suspense>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mt-2" role="alert">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-netflix-red hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isLoginMode ? 'Signing In...' : 'Signing Up...'}
              </>
            ) : (
              isLoginMode ? 'Sign In' : 'Sign Up'
            )}
          </button>
        </form>

        {/* Toggle between login/signup */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleMode}
              className="text-netflix-red hover:underline font-semibold"
              type="button"
            >
              {isLoginMode ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
```

#### Step 6: Bundle Analysis Configuration
**Students update:** `package.json`

```json
{
  "name": "netflix-clone",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "analyze": "cross-env ANALYZE=true next build",
    "export": "next export"
  },
  "dependencies": {
    // existing dependencies...
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^14.0.0",
    "cross-env": "^7.0.3"
    // existing dev dependencies...
  }
}
```

#### Step 7: Add Bundle Analyzer
**Students update:** `next.config.js`

```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'm.media-amazon.com',
      'image.tmdb.org'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Optimize bundle
  experimental: {
    optimizeCss: true,
  },
  // Compression
  compress: true,
  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = withBundleAnalyzer(nextConfig)
```

**Run bundle analysis:**
```bash
npm install @next/bundle-analyzer cross-env
npm run analyze
```

### Activity 3: SEO Optimization (20 minutes)

#### Step 8: Enhanced Metadata and Sitemap
**Students create:** `src/app/sitemap.js`

```javascript
import { movieApi } from '@/lib/movieApi'

export default async function sitemap() {
  const baseUrl = 'https://your-netflix-clone.vercel.app'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/browse`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/movies`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tv-shows`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]

  // Dynamic movie pages
  try {
    const [trending, popular] = await Promise.all([
      movieApi.getTrendingMovies(),
      movieApi.getPopularMovies()
    ])
    
    const allMovies = [...trending, ...popular]
    const uniqueMovies = allMovies.filter((movie, index, self) => 
      index === self.findIndex(m => m.id === movie.id)
    )
    
    const moviePages = uniqueMovies.slice(0, 50).map((movie) => ({
      url: `${baseUrl}/watch/${movie.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    return [...staticPages, ...moviePages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}
```

#### Step 9: Robots.txt Configuration
**Students update:** `src/app/robots.js`

```javascript
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/api/'],
    },
    sitemap: 'https://your-netflix-clone.vercel.app/sitemap.xml',
  }
}
```

#### Step 10: Enhanced Page Metadata
**Students update:** `src/app/layout.js`

```javascript
import { AuthProvider } from '@/context/AuthContext'
import { WatchlistProvider } from '@/context/WatchlistContext'
import './globals.css'

export const metadata = {
  title: {
    default: 'Netflix Clone - Stream Movies & TV Shows',
    template: '%s | Netflix Clone'
  },
  description: 'Watch thousands of movies and TV shows on Netflix Clone. Enjoy unlimited streaming of your favorite content.',
  keywords: ['movies', 'tv shows', 'streaming', 'entertainment', 'netflix', 'watch online'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Netflix Clone',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Netflix Clone - Stream Movies & TV Shows',
    description: 'Watch thousands of movies and TV shows on Netflix Clone',
    url: 'https://your-netflix-clone.vercel.app',
    siteName: 'Netflix Clone',
    images: [
      {
        url: 'https://your-netflix-clone.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Netflix Clone',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Netflix Clone - Stream Movies & TV Shows',
    description: 'Watch thousands of movies and TV shows on Netflix Clone',
    images: ['https://your-netflix-clone.vercel.app/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E50914" />
      </head>
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

### Activity 4: Production Deployment (20 minutes)

#### Step 11: Prepare for Deployment
**Students create:** `.env.example`

```env
# Example environment variables
IMDB_API_KEY=your_imdb_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000

# For production
NEXT_PUBLIC_APP_URL=https://your-netflix-clone.vercel.app
```

**Students check:** `package.json` build scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build && next export"
  }
}
```

#### Step 12: Deploy to Vercel
**Teacher guides students through deployment:**

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "🚀 Ready for production deployment

   🎬 Complete Netflix clone with:
   - Real IMDB API integration
   - User authentication & watchlist
   - Performance optimizations
   - SEO improvements

   🧪 Generated with Claude Code"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Connect GitHub account
   - Import Netflix clone repository
   - Configure environment variables
   - Deploy

3. **Deployment Checklist:**
   - [ ] Environment variables set
   - [ ] Domain configured
   - [ ] Build successful
   - [ ] No console errors
   - [ ] All features working

#### Step 13: Test Production Build Locally
**Students test production build:**

```bash
# Build for production
npm run build

# Start production server
npm start

# Test the build
# 1. Check for console errors
# 2. Test all functionality
# 3. Verify performance improvements
# 4. Check mobile responsiveness
```

#### Step 14: Performance Verification
**Students run final performance tests:**

1. **Lighthouse Audit on Production:**
   - Performance score > 90
   - Accessibility score > 90
   - Best Practices score > 90
   - SEO score > 90

2. **Manual Testing:**
   - [ ] All pages load quickly
   - [ ] Images load progressively
   - [ ] Navigation is smooth
   - [ ] Mobile experience is good
   - [ ] Authentication works
   - [ ] Watchlist persists
   - [ ] Search functions properly

### Activity 5: Final Review & Monitoring (10 minutes)

#### Step 15: Production Monitoring Setup
**Students add error tracking (optional):**

```javascript
// In src/app/layout.js
export default function RootLayout({ children }) {
  useEffect(() => {
    // Simple error tracking
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error)
      // In production, send to monitoring service
    })

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason)
      // In production, send to monitoring service
    })
  }, [])

  return (
    // ... rest of layout
  )
}
```

#### Step 16: Performance Monitoring
**Students create:** `src/lib/analytics.js`

```javascript
export const trackEvent = (eventName, properties = {}) => {
  if (typeof window !== 'undefined') {
    // Simple analytics tracking
    console.log('Event:', eventName, properties)
    
    // In production, integrate with analytics service:
    // gtag('event', eventName, properties)
    // or analytics.track(eventName, properties)
  }
}

export const trackPageView = (page) => {
  if (typeof window !== 'undefined') {
    console.log('Page view:', page)
    
    // In production:
    // gtag('config', 'GA_MEASUREMENT_ID', { page_path: page })
  }
}
```

---

## 🎯 Session Accomplishments

### ✅ What We Built:
- Optimized image loading with Next.js Image component
- Lazy loading for movie sections
- Code splitting and bundle optimization
- Complete SEO setup with metadata and sitemap
- Production-ready deployment on Vercel
- Performance monitoring foundation

### ✅ Technical Skills Learned:
- Image optimization techniques
- Lazy loading and intersection observer
- Bundle analysis and code splitting
- SEO best practices and metadata
- Production deployment strategies
- Performance monitoring basics
- Web vitals optimization

### ✅ Files Created/Modified:
- `src/components/MovieCard.js` - Image optimization
- `src/components/MoviesSection.js` - Lazy loading
- `src/components/LoginModal.js` - Code splitting examples
- `src/app/sitemap.js` - Dynamic sitemap generation
- `src/app/robots.js` - Search engine directives
- `src/app/layout.js` - Enhanced metadata
- `next.config.js` - Production optimizations
- `package.json` - Build and analysis scripts

---

## 📚 Final Project Summary

### 🎉 **Complete Netflix Clone Achievements:**

**Core Features:**
- ✅ Responsive design across all devices
- ✅ Real IMDB API integration with 50+ movies
- ✅ User authentication and session management
- ✅ Personal watchlist and viewing history
- ✅ Search functionality with URL parameters
- ✅ Dynamic routing and navigation
- ✅ Loading states and error handling

**Technical Implementation:**
- ✅ Next.js 15 App Router
- ✅ React 19 with modern hooks
- ✅ Tailwind CSS with custom design system
- ✅ Context API for global state
- ✅ localStorage for data persistence
- ✅ Performance optimizations
- ✅ SEO and accessibility compliance
- ✅ Production deployment

**Learning Outcomes:**
- ✅ Modern React development patterns
- ✅ Next.js full-stack capabilities
- ✅ API integration and data fetching
- ✅ User experience design
- ✅ Performance optimization
- ✅ Production deployment

### 🚀 **Next Steps for Students:**

1. **Enhance Features:**
   - Add user ratings and reviews
   - Implement video player with progress tracking
   - Add social features (share, recommendations)
   - Create admin dashboard for content management

2. **Technical Improvements:**
   - Add real-time features with WebSockets
   - Implement server-side authentication
   - Add database integration
   - Create mobile app with React Native

3. **Portfolio Development:**
   - Document the project on GitHub
   - Create case study with screenshots
   - Add to portfolio website
   - Prepare for technical interviews

**Congratulations!** Students have successfully built a production-ready Netflix clone that demonstrates mastery of modern web development with React, Next.js, and Tailwind CSS.
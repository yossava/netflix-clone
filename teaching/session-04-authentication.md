# Session 4: Authentication & Global State Management
**Duration:** 90 minutes  
**Prerequisites:** Sessions 1-3 completed, understanding of React components and props  
**Objective:** Implement authentication system using React Context API and create login/signup modal

---

## 📋 Session Overview
- **0-10 min:** Review previous session and introduce authentication concepts
- **10-35 min:** Create React Context for authentication state
- **35-65 min:** Build login/signup modal with form handling
- **65-85 min:** Integrate authentication with existing components
- **85-90 min:** Session review and security considerations

---

## 🎯 Learning Outcomes
By the end of this session, students will:
- Understand React Context API for global state management
- Create authentication forms with validation
- Implement modal components with proper UX
- Handle form submission and user feedback
- Integrate authentication state across components

---

## 🛠️ Pre-Session Checklist

### Teacher Preparation:
- [ ] Review React Context API concepts
- [ ] Prepare form validation examples
- [ ] Test modal interactions across browsers
- [ ] Have authentication flow diagrams ready

### Student Requirements:
- [ ] Movie cards and sections from Session 3 working
- [ ] Understanding of React components and props
- [ ] Basic knowledge of forms in HTML

---

## 📚 Session Activities

### Activity 1: Authentication Concepts & Context Setup (25 minutes)

#### Step 1: Review & Authentication Introduction
**Teacher explains authentication concepts:**

1. **What is Authentication?**
   - Verifying user identity
   - Controlling access to features
   - Maintaining user session

2. **Global State Need:**
   - User info needed across many components
   - Avoid prop drilling through multiple levels
   - React Context provides global state solution

3. **Authentication Flow:**
   ```
   User → Login Form → Validate → Set Auth State → Update UI
   ```

#### Step 2: Create Authentication Context
**Students create:** `src/context/AuthContext.js`

```javascript
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

// Create the context
const AuthContext = createContext()

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Check for stored auth data
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('netflix_user');
        const storedWatchlist = localStorage.getItem('netflix_watchlist');
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
        
        if (storedWatchlist) {
          const watchlistData = JSON.parse(storedWatchlist);
          setWatchlist(watchlistData);
        }
      } catch (error) {
        console.error('Error parsing stored data:', error);
        // Clear corrupted data
        localStorage.removeItem('netflix_user');
        localStorage.removeItem('netflix_watchlist');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock login - in real app, this would call an API
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: email,
        avatar: '/avatars/avatar1.png',
        plan: 'Premium'
      };
      
      setUser(mockUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('netflix_user', JSON.stringify(mockUser));
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    setUser(null);
    setWatchlist([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('netflix_user');
      localStorage.removeItem('netflix_watchlist');
    }
  };

  const signup = async (name, email, password) => {
    try {
      // Mock signup
      const mockUser = {
        id: Date.now(),
        name: name,
        email: email,
        avatar: '/avatars/avatar1.png',
        plan: 'Basic'
      };
      
      setUser(mockUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('netflix_user', JSON.stringify(mockUser));
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const addToWatchlist = (movie) => {
    const newWatchlist = [...watchlist, movie];
    setWatchlist(newWatchlist);
    if (typeof window !== 'undefined') {
      localStorage.setItem('netflix_watchlist', JSON.stringify(newWatchlist));
    }
  };

  const removeFromWatchlist = (movieId) => {
    const newWatchlist = watchlist.filter(movie => movie.id !== movieId);
    setWatchlist(newWatchlist);
    if (typeof window !== 'undefined') {
      localStorage.setItem('netflix_watchlist', JSON.stringify(newWatchlist));
    }
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  const value = {
    user,
    loading,
    watchlist,
    login,
    signup,
    logout,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
```

**Teacher explains key concepts:**

1. **'use client' Directive:**
   - Needed for client-side features in Next.js 13+
   - Enables useState, useEffect, localStorage

2. **Context Pattern:**
   - `createContext()` - creates the context
   - `useContext()` - consumes the context
   - Custom hook `useAuth()` - easier to use

3. **State Management:**
   - `user` - user information object
   - `isAuthenticated` - boolean for auth status
   - `isLoading` - for showing loading states

4. **localStorage Integration:**
   - Persists user session across browser sessions
   - JSON.parse/stringify for object storage
   - Error handling for corrupted data

#### Step 3: Wrap App with AuthProvider
**Students update `src/app/layout.js`:**

```javascript
import { AuthProvider } from '@/context/AuthContext'
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
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

**Teacher explains:**
- Provider wraps entire app
- All components can now access auth context
- Context is available everywhere in component tree

### Activity 2: Create Login Modal Component (30 minutes)

#### Step 4: Create LoginModal Component
**Students create:** `src/components/LoginModal.js`

```javascript
'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function LoginModal({ isOpen, onClose }) {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  
  const { login, signup, isLoading } = useAuth()

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) setError('')
  }

  // Handle form submission
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

  // Toggle between login and signup modes
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
    setError('')
    setFormData({ email: '', password: '', confirmPassword: '' })
  }

  // Don't render if modal is not open
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
              />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-netflix-red hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            {isLoading ? 'Loading...' : (isLoginMode ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        {/* Toggle between login/signup */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleMode}
              className="text-netflix-red hover:underline font-semibold"
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

**Teacher explains form concepts:**

1. **Form State Management:**
   - `formData` object holds all form fields
   - `handleChange` updates state on input change
   - Spread operator for immutable updates

2. **Form Validation:**
   - HTML5 validation with `required` attribute
   - Custom validation in submit handler
   - Error state management

3. **Modal Implementation:**
   - Fixed positioning with backdrop
   - Z-index for layering
   - Conditional rendering with `if (!isOpen) return null`

4. **User Experience:**
   - Loading states during async operations
   - Error clearing on input change
   - Toggle between login/signup modes

#### Step 5: Note About Header Component
**The header component already exists and is more advanced than what we'll build in this session. It includes:**
- Mobile responsive navigation
- Search functionality 
- Profile dropdown menu
- Framer Motion animations

**For this session, we'll focus on the authentication integration. The existing header at `src/components/header.js` already includes:**
- User state from AuthContext
- Login/logout functionality
- Profile display when authenticated
- Mobile menu with responsive design

**Key features the current header provides:**
- `const { user, logout } = useAuth()` - Gets auth state
- Conditional rendering based on `user` state
- Profile dropdown with user information
- Mobile-first responsive design
- Search integration (for future sessions)

**Students can examine the current header.js to see advanced patterns like:**
- Mobile menu state management
- Search form handling
- Profile dropdown animations
- Responsive navigation
```

**Teacher explains header updates:**

1. **'use client' Directive:**
   - Needed for useState and useAuth hooks
   - Enables client-side interactivity

2. **Conditional Rendering:**
   - Show different UI based on authentication status
   - User avatar and name when logged in
   - Sign In button when not authenticated

3. **Modal Integration:**
   - Modal state managed in Header component
   - Pass isOpen and onClose props to modal

### Activity 3: Form Handling & User Experience (20 minutes)

#### Step 6: Test Authentication Flow
**Students test the following:**

1. **Open Modal:**
   - Click "Sign In" button in header
   - Modal should appear with overlay

2. **Form Validation:**
   - Try submitting empty form
   - Try invalid email format
   - Try password less than 6 characters

3. **Sign Up Flow:**
   - Switch to Sign Up mode
   - Enter different passwords (should show error)
   - Enter matching passwords (should succeed)

4. **Sign In Flow:**
   - Use same credentials to sign in
   - Should remember user across page refresh

5. **User State:**
   - User avatar should appear in header
   - Sign Out button should work

**Common Issues & Solutions:**
| Issue | Cause | Solution |
|-------|-------|----------|
| Modal doesn't appear | Missing 'use client' directive | Add to header.js |
| Form doesn't submit | Missing onSubmit handler | Check form element |
| User not persisted | localStorage not working | Check browser console for errors |
| Validation not working | Missing required attributes | Check input elements |

#### Step 7: Add Loading States and Better UX
**Students update the submit button in LoginModal:**

```javascript
{/* Submit Button with better loading state */}
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
```

**Teacher explains UX improvements:**
- Loading spinner during async operations
- Disabled state prevents multiple submissions
- Clear feedback about current action

#### Step 8: Add Form Keyboard Navigation
**Students add escape key handler to LoginModal:**

```javascript
// Add useEffect for escape key
import { useState, useEffect } from 'react'

export default function LoginModal({ isOpen, onClose }) {
  // ... existing state

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

  // ... rest of component
}
```

**Teacher explains accessibility features:**
- Keyboard navigation support
- Escape key to close modal
- Event listener cleanup

### Activity 4: Integration & Movie Interactions (20 minutes)

#### Step 9: Add Authentication to Movie Actions
**Students update `src/components/MovieCard.js`:**

```javascript
'use client'

import { useAuth } from '@/context/AuthContext'

export default function MovieCard({ movie, onPlay, onMoreInfo }) {
  const { isAuthenticated } = useAuth()

  const handlePlayClick = (e) => {
    e.stopPropagation()
    
    if (!isAuthenticated) {
      alert('Please sign in to play movies')
      return
    }
    
    onPlay && onPlay(movie)
  }

  const handleMoreInfoClick = (e) => {
    e.stopPropagation()
    onMoreInfo && onMoreInfo(movie)
  }

  return (
    <div className="group relative cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10">
      {/* Movie Poster */}
      <div className="aspect-[2/3] relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300">
        <img 
          src={movie.poster} 
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

**Teacher explains authentication integration:**
- Check auth status before allowing actions
- Provide feedback for unauthenticated users
- Graceful degradation of features

#### Step 10: Update Hero Section Play Button
**Students update `src/components/HeroSection.js`:**

```javascript
'use client'

import { useAuth } from '@/context/AuthContext'
import { featuredMovie } from '@/data/movies'

export default function HeroSection() {
  const { isAuthenticated } = useAuth()

  const handlePlay = () => {
    if (!isAuthenticated) {
      alert('Please sign in to play movies')
      return
    }
    alert(`Playing: ${featuredMovie.title}`)
  }

  const handleMoreInfo = () => {
    alert(`More info for: ${featuredMovie.title}`)
  }

  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${featuredMovie.backgroundImage}')`
        }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            {featuredMovie.title}
          </h1>
          <p className="text-lg md:text-xl mb-4 text-gray-300">
            {featuredMovie.description}
          </p>
          
          {/* Movie Info */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-8 text-sm">
            <span className="bg-netflix-red px-2 py-1 rounded text-xs md:text-sm">
              {featuredMovie.rating}
            </span>
            <span className="text-gray-300">{featuredMovie.year}</span>
            <span className="text-gray-300 hidden sm:inline">{featuredMovie.duration}</span>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {featuredMovie.genres.slice(0, 3).map((genre, index) => (
                <span key={index} className="text-gray-400 text-xs md:text-sm">
                  {genre}
                  {index < Math.min(featuredMovie.genres.length, 3) - 1 ? ' •' : ''}
                </span>
              ))}
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handlePlay}
              className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center group"
            >
              <span className="mr-2 group-hover:scale-110 transition-transform">▶</span>
              Play
            </button>
            <button 
              onClick={handleMoreInfo}
              className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition-all border border-transparent hover:border-white"
            >
              More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Activity 5: Session Review & Security (10 minutes)

#### Step 11: Test Complete Authentication Flow
**Students verify:**

1. **Fresh Page Load:**
   - User state persists after refresh
   - Header shows correct authentication status

2. **Complete Login Flow:**
   - Sign up with new account
   - Sign out
   - Sign in with same credentials

3. **Protected Actions:**
   - Try playing movie without login
   - Sign in and try again

4. **Form Validation:**
   - Various error scenarios work correctly
   - Success scenarios work correctly

#### Step 12: Security Considerations Discussion
**Teacher explains important concepts:**

1. **Client-Side Authentication Limitations:**
   - Not suitable for real production apps
   - Need server-side validation
   - JWT tokens in real applications

2. **Data Storage:**
   - localStorage is not secure for sensitive data
   - Real apps use httpOnly cookies
   - Never store passwords in localStorage

3. **Production Considerations:**
   - HTTPS required for authentication
   - Server-side session management
   - Input sanitization and validation

---

## 🎯 Session Accomplishments

### ✅ What We Built:
- Complete authentication system with React Context
- Login/signup modal with form validation
- Global state management across components
- Protected movie actions requiring authentication
- Persistent user sessions with localStorage

### ✅ Technical Skills Learned:
- React Context API for global state
- Form handling and validation patterns
- Modal implementation with proper UX
- Authentication flow design
- Local storage integration
- Component state management
- Event handling and user feedback

### ✅ Files Created/Modified:
- `src/context/AuthContext.js` - Global authentication state
- `src/components/LoginModal.js` - Authentication modal
- `src/components/header.js` - Authentication integration
- `src/components/MovieCard.js` - Protected actions
- `src/components/HeroSection.js` - Authentication-aware buttons
- `src/app/layout.js` - AuthProvider wrapper

---

## 📚 Homework & Next Session

### Practice Exercises:
1. **Add user profile features**
   - Display user email in header dropdown
   - Add user preferences settings

2. **Enhance form validation**
   - Add email format validation
   - Add password strength indicators
   - Add real-time validation feedback

3. **Improve error handling**
   - Add network error handling
   - Add timeout for login attempts
   - Add success messages

### Next Session Preview:
**Session 5: "API Integration & Data Fetching"**
- Connect to real IMDB API
- Server-side data fetching
- Loading states and error boundaries
- API response caching

### Additional Resources:
- [React Context Documentation](https://react.dev/reference/react/useContext)
- [Form Validation Best Practices](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [Web Authentication Best Practices](https://web.dev/authentication/)

**Session Complete!** Students now have a fully functional authentication system integrated throughout their Netflix clone application.
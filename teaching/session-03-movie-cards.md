# Session 3: Movie Cards & Component Props
**Duration:** 90 minutes  
**Prerequisites:** Sessions 1-2 completed, understanding of React components  
**Objective:** Create sophisticated movie card components using lucide-react icons, Framer Motion animations, and learn about props, hover effects, and component composition

---

## 📋 Session Overview
- **0-10 min:** Review previous session and verify hero section
- **10-35 min:** Create MovieCard component with props and animations
- **35-60 min:** Build MoviesSection with API integration and scrolling
- **60-80 min:** Add advanced hover animations and interactions
- **80-90 min:** Session review and component composition patterns

---

## 🎯 Learning Outcomes
By the end of this session, students will:
- Understand React props and component reusability
- Create sophisticated movie card components with Framer Motion
- Implement horizontal scrolling sections with scroll controls
- Use lucide-react icons for professional UI elements
- Practice component composition patterns and API integration

---

## 🛠️ Pre-Session Checklist

### Teacher Preparation:
- [ ] Verify Session 2 hero section works correctly
- [ ] Ensure framer-motion and lucide-react are installed
- [ ] Review React props concepts
- [ ] Test API integration patterns

### Student Requirements:
- [ ] Hero section from Session 2 completed
- [ ] Understanding of React components and JSX
- [ ] Basic knowledge of CSS hover effects
- [ ] framer-motion and lucide-react installed

---

## 📚 Session Activities

### Activity 1: Session Review & Props Introduction (10 minutes)

#### Step 1: Verify Previous Work & Dependencies
**Students verify dependencies are installed:**
```bash
npm run dev
```

**Check package.json includes:**
```json
{
  "dependencies": {
    "framer-motion": "^12.23.12",
    "lucide-react": "^0.539.0",
    "next": "15.4.5",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  }
}
```

**Teacher explains:**
- framer-motion: For smooth animations and micro-interactions
- lucide-react: For modern, customizable SVG icons
- These are essential for professional Netflix-style components

#### Step 2: React Props Concept Review
**Teacher explains component reusability:**

1. **Props (Properties):**
   - Data passed from parent to child components
   - Makes components reusable with different data
   - Similar to function parameters

2. **Example of Props Usage:**
   ```javascript
   // Parent component
   <MovieCard movie={movieData} size="medium" />
   
   // Child component receives props
   function MovieCard({ movie, size }) {
     return <div>{movie.title}</div>
   }
   ```

### Activity 2: Create Advanced MovieCard Component (25 minutes)

#### Step 3: Create MovieCard Component
**Students create:** `src/components/MovieCard.js`

```javascript
"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Play, Plus, Check, Info } from 'lucide-react';
import Link from 'next/link';

export default function MovieCard({ movie, size = 'medium' }) {
  const { user, addToWatchlist, removeFromWatchlist, isInWatchlist } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  const inWatchlist = user && isInWatchlist(movie.id);

  const handleWatchlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return;
    
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const sizeClasses = {
    small: 'aspect-[2/3] w-32',
    medium: 'aspect-[2/3] w-48',
    large: 'aspect-[2/3] w-64'
  };

  return (
    <motion.div 
      className={`relative group cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:z-10 ${sizeClasses[size]}`}
      onHoverStart={() => setShowDetails(true)}
      onHoverEnd={() => setShowDetails(false)}
      whileHover={{ scale: 1.05 }}
    >
      <Link href={`/watch/${movie.id}`}>
        <div className="relative h-full">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 20 }}
            className="absolute inset-0 flex flex-col justify-end p-4"
          >
            {/* Title and metadata */}
            <div className="mb-3">
              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                {movie.title}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <span className="bg-gray-700 px-2 py-1 rounded text-xs">{movie.rating}</span>
                <span>{movie.year}</span>
                <div className="flex space-x-1">
                  {movie.genre?.slice(0, 2).map((genre, index) => (
                    <span key={index} className="text-gray-400">
                      {genre}{index < 1 && movie.genre.length > 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Play className="w-4 h-4 text-black ml-0.5" />
              </motion.button>

              {user && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWatchlistToggle}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                    inWatchlist 
                      ? 'bg-white border-white text-black' 
                      : 'border-gray-400 text-gray-400 hover:border-white hover:text-white'
                  }`}
                >
                  {inWatchlist ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 border-2 border-gray-400 text-gray-400 rounded-full flex items-center justify-center hover:border-white hover:text-white transition-colors"
              >
                <Info className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Quick play button (always visible on hover) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showDetails ? 1 : 0, scale: showDetails ? 1 : 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
```

**Teacher explains key concepts:**

1. **Props Destructuring:**
   - `{ movie, size = 'medium' }` - extracting props with default values
   - Makes components flexible and reusable

2. **Lucide React Icons:**
   - `import { Play, Plus, Check, Info } from 'lucide-react'`
   - Professional, customizable SVG icons
   - Better than using emoji or custom images

3. **Framer Motion:**
   - `motion.div` - animated components
   - `whileHover`, `whileTap` - interaction animations
   - `initial`, `animate` - state-based animations

4. **Conditional Rendering:**
   - `user &&` - only show buttons if user is logged in
   - `inWatchlist ?` - different icons based on state

### Activity 3: Create MoviesSection with API Integration (25 minutes)

#### Step 4: Create API Route for Movies
**Students create:** `src/app/api/movies/route.js`

```javascript
import { NextResponse } from 'next/server';
import { getMovieCategories, getFeaturedMovie, getAllMovies, getMovieById } from '@/data/movies';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');

    // Get specific movie by ID
    if (id) {
      const movie = await getMovieById(parseInt(id));
      
      if (!movie) {
        return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
      }
      
      return NextResponse.json(movie);
    }

    // Get movies by category
    if (category) {
      const categories = await getMovieCategories();
      const categoryData = categories.find(cat => 
        cat.title.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
      );
      
      if (!categoryData) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
      
      return NextResponse.json(categoryData);
    }

    // Return all categories with featured movie
    const [featured, categories] = await Promise.all([
      getFeaturedMovie(),
      getMovieCategories()
    ]);

    return NextResponse.json({
      featured,
      categories
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

#### Step 5: Create MoviesSection Component
**Students create:** `src/components/MoviesSection.js`

```javascript
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
```

**Teacher explains advanced concepts:**

1. **API Integration:**
   - `fetch('/api/movies')` - calling our own API route
   - Error handling with try-catch
   - Loading states for better UX

2. **Scroll Controls:**
   - Dynamic scroll button visibility
   - Smooth scrolling with JavaScript
   - State management for scroll position

3. **Component Composition:**
   - `MovieRow` component inside `MoviesSection`
   - Each row manages its own scroll state
   - Reusable patterns

### Activity 4: Integrate Components & Test (20 minutes)

#### Step 6: Update Home Page
**Students update:** `src/app/page.js`

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

#### Step 7: Test Complete Integration
**Students should see:**
- Hero section at the top
- Multiple movie categories below
- Horizontal scrolling movie rows
- Sophisticated hover effects with animations
- Scroll controls that appear on hover
- Loading skeleton while data fetches

**Common Issues & Solutions:**
| Issue | Cause | Solution |
|-------|-------|----------|
| Icons not showing | Missing lucide-react import | Check import statement |
| Animations not working | Missing framer-motion | Verify package.json dependencies |
| API errors | Movie data structure | Check browser console for errors |
| Cards not hovering | CSS conflicts | Verify Tailwind classes |

### Activity 5: Add Error Handling & Polish (10 minutes)

#### Step 8: Add Error Boundary to MoviesSection
**Students add error handling to MoviesSection:**

```javascript
// Add to fetchMovies function
const fetchMovies = async () => {
  try {
    const response = await fetch('/api/movies');
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    setMovieCategories(data.categories || []);
  } catch (error) {
    console.error('Error fetching movies:', error);
    // Set fallback data
    setMovieCategories([
      {
        title: "Featured Movies",
        movies: [
          {
            id: 1,
            title: "Sample Movie",
            image: "https://images.unsplash.com/photo-1489599162322-c04b66231f7d?w=300&h=450&fit=crop",
            year: 2023,
            rating: "PG-13",
            genre: ["Action", "Adventure"]
          }
        ]
      }
    ]);
  } finally {
    setLoading(false);
  }
};
```

#### Step 9: Test Responsive Design
**Students test on different screen sizes:**

```bash
# Open browser dev tools
# Test mobile (375px)
# Test tablet (768px) 
# Test desktop (1200px)
```

**Verify responsive behavior:**
- Movie cards scale appropriately
- Scroll containers work on mobile
- Buttons are touch-friendly
- Text remains readable

---

## 🎯 Session Accomplishments

### ✅ What We Built:
- Sophisticated MovieCard component with Framer Motion animations
- MoviesSection with horizontal scrolling and API integration
- Professional UI using lucide-react icons
- Responsive design that works across devices
- Loading states and error handling
- Scroll controls with smooth animations

### ✅ Technical Skills Learned:
- React props and component composition
- Framer Motion animation patterns
- Lucide React icon integration
- API route creation and consumption
- State management with useState and useEffect
- Event handling and user interactions
- Responsive design with Tailwind CSS

### ✅ Files Created/Modified:
- `src/components/MovieCard.js` - Advanced movie card with animations
- `src/components/MoviesSection.js` - Scrollable movie sections with API
- `src/app/api/movies/route.js` - API route for movie data
- `src/app/page.js` - Updated home page with components

---

## 📚 Homework & Next Session

### Practice Exercises:
1. **Add more card sizes**
   - Create 'xlarge' size option for MovieCard
   - Test different aspect ratios
   - Add size prop validation

2. **Enhance animations**
   - Add exit animations for hover states
   - Create stagger effects for card loading
   - Experiment with different easing functions

3. **Improve scroll controls**
   - Add keyboard navigation (arrow keys)
   - Implement wheel scroll detection
   - Add scroll position indicators

### Next Session Preview:
**Session 4: "Authentication & Global State Management"**
- Create React Context for authentication
- Build login/signup modal components  
- Implement form validation and user feedback
- Add authentication state to existing components

### Additional Resources:
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide React Icons](https://lucide.dev/guide/packages/lucide-react)
- [React Props Guide](https://react.dev/learn/passing-props-to-a-component)

**Session Complete!** Students now have sophisticated, animated movie components that integrate with a real API and provide an excellent foundation for the authentication system in the next session.
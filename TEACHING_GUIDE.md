# Netflix Clone - 90-Minute Teaching Session Guide

## Overview
This guide covers building a Netflix-style homepage using Next.js 15 and Tailwind CSS 4, perfect for a 90-minute coding session.

## Prerequisites
- Basic knowledge of React and JavaScript
- Node.js installed
- Text editor (VS Code recommended)

---

## Session Breakdown (90 minutes)

> **Focus:** This guide emphasizes **React hooks**, **Next.js features**, **state management**, and **interactive patterns** alongside Tailwind CSS styling.

---

### Phase 1: Project Setup & Understanding (15 minutes)

#### 1.1 Project Structure Review (5 minutes)
```
next-course/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js          # Main homepage
│   └── components/
│       ├── Header.js        # Navigation header
│       ├── HeroSection.js   # Main banner
│       ├── MovieSection.js  # Movie grid/carousel
│       ├── MovieCard.js     # Individual movie cards
│       ├── SearchBar.js     # Search component
│       └── LoginModal.js    # Login modal
├── package.json
└── tailwind.config.js
```

#### 1.2 Key Dependencies (5 minutes)
- **Next.js 15**: React framework with App Router
- **Tailwind CSS 4**: Utility-first CSS framework
- **Lucide React**: Icon library for UI elements

#### 1.3 Initial Setup Commands (5 minutes)
```bash
npm install
npm run dev
```

---

### Phase 2: Header Component Development (20 minutes)

#### 2.1 Basic Header Structure (10 minutes)
**File: `src/components/header.js`**

Key concepts to teach:
- **Fixed positioning**: `fixed top-0 w-full z-50`
- **Backdrop blur effect**: `backdrop-blur-md bg-black/90`
- **Responsive navigation**: `hidden md:flex`

```jsx
import SearchBar from './SearchBar';
import { User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-black/90 backdrop-blur-md p-2 fixed top-0 w-full z-50">
      <div className="m-4 flex justify-between items-center space-x-8 text-lg text-white">
        {/* Netflix Logo */}
        <div className="font-bold text-red-600 text-3xl">
          <div>NETFLIX</div>
        </div>
        
        {/* Navigation Menu - Hidden on mobile */}
        <div className="hidden md:flex cursor-pointer space-x-8 text-sm">
          <div className="transition hover:font-bold hover:text-red-500">Home</div>
          <div className="transition hover:font-bold hover:text-red-500">Movies</div>
          <div className="transition hover:font-bold hover:text-red-500">TV Shows</div>
          <div className="transition hover:font-bold hover:text-red-500">My List</div>
        </div>
        
        {/* Search and Login */}
        <div className="flex items-center space-x-4">
          <SearchBar />
          <button className="flex items-center space-x-2 hover:text-red-500 transition">
            <User className="w-5 h-5" />
            <span className="hidden md:block">Login</span>
          </button>
        </div>
      </div>
    </header>
  );
}
```

#### 2.2 Search Bar Component (10 minutes)
**File: `src/components/SearchBar.js`**

Teaching points:
- **Icon integration** with Lucide React
- **Responsive sizing**: `w-[250px] md:w-[300px]`
- **Input styling** with Tailwind

```jsx
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="relative">
      <div className="flex items-center bg-gray-800 rounded-md px-3 py-2 w-[250px] md:w-[300px]">
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search movies, TV shows..."
          className="bg-transparent text-white placeholder-gray-400 outline-none w-full text-sm"
        />
      </div>
    </div>
  );
}
```

---

### Phase 3: Hero Section (20 minutes)

#### 3.1 Hero Banner with Background Image (15 minutes)
**File: `src/components/HeroSection.js`**

Key concepts:
- **Background image overlay** techniques
- **Gradient overlays**: `bg-gradient-to-t`
- **Responsive typography**: `text-3xl md:text-4xl lg:text-5xl`
- **Flexbox button layouts**: `flex-col sm:flex-row`

```jsx
import {Play, UserPlus} from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-red-500">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-center bg-black/80 bg-no-repeat z-10"></div>
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1754079133052-cf62bd71776c')"
        }}
      ></div>

      {/* Content */}
      <div className="relative h-full z-20 flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Welcome to Netflix{" "}
              <span className="text-red-500 block">
                a wonderful streaming platform
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-200 mt-6 md:mt-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 md:mt-8">
              <button className="bg-red-500 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-red-700 transition cursor-pointer text-sm md:text-base">
                <Play className='h-4 w-4 md:h-5 md:w-5 inline mr-2 md:mr-3' />
                Watch Now
              </button>
              
              <button className="bg-gray-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-gray-800 transition cursor-pointer text-sm md:text-base">
                <UserPlus className='h-4 w-4 md:h-5 md:w-5 inline mr-2 md:mr-3' />
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### 3.2 Responsive Design Principles (5 minutes)
- **Mobile-first approach** with Tailwind
- **Breakpoint strategy**: `sm:`, `md:`, `lg:` prefixes
- **Content hierarchy** on different screen sizes

---

### Phase 4: Movie Components (25 minutes)

#### 4.1 Enhanced Movie Card with Hover Effects (15 minutes)
**File: `src/components/MovieCard.js`**

Teaching concepts:
- **CSS transforms**: `hover:scale-105`, `group-hover:scale-110`
- **Gradient overlays**: `bg-gradient-to-t`
- **Complex hover states** with group utilities
- **Animation timing**: `transition-all duration-300`

```jsx
import { Play, Plus } from 'lucide-react';

export default function MovieCard({
  title = "N/A",
  duration = "",
  description = "",
  image = "",
  vote_average = "",
}) {
  return (
    <div className="aspect-[2/3] rounded-md overflow-hidden relative text-white group transition-all duration-300 hover:scale-105 cursor-pointer">
      {/* Hover Overlay */}
      <div className="opacity-0 bg-gradient-to-t from-black via-black/50 to-transparent absolute inset-0 z-10 group-hover:opacity-100 transition-all duration-300"></div>
      
      {/* Content that appears on hover */}
      <div className="opacity-0 absolute z-20 bottom-0 left-0 right-0 p-4 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-bold text-sm leading-tight">{title}</h2>
          <span className="bg-red-500 px-2 py-1 text-xs rounded font-semibold ml-2 flex-shrink-0">
            {vote_average}
          </span>
        </div>
        
        <p className="text-gray-300 text-xs mb-2">{duration}</p>
        <p className="text-gray-400 text-xs leading-tight">{description.substring(0, 80)}...</p>
        
        {/* Action Buttons */}
        <div className="flex space-x-2 mt-3">
          <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition">
            <Play className="w-4 h-4" />
          </button>
          <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Movie Poster */}
      <img 
        src={image} 
        alt={title}
        className="z-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" 
      />
    </div>
  );
}
```

#### 4.2 Horizontal Scrolling Movie Section (10 minutes)
**File: `src/components/MovieSection.js`**

Key teaching points:
- **Horizontal scrolling**: `overflow-x-scroll`
- **Hide scrollbars**: `scrollbar-hide` class
- **Fixed item widths**: `min-w-[150px] max-w-[150px]`
- **Data slicing** for performance: `movies.slice(0, 10)`

```jsx
export default function MovieSection() {
  // ... movies data array ...
  
  return (
    <div className="relative">
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4 pb-4">
        {movies.slice(0, 10).map((m) => (
          <div key={m.id} className="min-w-[150px] max-w-[150px] md:min-w-[200px] md:max-w-[200px]">
            <MovieCard 
              title={m.title} 
              duration={m.duration} 
              description={m.description} 
              image={m.image} 
              vote_average={m.vote_average} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### Phase 5: React State Management & Interactivity (30 minutes)

#### 5.1 Interactive Movie Section with State Management (15 minutes)
**File: `src/components/InteractiveMovieSection.js`**

This component demonstrates essential React concepts: **hooks**, **state management**, **event handling**, and **localStorage** integration.

**Key React/Next.js Concepts:**
- **useState Hook**: Managing component state (favorites, currentIndex, loading)
- **useEffect Hook**: Side effects (localStorage, cleanup, timers)  
- **Event Handlers**: User interactions (onClick, navigation)
- **Conditional Rendering**: Loading states and dynamic content
- **Client-Side Storage**: localStorage for persistence
- **Next.js Client Components**: `'use client'` directive

```jsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function InteractiveMovieSection({ title = "Interactive Section", movies = [] }) {
  // State management with useState Hook
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  
  // Simulate loading state (useEffect for side effects)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Cleanup function - important React pattern
    return () => clearTimeout(timer);
  }, []);

  // Client-side storage with useEffect
  useEffect(() => {
    if (typeof window !== 'undefined') { // Next.js SSR safety check
      const savedFavorites = localStorage.getItem('netflix-favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('netflix-favorites', JSON.stringify(favorites));
    }
  }, [favorites]); // Dependency array - runs when favorites change

  // Event handlers for user interactions
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 5 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= movies.length - 5 ? 0 : prev + 1));
  };

  // State update with functional updates
  const toggleFavorite = (movieId) => {
    setFavorites(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)  // Remove favorite
        : [...prev, movieId]                 // Add favorite (spread operator)
    );
  };

  // Conditional rendering for loading state
  if (isLoading) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">{title}</h2>
        <div className="flex space-x-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="min-w-[150px] md:min-w-[200px] aspect-[2/3] bg-gray-800 rounded-md animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12 relative group">
      {/* Dynamic content based on state */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
        {title} 
        <span className="ml-2 text-sm bg-red-600 px-2 py-1 rounded">
          {favorites.length} favorites
        </span>
      </h2>
      
      {/* Interactive carousel with state-driven transforms */}
      <div className="relative">
        <button 
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="overflow-hidden">
          <div 
            className="flex space-x-4 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (200 + 16)}px)` }}
          >
            {movies.map((movie) => (
              <div key={movie.id} className="min-w-[150px] max-w-[150px] md:min-w-[200px] md:max-w-[200px] relative">
                <MovieCard {...movie} />
                
                {/* Interactive favorite button with dynamic styling */}
                <button
                  onClick={() => toggleFavorite(movie.id)}
                  className={`absolute top-2 right-2 z-20 p-2 rounded-full transition-colors duration-300 ${
                    favorites.includes(movie.id) 
                      ? 'bg-red-600 text-white' 
                      : 'bg-black/50 text-gray-300 hover:bg-red-600 hover:text-white'
                  }`}
                >
                  ♥
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### 5.2 Advanced Search Component with useMemo (15 minutes)
**File: `src/components/SearchableMovieGrid.js`**

This component showcases **performance optimization**, **derived state**, **debouncing**, and **complex filtering**.

**Key React/Next.js Concepts:**
- **useMemo Hook**: Performance optimization for expensive calculations
- **Custom Hooks Pattern**: Debounced search implementation
- **Derived State**: Computed values from existing state
- **Array Methods**: filter, map, sort, reduce for data manipulation
- **Form Handling**: Controlled inputs and event handling
- **Conditional Rendering**: Empty states and dynamic layouts

```jsx
'use client';

import { useState, useEffect, useMemo } from 'react';

export default function SearchableMovieGrid({ movies = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [isGridView, setIsGridView] = useState(true);

  // useMemo for performance - only recalculate when movies change
  const genres = useMemo(() => {
    const allGenres = movies.flatMap(movie => movie.genre || []);
    return ['all', ...new Set(allGenres)]; // Remove duplicates with Set
  }, [movies]);

  // Complex derived state with useMemo
  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (movie.description && movie.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesGenre = selectedGenre === 'all' || 
                          (movie.genre && movie.genre.includes(selectedGenre));
      return matchesSearch && matchesGenre;
    });

    // Sorting with multiple criteria
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'year':
          return (b.year || 0) - (a.year || 0);
        case 'rating':
          return (b.vote_average || 0) - (a.vote_average || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [movies, searchTerm, selectedGenre, sortBy]);

  // Debounced search - custom hook pattern
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Complex event handlers
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('all');
    setSortBy('title');
  };

  return (
    <div className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Dynamic results count */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Search & Filter Movies
          <span className="text-sm font-normal text-gray-400 ml-4">
            ({filteredAndSortedMovies.length} results)
          </span>
        </h2>

        {/* Form handling with controlled inputs */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative md:col-span-2">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Conditional rendering for empty states */}
        {filteredAndSortedMovies.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search terms or filters</p>
            <button
              onClick={clearFilters}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          // Dynamic layout based on view state
          <div className={
            isGridView 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
              : "space-y-4"
          }>
            {filteredAndSortedMovies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

### Phase 6: Homepage Layout & Static Sections (15 minutes)

#### 5.1 Multiple Movie Categories (8 minutes)
Now we'll add several movie sections to create a Netflix-style browsing experience with categories like "Trending Now", "Action Movies", "Popular on Netflix", "New Releases", and "Netflix Originals".
**File: `src/app/page.js`**

```jsx
export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <div className="pt-20"> {/* Account for fixed header */}
        <HeroSection/>
      </div>
      
      <div className="bg-black min-h-screen">
        <div className="px-4 md:px-8 py-8 md:py-12">
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Trending Now</h2>
            <MovieSection />
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Action Movies</h2>
            <MovieSection />
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Popular on Netflix</h2>
            <MovieSection />
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">New Releases</h2>
            <MovieSection />
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Netflix Originals</h2>
            <MovieSection />
          </section>
        </div>
        
        <FeaturedSection />
      </div>
      
      <GenreSection />
      <Footer />
      <LoginModal isOpen={false}/>
    </div>
  );
}
```

#### 5.2 Featured Section Component (7 minutes)
**File: `src/components/FeaturedSection.js`**

This creates a different layout style - a grid-based featured content section that showcases TV series with more detailed information.

Key teaching concepts:
- **CSS Grid layouts**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Aspect ratios**: `aspect-video` for 16:9 video thumbnails
- **Text truncation**: `line-clamp-3` utility
- **Complex hover effects**: Multiple layered animations
- **Content hierarchy**: Better information architecture

```jsx
import { Play, Info } from 'lucide-react';

export default function FeaturedSection() {
  const featuredMovies = [
    {
      id: 1,
      title: "Stranger Things",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      image: "https://images.unsplash.com/photo-1489599904-e83695e04816?q=80&w=2070",
      genre: ["Sci-Fi", "Horror", "Drama"],
      year: 2024,
      rating: "TV-14"
    },
    // ... more movies
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 px-4 md:px-8">Featured Series</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8">
        {featuredMovies.map((movie) => (
          <div key={movie.id} className="group relative bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300">
            <div className="aspect-video relative">
              <img 
                src={movie.image} 
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition">
                  <Play className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                <span className="text-xs bg-red-600 px-2 py-1 rounded text-white">{movie.rating}</span>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-gray-400 text-sm">{movie.year}</span>
                <span className="text-gray-600">•</span>
                <div className="flex space-x-1">
                  {movie.genre.slice(0, 2).map((g, i) => (
                    <span key={i} className="text-gray-400 text-sm">{g}{i < 1 ? ',' : ''}</span>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                {movie.description}
              </p>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-white text-black py-2 px-4 rounded font-semibold hover:bg-gray-200 transition flex items-center justify-center">
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </button>
                <button className="bg-gray-700 text-white py-2 px-4 rounded font-semibold hover:bg-gray-600 transition flex items-center justify-center">
                  <Info className="w-4 h-4 mr-2" />
                  Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### 5.3 Genre Browse Section (5 minutes)
**File: `src/components/GenreSection.js`**

This section creates a grid-based genre browser that showcases different movie categories.

Key teaching concepts:
- **Responsive grid systems**: `grid-cols-2 md:grid-cols-4`
- **Aspect ratio control**: `aspect-[3/4]` for portrait cards
- **Hover border effects**: Dynamic border styling
- **Image optimization**: Proper sizing and cropping
- **Background gradients**: Different background styling

```jsx
export default function GenreSection() {
  const genres = [
    { name: "Action", image: "https://images.unsplash.com/photo-1489599904-e83695e04816", count: "250+ Movies" },
    { name: "Comedy", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96", count: "180+ Movies" },
    // ... more genres
  ];

  return (
    <div className="py-16 px-4 md:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
          Browse by Genre
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          {genres.map((genre, index) => (
            <div 
              key={index} 
              className="group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img 
                src={genre.image} 
                alt={genre.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg md:text-xl mb-1 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                  {genre.name}
                </h3>
                <p className="text-gray-300 text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {genre.count}
                </p>
              </div>
              
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500 rounded-lg transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

#### 5.4 Footer Component (5 minutes)
**File: `src/components/Footer.js`**

A comprehensive footer with social links, navigation, and company information.

Key teaching concepts:
- **Multi-column layouts**: Responsive grid for footer links
- **Icon integration**: Social media icons from Lucide
- **Link hover states**: Consistent interaction patterns
- **Content organization**: Logical grouping of footer content
- **Semantic HTML**: Proper footer structure

```jsx
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Social Media Icons */}
        <div className="flex space-x-6 mb-8">
          <a href="#" className="hover:text-white transition-colors duration-300">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300">
            <Youtube className="w-6 h-6" />
          </a>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors duration-300">About Netflix</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Investor Relations</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Jobs</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">News</a></li>
            </ul>
          </div>
          
          {/* More columns... */}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-sm">
            © 2024 Netflix Clone. All rights reserved. Built with Next.js and Tailwind CSS.
          </p>
          <p className="text-sm mt-2">
            This is a learning project for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

#### 5.5 Custom Scrollbar Hiding
**File: `src/app/globals.css`**

```css
.scrollbar-hide {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;     /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;             /* Safari and Chrome */
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## Key Learning Outcomes

### 1. **React Hooks & State Management** ⭐
- **useState**: Managing component state (loading, favorites, search)
- **useEffect**: Side effects, cleanup, localStorage integration
- **useMemo**: Performance optimization for expensive calculations
- **Custom Hooks**: Debounced search patterns
- **State Updates**: Functional updates and immutable patterns

### 2. **Next.js 15 Architecture** ⭐  
- **App Router**: File-based routing system
- **Client Components**: `'use client'` directive usage
- **SSR Safety**: `typeof window` checks for client-side code
- **Component Organization**: Modular architecture patterns
- **Performance**: Code splitting and optimization strategies

### 3. **Interactive Patterns** ⭐
- **Event Handling**: onClick, onChange, form submissions
- **Controlled Inputs**: Form state management
- **Conditional Rendering**: Dynamic UI based on state
- **Data Persistence**: localStorage integration
- **Loading States**: User feedback during async operations

### 4. **Data Manipulation & Performance**
- **Array Methods**: filter, map, sort, reduce for data processing
- **Search & Filtering**: Real-time data filtering
- **Debouncing**: Performance optimization for user input
- **Derived State**: Computing values from existing state
- **Memory Optimization**: useMemo for expensive operations

### 5. **Modern JavaScript Patterns**
- **Destructuring**: Props and array destructuring
- **Spread Operator**: Immutable state updates
- **Template Literals**: Dynamic string generation
- **Optional Chaining**: Safe property access
- **Array.from()**: Creating arrays from iterables

### 6. **Tailwind CSS Integration**
- **Responsive Design**: Mobile-first approach with breakpoints
- **Dynamic Classes**: Conditional styling with JavaScript
- **Hover States**: Complex interactions using group utilities  
- **Animations**: Smooth transitions and transforms
- **Component Styling**: Reusable style patterns

---

## Homework & Extensions

### Beginner Level
1. **Add more movie categories** with different data sets
2. **Implement basic routing** between pages
3. **Add a footer component** with links and information

### Intermediate Level
1. **State Management**: Add movie favorites functionality
2. **Search Implementation**: Make the search bar functional
3. **Modal System**: Create a working login modal
4. **API Integration**: Connect to a movie database API

### Advanced Level
1. **User Authentication**: Implement login/logout functionality
2. **Movie Details Page**: Create individual movie pages
3. **Video Player**: Add video playback capabilities
4. **Performance Optimization**: Implement lazy loading and virtualization

---

## Common Issues & Solutions

### 1. **Fixed Header Overlapping Content**
**Problem**: Header covers page content
**Solution**: Add `pt-20` (or appropriate padding-top) to main content

### 2. **Horizontal Scroll Not Working**
**Problem**: Movie cards not scrolling horizontally
**Solution**: Ensure fixed widths with `min-w-[]` and `max-w-[]`

### 3. **Hover Effects Not Smooth**
**Problem**: Choppy transitions
**Solution**: Use `transition-all duration-300` for smooth animations

### 4. **Images Not Loading**
**Problem**: Movie posters don't display
**Solution**: Check image URLs and add proper error handling

### 5. **Responsive Issues**
**Problem**: Layout breaks on mobile
**Solution**: Use Tailwind's responsive prefixes (`md:`, `lg:`, etc.)

---

## Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **Lucide React Icons**: https://lucide.dev/guide/packages/lucide-react
- **Netflix UI Inspiration**: Study real Netflix interface for design patterns

---

## Session Wrap-up (5 minutes)

### Quick Review
1. **Component Architecture**: How we structured reusable components
2. **Styling Strategy**: Tailwind's utility-first approach
3. **Responsive Design**: Mobile-first development
4. **Interactive Elements**: Hover effects and transitions

### Next Steps
- **Deploy to Vercel** for live demo
- **Add more interactive features** 
- **Explore Next.js advanced features** like middleware and API routes
- **Consider backend integration** for dynamic content

---

*Total Duration: 90 minutes*
*Difficulty Level: Beginner to Intermediate*
*Technologies: Next.js 15, Tailwind CSS 4, React, Lucide React*
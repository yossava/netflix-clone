# Netflix Clone - Complete Tutorial Curriculum

A comprehensive, step-by-step guide to building a Netflix clone using **React**, **Next.js 15**, and **Tailwind CSS**. This curriculum is designed to teach modern web development through hands-on project building.

## 📚 Course Overview

**Duration**: 8-10 weeks (40-50 hours total)  
**Skill Level**: Intermediate (some JavaScript/React knowledge helpful)  
**Technologies**: React 19, Next.js 15, Tailwind CSS, API Integration

## 🎯 Learning Objectives

By the end of this course, students will:
- Master Next.js 15 App Router and Server Components
- Build responsive UIs with Tailwind CSS
- Implement authentication and state management
- Integrate external APIs and handle data
- Deploy a production-ready web application

---

## 📖 Module 1: Project Setup & Foundation (Week 1)

### Lesson 1.1: Environment Setup
**Duration**: 2 hours  
**Files Created**: Initial project structure

**Learning Goals:**
- Set up development environment
- Understanding modern web development tools
- Next.js project structure

**Activities:**
```bash
# Create Next.js project
npx create-next-app@latest netflix-clone

# Install dependencies
npm install framer-motion lucide-react
```

**Files to Create:**
- `package.json` - Dependencies and scripts
- `jsconfig.json` - Path aliases configuration
- `tailwind.config.js` - Tailwind customization

**Key Concepts:**
- NPM package management
- Development vs production environments
- Project configuration files

### Lesson 1.2: Tailwind CSS Setup & Design System
**Duration**: 2 hours  
**Files**: `tailwind.config.js`, global styles

**Learning Goals:**
- Utility-first CSS methodology
- Creating a design system
- Responsive design principles

**Activities:**
- Configure custom colors (Netflix red: `#E50914`)
- Set up spacing and typography scales
- Create responsive breakpoints

**Practice:**
Create a simple card component using only Tailwind classes

---

## 📖 Module 2: Core Layout & Navigation (Week 1-2)

### Lesson 2.1: App Router & Layouts
**Duration**: 3 hours  
**Files Created**: `src/app/layout.js`, `src/app/page.js`

**Learning Goals:**
- Next.js 15 App Router fundamentals
- Layout patterns and composition
- Server vs Client components

**Code Example:**
```javascript
// src/app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

**Key Concepts:**
- File-based routing
- Layout composition
- Metadata handling for SEO

### Lesson 2.2: Header Component & Navigation
**Duration**: 3 hours  
**Files Created**: `src/components/header.js`

**Learning Goals:**
- Component-driven development
- Responsive navigation patterns
- Conditional rendering

**Features to Implement:**
- Logo and brand identity
- Navigation menu with hover effects
- Mobile hamburger menu
- User authentication status display
- Search functionality

**Practice:**
Build a responsive header that works on mobile, tablet, and desktop

### Lesson 2.3: Footer Component
**Duration**: 1 hour  
**Files Created**: `src/components/Footer.js`

**Learning Goals:**
- Grid layouts with Tailwind
- Link organization and structure
- Accessibility considerations

---

## 📖 Module 3: Hero Section & Movie Display (Week 2)

### Lesson 3.1: Hero Section Component
**Duration**: 4 hours  
**Files Created**: `src/components/HeroSection.js`

**Learning Goals:**
- Creating impactful landing sections
- Background images and overlays
- Call-to-action button design

**Features to Build:**
- Background movie poster/video
- Movie title and description overlay
- Play and "More Info" buttons
- Responsive design for all screen sizes

**Code Pattern:**
```javascript
// Hero section with background and overlay
<div className="relative h-screen bg-cover bg-center" 
     style={{backgroundImage: `url(${movie.backdrop})`}}>
  <div className="absolute inset-0 bg-black bg-opacity-40">
    {/* Content overlay */}
  </div>
</div>
```

### Lesson 3.2: Movie Card Component
**Duration**: 3 hours  
**Files Created**: `src/components/MovieCard.js`

**Learning Goals:**
- Reusable component design
- Hover effects and animations
- Image optimization

**Features to Implement:**
- Movie poster display
- Hover scale animation
- Movie metadata (title, year, rating)
- Add to watchlist functionality
- Loading states

**Practice:**
Create hover animations using Tailwind CSS transforms

### Lesson 3.3: Movies Section Component
**Duration**: 3 hours  
**Files Created**: `src/components/MoviesSection.js`

**Learning Goals:**
- Horizontal scrolling patterns
- Collection display
- Performance optimization

**Features to Build:**
- Horizontal scrollable movie rows
- Section titles and categories
- Scroll indicators
- Lazy loading implementation

---

## 📖 Module 4: State Management & Authentication (Week 3)

### Lesson 4.1: React Context Setup
**Duration**: 3 hours  
**Files Created**: `src/context/AuthContext.js`

**Learning Goals:**
- Global state management
- React Context API patterns
- Authentication state handling

**Implementation:**
```javascript
// AuthContext.js
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Authentication logic
  const login = async (credentials) => {
    // Handle login
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Lesson 4.2: Login Modal Component
**Duration**: 4 hours  
**Files Created**: `src/components/LoginModal.js`

**Learning Goals:**
- Modal design patterns
- Form handling and validation
- User experience best practices

**Features to Implement:**
- Modal overlay and backdrop
- Login/signup form toggle
- Form validation
- Error handling and display
- Loading states during authentication

### Lesson 4.3: Local Storage Integration
**Duration**: 2 hours  
**Enhancement**: User data persistence

**Learning Goals:**
- Client-side data persistence
- Browser APIs integration
- SSR considerations with Next.js

**Implementation Focus:**
- Persist authentication state
- Save user preferences
- Handle server-side rendering limitations

---

## 📖 Module 5: Data Layer & API Integration (Week 4)

### Lesson 5.1: API Service Layer
**Duration**: 4 hours  
**Files Created**: `src/lib/movieApi.js`

**Learning Goals:**
- API integration patterns
- Error handling strategies
- Data transformation

**Implementation:**
```javascript
class MovieApiService {
  async fetchFromIMDB(endpoint, params = {}) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
  }

  formatMovie(movie) {
    // Transform API data to app format
    return {
      id: movie.id,
      title: movie.primaryTitle,
      // ... more formatting
    };
  }
}
```

### Lesson 5.2: Data Layer Implementation
**Duration**: 3 hours  
**Files Created**: `src/data/movies.js`

**Learning Goals:**
- Data abstraction patterns
- Async operations handling
- Fallback data strategies

**Features to Build:**
- Movie categories organization
- Search functionality
- Featured movie selection
- Error handling with fallbacks

### Lesson 5.3: IMDB API Integration
**Duration**: 3 hours  
**Enhancement**: Real movie data integration

**Learning Goals:**
- External API integration
- Data mapping and formatting
- Performance optimization

**Practice:**
Implement real movie data fetching with proper error boundaries

---

## 📖 Module 6: Pages & Routing (Week 5)

### Lesson 6.1: Home Page Implementation
**Duration**: 3 hours  
**Files Enhanced**: `src/app/page.js`

**Learning Goals:**
- Page composition patterns
- Server-side data fetching
- Component integration

**Features to Build:**
- Hero section integration
- Multiple movie category rows
- Loading states and error boundaries

### Lesson 6.2: Browse & Category Pages
**Duration**: 4 hours  
**Files Created**: `src/app/browse/page.js`, `src/app/movies/page.js`, `src/app/tv-shows/page.js`

**Learning Goals:**
- Filtering and categorization
- Grid layouts
- Search integration

**Features to Implement:**
- Movie grid with filtering
- Category-specific layouts
- Pagination or infinite scroll

### Lesson 6.3: Dynamic Movie Pages
**Duration**: 3 hours  
**Files Created**: `src/app/watch/[id]/page.js`

**Learning Goals:**
- Dynamic routing in Next.js
- URL parameter handling
- Individual content pages

**Implementation Focus:**
- Movie detail display
- Video player integration (mock)
- Related movies suggestions
- Breadcrumb navigation

---

## 📖 Module 7: Search & User Features (Week 6)

### Lesson 7.1: Search Page Implementation
**Duration**: 4 hours  
**Files Created**: `src/app/search/page.js`

**Learning Goals:**
- Search UI patterns
- URL search parameters
- Real-time search implementation

**Features to Build:**
- Search input with suggestions
- Filter options (genre, year, rating)
- Search results display
- Empty state handling

### Lesson 7.2: Watchlist Functionality
**Duration**: 3 hours  
**Files Created**: `src/app/my-list/page.js`

**Learning Goals:**
- User preference management
- CRUD operations
- Local storage integration

**Implementation:**
- Add/remove from watchlist
- Watchlist persistence
- User-specific content display

### Lesson 7.3: User Profile Page
**Duration**: 2 hours  
**Files Created**: `src/app/profile/page.js`

**Learning Goals:**
- User account management
- Form handling
- Settings management

---

## 📖 Module 8: API Routes & Backend (Week 7)

### Lesson 8.1: Authentication API
**Duration**: 3 hours  
**Files Created**: `src/app/api/auth/route.js`

**Learning Goals:**
- Next.js API routes
- HTTP methods handling
- Authentication logic

**Implementation:**
```javascript
// API route for authentication
export async function POST(request) {
  const { email, password } = await request.json();
  
  // Authentication logic
  const user = authenticateUser(email, password);
  
  return NextResponse.json({ user });
}
```

### Lesson 8.2: Movies API Routes
**Duration**: 3 hours  
**Files Created**: `src/app/api/movies/route.js`, `src/app/api/search/route.js`

**Learning Goals:**
- RESTful API design
- Data processing
- Error handling in APIs

### Lesson 8.3: SEO & Metadata
**Duration**: 2 hours  
**Files Enhanced**: `src/app/sitemap.js`, `src/app/robots.js`

**Learning Goals:**
- SEO best practices
- Metadata generation
- Search engine optimization

---

## 📖 Module 9: Advanced Features & Polish (Week 8)

### Lesson 9.1: Animations with Framer Motion
**Duration**: 4 hours  
**Enhancement**: Add animations throughout

**Learning Goals:**
- Animation libraries integration
- Performance considerations
- User experience enhancement

**Features to Add:**
- Page transitions
- Hover animations
- Loading animations
- Scroll-triggered animations

### Lesson 9.2: Admin Dashboard
**Duration**: 4 hours  
**Files Created**: `src/app/admin/page.js`

**Learning Goals:**
- Role-based access control
- Data management interfaces
- Administrative features

### Lesson 9.3: Error Boundaries & Loading States
**Duration**: 2 hours  
**Enhancement**: Comprehensive error handling

**Learning Goals:**
- Error boundary implementation
- Loading state patterns
- User feedback mechanisms

---

## 📖 Module 10: Production & Deployment (Week 8)

### Lesson 10.1: Performance Optimization
**Duration**: 3 hours  
**Enhancement**: Performance improvements

**Topics Covered:**
- Image optimization
- Code splitting
- Bundle analysis
- Caching strategies

### Lesson 10.2: Testing & Quality Assurance
**Duration**: 2 hours  
**Enhancement**: Quality improvements

**Implementation:**
- ESLint configuration
- Code formatting
- Manual testing procedures

### Lesson 10.3: Deployment
**Duration**: 2 hours  
**Goal**: Live application deployment

**Platforms Covered:**
- Vercel deployment
- Environment variables
- Domain configuration

---

## 🎓 Assessment & Projects

### Weekly Checkpoints
- **Week 1**: Basic layout and navigation
- **Week 2**: Movie display components
- **Week 3**: Authentication system
- **Week 4**: API integration
- **Week 5**: Complete page implementations
- **Week 6**: Search and user features
- **Week 7**: Backend API routes
- **Week 8**: Polish and deployment

### Final Project Requirements
Students must demonstrate:
1. Responsive design across all devices
2. Working authentication system
3. Real API data integration
4. Search functionality
5. User watchlist management
6. Professional code organization
7. Deployed live application

## 📋 Prerequisites

**Required Knowledge:**
- Basic JavaScript (ES6+)
- HTML/CSS fundamentals
- Basic React concepts (components, props, state)

**Recommended Experience:**
- Command line basics
- Git version control
- Node.js and NPM

## 🛠️ Development Tools

**Required:**
- Node.js (v18+)
- Code editor (VS Code recommended)
- Web browser with dev tools

**Recommended Extensions:**
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Prettier

## 📚 Additional Resources

**Documentation:**
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

**Practice Exercises:**
- Component styling challenges
- API integration exercises
- Responsive design challenges
- Performance optimization tasks

This curriculum provides a comprehensive path from beginner to advanced Next.js development, using a real-world project that demonstrates industry best practices and modern development patterns.
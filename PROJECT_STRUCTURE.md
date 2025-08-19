# Netflix Clone - Project Structure & File Guide

This document provides a comprehensive overview of the Netflix Clone project structure, explaining what each file does and how it contributes to the application. This project is designed to teach **React**, **Next.js**, and **Tailwind CSS** through building a production-ready streaming platform.

## 📁 Project Overview

```
netflix-clone/
├── src/                    # Source code directory
│   ├── app/               # Next.js App Router pages
│   ├── components/        # Reusable React components
│   ├── context/          # React Context providers
│   ├── data/             # Data layer and API integration
│   └── lib/              # Utility functions and configurations
├── public/               # Static assets
├── .next/                # Next.js build output (auto-generated)
└── Configuration files
```

## 🗂️ Detailed File Structure

### 📂 `/src/app/` - Next.js App Router Pages
*This directory uses Next.js 13+ App Router for file-based routing*

#### Core Pages
- **`layout.js`** - Root layout component
  - Sets up HTML document structure
  - Includes global providers (AuthProvider)
  - Adds Header and Footer components
  - **Concepts**: Next.js layouts, React Context providers, global CSS

- **`page.js`** - Home page (`/`)
  - Landing page with hero section and movie categories
  - Features trending movies and recommendations
  - **Concepts**: Server Components, async data fetching, component composition

#### Feature Pages
- **`browse/page.js`** - Browse page (`/browse`)
  - Complete movie catalog with filtering
  - Grid layout with search functionality
  - **Concepts**: Client components, state management, filtering logic

- **`search/page.js`** - Search page (`/search`)
  - Movie search with query parameters
  - Real-time search results
  - **Concepts**: URL search params, Suspense boundaries, debouncing

- **`my-list/page.js`** - User's watchlist (`/my-list`)
  - Personal movie collection
  - Add/remove functionality
  - **Concepts**: Local storage, CRUD operations, user preferences

- **`profile/page.js`** - User profile (`/profile`)
  - Account management and settings
  - **Concepts**: Forms, user authentication, profile management

- **`watch/[id]/page.js`** - Movie detail page (`/watch/[movieId]`)
  - Individual movie pages with player
  - Dynamic routing with movie ID
  - **Concepts**: Dynamic routes, URL parameters, movie player integration

#### Category Pages
- **`movies/page.js`** - Movies category (`/movies`)
- **`tv-shows/page.js`** - TV Shows category (`/tv-shows`)
- **`new-and-popular/page.js`** - New releases (`/new-and-popular`)
  - **Concepts**: Category filtering, specialized layouts

#### Admin & Special Pages
- **`admin/page.js`** - Admin dashboard (`/admin`)
  - Content management interface
  - **Concepts**: Role-based access, admin interfaces, data management

### 📂 `/src/app/api/` - API Routes
*Next.js API routes for backend functionality*

- **`auth/route.js`** - Authentication API (`/api/auth`)
  - Handles login/logout requests
  - **Concepts**: API routes, authentication, HTTP methods

- **`movies/route.js`** - Movies API (`/api/movies`)
  - Movie data endpoints
  - Category and search functionality
  - **Concepts**: REST API design, data fetching, error handling

- **`search/route.js`** - Search API (`/api/search`)
  - Search functionality endpoint
  - **Concepts**: Query processing, search algorithms

### 📂 `/src/components/` - React Components
*Reusable UI components following component-driven development*

- **`header.js`** - Navigation header
  - Main navigation with responsive design
  - User authentication state
  - Mobile menu functionality
  - **Concepts**: Responsive design, conditional rendering, navigation patterns

- **`HeroSection.js`** - Landing page hero
  - Large featured movie display
  - Call-to-action buttons
  - Background video/image
  - **Concepts**: Hero sections, background media, overlay effects

- **`MovieCard.js`** - Individual movie display
  - Movie poster and metadata
  - Hover effects and interactions
  - Add to watchlist functionality
  - **Concepts**: Card components, hover states, prop drilling

- **`MoviesSection.js`** - Horizontal movie rows
  - Scrollable movie collections
  - Category-based grouping
  - **Concepts**: Horizontal scrolling, collection display, lazy loading

- **`LoginModal.js`** - Authentication modal
  - Login/signup forms
  - Modal overlay functionality
  - Form validation
  - **Concepts**: Modals, form handling, validation, authentication UI

- **`Footer.js`** - Site footer
  - Links and company information
  - Responsive column layout
  - **Concepts**: Footer design, link organization, responsive grids

### 📂 `/src/context/` - React Context
*Global state management using React Context API*

- **`AuthContext.js`** - Authentication state
  - User authentication status
  - Login/logout functionality
  - User profile data
  - **Concepts**: Context API, global state, authentication patterns, local storage

### 📂 `/src/data/` - Data Layer
*Data fetching and business logic*

- **`movies.js`** - Movie data operations
  - Movie categories and collections
  - Data transformation logic
  - API integration wrapper
  - **Concepts**: Data layer architecture, API abstraction, async operations

### 📂 `/src/lib/` - Utilities & Configuration
*Helper functions and shared utilities*

- **`movieApi.js`** - IMDB API integration
  - Real movie data fetching
  - API response formatting
  - Error handling and fallbacks
  - **Concepts**: API integration, data formatting, error boundaries

- **`constants.js`** - Application constants
  - Shared configuration values
  - Genre mappings and categories
  - **Concepts**: Configuration management, constants organization

### 📂 Root Configuration Files

- **`package.json`** - Project dependencies and scripts
  - NPM packages and versions
  - Build and development scripts
  - **Concepts**: Package management, dependency versions, build scripts

- **`jsconfig.json`** - JavaScript configuration
  - Path aliases and imports
  - IDE integration settings
  - **Concepts**: Module resolution, import aliases

- **`.eslintrc.json`** - Code linting rules
  - Code quality and style enforcement
  - **Concepts**: Code standards, automated quality checks

- **`tailwind.config.js`** - Tailwind CSS configuration
  - Custom design system settings
  - Color palette and spacing
  - **Concepts**: Design systems, CSS frameworks, customization

- **`next.config.js`** - Next.js configuration
  - Build optimization settings
  - **Concepts**: Build configuration, performance optimization

## 🎓 Learning Concepts by File

### React Concepts
- **Components**: All `/src/components/` files
- **Hooks**: `AuthContext.js`, `LoginModal.js`, `search/page.js`
- **Props & State**: `MovieCard.js`, `MoviesSection.js`
- **Context API**: `AuthContext.js`, `layout.js`
- **Event Handling**: `header.js`, `LoginModal.js`

### Next.js Concepts
- **App Router**: All `/src/app/` directory structure
- **Server Components**: `page.js`, `layout.js`
- **Client Components**: `"use client"` components
- **Dynamic Routes**: `watch/[id]/page.js`
- **API Routes**: `/src/app/api/` directory
- **Metadata**: SEO implementations in pages

### Tailwind CSS Concepts
- **Utility Classes**: All component files
- **Responsive Design**: `header.js`, `Footer.js`
- **Layout Systems**: Grid and Flexbox usage
- **Animation**: Hover effects in `MovieCard.js`
- **Dark Mode**: Theme implementations

### Advanced Patterns
- **Data Fetching**: Server-side and client-side patterns
- **Error Boundaries**: Error handling throughout
- **Loading States**: Skeleton screens and spinners
- **Authentication**: Complete auth flow
- **API Integration**: Real-world API usage

## 🚀 Key Features Demonstrated

1. **Modern React Patterns**
   - Functional components with hooks
   - Context for global state
   - Component composition

2. **Next.js App Router**
   - File-based routing
   - Server and client components
   - API routes integration

3. **Responsive Design**
   - Mobile-first approach
   - Flexible layouts
   - Adaptive components

4. **Real-world Integration**
   - External API usage
   - Authentication flows
   - Data persistence

5. **Production Practices**
   - Error handling
   - Performance optimization
   - SEO implementation

This project structure provides a comprehensive foundation for learning modern web development with React, Next.js, and Tailwind CSS while building a real-world application.
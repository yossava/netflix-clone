# Netflix Clone - Next.js Tutorial Project

A comprehensive Netflix clone built with Next.js 15, Tailwind CSS, and Framer Motion. This project serves as a complete tutorial for learning modern React development patterns and Next.js features.

## 🚀 Features

### Core Functionality
- **Authentication System**: Login/signup with local storage and session management
- **Movie Browsing**: Browse movies by categories with smooth scrolling
- **Search**: Full-text search with filters and suggestions
- **Watchlist**: Add/remove movies from personal watchlist with persistence
- **Video Player**: Mock video player with controls and full-screen support
- **Real Movie Data**: Integration with IMDB API (imdbapi.dev) with intelligent fallback system
- **Responsive Design**: Mobile-first responsive layout with touch support

### Pages & Components
- **Home Page**: Hero section with featured content and movie rows
- **Browse Page**: Complete catalog with filtering and search
- **Movie Detail Page**: Individual movie pages with trailers and info
- **My List**: Personal watchlist management
- **Search Page**: Advanced search with filtering and suggestions
- **Profile Page**: User account management and preferences
- **Admin Dashboard**: Content and user management (demo)
- **Footer**: Comprehensive site footer with links and information

### Technical Features
- **Next.js 15**: App Router, API Routes, Server Components
- **Tailwind CSS 4**: Modern styling with utility classes
- **Framer Motion**: Smooth animations and transitions
- **SEO Optimized**: Meta tags, sitemap, robots.txt, Open Graph
- **Responsive**: Mobile, tablet, and desktop layouts
- **Performance**: Optimized images, loading states, and lazy loading
- **API Integration**: IMDB API (imdbapi.dev) support with intelligent fallbacks
- **Error Handling**: Comprehensive error boundaries and fallback UI

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API
- **Styling**: Tailwind CSS with custom configurations
- **Development**: ESLint, Next.js dev tools

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd netflix-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Optional: Setup Real Movie Data**
   See `API_SETUP.md` for instructions on integrating the IMDB API (imdbapi.dev)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with default settings

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── browse/            # Browse page
│   ├── movies/            # Movies category page
│   ├── tv-shows/          # TV shows category page
│   ├── search/            # Search page
│   ├── watch/[id]/        # Individual movie pages
│   ├── my-list/           # User watchlist
│   ├── profile/           # User profile
│   └── layout.js          # Root layout
├── components/            # Reusable components
├── context/               # React Context
├── data/                  # Mock data
└── lib/                   # Utilities
```

## 🎯 Learning Objectives

This project covers:
- Next.js App Router and Server Components
- React Hooks and Context API
- Tailwind CSS and responsive design
- Framer Motion animations
- API routes and mock data
- SEO optimization
- Performance best practices

## 🎨 Customization

Edit `src/data/movies.js` to add new content. Modify `tailwind.config.js` for custom themes.

## 🧪 Testing

```bash
npm run lint    # Run linting
npm run build   # Build for production
npm start       # Preview production build
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

Perfect for learning Next.js, React, and building impressive portfolio projects!

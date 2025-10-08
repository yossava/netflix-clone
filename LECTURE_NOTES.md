# Next.js, React & Tailwind CSS - 90 Minute Lecture
## Movie App: Filters, Sorting, and Dynamic Routing

---

## 📚 Session Overview
**Duration:** 90 minutes
**Level:** Intermediate
**Prerequisites:** Basic React knowledge, HTML/CSS fundamentals

### What We'll Build Today
- ✅ Search functionality with real-time filtering
- ✅ Genre filtering system
- ✅ Multiple sorting options (A-Z, Year, Ratings)
- ✅ Dynamic movie details page with routing
- ✅ Responsive design with Tailwind CSS
- ✅ Interactive UI elements with hover effects

---

## 🎯 Learning Objectives
By the end of this session, students will understand:
1. React State Management with `useState` and `useMemo`
2. Event handling and controlled components
3. Array methods (filter, sort, map)
4. Next.js App Router and Dynamic Routes
5. Tailwind CSS utility classes and responsive design
6. Component composition and prop passing

---

## Part 1: React State Management (20 minutes)

### 1.1 Understanding "use client" Directive
```javascript
"use client";
```
**Key Points:**
- Next.js 13+ uses Server Components by default
- `"use client"` tells Next.js this component uses client-side interactivity
- Required when using hooks like `useState`, `useEffect`
- Should be at the top of files that need browser APIs

**When to use:**
- Components with event handlers (onClick, onChange)
- Components using React hooks
- Components that need browser-only APIs

---

### 1.2 Importing React Hooks
```javascript
import { useState, useMemo } from "react";
```

**useState:**
- Creates reactive state variables
- Returns [value, setter function]
- Triggers re-render when state changes

**useMemo:**
- Memoizes computed values
- Prevents unnecessary recalculations
- Takes dependencies array

---

### 1.3 Setting Up State Variables
```javascript
const [selectedGenre, setSelectedGenre] = useState("All");
const [sortBy, setSortBy] = useState("Release Year");
const [searchQuery, setSearchQuery] = useState("");
```

**Discussion Points:**
- Naming convention: `[value, setValue]`
- Initial state values matter for UI
- Each state variable triggers independent re-renders
- State is local to the component

**Best Practices:**
- Use descriptive names
- Keep state minimal
- Don't duplicate derived data in state

---

## Part 2: Performance Optimization with useMemo (15 minutes)

### 2.1 Extracting Unique Genres
```javascript
const allGenres = useMemo(() => {
  const genres = [];
  movies.forEach((movie) => {
    movie.genre.forEach((g) => {
      if (!genres.includes(g)) {
        genres.push(g);
      }
    });
  });
  return genres.sort();
}, [movies]);
```

**Why useMemo here?**
- Expensive operation (nested loops)
- Movies array rarely changes
- Prevents recalculation on every render

**Alternative Approach (without useMemo):**
```javascript
// This would recalculate on EVERY render, even if movies haven't changed
const allGenres = [];
movies.forEach(movie => {
  movie.genre.forEach(g => {
    if (!allGenres.includes(g)) allGenres.push(g);
  });
});
```

**Teaching Note:** Demonstrate the difference in console.time()

---

### 2.2 Filtering and Sorting Logic
```javascript
const filteredAndSortedMovies = useMemo(() => {
  let result = [...movies]; // Create a copy to avoid mutation

  // 1. Filter by search query
  if (searchQuery) {
    result = result.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // 2. Filter by genre
  if (selectedGenre !== "All") {
    result = result.filter((movie) =>
      movie.genre.includes(selectedGenre)
    );
  }

  // 3. Sort movies
  switch (sortBy) {
    case "A-Z":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "Z-A":
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "Ratings":
      result.sort((a, b) => b.vote_average - a.vote_average);
      break;
    case "Release Year":
    default:
      result.sort((a, b) => b.year - a.year);
      break;
  }

  return result;
}, [movies, selectedGenre, sortBy, searchQuery]);
```

**Key Concepts:**

1. **Array Spreading (`[...movies]`):**
   - Creates a shallow copy
   - Prevents mutation of original array
   - Important for React's immutability principle

2. **Filter Method:**
   - Returns new array
   - Keeps elements where callback returns true
   - Non-destructive

3. **String Methods:**
   - `.toLowerCase()` for case-insensitive search
   - `.includes()` for substring matching
   - `.localeCompare()` for proper string sorting

4. **Array.sort():**
   - Mutates the array (why we copied first!)
   - Compare function: negative = a before b
   - Numeric sort: `b - a` for descending

5. **Dependencies Array:**
   - `[movies, selectedGenre, sortBy, searchQuery]`
   - Recalculates when ANY dependency changes
   - Prevents stale closures

---

## Part 3: Building Interactive UI (20 minutes)

### 3.1 Search Input with Icons
```javascript
<div className="relative mt-4 mb-4">
  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
  <input
    type="text"
    placeholder="Search movies..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full bg-gray-900 text-white py-3 pl-12 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
  />
</div>
```

**Tailwind CSS Breakdown:**

| Class | Purpose |
|-------|---------|
| `relative` | Creates positioning context for absolute children |
| `absolute` | Positions icon absolutely within parent |
| `left-4` | 1rem (16px) from left |
| `top-1/2` | 50% from top |
| `transform -translate-y-1/2` | Centers icon vertically |
| `pl-12` | Padding-left to make room for icon |
| `focus:ring-2` | Ring on focus (accessibility!) |
| `focus:outline-none` | Remove default browser outline |
| `transition-all` | Smooth transitions |

**React Concepts:**
- **Controlled Component:** `value={searchQuery}`
- **Event Handler:** `onChange={(e) => setSearchQuery(e.target.value)}`
- **Synthetic Event:** React wraps browser events

---

### 3.2 Select Dropdowns with State
```javascript
<select
  value={selectedGenre}
  onChange={(e) => setSelectedGenre(e.target.value)}
  className="bg-gray-800 py-3 px-5 w-full md:w-auto rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer transition-all hover:bg-gray-700"
>
  <option value="All">All Genres</option>
  {allGenres.map((genre) => (
    <option value={genre} key={genre}>
      {genre}
    </option>
  ))}
</select>
```

**Important Points:**

1. **Controlled Select:**
   - `value` prop makes it controlled
   - Always reflects state
   - Single source of truth

2. **Dynamic Options:**
   - Map over `allGenres` array
   - Each option needs unique `key`
   - `key` helps React track elements

3. **Responsive Design:**
   - `w-full` on mobile
   - `md:w-auto` on medium screens and up
   - Mobile-first approach

---

### 3.3 Conditional Rendering
```javascript
{filteredAndSortedMovies.length > 0 ? (
  filteredAndSortedMovies.map((m) => (
    <div key={m.id} className="w-full">
      <MovieCard {...movieProps} />
    </div>
  ))
) : (
  <div className="col-span-full text-center py-20 text-gray-400">
    <p className="text-2xl">No movies found</p>
    <p className="mt-2">Try adjusting your filters or search query</p>
  </div>
)}
```

**Teaching Points:**
- Ternary operator for conditional rendering
- `col-span-full` spans all grid columns
- Empty state improves UX
- Always provide feedback to user

---

## Part 4: Tailwind CSS Deep Dive (15 minutes)

### 4.1 Responsive Grid System
```javascript
<div className="grid grid-cols-2 gap-3 mt-4 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
```

**Breakpoint System:**
| Breakpoint | Min Width | Columns |
|------------|-----------|---------|
| (default) | 0px | 2 |
| `sm:` | 640px | 3 |
| `md:` | 768px | 4 |
| `lg:` | 1024px | 6 |
| `xl:` | 1280px | - |
| `2xl:` | 1536px | - |

**Mobile-First Philosophy:**
- Start with mobile layout
- Add larger screen styles with prefixes
- Overrides stack upward

---

### 4.2 Hover Effects and Transitions
```javascript
<div className="transform transition-transform duration-300 hover:scale-105">
```

**Animation Breakdown:**
- `transform` - Enables transforms
- `transition-transform` - Only animate transforms (performance!)
- `duration-300` - 300ms animation
- `hover:scale-105` - 105% size on hover

**Performance Tip:**
- Transform and opacity are cheap to animate
- Avoid animating width, height, top, left
- Use `will-change` sparingly

---

### 4.3 Focus States (Accessibility)
```javascript
className="focus:outline-none focus:ring-2 focus:ring-red-600"
```

**Why This Matters:**
- Keyboard navigation users need visual feedback
- `outline-none` removes ugly default
- `ring-2` provides custom focus indicator
- WCAG 2.1 compliance

**Discussion:** Always provide visible focus states!

---

## Part 5: Next.js Dynamic Routing (15 minutes)

### 5.1 File-Based Routing
```
src/app/
├── movies/
│   ├── page.js          (Route: /movies)
│   └── [id]/
│       └── page.js      (Route: /movies/:id)
```

**Key Concepts:**
- Folders define routes
- `page.js` creates route segment
- `[param]` creates dynamic segment
- Brackets = dynamic route parameter

**Comparison with Traditional Routing:**
```javascript
// Traditional (React Router)
<Route path="/movies/:id" element={<MovieDetails />} />

// Next.js - Just create the file!
// File: app/movies/[id]/page.js
```

---

### 5.2 Accessing Route Parameters
```javascript
"use client";
import { useParams, useRouter } from "next/navigation";

export default function MovieDetailsPage() {
  const params = useParams();  // { id: "tt26581740" }
  const router = useRouter();

  // Access the dynamic parameter
  const movieId = params.id;

  // Navigate programmatically
  const goBack = () => router.back();
}
```

**Hooks Explained:**

1. **useParams:**
   - Returns object with route parameters
   - Read-only
   - Updates on route change

2. **useRouter:**
   - Navigation methods
   - `push()`, `back()`, `forward()`
   - `refresh()` for data revalidation

---

### 5.3 Linking Between Pages
```javascript
import Link from "next/link";

<Link href={`/movies/${id}`}>
  <div className="cursor-pointer">
    {/* Movie Card Content */}
  </div>
</Link>
```

**Why Next.js Link?**
- Client-side navigation (no full page reload)
- Prefetches linked pages on hover
- Optimizes performance automatically
- Maintains scroll position

**Comparison:**
```javascript
// ❌ Don't use regular <a> for internal links
<a href={`/movies/${id}`}>Movie</a>

// ✅ Use Next.js Link
<Link href={`/movies/${id}`}>Movie</Link>
```

---

## Part 6: Advanced Component Patterns (5 minutes)

### 6.1 Component with Link Wrapper
```javascript
// MovieCard.js
export default function MovieCard({ id, title, image, vote_average }) {
  return (
    <Link href={`/movies/${id}`}>
      <div className="cursor-pointer hover:scale-105">
        {/* Card content */}
      </div>
    </Link>
  );
}
```

**Props Flow:**
```
Movies Page
    ↓ (passes id, title, etc.)
MovieCard
    ↓ (uses id in Link href)
Movie Details Page
    ↓ (receives id via useParams)
```

---

### 6.2 Gradient Overlays
```javascript
<div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
```

**Gradient Syntax:**
- `bg-gradient-to-t` - Direction (to top)
- `from-black` - Start color
- `via-black/70` - Middle color with opacity
- `to-transparent` - End color

**Use Cases:**
- Text readability over images
- Creating depth
- Focus attention

---

## Practice Exercises (Time permitting)

### Exercise 1: Add Rating Filter
Add a dropdown to filter movies by rating range:
- G (General Audiences)
- PG (Parental Guidance)
- PG-13
- R (Restricted)
- TV-MA

**Hints:**
1. Create new state: `const [selectedRating, setSelectedRating] = useState("All")`
2. Add filter condition in `filteredAndSortedMovies`
3. Create new select dropdown in UI

---

### Exercise 2: Add Year Range Filter
Allow users to filter movies by decade:
- 2020s
- 2010s
- 2000s

**Challenge:** Use `Math.floor(movie.year / 10) * 10` to calculate decade

---

### Exercise 3: Persist Filters in URL
Use Next.js `useSearchParams` to save filters in URL:
- `/movies?genre=Action&sort=A-Z`
- Allows sharing filtered views
- Browser back/forward works

---

## Common Pitfalls & Debugging Tips

### 1. Forgetting "use client"
**Error:** "You're importing a component that needs useState..."
**Solution:** Add `"use client"` at top of file

### 2. Mutating State Directly
```javascript
// ❌ Wrong
movies.sort(...);

// ✅ Correct
const result = [...movies];
result.sort(...);
```

### 3. Missing Keys in Lists
**Error:** "Each child in a list should have a unique key"
**Solution:** Always add `key` prop to mapped elements

### 4. Stale Closures in useMemo
```javascript
// ❌ Missing dependency
useMemo(() => movies.filter(...), []);

// ✅ Include all dependencies
useMemo(() => movies.filter(...), [movies, selectedGenre]);
```

---

## Performance Considerations

### When to Use useMemo?
**Use when:**
- Expensive calculations
- Filtering/sorting large arrays
- Complex object transformations

**Don't use when:**
- Simple operations
- Primitives (strings, numbers)
- Might hurt performance more than help

### Measuring Performance
```javascript
console.time('filter');
const filtered = movies.filter(...);
console.timeEnd('filter');
```

---

## Accessibility Checklist

✅ Focus states on all interactive elements
✅ Semantic HTML (`<select>`, `<input>`)
✅ Alt text on images
✅ Keyboard navigation works
✅ Color contrast meets WCAG standards
✅ Screen reader friendly

---

## Next Steps & Homework

### Immediate Next Steps:
1. ✅ Add loading states (skeleton screens)
2. ✅ Implement "Add to Watchlist" feature
3. ✅ Create user authentication
4. ✅ Connect to real movie API (TMDB, OMDB)

### Homework Assignment:
**Build a TV Shows Page**
- Reuse components where possible
- Add episode count display
- Filter by number of seasons
- Sort by premiere date

### Advanced Challenges:
1. **Debounced Search** - Delay search to reduce renders
2. **Infinite Scroll** - Load more movies on scroll
3. **Local Storage** - Remember user preferences
4. **Dark/Light Mode** - Theme switcher

---

## Resources & Further Reading

### Official Documentation:
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Hooks](https://react.dev/reference/react)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Recommended Tools:
- [Lucide Icons](https://lucide.dev/) - Icon library we used
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - VS Code extension
- [React DevTools](https://react.dev/learn/react-developer-tools)

### Practice Projects:
- E-commerce product filter
- Recipe search app
- Job board with filters
- Real estate listing page

---

## Summary: What We Learned

### React Concepts:
✅ State management with `useState`
✅ Performance optimization with `useMemo`
✅ Controlled components
✅ Event handling
✅ Conditional rendering

### Next.js Features:
✅ Client vs Server Components
✅ Dynamic routing with `[param]`
✅ `useParams` and `useRouter` hooks
✅ `<Link>` component for navigation

### Tailwind CSS:
✅ Responsive design with breakpoints
✅ Hover and focus states
✅ Grid layouts
✅ Custom styling with utility classes

### Best Practices:
✅ Component composition
✅ Props drilling and management
✅ Accessibility considerations
✅ Performance optimization

---

## Q&A Session

Common questions to prepare for:

**Q: When should I use Server vs Client Components?**
A: Default to Server Components. Use Client Components only when you need:
- Event handlers (onClick, onChange)
- React hooks (useState, useEffect)
- Browser-only APIs

**Q: Why not just use CSS instead of Tailwind?**
A: Tailwind provides:
- Consistency across team
- No context switching
- Built-in responsive design
- Smaller bundle size (with purging)

**Q: How do I fetch real data instead of hardcoded movies?**
A: Next.js 13+ Server Components:
```javascript
async function getData() {
  const res = await fetch('https://api.example.com/movies');
  return res.json();
}

export default async function MoviesPage() {
  const movies = await getData();
  // ...
}
```

**Q: What about SEO for dynamic pages?**
A: Use Next.js Metadata API:
```javascript
export async function generateMetadata({ params }) {
  return {
    title: `Movie: ${params.id}`,
    description: '...'
  };
}
```

---

## End of Lecture

**Time Check:** 90 minutes

**Next Session Preview:**
- API Integration with TMDB
- Server-side Data Fetching
- Error Handling & Loading States
- Form Validation
- User Authentication

Thank you! 🎬

---

## Additional Code Snippets for Reference

### Debounced Search Hook
```javascript
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
const debouncedSearch = useDebounce(searchQuery, 500);
```

### Loading Skeleton Component
```javascript
export function MovieSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-700 aspect-[2/3] rounded-lg"></div>
      <div className="mt-2 h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="mt-1 h-3 bg-gray-700 rounded w-1/2"></div>
    </div>
  );
}
```

### Local Storage Hook
```javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
const [favorites, setFavorites] = useLocalStorage('favorites', []);
```

# Hands-On Exercises - Movie App

## 🎯 Exercise Set 1: Filters & Sorting (Beginner)

### Exercise 1.1: Clear All Filters Button
**Objective:** Add a button to reset all filters to their default state

**Requirements:**
- Add a "Clear Filters" button next to the filter dropdowns
- When clicked, reset all filters: genre → "All", sort → "Release Year", search → ""
- Style the button with Tailwind CSS (red background, hover effect)

**Starter Code:**
```javascript
const handleClearFilters = () => {
  // Your code here
};
```

**Hints:**
- Call all three setState functions
- Add button between filters and results counter
- Use lucide-react's `X` icon

**Expected Result:**
```
[Filter] [Dropdown] [Dropdown] [Clear Filters ✕]
```

---

### Exercise 1.2: Year Range Filter
**Objective:** Add a filter for movie release decades

**Requirements:**
- Create a new state variable for decade selection
- Options: "All", "2020s", "2010s", "2000s", "1990s"
- Add filtering logic in `filteredAndSortedMovies`
- Add new dropdown in the filters section

**Starter Code:**
```javascript
const [selectedDecade, setSelectedDecade] = useState("All");

// In filteredAndSortedMovies:
if (selectedDecade !== "All") {
  // Your filtering logic here
}
```

**Hints:**
- Calculate decade: `Math.floor(movie.year / 10) * 10`
- For "2020s", check if decade === 2020
- Add to useMemo dependencies array

---

### Exercise 1.3: Results Counter Enhancement
**Objective:** Show more detailed filtering information

**Current:**
```
Showing 15 of 20 movies
```

**Enhanced:**
```
Showing 15 of 20 movies | Genre: Action | Sort: A-Z
```

**Requirements:**
- Display current filter selections
- Only show active filters (hide if "All")
- Add separator between information

**Example Output:**
```
Showing 8 of 20 movies | Genre: Horror | Year: 2020s | Sort: Ratings
Showing 20 of 20 movies (No filters applied)
```

---

## 🎯 Exercise Set 2: UI Enhancements (Beginner-Intermediate)

### Exercise 2.1: Toggle Filters Visibility
**Objective:** Add ability to show/hide filter section on mobile

**Requirements:**
- Add button "Show Filters" / "Hide Filters"
- Filters hidden by default on mobile (<768px)
- Filters always visible on desktop
- Smooth transition animation

**Starter Code:**
```javascript
const [showFilters, setShowFilters] = useState(false);

<button onClick={() => setShowFilters(!showFilters)}>
  {showFilters ? "Hide" : "Show"} Filters
</button>

<div className={/* Conditional classes based on showFilters */}>
  {/* Filter dropdowns */}
</div>
```

**Hints:**
- Use `hidden md:block` for desktop-always-visible
- Use `transition-all duration-300` for smooth animation
- Use lucide-react's `ChevronDown` and `ChevronUp` icons

---

### Exercise 2.2: Movie Count Badges
**Objective:** Show number of movies in each genre option

**Current:**
```
<option value="Action">Action</option>
```

**Enhanced:**
```
<option value="Action">Action (12)</option>
```

**Requirements:**
- Calculate movie count for each genre
- Display count in parentheses
- Update dynamically when other filters change

**Starter Code:**
```javascript
const getGenreCount = (genre) => {
  // Your code here - count movies that include this genre
};
```

---

### Exercise 2.3: Loading Skeleton
**Objective:** Show skeleton placeholders while "loading"

**Requirements:**
- Create a LoadingSkeleton component
- Display 12 skeletons in grid
- Add animation (pulse effect)
- Add a button to toggle loading state (for demonstration)

**Starter Code:**
```javascript
function MovieSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Your skeleton structure */}
    </div>
  );
}
```

**Tailwind Classes:**
- `animate-pulse` - Pulsing animation
- `bg-gray-700` - Skeleton color
- `aspect-[2/3]` - Match movie card ratio

---

## 🎯 Exercise Set 3: Advanced Features (Intermediate)

### Exercise 3.1: Favorites System
**Objective:** Allow users to favorite movies using localStorage

**Requirements:**
- Add heart icon to MovieCard
- Toggle favorite on click (filled/outlined heart)
- Store favorites in localStorage
- Add "Show Favorites Only" filter
- Persist across page refreshes

**Starter Code:**
```javascript
const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem('favorites');
  return saved ? JSON.parse(saved) : [];
});

const toggleFavorite = (movieId) => {
  // Your code here
};

useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}, [favorites]);
```

**Hints:**
- Use lucide-react's `Heart` icon
- Check if movie is favorite: `favorites.includes(movie.id)`
- Add/remove with spread operator and filter

---

### Exercise 3.2: Debounced Search
**Objective:** Delay search filtering to improve performance

**Why?** Currently, the filter runs on every keystroke. With large datasets, this could be slow.

**Requirements:**
- Implement a debounce hook
- Delay search by 500ms after user stops typing
- Show "Searching..." indicator while typing

**Starter Code:**
```javascript
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

// Usage:
const debouncedSearch = useDebounce(searchQuery, 500);
// Use debouncedSearch instead of searchQuery in filter logic
```

---

### Exercise 3.3: Keyboard Shortcuts
**Objective:** Add keyboard shortcuts for common actions

**Requirements:**
- `/` - Focus search input
- `Escape` - Clear search / close modal
- `Arrow keys` - Navigate movie cards
- Display shortcuts in help modal

**Starter Code:**
```javascript
useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key === '/') {
      e.preventDefault();
      // Focus search input
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

**Hints:**
- Use `useRef` to reference search input
- `inputRef.current.focus()` to focus
- Prevent default browser behavior

---

## 🎯 Exercise Set 4: Movie Details Page (Intermediate-Advanced)

### Exercise 4.1: Real Data Loading
**Objective:** Load actual movie data based on ID from the movies array

**Currently:** Movie details page shows hardcoded data

**Requirements:**
- Extract movie data logic to separate file or hook
- Find movie by ID from params
- Handle case when movie not found (404)
- Show loading state while finding movie

**Starter Code:**
```javascript
// movies-data.js
export const moviesData = [ /* your movies array */ ];

export function getMovieById(id) {
  return moviesData.find(movie => movie.id === id);
}

// In [id]/page.js
import { getMovieById } from '@/data/movies-data';

const movie = getMovieById(params.id);

if (!movie) {
  return <NotFound />;
}
```

---

### Exercise 4.2: Related Movies Section
**Objective:** Show similar movies based on shared genres

**Requirements:**
- Find movies with at least one matching genre
- Exclude current movie
- Limit to 6 movies
- Sort by rating (highest first)

**Starter Code:**
```javascript
const getRelatedMovies = (currentMovie) => {
  return moviesData
    .filter(movie =>
      movie.id !== currentMovie.id &&
      // Check for shared genres
    )
    .slice(0, 6);
};
```

**Hints:**
- Use `Array.some()` to check for shared genres
- `movie.genre.some(g => currentMovie.genre.includes(g))`

---

### Exercise 4.3: Movie Reviews Section
**Objective:** Add a reviews section with form to submit reviews

**Requirements:**
- Display existing reviews (mock data initially)
- Form with rating (1-5 stars) and comment
- Validate form before submission
- Show success message after submit
- Store in localStorage

**Components Needed:**
- ReviewsList component
- ReviewForm component
- StarRating component (interactive)

**Starter Code:**
```javascript
const [reviews, setReviews] = useState([]);

const handleSubmitReview = (review) => {
  const newReview = {
    id: Date.now(),
    rating: review.rating,
    comment: review.comment,
    author: "Anonymous",
    date: new Date().toISOString()
  };
  setReviews([...reviews, newReview]);
};
```

---

## 🎯 Exercise Set 5: Responsive Design (All Levels)

### Exercise 5.1: Mobile Menu for Filters
**Objective:** Create a slide-out drawer for filters on mobile

**Requirements:**
- Hamburger icon to open drawer
- Drawer slides in from left
- Backdrop overlay when open
- Close on backdrop click
- Smooth animations

**CSS Classes to Use:**
```
fixed inset-y-0 left-0 z-50
transform transition-transform duration-300
translate-x-0 (visible)
-translate-x-full (hidden)
```

---

### Exercise 5.2: Card Grid Refinement
**Objective:** Optimize movie card display for different screen sizes

**Current Grid:**
- Mobile: 2 columns
- Small: 3 columns
- Medium: 4 columns
- Large: 6 columns

**Enhanced Requirements:**
- Portrait phone (default): 2 columns
- Landscape phone: 3 columns
- Tablet portrait: 3 columns
- Tablet landscape: 4 columns
- Desktop: 5 columns
- Large desktop: 6 columns

**Hint:** May need custom breakpoints in tailwind.config.js

---

### Exercise 5.3: Touch Gestures
**Objective:** Add swipe gestures for mobile movie details

**Requirements:**
- Swipe left: Next movie
- Swipe right: Previous movie
- Visual feedback during swipe
- Smooth transition between movies

**Research Topics:**
- Touch events: touchstart, touchmove, touchend
- Calculate swipe distance and direction
- Update route with useRouter

---

## 🎯 Exercise Set 6: Performance Optimization (Advanced)

### Exercise 6.1: Virtual Scrolling
**Objective:** Only render visible movies for better performance with large lists

**Why?** With 1000+ movies, rendering all at once is slow

**Requirements:**
- Calculate visible range based on scroll position
- Render only movies in viewport + buffer
- Maintain scroll position
- Smooth scrolling experience

**Libraries to Research:**
- react-window
- react-virtual

---

### Exercise 6.2: Image Optimization
**Objective:** Use Next.js Image component for optimized images

**Requirements:**
- Replace `<img>` with Next.js `<Image>`
- Add proper width, height, and priority props
- Use placeholder while loading
- Lazy load off-screen images

**Starter Code:**
```javascript
import Image from 'next/image';

<Image
  src={movie.image}
  alt={movie.title}
  width={300}
  height={450}
  className="object-cover"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

---

### Exercise 6.3: Code Splitting
**Objective:** Split code to reduce initial bundle size

**Requirements:**
- Lazy load MovieCard component
- Lazy load movie details page
- Show loading fallback
- Measure bundle size before/after

**Starter Code:**
```javascript
import { lazy, Suspense } from 'react';

const MovieCard = lazy(() => import('@/components/MovieCard'));

<Suspense fallback={<MovieSkeleton />}>
  <MovieCard {...props} />
</Suspense>
```

---

## 🎯 Bonus Challenges

### Challenge 1: Multi-Select Filter
Add ability to select multiple genres at once

**UI:** Checkboxes instead of dropdown
**Logic:** Movie must match ALL selected genres (AND logic) or ANY (OR logic)

---

### Challenge 2: URL State Sync
Save filter state in URL query parameters

**Example:** `/movies?genre=Action&sort=A-Z&search=super`
**Benefits:** Shareable links, browser back/forward works

**Hooks:** `useSearchParams`, `usePathname`

---

### Challenge 3: Animation Library Integration
Integrate Framer Motion for advanced animations

**Features:**
- Staggered list animations
- Page transitions
- Gesture animations
- Spring physics

---

### Challenge 4: Dark/Light Mode
Add theme switcher with system preference detection

**Requirements:**
- Toggle between dark and light themes
- Respect system preference
- Persist choice in localStorage
- Smooth transition between themes

---

### Challenge 5: Accessibility Audit
Make the app fully accessible

**Checklist:**
- [ ] Keyboard navigation works everywhere
- [ ] Screen reader friendly
- [ ] Proper ARIA labels
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Form validation messages
- [ ] Skip to main content link

**Tools:**
- Lighthouse audit
- axe DevTools
- Screen reader testing (NVDA/JAWS/VoiceOver)

---

## 📊 Testing Your Solutions

### Manual Testing Checklist

For each feature, test:
- [ ] Desktop view (1920px)
- [ ] Tablet view (768px)
- [ ] Mobile view (375px)
- [ ] Keyboard navigation
- [ ] Browser refresh maintains state
- [ ] Fast typing/clicking doesn't break it
- [ ] Empty states display correctly
- [ ] Error states handled gracefully

---

## 🎓 Grading Rubric (For Self-Assessment)

### Functionality (40%)
- Feature works as described
- Edge cases handled
- No console errors

### Code Quality (30%)
- Clean, readable code
- Proper component structure
- Meaningful variable names
- Comments where needed

### UI/UX (20%)
- Responsive design
- Smooth animations
- Accessible
- Intuitive to use

### Performance (10%)
- No unnecessary re-renders
- Proper use of useMemo
- Efficient algorithms

---

## 📝 Submission Template

When completing exercises, document:

```markdown
## Exercise X.X: [Title]

### Approach
[Explain your approach]

### Challenges
[What was difficult?]

### Solution
```javascript
[Your code]
```

### Testing
[How did you test it?]

### Improvements
[What could be better?]
```

---

## 🚀 Next Steps After Completing Exercises

1. **Refactor:** Review your code and improve it
2. **Test:** Write unit tests with Jest/React Testing Library
3. **Deploy:** Deploy to Vercel or Netlify
4. **Share:** Get feedback from peers
5. **Iterate:** Implement feedback and improve

---

## 💬 Discussion Questions

After completing exercises, consider:

1. **State Management:** When would you move to a global state solution like Context or Zustand?

2. **Data Fetching:** How would you structure this if data came from an API?

3. **Error Handling:** What errors could occur and how would you handle them?

4. **Scalability:** What would you change if there were 10,000 movies?

5. **Testing:** What tests would be most valuable?

---

Good luck with the exercises! Remember:
- Start with the basics
- Build incrementally
- Test often
- Don't hesitate to check documentation
- Learn from mistakes

Happy coding! 🎉

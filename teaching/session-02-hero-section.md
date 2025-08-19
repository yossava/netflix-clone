# Session 2: Hero Section & Background Images
**Duration:** 90 minutes  
**Prerequisites:** Session 1 completed, basic React component knowledge  
**Objective:** Build a compelling hero section with background images and responsive design

---

## 📋 Session Overview
- **0-10 min:** Review previous session and setup verification
- **10-40 min:** Create HeroSection component with background image
- **40-70 min:** Add movie data and dynamic content
- **70-85 min:** Implement responsive design and button interactions
- **85-90 min:** Session review and next preview

---

## 🎯 Learning Outcomes
By the end of this session, students will:
- Create complex layout components with background images
- Understand CSS-in-JS patterns with Tailwind
- Implement responsive design principles
- Work with dynamic data in React components
- Create call-to-action buttons with proper styling

---

## 🛠️ Pre-Session Checklist

### Teacher Preparation:
- [ ] Have high-quality background images ready (Netflix-style)
- [ ] Prepare movie data examples
- [ ] Review CSS positioning concepts
- [ ] Test all code examples beforehand

### Student Requirements:
- [ ] Session 1 completed successfully
- [ ] Development server working
- [ ] Basic understanding of React components

---

## 📚 Session Activities

### Activity 1: Session Review & Setup (10 minutes)

#### Step 1: Verify Previous Work
**Students run:**
```bash
# Make sure project is working
cd netflix-clone
npm run dev
```

**Teacher checks:**
- Header component visible
- Netflix red colors working
- No console errors

#### Step 2: Quick Code Review
**Teacher asks students to locate:**
- `src/components/header.js` 
- Custom Netflix colors in `tailwind.config.js`
- Import statement in `page.js`

**Quick Quiz (2 minutes):**
1. What does `bg-netflix-red` do?
2. How do we import a component?
3. What's the difference between `px-4` and `py-4`?

### Activity 2: Create HeroSection Component (30 minutes)

#### Step 3: Create HeroSection Component File
**Students create:** `src/components/HeroSection.js`

```javascript
export default function HeroSection() {
  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')"
        }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            Stranger Things
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
              <span className="mr-2">▶</span>
              Play
            </button>
            <button className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition-all">
              More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Teacher explains step by step:**

1. **Overall Structure:**
   - `<section>` with `relative` positioning
   - Three layers: background, overlay, content

2. **Background Image:**
   - `absolute inset-0` - covers entire container
   - `bg-cover bg-center` - proper image scaling
   - Inline `style` for dynamic background images

3. **Dark Overlay:**
   - `bg-black bg-opacity-60` - semi-transparent overlay
   - Makes text readable over any background

4. **Content Layer:**
   - `relative z-10` - ensures content appears above overlay
   - `flex items-center h-full` - centers content vertically

#### Step 4: Understanding CSS Positioning
**Teacher demonstrates with browser dev tools:**

1. Show how `relative` container contains `absolute` children
2. Explain `inset-0` (shorthand for top:0, right:0, bottom:0, left:0)
3. Demonstrate `z-index` layering with `z-10`

**Student Exercise (5 minutes):**
- Change `bg-opacity-60` to `bg-opacity-30` and see the difference
- Try different background positions: `bg-top`, `bg-bottom`

#### Step 5: Add HeroSection to Home Page
**Students update `src/app/page.js`:**

```javascript
import Header from '@/components/header'
import HeroSection from '@/components/HeroSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Header />
      <HeroSection />
    </div>
  )
}
```

**Result Check:**
- Students should see a full-screen hero section
- Text should be readable over the background
- Buttons should be visible and styled

### Activity 3: Dynamic Content & Movie Data (30 minutes)

#### Step 6: Create Movie Data Structure
**Students create:** `src/data/movies.js`

```javascript
export const featuredMovie = {
  id: 1,
  title: "Stranger Things",
  description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
  backgroundImage: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
  year: 2016,
  rating: "TV-14",
  duration: "4 Seasons",
  genres: ["Sci-Fi", "Drama", "Thriller"]
}

export const sampleMovies = [
  {
    id: 2,
    title: "The Crown",
    poster: "https://images.unsplash.com/photo-1489599162490-c0d2b961b7b5?w=300&h=450&fit=crop",
    year: 2016,
    rating: 8.7
  },
  {
    id: 3,
    title: "Breaking Bad",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
    year: 2008,
    rating: 9.5
  },
  {
    id: 4,
    title: "The Office",
    poster: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=300&h=450&fit=crop",
    year: 2005,
    rating: 8.8
  }
]
```

**Teacher explains:**
- Separating data from components
- Object structure and properties
- Image URLs from Unsplash for demo purposes

#### Step 7: Make HeroSection Dynamic
**Students update `src/components/HeroSection.js`:**

```javascript
import { featuredMovie } from '@/data/movies'

export default function HeroSection() {
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
          <div className="flex items-center space-x-4 mb-8 text-sm">
            <span className="bg-netflix-red px-2 py-1 rounded">{featuredMovie.rating}</span>
            <span>{featuredMovie.year}</span>
            <span>{featuredMovie.duration}</span>
            <div className="flex space-x-2">
              {featuredMovie.genres.map((genre, index) => (
                <span key={index} className="text-gray-400">
                  {genre}{index < featuredMovie.genres.length - 1 ? ' •' : ''}
                </span>
              ))}
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
              <span className="mr-2">▶</span>
              Play
            </button>
            <button className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition-all">
              More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Teacher explains new concepts:**

1. **Template Literals:**
   - `${featuredMovie.backgroundImage}` for dynamic values
   - Backticks instead of quotes

2. **JSX Expressions:**
   - `{featuredMovie.title}` renders JavaScript values
   - Curly braces for any JavaScript expression

3. **Array Mapping:**
   - `genres.map()` to render lists
   - `key` prop for React list items
   - Conditional rendering with ternary operator

4. **Component Data Flow:**
   - Import data at the top
   - Use data throughout component
   - Keep component pure (no side effects)

#### Step 8: Test Dynamic Content
**Students verify:**
- Movie title appears correctly
- Description shows full text
- Rating badge appears
- Genre list renders with dots between items

**Common Issues:**
- **Missing import:** Error about `featuredMovie` not defined
- **Syntax errors:** Check template literal backticks vs quotes
- **Key warnings:** Each mapped item needs unique `key` prop

### Activity 4: Responsive Design & Interactions (30 minutes)

#### Step 9: Understand Responsive Design
**Teacher demonstrates with browser dev tools:**

1. **Show responsive classes:**
   - `text-4xl md:text-6xl lg:text-7xl`
   - Mobile-first approach
   - Breakpoint system

2. **Tailwind Breakpoints:**
   ```
   sm: 640px
   md: 768px
   lg: 1024px
   xl: 1280px
   2xl: 1536px
   ```

3. **Test responsiveness:**
   - Resize browser window
   - Show how text scales
   - Demonstrate button layout changes

#### Step 10: Add Button Interactions
**Students update button section in HeroSection:**

```javascript
{/* Buttons */}
<div className="flex flex-col sm:flex-row gap-4">
  <button 
    className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center group"
    onClick={() => alert('Play clicked!')}
  >
    <span className="mr-2 group-hover:scale-110 transition-transform">▶</span>
    Play
  </button>
  <button 
    className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition-all border border-transparent hover:border-white"
    onClick={() => alert('More info clicked!')}
  >
    More Info
  </button>
</div>
```

**Teacher explains:**

1. **Event Handlers:**
   - `onClick` prop for button interactions
   - Arrow functions for simple handlers
   - `alert()` for testing (temporary)

2. **Advanced Hover Effects:**
   - `group` class on parent element
   - `group-hover:scale-110` on child element
   - `transition-transform` for smooth animations

3. **Interactive States:**
   - `hover:border-white` for subtle border effects
   - Combining multiple hover states

#### Step 11: Create Responsive Movie Info Layout
**Students update the movie info section:**

```javascript
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
```

**Teacher explains:**

1. **Responsive Utilities:**
   - `hidden sm:inline` - hide on mobile, show on larger screens
   - `flex-wrap` - allows items to wrap on small screens
   - `gap-2 md:gap-4` - responsive spacing

2. **Content Adaptation:**
   - `slice(0, 3)` - limit genres on mobile
   - Responsive text sizes
   - Flexible layouts that adapt to screen size

#### Step 12: Test Mobile Responsiveness
**Teacher guides students through:**

1. **Browser Dev Tools:**
   - Open Chrome DevTools (F12)
   - Click device toggle icon
   - Test different device sizes

2. **Check Points:**
   - Text remains readable on mobile
   - Buttons stack vertically on small screens
   - Content doesn't overflow
   - Touch targets are large enough

**Student Exercise (5 minutes):**
- Test on mobile device or browser DevTools
- Try landscape and portrait orientations
- Verify all text is readable
- Check button interactions work

### Activity 5: Session Wrap-up (15 minutes)

#### Step 13: Code Review & Best Practices
**Teacher reviews with students:**

1. **Component Structure:**
   ```
   - Import statements at top
   - Single responsibility (HeroSection shows hero)
   - Clear, descriptive JSX
   - Proper nesting and indentation
   ```

2. **Styling Patterns:**
   ```
   - Mobile-first responsive design
   - Consistent spacing (gap-4, px-8, etc.)
   - Semantic color usage (netflix-red, gray-300)
   - Hover states for interactivity
   ```

#### Step 14: Common Issues & Solutions
| Issue | Cause | Solution |
|-------|-------|----------|
| Background image not showing | Wrong URL or syntax | Check backticks in template literal |
| Text not readable | Dark background, light text | Adjust overlay opacity |
| Layout broken on mobile | Missing responsive classes | Add md: and sm: prefixes |
| Buttons not working | Missing onClick or syntax error | Check event handler syntax |

#### Step 15: Review Questions
1. **Q:** How do we make text responsive in Tailwind?
   **A:** Use breakpoint prefixes like `text-4xl md:text-6xl`

2. **Q:** What's the purpose of the dark overlay?
   **A:** Makes text readable over background images

3. **Q:** How do we handle click events in React?
   **A:** Use the `onClick` prop with a function

---

## 🎯 Session Accomplishments

### ✅ What We Built:
- Complete hero section with background image
- Dynamic content using movie data
- Responsive design that works on all devices
- Interactive buttons with hover effects
- Professional Netflix-style layout

### ✅ Technical Skills Learned:
- CSS positioning (relative/absolute)
- Background image implementation
- Responsive design patterns
- Event handling in React
- Data separation and import/export
- Advanced Tailwind CSS features

### ✅ Files Created/Modified:
- `src/components/HeroSection.js` - New hero component
- `src/data/movies.js` - Movie data structure
- `src/app/page.js` - Updated to include hero section

---

## 📚 Homework & Next Session

### Practice Exercises:
1. **Experiment with different background images**
   - Try movie posters from different genres
   - Adjust overlay opacity for different images

2. **Modify movie data**
   - Change featured movie to different content
   - Add new properties (director, cast, etc.)

3. **Enhance button interactions**
   - Add more hover effects
   - Try different transition durations

### Next Session Preview:
**Session 3: "Movie Cards & Horizontal Scrolling"**
- Create individual movie card components
- Build horizontal scrolling movie rows
- Implement hover animations
- Learn about component props and reusability

### Resources for Further Learning:
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [React Event Handling](https://react.dev/learn/responding-to-events)
- [CSS Background Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/background)

**Final Check:** Students should have a fully functional hero section that looks professional and works on mobile devices!
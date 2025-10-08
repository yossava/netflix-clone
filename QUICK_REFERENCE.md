# Quick Reference Guide - Movie App

## 🚀 React Hooks Cheat Sheet

### useState
```javascript
const [state, setState] = useState(initialValue);

// Example
const [count, setCount] = useState(0);
setCount(count + 1);           // Update
setCount(prev => prev + 1);    // Update with previous value
```

### useMemo
```javascript
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);

// Only recalculates when a or b changes
```

### useEffect (Not used today, but important)
```javascript
useEffect(() => {
  // Side effect code here
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

---

## 🎨 Tailwind CSS Quick Reference

### Layout
```
flex, grid
flex-col, flex-row
items-center, items-start, items-end
justify-between, justify-center
gap-2, gap-4, gap-6
```

### Sizing
```
w-full, w-1/2, w-auto
h-full, h-screen, h-64
max-w-7xl, max-h-screen
```

### Spacing
```
p-4 (padding all sides)
px-4 (padding left & right)
py-4 (padding top & bottom)
m-4, mx-4, my-4 (margin - same pattern)
```

### Colors
```
bg-gray-900, bg-red-600
text-white, text-gray-400
border-gray-700
```

### Typography
```
text-sm, text-base, text-lg, text-2xl
font-bold, font-semibold
leading-relaxed
```

### Effects
```
rounded, rounded-md, rounded-lg, rounded-full
shadow, shadow-md, shadow-2xl
opacity-50, opacity-100
```

### Responsive Design
```
sm:  - 640px and up
md:  - 768px and up
lg:  - 1024px and up
xl:  - 1280px and up
2xl: - 1536px and up

Example: md:grid-cols-4 lg:grid-cols-6
```

### Interactive States
```
hover:bg-gray-700
focus:ring-2
active:scale-95
disabled:opacity-50
```

### Transitions
```
transition-all
duration-300
ease-in-out
```

---

## 📁 Next.js File Structure

```
src/app/
├── page.js                    → /
├── layout.js                  → Root layout
├── movies/
│   ├── page.js               → /movies
│   └── [id]/
│       └── page.js           → /movies/123
└── about/
    └── page.js               → /about

src/components/
├── Header.js
├── Footer.js
└── MovieCard.js
```

---

## 🔗 Next.js Navigation

### Link Component
```javascript
import Link from "next/link";

<Link href="/movies">Movies</Link>
<Link href={`/movies/${id}`}>Details</Link>
```

### useRouter Hook
```javascript
import { useRouter } from "next/navigation";

const router = useRouter();
router.push('/movies');      // Navigate
router.back();              // Go back
router.forward();           // Go forward
router.refresh();           // Refresh page
```

### useParams Hook
```javascript
import { useParams } from "next/navigation";

const params = useParams();
console.log(params.id);     // Dynamic route parameter
```

---

## 📊 Array Methods

### filter()
```javascript
const adults = users.filter(user => user.age >= 18);
const actionMovies = movies.filter(m => m.genre.includes("Action"));
```

### map()
```javascript
const names = users.map(user => user.name);
const elements = movies.map(m => <MovieCard key={m.id} {...m} />);
```

### sort()
```javascript
// Numbers
numbers.sort((a, b) => a - b);        // Ascending
numbers.sort((a, b) => b - a);        // Descending

// Strings
movies.sort((a, b) => a.title.localeCompare(b.title));

// Objects
movies.sort((a, b) => b.rating - a.rating);
```

### find()
```javascript
const movie = movies.find(m => m.id === "tt123");
```

### reduce()
```javascript
const total = numbers.reduce((sum, num) => sum + num, 0);
```

---

## 🎯 Common Patterns

### Controlled Input
```javascript
const [value, setValue] = useState("");

<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Conditional Rendering
```javascript
{condition && <Component />}
{condition ? <ComponentA /> : <ComponentB />}
{items.length > 0 ? (
  items.map(item => <Item key={item.id} />)
) : (
  <EmptyState />
)}
```

### List Rendering
```javascript
{items.map(item => (
  <div key={item.id}>
    {item.name}
  </div>
))}
```

### Event Handlers
```javascript
// Inline
<button onClick={() => console.log('clicked')}>

// Function
const handleClick = () => {
  console.log('clicked');
};
<button onClick={handleClick}>

// With parameter
<button onClick={() => handleDelete(id)}>
```

---

## 🐛 Common Errors & Solutions

### Error: "You're importing a component that needs useState"
**Solution:** Add `"use client"` at the top of the file

### Error: "Each child in a list should have a unique key"
**Solution:** Add `key` prop to mapped elements
```javascript
{items.map(item => <div key={item.id}>{item.name}</div>)}
```

### Error: "Cannot read property of undefined"
**Solution:** Use optional chaining
```javascript
// Instead of: movie.genre[0]
// Use: movie?.genre?.[0]
```

### Warning: "Cannot update during an existing state transition"
**Solution:** Wrap setState in setTimeout or useEffect

---

## ⚡ Performance Tips

### Do's
✅ Use `useMemo` for expensive calculations
✅ Use `key` prop in lists
✅ Keep components small and focused
✅ Avoid inline object/array creation in JSX
✅ Use Next.js Image component for images

### Don'ts
❌ Don't mutate state directly
❌ Don't use array index as key
❌ Don't create components inside other components
❌ Don't fetch data in render
❌ Don't overuse useMemo (measure first!)

---

## 🎨 CSS Tips

### Centering with Flexbox
```javascript
<div className="flex items-center justify-center h-screen">
  <div>Centered Content</div>
</div>
```

### Responsive Grid
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### Card Hover Effect
```javascript
<div className="transform transition-transform hover:scale-105 hover:shadow-lg">
```

### Truncate Text
```javascript
<p className="truncate">          {/* Single line */}
<p className="line-clamp-2">      {/* 2 lines */}
<p className="line-clamp-3">      {/* 3 lines */}
```

---

## 📝 Code Snippets

### Search Filter
```javascript
const [search, setSearch] = useState("");
const filtered = items.filter(item =>
  item.name.toLowerCase().includes(search.toLowerCase())
);
```

### Multi-Select Filter
```javascript
const [selected, setSelected] = useState([]);
const filtered = items.filter(item =>
  selected.length === 0 || selected.includes(item.category)
);
```

### Sort Toggle
```javascript
const [sortAsc, setSortAsc] = useState(true);
const sorted = [...items].sort((a, b) =>
  sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
);
```

---

## 🔍 Debugging Commands

### Console Methods
```javascript
console.log(variable);
console.table(array);
console.time('label');
// ... code
console.timeEnd('label');
console.count('label');
```

### React DevTools
- Install React DevTools extension
- Inspect component tree
- View props and state
- Profile performance

---

## 🌐 Environment & Commands

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Install Packages
```bash
npm install package-name
npm install -D package-name  # Dev dependency
```

---

## 📚 Further Learning Resources

### Documentation
- [React Docs](https://react.dev)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

### Practice
- [FreeCodeCamp](https://www.freecodecamp.org)
- [React Challenges](https://reactchallenges.live)
- [Frontend Mentor](https://www.frontendmentor.io)

### YouTube Channels
- Web Dev Simplified
- Traversy Media
- Fireship
- The Net Ninja

---

## 💡 Pro Tips

1. **Use TypeScript** - Catch errors before runtime
2. **ESLint & Prettier** - Consistent code style
3. **Git Commits** - Commit often with clear messages
4. **Component Library** - Consider Shadcn/ui or HeadlessUI
5. **State Management** - For larger apps, consider Zustand or Context
6. **API Calls** - Use React Query or SWR for data fetching
7. **Testing** - Learn Jest and React Testing Library
8. **Accessibility** - Use semantic HTML and ARIA labels

---

## 📋 Checklist for New Features

Before adding a new feature:
- [ ] Plan component structure
- [ ] Identify state needed
- [ ] Consider where state should live
- [ ] Think about props flow
- [ ] Design mobile layout first
- [ ] Add loading states
- [ ] Handle errors gracefully
- [ ] Test keyboard navigation
- [ ] Check accessibility
- [ ] Optimize performance

---

## 🎯 Practice Challenges

### Beginner
1. Add a "Clear Filters" button
2. Show/hide filter section
3. Add movie rating display
4. Create a "Back to Top" button

### Intermediate
5. Implement pagination
6. Add favorites with localStorage
7. Create a "Recently Viewed" section
8. Multi-genre filter (select multiple)

### Advanced
9. Infinite scroll loading
10. Keyboard shortcuts (e.g., / for search)
11. Drag and drop to reorder
12. Share filter state via URL params

---

## 🚀 Quick Start Checklist

Starting a new Next.js project:
```bash
npx create-next-app@latest my-app
cd my-app
npm install lucide-react
npm run dev
```

First file to create: `src/app/page.js`
```javascript
"use client";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">Hello World</h1>
    </div>
  );
}
```

---

Good luck with your development journey! 🎉

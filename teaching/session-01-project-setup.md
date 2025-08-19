# Session 1: Project Setup & Next.js Foundation
**Duration:** 90 minutes  
**Prerequisites:** Node.js installed, basic command line knowledge  
**Objective:** Set up a Netflix clone project with Next.js 15 and understand the project structure

---

## 📋 Session Overview
- **0-15 min:** Environment verification and project creation
- **15-45 min:** Project structure exploration and configuration
- **45-75 min:** First component creation and basic styling
- **75-90 min:** Review, troubleshooting, and next session preview

---

## 🎯 Learning Outcomes
By the end of this session, students will:
- Create a new Next.js 15 project from scratch
- Understand the App Router directory structure
- Configure Tailwind CSS for styling
- Create their first React component
- Run the development server

---

## 🛠️ Pre-Session Checklist

### Teacher Preparation:
- [ ] Verify all students have Node.js 18+ installed
- [ ] Prepare code examples and common error solutions
- [ ] Set up screen sharing and ensure code is visible

### Student Requirements:
- [ ] Node.js 18 or higher installed
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/command line access
- [ ] Basic understanding of HTML/CSS

---

## 📚 Session Activities

### Activity 1: Environment Setup (15 minutes)

#### Step 1: Verify Node.js Installation
```bash
# Students run this command
node --version
npm --version
```
**Expected Output:** Node v18+ and npm v8+

**Teacher Notes:**
- If students don't have Node.js, direct them to nodejs.org
- Help troubleshoot any version issues
- Ensure everyone can run npm commands

#### Step 2: Create Next.js Project
```bash
# Students follow along - type each command
npx create-next-app@latest netflix-clone

# When prompted, choose these options:
# ✅ Yes to TypeScript? → NO (we'll use JavaScript)
# ✅ Yes to ESLint? → YES
# ✅ Yes to Tailwind CSS? → YES
# ✅ Yes to `src/` directory? → YES
# ✅ Yes to App Router? → YES
# ✅ No to import alias? → NO (use default)

# After project creation, install additional dependencies needed for the course
cd netflix-clone
npm install framer-motion lucide-react
```

**Teacher Demonstration:**
1. Show the command execution step by step
2. Explain each prompt choice and why we're making it
3. Wait for all students to complete before moving on

#### Step 3: Navigate and Start Development Server
```bash
# Students type:
cd netflix-clone
npm run dev
```

**Expected Result:** Development server starts on http://localhost:3000

**Common Issues & Solutions:**
- **Port 3000 in use:** Next.js will automatically use 3001
- **Permission errors:** Try `sudo npm run dev` (Mac/Linux) or run terminal as administrator (Windows)
- **Module not found:** Delete `node_modules` and run `npm install`

### Activity 2: Project Structure Exploration (30 minutes)

#### Step 4: Understand the File Structure
**Teacher explains while students follow along:**

```
netflix-clone/
├── src/
│   └── app/
│       ├── globals.css      # Global styles
│       ├── layout.js        # Root layout component
│       ├── page.js          # Home page component
│       └── favicon.ico      # Site icon
├── public/                  # Static assets
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
└── next.config.js          # Next.js configuration
```

**Teacher Activity:** Open each file and explain:
- `src/app/page.js` - Home page component
- `src/app/layout.js` - Wrapper for all pages
- `src/app/globals.css` - Global styles
- `package.json` - Project dependencies

#### Step 5: Examine the Default Page
**Students open:** `src/app/page.js`

**Current content explanation:**
```javascript
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Default Next.js content */}
    </main>
  )
}
```

**Teacher explains:**
- This is a React functional component
- Uses Tailwind CSS classes for styling
- `export default` makes it the main export

#### Step 6: Clean Up Default Content
**Students follow along - replace entire content of `src/app/page.js`:**

```javascript
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold text-center py-20">
        Netflix Clone
      </h1>
      <p className="text-center text-gray-400">
        Welcome to our Netflix clone project!
      </p>
    </main>
  )
}
```

**Teacher demonstrates:**
1. Delete all existing content in the file
2. Type the new code line by line
3. Explain each Tailwind class:
   - `min-h-screen` - minimum height of viewport
   - `bg-black` - black background
   - `text-white` - white text
   - `text-4xl` - large text size
   - `font-bold` - bold font weight
   - `text-center` - center-aligned text
   - `py-20` - vertical padding

**Result:** Browser should now show a black page with white text

### Activity 3: Tailwind CSS Configuration (30 minutes)

#### Step 7: Customize Tailwind Config
**Students open:** `tailwind.config.js`

**Add Netflix brand colors:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: '#E50914',
          black: '#141414',
          gray: '#222222',
        }
      },
    },
  },
  plugins: [],
}
```

**Teacher explains:**
- `content` - tells Tailwind which files to scan for classes
- `theme.extend` - adds custom values without removing defaults
- `colors` - custom color palette for our Netflix theme

#### Step 8: Update Page with Custom Colors
**Students update `src/app/page.js`:**

```javascript
export default function Home() {
  return (
    <main className="min-h-screen bg-netflix-black text-white">
      <h1 className="text-4xl font-bold text-center py-20 text-netflix-red">
        Netflix Clone
      </h1>
      <p className="text-center text-gray-400">
        Welcome to our Netflix clone project!
      </p>
      <div className="flex justify-center mt-8">
        <button className="bg-netflix-red hover:bg-red-700 text-white px-8 py-3 rounded font-semibold transition-colors">
          Get Started
        </button>
      </div>
    </main>
  )
}
```

**Teacher demonstrates:**
1. Change background to `bg-netflix-black`
2. Change title color to `text-netflix-red`
3. Add a button with Netflix styling
4. Explain new classes:
   - `flex justify-center` - center button horizontally
   - `mt-8` - margin top
   - `hover:bg-red-700` - color change on hover
   - `px-8 py-3` - horizontal and vertical padding
   - `rounded` - rounded corners
   - `transition-colors` - smooth color transitions

#### Step 9: Test the Changes
**Students should see:**
- Black background (darker than before)
- Red title text
- A red button that changes color on hover

**Troubleshooting:**
- If colors don't appear: restart the dev server with `npm run dev`
- If button doesn't center: check for typos in class names

### Activity 4: Create First Component (15 minutes)

#### Step 10: Create Components Directory
```bash
# Students create directory
mkdir src/components
```

#### Step 11: Create Header Component
**Students create new file:** `src/components/header.js`

```javascript
export default function Header() {
  return (
    <header className="bg-netflix-black p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-netflix-red text-2xl font-bold">
          NETFLIX
        </h1>
        <nav className="space-x-6">
          <a href="#" className="text-white hover:text-gray-300">Home</a>
          <a href="#" className="text-white hover:text-gray-300">Movies</a>
          <a href="#" className="text-white hover:text-gray-300">TV Shows</a>
        </nav>
      </div>
    </header>
  )
}
```

**Teacher explains:**
- Component naming convention (PascalCase)
- JSX syntax and differences from HTML
- Tailwind classes for flexbox layout
- Navigation styling with hover effects

#### Step 12: Use Header in Main Page
**Students update `src/app/page.js`:**

```javascript
import Header from '@/components/header'

export default function Home() {
  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Header />
      <main className="p-8">
        <h1 className="text-4xl font-bold text-center py-20 text-netflix-red">
          Netflix Clone
        </h1>
        <p className="text-center text-gray-400">
          Welcome to our Netflix clone project!
        </p>
        <div className="flex justify-center mt-8">
          <button className="bg-netflix-red hover:bg-red-700 text-white px-8 py-3 rounded font-semibold transition-colors">
            Get Started
          </button>
        </div>
      </main>
    </div>
  )
}
```

**Teacher explains:**
- Import statement with `@/` alias (configured by Next.js)
- Component composition
- Separation of concerns (header vs main content)

---

## 🎯 Session Wrap-up (15 minutes)

### What We Accomplished:
- ✅ Created a new Next.js 15 project
- ✅ Configured Tailwind CSS with custom Netflix colors
- ✅ Built our first React component (Header)
- ✅ Learned basic Tailwind classes and responsive design
- ✅ Understanding of project structure and file organization

### Quick Review Questions:
1. **Teacher asks:** "What does the `@/` symbol mean in our import?"
   **Answer:** It's a path alias that points to the `src/` directory

2. **Teacher asks:** "What Tailwind class makes an element take the full screen height?"
   **Answer:** `min-h-screen`

3. **Teacher asks:** "How do we add hover effects in Tailwind?"
   **Answer:** Use the `hover:` prefix (e.g., `hover:bg-red-700`)

### Common Issues & Solutions:
| Issue | Solution |
|-------|----------|
| Colors not showing | Restart dev server (`Ctrl+C`, then `npm run dev`) |
| Import errors | Check file path and component name spelling |
| Tailwind classes not working | Verify `tailwind.config.js` content array includes your files |

### Homework/Practice:
- Experiment with different Tailwind colors and spacing
- Try adding more navigation items to the Header
- Read Next.js documentation about the App Router

### Next Session Preview:
**Session 2: "Hero Section & Movie Cards"**
- Build a large hero section with background images
- Create movie card components
- Learn about responsive design patterns
- Implement hover animations

---

## 📖 Additional Resources

### For Students:
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [React Component Basics](https://react.dev/learn/your-first-component)

### For Teachers:
- **Timing Flexibility:** If students are struggling, spend more time on basics
- **Advanced Students:** Challenge them to add more styling or components
- **Debugging Tips:** Common terminal commands and error messages to watch for

### Code Checkpoint:
At the end of this session, the project should have:
- A working Next.js development server
- Custom Netflix brand colors
- A header component with navigation
- A styled home page with a button

**File Status:**
- ✅ `src/app/page.js` - Updated with Netflix styling
- ✅ `src/components/header.js` - Created header component
- ✅ `tailwind.config.js` - Added custom colors
- ✅ Development server running without errors
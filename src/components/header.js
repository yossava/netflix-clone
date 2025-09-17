'use client';

import { Menu, Search, User } from 'lucide-react';
import { useState } from 'react';
import SearchBar from './SearchBar';

export default function Header() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="bg-black/90 backdrop-blur-md fixed top-0 w-full z-50">
      <div className="px-4 py-3 flex justify-between items-center text-white">
        {/* Left side - Logo */}
        <div className="font-bold text-red-600 text-2xl md:text-3xl">
          NETFLIX
        </div>

        {/* Center - Desktop Navigation */}
        <div className="hidden lg:flex cursor-pointer space-x-6 text-sm">
          <div className="transition hover:font-bold hover:text-red-500">Home</div>
          <div className="transition hover:font-bold hover:text-red-500">Movies</div>
          <div className="transition hover:font-bold hover:text-red-500">TV Shows</div>
          <div className="transition hover:font-bold hover:text-red-500">My List</div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Desktop Search */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Mobile Search Toggle */}
          <button
            className="md:hidden p-2 hover:text-red-500 transition"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Login Button */}
          <button className="flex items-center space-x-1 hover:text-red-500 transition p-2">
            <User className="w-5 h-5" />
            <span className="hidden sm:block text-sm">Login</span>
          </button>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 hover:text-red-500 transition">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-3 border-t border-gray-800">
          <SearchBar />
        </div>
      )}
    </header>
  );
}

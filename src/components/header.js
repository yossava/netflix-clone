"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, ChevronDown, User, LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Header({ onLoginClick }) {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    setShowMobileMenu(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const NavItems = ({ mobile = false }) => (
    <>
      <Link 
        href="/" 
        className={`text-white hover:text-gray-300 transition-colors ${mobile ? 'block py-2 text-lg' : ''}`}
        onClick={() => mobile && setShowMobileMenu(false)}
      >
        Home
      </Link>
      <Link 
        href="/tv-shows" 
        className={`text-white hover:text-gray-300 transition-colors ${mobile ? 'block py-2 text-lg' : ''}`}
        onClick={() => mobile && setShowMobileMenu(false)}
      >
        TV Shows
      </Link>
      <Link 
        href="/movies" 
        className={`text-white hover:text-gray-300 transition-colors ${mobile ? 'block py-2 text-lg' : ''}`}
        onClick={() => mobile && setShowMobileMenu(false)}
      >
        Movies
      </Link>
      <Link 
        href="/new-and-popular" 
        className={`text-white hover:text-gray-300 transition-colors ${mobile ? 'block py-2 text-lg' : ''}`}
        onClick={() => mobile && setShowMobileMenu(false)}
      >
        New & Popular
      </Link>
      {user && (
        <Link 
          href="/my-list" 
          className={`text-white hover:text-gray-300 transition-colors ${mobile ? 'block py-2 text-lg' : ''}`}
          onClick={() => mobile && setShowMobileMenu(false)}
        >
          My List
        </Link>
      )}
    </>
  );

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-gradient-to-b from-black via-black/50 to-transparent'
      }`}>
        <div className="mx-4 flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="font-bold text-red-600 text-2xl md:text-3xl">
              NETFLIX
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              <NavItems />
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search - Desktop */}
            <div className="hidden md:block relative">
              {showSearch ? (
                <motion.form
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  onSubmit={handleSearch}
                  className="flex items-center"
                >
                  <Search className="w-5 h-5 text-gray-400 absolute left-3" />
                  <input
                    type="text"
                    placeholder="Titles, people, genres"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-black/80 border border-white/20 text-white pl-10 pr-4 py-2 rounded-sm w-64 focus:outline-none focus:border-white/40"
                    autoFocus
                    onBlur={() => setShowSearch(false)}
                  />
                </motion.form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="text-white hover:text-gray-300 transition-colors p-2"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {user ? (
              <>
                {/* Notifications - Desktop only */}
                <button className="hidden md:block text-white hover:text-gray-300 transition-colors p-2">
                  <Bell className="w-5 h-5" />
                </button>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
                  >
                    <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                      <User className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <ChevronDown className="w-3 h-3 md:w-4 md:h-4 hidden md:block" />
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-black/90 border border-gray-700 rounded-md shadow-lg"
                      >
                        <div className="p-4 border-b border-gray-700">
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                            onClick={() => setShowProfileMenu(false)}
                          >
                            Account
                          </Link>
                          <Link
                            href="/my-list"
                            className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                            onClick={() => setShowProfileMenu(false)}
                          >
                            My List
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors flex items-center space-x-2"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 md:px-4 rounded transition-colors text-sm md:text-base"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden text-white hover:text-gray-300 transition-colors p-2"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 z-40 bg-black/95 backdrop-blur-md lg:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-6">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Netflix"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-2 border-t border-gray-700 pt-4">
                <NavItems mobile />
              </div>

              {/* Mobile User Section */}
              {user && (
                <div className="border-t border-gray-700 pt-4 space-y-2">
                  <Link
                    href="/profile"
                    className="block py-2 text-lg text-white hover:text-gray-300 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-lg text-white hover:text-gray-300 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

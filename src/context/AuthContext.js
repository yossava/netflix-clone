"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Check for stored auth data
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('netflix_user');
        const storedWatchlist = localStorage.getItem('netflix_watchlist');
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
        
        if (storedWatchlist) {
          const watchlistData = JSON.parse(storedWatchlist);
          setWatchlist(watchlistData);
        }
      } catch (error) {
        console.error('Error parsing stored data:', error);
        // Clear corrupted data
        localStorage.removeItem('netflix_user');
        localStorage.removeItem('netflix_watchlist');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock login - in real app, this would call an API
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: email,
        avatar: '/avatars/avatar1.png',
        plan: 'Premium'
      };
      
      setUser(mockUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('netflix_user', JSON.stringify(mockUser));
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      // Mock signup
      const mockUser = {
        id: Date.now(),
        name: name,
        email: email,
        avatar: '/avatars/avatar1.png',
        plan: 'Basic'
      };
      
      setUser(mockUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('netflix_user', JSON.stringify(mockUser));
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setWatchlist([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('netflix_user');
      localStorage.removeItem('netflix_watchlist');
    }
  };

  const addToWatchlist = (movie) => {
    const newWatchlist = [...watchlist, movie];
    setWatchlist(newWatchlist);
    if (typeof window !== 'undefined') {
      localStorage.setItem('netflix_watchlist', JSON.stringify(newWatchlist));
    }
  };

  const removeFromWatchlist = (movieId) => {
    const newWatchlist = watchlist.filter(movie => movie.id !== movieId);
    setWatchlist(newWatchlist);
    if (typeof window !== 'undefined') {
      localStorage.setItem('netflix_watchlist', JSON.stringify(newWatchlist));
    }
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  const value = {
    user,
    loading,
    watchlist,
    login,
    signup,
    logout,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
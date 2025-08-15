"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Film, 
  TrendingUp, 
  Plus,
  Edit2,
  Trash2,
  Eye,
  Settings
} from 'lucide-react';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalMovies: 850,
    activeSubscriptions: 1180,
    monthlyRevenue: 48500
  });
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd check if user is admin
    if (!user) {
      router.push('/');
      return;
    }
    
    fetchMovies();
  }, [user, router]);

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies');
      const data = await response.json();
      const allMovies = data.categories.flatMap(cat => cat.movies);
      setMovies(allMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-24 flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl text-white mb-4">Access Denied</h1>
            <p className="text-gray-400 mb-8">Please sign in to access the admin panel.</p>
            <button
              onClick={() => router.push('/')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const StatCard = ({ title, value, icon: Icon, change }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-lg p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p className="text-green-500 text-sm mt-1">+{change}% from last month</p>
          )}
        </div>
        <Icon className="w-8 h-8 text-red-600" />
      </div>
    </motion.div>
  );

  const MovieRow = ({ movie, index }) => (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-gray-800 hover:bg-gray-900/50"
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-12 h-16 object-cover rounded"
          />
          <div>
            <p className="text-white font-medium">{movie.title}</p>
            <p className="text-gray-400 text-sm">{movie.year}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-1">
          {movie.genre?.slice(0, 2).map((genre, idx) => (
            <span key={idx} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
              {genre}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
          {movie.rating}
        </span>
      </td>
      <td className="px-6 py-4 text-green-500">Active</td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          <button className="text-blue-400 hover:text-blue-300">
            <Eye className="w-4 h-4" />
          </button>
          <button className="text-yellow-400 hover:text-yellow-300">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="text-red-400 hover:text-red-300">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </motion.tr>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-20 flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your Netflix clone platform</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-8 mb-8 border-b border-gray-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-600 text-white'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Total Users"
                    value="1,250"
                    icon={Users}
                    change="12"
                  />
                  <StatCard
                    title="Total Movies"
                    value="850"
                    icon={Film}
                    change="8"
                  />
                  <StatCard
                    title="Active Subscriptions"
                    value="1,180"
                    icon={TrendingUp}
                    change="15"
                  />
                  <StatCard
                    title="Monthly Revenue"
                    value="$48.5K"
                    icon={BarChart3}
                    change="22"
                  />
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { action: 'New user registered', user: 'john@example.com', time: '5 minutes ago' },
                      { action: 'Movie added to catalog', item: 'Stranger Things S5', time: '1 hour ago' },
                      { action: 'User upgraded to Premium', user: 'jane@example.com', time: '2 hours ago' },
                      { action: 'Content updated', item: 'The Crown', time: '3 hours ago' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
                        <div>
                          <p className="text-white">{activity.action}</p>
                          <p className="text-gray-400 text-sm">{activity.user || activity.item}</p>
                        </div>
                        <span className="text-gray-500 text-sm">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'movies' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Movie Management</h2>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Movie</span>
                  </button>
                </div>

                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-gray-300 font-medium">Title</th>
                        <th className="px-6 py-3 text-left text-gray-300 font-medium">Genres</th>
                        <th className="px-6 py-3 text-left text-gray-300 font-medium">Rating</th>
                        <th className="px-6 py-3 text-left text-gray-300 font-medium">Status</th>
                        <th className="px-6 py-3 text-left text-gray-300 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movies.slice(0, 10).map((movie, index) => (
                        <MovieRow key={movie.id} movie={movie} index={index} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">User Management</h2>
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <select className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                      <option>All Plans</option>
                      <option>Basic</option>
                      <option>Standard</option>
                      <option>Premium</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-gray-300 font-medium">User</th>
                        <th className="px-6 py-3 text-left text-gray-300 font-medium">Plan</th>
                        <th className="px-6 py-3 text-left text-gray-300 font-medium">Status</th>
                        <th className="px-6 py-3 text-left text-gray-300 font-medium">Joined</th>
                        <th className="px-6 py-3 text-left text-gray-300 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'John Doe', email: 'john@example.com', plan: 'Premium', status: 'Active', joined: '2024-01-15' },
                        { name: 'Jane Smith', email: 'jane@example.com', plan: 'Standard', status: 'Active', joined: '2024-02-20' },
                        { name: 'Bob Johnson', email: 'bob@example.com', plan: 'Basic', status: 'Inactive', joined: '2024-03-10' }
                      ].map((user, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-800 hover:bg-gray-900/50"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-white font-medium">{user.name}</p>
                              <p className="text-gray-400 text-sm">{user.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
                              {user.plan}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              user.status === 'Active' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-300">{user.joined}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-400 hover:text-blue-300">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-yellow-400 hover:text-yellow-300">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button className="text-red-400 hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-4">Platform Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Maintenance Mode</h4>
                        <p className="text-gray-400 text-sm">Put the platform in maintenance mode</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">New Registrations</h4>
                        <p className="text-gray-400 text-sm">Allow new user registrations</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-white text-xl font-semibold mb-4">Content Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Featured Movie Duration (days)
                      </label>
                      <input
                        type="number"
                        defaultValue={7}
                        className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Max Movies per Category
                      </label>
                      <input
                        type="number"
                        defaultValue={20}
                        className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
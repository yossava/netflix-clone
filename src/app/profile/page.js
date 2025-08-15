"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  CreditCard, 
  Bell, 
  Shield, 
  Settings,
  Edit2,
  Save,
  X
} from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-24 flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl text-white mb-4">Please sign in</h1>
            <p className="text-gray-400 mb-8">You need to be logged in to view your profile.</p>
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

  const handleSave = () => {
    // In a real app, this would make an API call to update user data
    console.log('Saving user data:', formData);
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
    });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Account Settings</h1>
            <p className="text-gray-400">Manage your account information and preferences</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-900 rounded-lg p-6 sticky top-32">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                  <p className="text-gray-400">{user.plan} Plan</p>
                </div>

                <nav className="space-y-2">
                  <a href="#profile" className="flex items-center space-x-3 text-white bg-red-600 px-4 py-3 rounded-lg">
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </a>
                  <a href="#notifications" className="flex items-center space-x-3 text-gray-400 hover:text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </a>
                  <a href="#billing" className="flex items-center space-x-3 text-gray-400 hover:text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    <CreditCard className="w-5 h-5" />
                    <span>Billing</span>
                  </a>
                  <a href="#security" className="flex items-center space-x-3 text-gray-400 hover:text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    <Shield className="w-5 h-5" />
                    <span>Security</span>
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Profile Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 rounded-lg p-8"
                id="profile"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-white">Profile Information</h2>
                  {!editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Full Name
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    ) : (
                      <div className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg">
                        {user.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    {editing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    ) : (
                      <div className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg">
                        {user.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Current Plan
                    </label>
                    <div className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg flex items-center justify-between">
                      <span>{user.plan} Plan</span>
                      <button className="text-red-500 hover:text-red-400 text-sm">
                        Change Plan
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Preferences */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-900 rounded-lg p-8"
                id="notifications"
              >
                <h2 className="text-2xl font-semibold text-white mb-6">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {[
                    { id: 'email', label: 'Email notifications', description: 'Get updates about new releases and recommendations' },
                    { id: 'push', label: 'Push notifications', description: 'Receive notifications on your devices' },
                    { id: 'marketing', label: 'Marketing emails', description: 'Promotional content and special offers' },
                  ].map((pref) => (
                    <div key={pref.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h3 className="text-white font-medium">{pref.label}</h3>
                        <p className="text-gray-400 text-sm">{pref.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Account Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900 rounded-lg p-8"
              >
                <h2 className="text-2xl font-semibold text-white mb-6">Account Actions</h2>
                
                <div className="space-y-4">
                  <button className="w-full bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg text-left transition-colors">
                    Download your data
                  </button>
                  <button className="w-full bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg text-left transition-colors">
                    Change password
                  </button>
                  <button
                    onClick={logout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg text-left transition-colors"
                  >
                    Sign out of all devices
                  </button>
                  <button className="w-full bg-red-900 hover:bg-red-800 text-white p-4 rounded-lg text-left transition-colors">
                    Delete account
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
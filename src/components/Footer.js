"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Globe,
  ChevronDown
} from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Help Center', href: '/help' },
        { label: 'Account', href: '/profile' },
        { label: 'Media Center', href: '/media' },
        { label: 'Investor Relations', href: '/investors' },
        { label: 'Jobs', href: '/jobs' },
        { label: 'Ways to Watch', href: '/watch' },
        { label: 'Terms of Use', href: '/terms' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Cookie Preferences', href: '/cookies' },
        { label: 'Corporate Information', href: '/corporate' },
        { label: 'Contact Us', href: '/contact' }
      ]
    },
    {
      title: 'Features',
      links: [
        { label: 'Audio Description', href: '/features/audio' },
        { label: 'Speed Test', href: '/features/speed' },
        { label: 'Legal Notices', href: '/legal' },
        { label: 'Only on Netflix', href: '/originals' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/netflix', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/netflix', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/netflix', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/netflix', label: 'YouTube' }
  ];

  return (
    <footer className="bg-black border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Social Media Links */}
        <div className="mb-8">
          <div className="flex space-x-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footerLinks[0].links.map((link, index) => (
            <div key={link.href}>
              <Link 
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-sm block mb-3"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Language Selector */}
        <div className="mb-8">
          <div className="relative inline-block">
            <button className="flex items-center space-x-2 border border-gray-600 px-4 py-2 rounded text-gray-400 hover:text-white transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm">English</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Service Code */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm">Service Code: FWD-NFLX-01</p>
        </div>

        {/* Copyright and Company Info */}
        <div className="space-y-4 text-gray-400 text-sm">
          <p>© 2024 Netflix Clone, Inc. This is a demo project for educational purposes.</p>
          <p>
            Built with Next.js, Tailwind CSS, and Framer Motion. This is not affiliated with Netflix, Inc.
          </p>
          <div className="flex flex-wrap gap-4 text-xs">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Cookies Policy</span>
            <span>•</span>
            <span>Ad Choices</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-xs">
              <p>Netflix Clone Tutorial Project</p>
              <p>Learn Next.js, React, and modern web development</p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-gray-400">
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                Sitemap
              </Link>
              <Link href="/robots.txt" className="hover:text-white transition-colors">
                Robots
              </Link>
              <Link href="https://github.com" className="hover:text-white transition-colors">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
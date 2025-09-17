import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Social Media Icons */}
        <div className="flex space-x-6 mb-8">
          <a href="#" className="hover:text-white transition-colors duration-300">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300">
            <Youtube className="w-6 h-6" />
          </a>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors duration-300">About Netflix</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Investor Relations</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Jobs</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">News</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Supported Devices</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Accessibility</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Cookie Preferences</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Corporate Information</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Manage Account</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Add Profile</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Gift Cards</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Media Center</a></li>
            </ul>
          </div>
        </div>

        {/* Service Code */}
        <div className="mb-8">
          <button className="border border-gray-600 text-gray-400 px-4 py-2 text-sm hover:border-gray-400 hover:text-white transition-colors duration-300">
            Service Code
          </button>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-sm">
            © 2024 Netflix Clone. All rights reserved. Built with Next.js and Tailwind CSS.
          </p>
          <p className="text-sm mt-2">
            This is a learning project for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
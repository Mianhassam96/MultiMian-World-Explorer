'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    explore: [
      { label: 'All Countries', href: '/' },
      { label: 'Favorites', href: '/favorites' },
      { label: 'Compare', href: '/compare' },
      { label: 'World Map', href: '/map' },
    ],
    resources: [
      { label: 'REST Countries API', href: 'https://restcountries.com', external: true },
      { label: 'World Bank API', href: 'https://data.worldbank.org', external: true },
      { label: 'GitHub Repository', href: 'https://github.com/Mianhassam96/MultiMian-World-Explorer', external: true },
    ],
    social: [
      { label: 'GitHub', href: 'https://github.com/Mianhassam96', external: true, icon: '💻' },
      { label: 'LinkedIn', href: '#', external: true, icon: '💼' },
      { label: 'Twitter', href: '#', external: true, icon: '🐦' },
    ]
  }
  
  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🌍</span>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MultiMian
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">World Explorer</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore detailed information about countries worldwide with real-time GDP data and interactive visualizations.
            </p>
          </div>
          
          {/* Explore Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Explore</h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label} {link.external && '↗'}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Connect</h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-2"
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              <p>© {currentYear} MultiMian World Explorer. All rights reserved.</p>
              <p className="text-xs mt-1">
                Built with ❤️ by <span className="font-semibold text-blue-600 dark:text-blue-400">MultiMian</span>
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          
          {/* Tech Stack Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Powered by Next.js • React • Tailwind CSS • REST Countries API • World Bank API
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

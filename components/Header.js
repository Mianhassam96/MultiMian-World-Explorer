'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const links = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/explore', label: 'Explore', icon: '🔍' },
    { href: '/favorites', label: 'Favorites', icon: '❤️' },
    { href: '/compare', label: 'Compare', icon: '⚖️' },
    { href: '/map', label: 'World Map', icon: '🗺️' },
    { href: '/statistics', label: 'Statistics', icon: '📊' },
    { href: '/about', label: 'About', icon: 'ℹ️' },
  ]
  
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-teal-700 via-blue-700 to-indigo-700 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 shadow-lg">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🌍</span>
              <div>
                <div className="text-2xl font-bold text-white">
                  MultiMian
                </div>
                <div className="text-xs text-teal-200">World Explorer</div>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                  pathname === link.href
                    ? 'bg-teal-600 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <span>{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="lg:hidden mt-4 pb-4 space-y-2"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  pathname === link.href
                    ? 'bg-teal-600 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
            <div className="px-4 pt-2">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}

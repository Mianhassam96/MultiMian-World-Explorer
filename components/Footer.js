'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/compare', label: 'Compare' },
  ]

  const moreLinks = [
    { href: '/map', label: 'World Map' },
    { href: '/statistics', label: 'Statistics' },
    { href: '/about', label: 'About' },
  ]

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🌍</span>
              <div>
                <h3 className="text-xl font-bold text-teal-400">MultiMian</h3>
                <p className="text-sm text-gray-300">World Explorer</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Explore comprehensive information about every country in the world. 
              Discover facts, statistics, and insights about nations worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Mianhassam96"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              >
                <span>💻</span>
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="mailto:mianhassam96@gmail.com"
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              >
                <span>📧</span>
                <span className="text-sm">Email</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-teal-400">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-teal-400">More</h4>
            <ul className="space-y-2">
              {moreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300">
                © {currentYear} <span className="font-bold text-teal-400">MultiMian World Explorer</span>. All rights reserved.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Created by <span className="font-semibold text-teal-400">Mian Hassan</span> | Data powered by REST Countries API
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://restcountries.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
              >
                API Source
              </a>
              <span className="text-gray-600">•</span>
              <Link
                href="/about"
                className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

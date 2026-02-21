'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/compare', label: 'Compare' },
    { href: '/map', label: 'World Map' },
    { href: '/statistics', label: 'Statistics' },
    { href: '/about', label: 'About' },
  ]

  const socialLinks = [
    { href: 'https://github.com/Mianhassam96', icon: '💻', label: 'GitHub' },
    { href: 'mailto:mianhassam96@gmail.com', icon: '📧', label: 'Email' },
  ]

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-green-900 to-blue-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 mb-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-4xl"
              >
                🌍
              </motion.div>
              <div>
                <h3 className="text-2xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  MultiMian
                </h3>
                <p className="text-sm text-gray-300">World Explorer</p>
              </div>
            </motion.div>
            <p className="text-gray-300 mb-4 max-w-md">
              Explore comprehensive information about every country in the world. 
              Discover facts, statistics, and insights about nations worldwide.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="text-sm">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-green-400">Quick Links</h4>
            <ul className="space-y-2">
              {links.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-blue-400">More</h4>
            <ul className="space-y-2">
              {links.slice(4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
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
                © {currentYear} <span className="font-bold text-green-400">MultiMian World Explorer</span>. All rights reserved.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Created by <span className="font-semibold text-blue-400">Mian Hassan</span> | Data powered by REST Countries API
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://restcountries.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-green-400 transition-colors"
              >
                API Source
              </a>
              <span className="text-gray-600">•</span>
              <Link
                href="/about"
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
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

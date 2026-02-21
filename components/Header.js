'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import { motion } from 'framer-motion'

export default function Header() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/compare', label: 'Compare' },
    { href: '/map', label: 'World Map' },
  ]
  
  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌍</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MultiMian
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 transition-colors ${
                  pathname === link.href
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                  />
                )}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useCountryStore } from '@/lib/store'
import CountryCard from '@/components/CountryCard'

export default function FavoritesPage() {
  const { favorites } = useCountryStore()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 dark:from-black dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            ❤️ Favorite Countries
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {favorites.length > 0 
              ? `You have ${favorites.length} favorite ${favorites.length === 1 ? 'country' : 'countries'}`
              : 'No favorites yet. Start exploring and add some!'}
          </p>
        </motion.div>
        
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((country, index) => (
              <CountryCard key={country.cca3} country={country} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🌍</div>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Your favorite countries will appear here
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Countries
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

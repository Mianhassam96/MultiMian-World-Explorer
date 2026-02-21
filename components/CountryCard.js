'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { formatNumber, getRegionColor } from '@/lib/utils'
import { useCountryStore } from '@/lib/store'

export default function CountryCard({ country, index }) {
  const { addFavorite, removeFavorite, isFavorite } = useCountryStore()
  const favorite = isFavorite(country.cca3)
  
  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (favorite) {
      removeFavorite(country.cca3)
    } else {
      addFavorite(country)
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/countries/${country.cca3}`}>
        <div className="glass rounded-xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <button
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-colors z-10"
            >
              {favorite ? '❤️' : '🤍'}
            </button>
          </div>
          
          <div className="p-5">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate">
              {country.name.common}
            </h3>
            
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-between">
                <span>Capital:</span>
                <span className="font-medium">{country.capital?.[0] || 'N/A'}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Population:</span>
                <span className="font-medium">{formatNumber(country.population)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Region:</span>
                <span className={`px-2 py-1 rounded-full text-white text-xs ${getRegionColor(country.region)}`}>
                  {country.region}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

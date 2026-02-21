'use client'

import { useCountryStore } from '@/lib/store'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function RecentlyViewed() {
  const { recentlyViewed } = useCountryStore()
  
  if (recentlyViewed.length === 0) return null
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-12"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Recently Viewed
      </h2>
      
      <div className="flex gap-4 overflow-x-auto pb-4">
        {recentlyViewed.map((country) => (
          <Link
            key={country.cca3}
            href={`/countries/${country.cca3}`}
            className="flex-shrink-0"
          >
            <div className="glass rounded-lg p-3 hover:shadow-lg transition-shadow w-40">
              <div className="relative h-24 mb-2 rounded overflow-hidden">
                <Image
                  src={country.flags.svg}
                  alt={country.name.common}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {country.name.common}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

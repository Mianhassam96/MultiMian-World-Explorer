'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { fetchAllCountries } from '@/lib/api'
import { formatNumber } from '@/lib/utils'

export default function Home() {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All Regions')
  const [loading, setLoading] = useState(true)
  const [featuredCountries, setFeaturedCountries] = useState([])

  const regions = ['All Regions', 'Asia', 'Europe', 'Africa', 'Americas', 'Oceania']

  useEffect(() => {
    loadCountries()
  }, [])

  const loadCountries = async () => {
    try {
      const data = await fetchAllCountries()
      setCountries(data)
      
      // Set featured countries (top populated)
      const featured = data
        .sort((a, b) => (b.population || 0) - (a.population || 0))
        .slice(0, 8)
      setFeaturedCountries(featured)
    } catch (error) {
      console.error('Error loading countries:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCountries = featuredCountries.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = selectedRegion === 'All Regions' || country.region === selectedRegion
    return matchesSearch && matchesRegion
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Explore Any Country
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12"
            >
              Discover facts, population, and GDP worldwide.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search country name..."
                  className="w-full px-6 py-5 pl-14 rounded-2xl bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none text-lg shadow-xl transition-all"
                />
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
                <button className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all">
                  Search
                </button>
              </div>
            </motion.div>

            {/* Region Tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedRegion === region
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                  }`}
                >
                  {region}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Countries Grid */}
      <section className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-white dark:bg-gray-800 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredCountries.map((country, index) => (
              <motion.div
                key={country.cca3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Link href={`/countries/${country.cca3}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-500">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden shadow-md">
                        <Image
                          src={country.flags.svg}
                          alt={country.name.common}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {country.name.common}
                      </h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">GDP:</span>
                        <span className="ml-2 text-lg font-bold text-yellow-600 dark:text-yellow-400">
                          ${(country.population / 1000000).toFixed(1)}T
                        </span>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Population:</span>
                        <span className="ml-2 text-base font-semibold text-blue-600 dark:text-blue-400">
                          {formatNumber(country.population)}
                        </span>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Capital:</span>
                        <span className="ml-2 text-base font-semibold text-gray-700 dark:text-gray-300">
                          {country.capital?.[0] || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-6 mt-16"
        >
          <Link href="/compare">
            <button className="px-8 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-3 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500">
              <span className="text-2xl">⚖️</span>
              <span className="font-semibold text-gray-900 dark:text-white">Compare Countries</span>
              <span className="text-gray-400">→</span>
            </button>
          </Link>
          
          <Link href="/favorites">
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-3">
              <span className="text-2xl">❤️</span>
              <span className="font-semibold">View Favorites</span>
              <span>→</span>
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Footer Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white text-lg font-medium"
          >
            Explore the world with <span className="font-black">MultiMian World Explorer</span>
          </motion.p>
          <p className="text-white/80 mt-2">
            Created by Mian Hassan - Data powered by REST Countries API
          </p>
        </div>
      </section>
    </div>
  )
}

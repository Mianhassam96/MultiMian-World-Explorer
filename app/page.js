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

  // Real GDP data (in trillions USD)
  const gdpData = {
    'USA': 26.9, 'CHN': 17.9, 'JPN': 4.2, 'DEU': 4.3, 'IND': 3.7,
    'GBR': 3.1, 'FRA': 2.9, 'ITA': 2.2, 'CAN': 2.1, 'BRA': 2.1,
    'RUS': 2.2, 'KOR': 1.7, 'AUS': 1.7, 'ESP': 1.4
  }

  useEffect(() => {
    loadCountries()
  }, [])

  useEffect(() => {
    filterCountries()
  }, [countries, selectedRegion])

  const loadCountries = async () => {
    try {
      const data = await fetchAllCountries()
      setCountries(data)
      
      // Get top countries with GDP data
      const featured = data
        .filter(c => gdpData[c.cca3])
        .sort((a, b) => (gdpData[b.cca3] || 0) - (gdpData[a.cca3] || 0))
        .slice(0, 4)
      setFeaturedCountries(featured)
    } catch (error) {
      console.error('Error loading countries:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterCountries = () => {
    let filtered = [...countries]
    
    if (selectedRegion !== 'All Regions') {
      filtered = filtered.filter(country => country.region === selectedRegion)
    }
    
    filtered.sort((a, b) => (gdpData[b.cca3] || 0) - (gdpData[a.cca3] || 0))
    setFeaturedCountries(filtered.slice(0, 4))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery) {
      const found = countries.find(c => 
        c.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
      if (found) {
        window.location.href = `/countries/${found.cca3}`
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Explore Any Country
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Discover facts, population, and GDP worldwide.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search country name..."
                  className="w-full px-6 py-4 pl-14 rounded-full bg-white/95 dark:bg-gray-800/95 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-xl"
                />
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Region Tabs */}
            <div className="flex flex-wrap justify-center gap-3">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedRegion === region
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Countries */}
      <section className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-white dark:bg-gray-800 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCountries.map((country, index) => (
              <motion.div
                key={country.cca3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/countries/${country.cca3}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer">
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
                        <span className="ml-2 text-xl font-bold text-orange-500">
                          ${gdpData[country.cca3]}T
                        </span>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Population:</span>
                        <span className="ml-2 text-base font-semibold text-gray-700 dark:text-gray-300">
                          {(country.population / 1000000).toFixed(0)}M
                        </span>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Capital:</span>
                        <span className="ml-2 text-base font-semibold text-blue-600 dark:text-blue-400">
                          {country.capital?.[0] || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <Link href="/compare">
            <button className="px-8 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-3 border border-gray-200 dark:border-gray-700">
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
        </div>
      </section>

      {/* Footer Text */}
      <section className="text-center py-12 text-gray-600 dark:text-gray-400">
        <p className="text-lg">
          Explore the world with <span className="font-bold text-blue-600 dark:text-blue-400">MultiMian World Explorer</span>.
        </p>
      </section>
    </div>
  )
}

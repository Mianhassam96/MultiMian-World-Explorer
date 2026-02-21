'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { fetchAllCountries } from '@/lib/api'
import { formatNumber } from '@/lib/utils'
import Footer from '@/components/Footer'

export default function Home() {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All Regions')
  const [loading, setLoading] = useState(true)
  const [displayedCountries, setDisplayedCountries] = useState([])
  const [stats, setStats] = useState({ total: 0, population: 0, regions: 0 })

  const regions = ['All Regions', 'Asia', 'Europe', 'Africa', 'Americas', 'Oceania']

  useEffect(() => {
    loadCountries()
  }, [])

  useEffect(() => {
    filterCountries()
  }, [countries, searchQuery, selectedRegion])

  const loadCountries = async () => {
    try {
      const data = await fetchAllCountries()
      setCountries(data)
      
      // Calculate real stats
      const totalPopulation = data.reduce((sum, c) => sum + (c.population || 0), 0)
      const uniqueRegions = [...new Set(data.map(c => c.region).filter(Boolean))].length
      
      setStats({
        total: data.length,
        population: totalPopulation,
        regions: uniqueRegions
      })
      
      // Show top 12 countries by population initially
      const top = data
        .sort((a, b) => (b.population || 0) - (a.population || 0))
        .slice(0, 12)
      setDisplayedCountries(top)
    } catch (error) {
      console.error('Error loading countries:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterCountries = () => {
    let filtered = [...countries]
    
    if (searchQuery) {
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    if (selectedRegion !== 'All Regions') {
      filtered = filtered.filter(country => country.region === selectedRegion)
    }
    
    // Sort by population and take top 12
    filtered.sort((a, b) => (b.population || 0) - (a.population || 0))
    setDisplayedCountries(filtered.slice(0, 12))
  }

  const handleSearch = () => {
    if (searchQuery && displayedCountries.length > 0) {
      window.location.href = `/countries/${displayedCountries[0].cca3}`
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 dark:from-black dark:via-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 text-white">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-7xl mb-6"
              >
                🌍
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-green-300 bg-clip-text text-transparent"
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
                className="text-xl md:text-2xl text-gray-300 mb-12"
              >
                Discover real-time facts, population, GDP, and comprehensive data worldwide
              </motion.p>

              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-12"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-green-500/20">
                  <div className="text-3xl font-black text-green-400">{stats.total}</div>
                  <div className="text-sm text-gray-300">Countries</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-blue-500/20">
                  <div className="text-3xl font-black text-blue-400">{(stats.population / 1000000000).toFixed(1)}B</div>
                  <div className="text-sm text-gray-300">Population</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-green-500/20">
                  <div className="text-3xl font-black text-green-400">{stats.regions}</div>
                  <div className="text-sm text-gray-300">Regions</div>
                </div>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="max-w-3xl mx-auto mb-8"
              >
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search country name..."
                    className="w-full px-6 py-5 pl-14 rounded-2xl bg-white dark:bg-gray-800 border-2 border-green-500/30 focus:border-green-500 focus:outline-none text-lg shadow-2xl transition-all text-gray-900 dark:text-white"
                  />
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
                  <button 
                    onClick={handleSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                  >
                    Search
                  </button>
                </div>
              </motion.div>

              {/* Region Tabs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap justify-center gap-3"
              >
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      selectedRegion === region
                        ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg scale-105'
                        : 'bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Countries Grid */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {selectedRegion === 'All Regions' ? 'Top Countries by Population' : `Top ${selectedRegion} Countries`}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Showing {displayedCountries.length} countries with real-time data
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-72 bg-white dark:bg-gray-800 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {displayedCountries.map((country, index) => (
                <motion.div
                  key={country.cca3}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Link href={`/countries/${country.cca3}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-green-500 h-full">
                      <div className="relative w-full h-32 rounded-xl overflow-hidden shadow-md mb-4">
                        <Image
                          src={country.flags.svg}
                          alt={country.name.common}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 truncate">
                        {country.name.common}
                      </h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Population:</span>
                          <span className="text-base font-bold text-green-600 dark:text-green-400">
                            {formatNumber(country.population)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Capital:</span>
                          <span className="text-base font-semibold text-blue-600 dark:text-blue-400 truncate ml-2">
                            {country.capital?.[0] || 'N/A'}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Region:</span>
                          <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                            {country.region}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Area:</span>
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {formatNumber(country.area)} km²
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
            <Link href="/explore">
              <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-3 font-semibold">
                <span className="text-2xl">🔍</span>
                <span>Explore All Countries</span>
                <span>→</span>
              </button>
            </Link>
            
            <Link href="/compare">
              <button className="px-8 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-3 border-2 border-green-500/30 hover:border-green-500">
                <span className="text-2xl">⚖️</span>
                <span className="font-semibold text-gray-900 dark:text-white">Compare Countries</span>
                <span className="text-gray-400">→</span>
              </button>
            </Link>
            
            <Link href="/statistics">
              <button className="px-8 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-3 border-2 border-blue-500/30 hover:border-blue-500">
                <span className="text-2xl">📊</span>
                <span className="font-semibold text-gray-900 dark:text-white">View Statistics</span>
                <span className="text-gray-400">→</span>
              </button>
            </Link>
          </motion.div>
        </section>
      </div>
      
      <Footer />
    </>
  )
}

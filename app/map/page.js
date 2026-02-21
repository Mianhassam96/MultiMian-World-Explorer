'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { fetchAllCountries } from '@/lib/api'

const WorldMap = dynamic(() => import('@/components/WorldMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] glass rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin text-6xl mb-4">🌍</div>
        <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
      </div>
    </div>
  )
})

export default function MapPage() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    loadCountries()
  }, [])
  
  const loadCountries = async () => {
    try {
      const data = await fetchAllCountries()
      setCountries(data)
    } catch (error) {
      console.error('Error loading countries:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🗺️ Interactive World Map
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Click on any country marker to view its details
        </p>
      </motion.div>
      
      {!loading && <WorldMap countries={countries} />}
    </div>
  )
}

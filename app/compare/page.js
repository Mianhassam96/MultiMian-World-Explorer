'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchAllCountries } from '@/lib/api'
import ComparisonTool from '@/components/ComparisonTool'

export default function ComparePage() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 dark:from-black dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            🔄 Compare Countries
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Select up to 3 countries to compare side by side
          </p>
        </motion.div>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin text-6xl mb-4">⏳</div>
            <p className="text-gray-600 dark:text-gray-400">Loading countries...</p>
          </div>
        ) : (
          <ComparisonTool countries={countries} />
        )}
      </div>
    </div>
  )
}

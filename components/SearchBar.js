'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SearchBar({ value, onChange, countries }) {
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const wrapperRef = useRef(null)
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  useEffect(() => {
    if (value.length > 0) {
      const filtered = countries
        .filter(country =>
          country.name.common.toLowerCase().includes(value.toLowerCase()) ||
          country.name.official.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [value, countries])
  
  return (
    <div ref={wrapperRef} className="relative max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for a country..."
          className="w-full px-6 py-4 pl-12 rounded-2xl glass border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
      </div>
      
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 glass rounded-xl border border-gray-300 dark:border-gray-600 overflow-hidden z-10"
          >
            {suggestions.map((country) => (
              <button
                key={country.cca3}
                onClick={() => {
                  onChange(country.name.common)
                  setShowSuggestions(false)
                }}
                className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <img
                  src={country.flags.svg}
                  alt={country.name.common}
                  className="w-8 h-6 object-cover rounded"
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {country.name.common}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {country.region}
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

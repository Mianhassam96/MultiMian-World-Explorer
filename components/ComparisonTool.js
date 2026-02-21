'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { formatNumber, formatArea } from '@/lib/utils'

export default function ComparisonTool({ countries }) {
  const [selectedCountries, setSelectedCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredCountries = countries.filter(c =>
    c.name.common.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedCountries.find(sc => sc.cca3 === c.cca3)
  ).slice(0, 10)
  
  const addCountry = (country) => {
    if (selectedCountries.length < 3) {
      setSelectedCountries([...selectedCountries, country])
      setSearchQuery('')
    }
  }
  
  const removeCountry = (cca3) => {
    setSelectedCountries(selectedCountries.filter(c => c.cca3 !== cca3))
  }
  
  return (
    <div className="space-y-8">
      {selectedCountries.length < 3 && (
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Add Country to Compare
          </h2>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a country..."
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {searchQuery && (
            <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
              {filteredCountries.map((country) => (
                <button
                  key={country.cca3}
                  onClick={() => addCountry(country)}
                  className="w-full p-3 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <img
                    src={country.flags.svg}
                    alt={country.name.common}
                    className="w-12 h-8 object-cover rounded"
                  />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {country.name.common}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {country.region}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      
      {selectedCountries.length > 0 ? (
        <div className="glass rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
            {selectedCountries.map((country) => (
              <div key={country.cca3} className="p-6">
                <div className="relative mb-4">
                  <button
                    onClick={() => removeCountry(country.cca3)}
                    className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                  >
                    ✕
                  </button>
                  <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                    <Image
                      src={country.flags.svg}
                      alt={country.name.common}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                    {country.name.common}
                  </h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <CompareRow label="Capital" value={country.capital?.[0] || 'N/A'} />
                  <CompareRow label="Population" value={formatNumber(country.population)} />
                  <CompareRow label="Area" value={formatArea(country.area)} />
                  <CompareRow label="Region" value={country.region} />
                  <CompareRow label="Subregion" value={country.subregion || 'N/A'} />
                  <CompareRow 
                    label="Languages" 
                    value={country.languages ? Object.values(country.languages).join(', ') : 'N/A'} 
                  />
                  <CompareRow 
                    label="Currencies" 
                    value={country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'} 
                  />
                  <CompareRow label="Borders" value={country.borders?.length || 0} />
                  <CompareRow 
                    label="Density" 
                    value={`${(country.population / country.area).toFixed(2)} /km²`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-8xl mb-6">🔍</div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Search and select countries to start comparing
          </p>
        </div>
      )}
    </div>
  )
}

function CompareRow({ label, value }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-gray-200 dark:border-gray-700">
      <span className="text-gray-600 dark:text-gray-400 font-medium">{label}</span>
      <span className="text-gray-900 dark:text-white text-right ml-2 break-words max-w-[60%]">
        {value}
      </span>
    </div>
  )
}

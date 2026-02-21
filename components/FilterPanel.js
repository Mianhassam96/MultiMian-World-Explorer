'use client'

import { motion } from 'framer-motion'

export default function FilterPanel({ filters, setFilters, sortBy, setSortBy, countries }) {
  const regions = [...new Set(countries.map(c => c.region).filter(Boolean))]
  
  const populationRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: '< 1M', min: 0, max: 1000000 },
    { label: '1M - 10M', min: 1000000, max: 10000000 },
    { label: '10M - 50M', min: 10000000, max: 50000000 },
    { label: '50M - 100M', min: 50000000, max: 100000000 },
    { label: '> 100M', min: 100000000, max: Infinity },
  ]
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass rounded-2xl p-6 space-y-6 sticky top-24"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
      
      {/* Region Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Region
        </label>
        <select
          value={filters.region}
          onChange={(e) => setFilters({ ...filters, region: e.target.value })}
          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Regions</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>
      
      {/* Population Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Population
        </label>
        <select
          value={JSON.stringify(filters.population)}
          onChange={(e) => {
            const range = JSON.parse(e.target.value)
            setFilters({ ...filters, population: range })
          }}
          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {populationRanges.map((range, i) => (
            <option key={i} value={JSON.stringify({ min: range.min, max: range.max })}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
      
      {/* Language Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Language
        </label>
        <input
          type="text"
          value={filters.language}
          onChange={(e) => setFilters({ ...filters, language: e.target.value })}
          placeholder="e.g., English"
          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Currency Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Currency
        </label>
        <input
          type="text"
          value={filters.currency}
          onChange={(e) => setFilters({ ...filters, currency: e.target.value })}
          placeholder="e.g., Dollar"
          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Name</option>
          <option value="population">Population</option>
          <option value="area">Area</option>
        </select>
      </div>
      
      {/* Reset Button */}
      <button
        onClick={() => {
          setFilters({
            region: '',
            population: { min: 0, max: Infinity },
            language: '',
            currency: '',
          })
          setSortBy('name')
        }}
        className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
      >
        Reset Filters
      </button>
    </motion.div>
  )
}

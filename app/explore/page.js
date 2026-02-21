'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SearchBar from '@/components/SearchBar'
import FilterPanel from '@/components/FilterPanel'
import CountryCard from '@/components/CountryCard'
import SkeletonCard from '@/components/SkeletonCard'
import { fetchAllCountries } from '@/lib/api'

export default function ExplorePage() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    region: '',
    population: { min: 0, max: Infinity },
    language: '',
    currency: '',
  })
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    loadCountries()
  }, [])

  useEffect(() => {
    applyFiltersAndSort()
  }, [countries, searchQuery, filters, sortBy])

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

  const applyFiltersAndSort = () => {
    let result = [...countries]

    if (searchQuery) {
      result = result.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.name.official.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (filters.region) {
      result = result.filter(country => country.region === filters.region)
    }

    result = result.filter(country => {
      const pop = country.population || 0
      return pop >= filters.population.min && pop <= filters.population.max
    })

    if (filters.language) {
      result = result.filter(country => {
        const languages = country.languages ? Object.values(country.languages) : []
        return languages.some(lang => 
          lang.toLowerCase().includes(filters.language.toLowerCase())
        )
      })
    }

    if (filters.currency) {
      result = result.filter(country => {
        const currencies = country.currencies ? Object.values(country.currencies) : []
        return currencies.some(curr => 
          curr.name.toLowerCase().includes(filters.currency.toLowerCase())
        )
      })
    }

    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.common.localeCompare(b.name.common)
      } else if (sortBy === 'population') {
        return (b.population || 0) - (a.population || 0)
      } else if (sortBy === 'area') {
        return (b.area || 0) - (a.area || 0)
      }
      return 0
    })

    setFilteredCountries(result)
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
            Explore All Countries
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover detailed information about {countries.length} countries worldwide
          </p>
        </motion.div>

        <div className="mb-8">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            countries={countries}
          />
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
              countries={countries}
            />
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <>
                <div className="mb-4 text-gray-600 dark:text-gray-300">
                  Showing {filteredCountries.length} countries
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCountries.map((country, index) => (
                    <CountryCard key={country.cca3} country={country} index={index} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { fetchCountryByCode, fetchCountriesByCodes } from '@/lib/api'
import { useCountryStore } from '@/lib/store'
import { formatNumber, formatArea, calculateDensity } from '@/lib/utils'
import CountryTabs from '@/components/CountryDetails/CountryTabs'

export default function CountryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [country, setCountry] = useState(null)
  const [borderCountries, setBorderCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToRecentlyViewed, addFavorite, removeFavorite, isFavorite } = useCountryStore()
  
  useEffect(() => {
    loadCountry()
  }, [params.code])
  
  const loadCountry = async () => {
    try {
      const data = await fetchCountryByCode(params.code)
      const countryData = Array.isArray(data) ? data[0] : data
      setCountry(countryData)
      addToRecentlyViewed(countryData)
      
      if (countryData.borders && countryData.borders.length > 0) {
        const borders = await fetchCountriesByCodes(countryData.borders)
        setBorderCountries(borders)
      }
    } catch (error) {
      console.error('Error loading country:', error)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-96 skeleton rounded-2xl"></div>
          <div className="h-64 skeleton rounded-2xl"></div>
        </div>
      </div>
    )
  }
  
  if (!country) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Country not found
        </h1>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Home
        </button>
      </div>
    )
  }
  
  const favorite = isFavorite(country.cca3)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 glass rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        ← Back
      </button>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl overflow-hidden mb-8"
      >
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="relative h-96 rounded-xl overflow-hidden">
            <Image
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {country.name.common}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {country.name.official}
                </p>
              </div>
              <button
                onClick={() => favorite ? removeFavorite(country.cca3) : addFavorite(country)}
                className="p-3 rounded-full bg-white dark:bg-gray-800 hover:scale-110 transition-transform text-2xl"
              >
                {favorite ? '❤️' : '🤍'}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <InfoCard label="Capital" value={country.capital?.[0] || 'N/A'} />
              <InfoCard label="Population" value={formatNumber(country.population)} />
              <InfoCard label="Region" value={country.region} />
              <InfoCard label="Subregion" value={country.subregion || 'N/A'} />
              <InfoCard label="Area" value={formatArea(country.area)} />
              <InfoCard 
                label="Density" 
                value={`${calculateDensity(country.population, country.area)} /km²`} 
              />
            </div>
          </div>
        </div>
      </motion.div>
      
      <CountryTabs country={country} borderCountries={borderCountries} />
    </div>
  )
}

function InfoCard({ label, value }) {
  return (
    <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
  )
}

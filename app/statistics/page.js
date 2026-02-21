'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { fetchAllCountries } from '@/lib/api'
import { formatNumber } from '@/lib/utils'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function StatisticsPage() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const data = await fetchAllCountries()
      setCountries(data)
      calculateStats(data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (data) => {
    const regionCounts = {}
    const totalPopulation = data.reduce((sum, c) => sum + (c.population || 0), 0)
    const totalArea = data.reduce((sum, c) => sum + (c.area || 0), 0)
    
    data.forEach(country => {
      const region = country.region || 'Unknown'
      regionCounts[region] = (regionCounts[region] || 0) + 1
    })

    const topByPopulation = [...data]
      .sort((a, b) => (b.population || 0) - (a.population || 0))
      .slice(0, 10)

    const topByArea = [...data]
      .sort((a, b) => (b.area || 0) - (a.area || 0))
      .slice(0, 10)

    setStats({
      totalCountries: data.length,
      totalPopulation,
      totalArea,
      regionCounts,
      topByPopulation,
      topByArea,
    })
  }

  if (loading || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">📊</div>
          <p className="text-gray-600 dark:text-gray-400">Loading statistics...</p>
        </div>
      </div>
    )
  }

  const regionData = {
    labels: Object.keys(stats.regionCounts),
    datasets: [{
      data: Object.values(stats.regionCounts),
      backgroundColor: [
        '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#6366F1'
      ],
    }]
  }

  const populationData = {
    labels: stats.topByPopulation.map(c => c.name.common),
    datasets: [{
      label: 'Population',
      data: stats.topByPopulation.map(c => c.population),
      backgroundColor: '#3B82F6',
    }]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📊 Global Statistics
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Comprehensive data analysis of world countries
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard
            icon="🌍"
            label="Total Countries"
            value={stats.totalCountries}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            icon="👥"
            label="World Population"
            value={formatNumber(stats.totalPopulation)}
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            icon="📏"
            label="Total Area"
            value={`${formatNumber(stats.totalArea)} km²`}
            color="from-pink-500 to-pink-600"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Countries by Region
            </h2>
            <div className="h-80">
              <Doughnut 
                data={regionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    }
                  }
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Top 10 by Population
            </h2>
            <div className="h-80">
              <Bar 
                data={populationData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    }
                  }
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Top Countries Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopCountriesList
            title="🏆 Largest by Population"
            countries={stats.topByPopulation}
            valueKey="population"
            formatValue={formatNumber}
          />
          <TopCountriesList
            title="📏 Largest by Area"
            countries={stats.topByArea}
            valueKey="area"
            formatValue={(v) => `${formatNumber(v)} km²`}
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className={`bg-gradient-to-r ${color} rounded-2xl p-6 shadow-lg text-white`}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <p className="text-white/80 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </motion.div>
  )
}

function TopCountriesList({ title, countries, valueKey, formatValue }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
      <div className="space-y-3">
        {countries.map((country, index) => (
          <div
            key={country.cca3}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="w-8 h-6 object-cover rounded"
              />
              <span className="font-medium text-gray-900 dark:text-white">
                {country.name.common}
              </span>
            </div>
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {formatValue(country[valueKey])}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { 
  fetchGDPData, 
  fetchEconomicIndicators,
  formatGDP, 
  formatGDPPerCapita, 
  formatGrowthRate 
} from '@/services/worldBankApi'

export default function EconomyTab({ country }) {
  const [gdpData, setGdpData] = useState(null)
  const [indicators, setIndicators] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    loadEconomicData()
  }, [country.cca2])
  
  const loadEconomicData = async () => {
    setLoading(true)
    try {
      const [gdp, econ] = await Promise.all([
        fetchGDPData(country.cca2, 10),
        fetchEconomicIndicators(country.cca2)
      ])
      setGdpData(gdp)
      setIndicators(econ)
    } catch (error) {
      console.error('Error loading economic data:', error)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 skeleton rounded-lg"></div>
        ))}
      </div>
    )
  }
  
  if (!gdpData || gdpData.error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-gray-600 dark:text-gray-400">
          Economic data not available for this country
        </p>
        {gdpData?.error && (
          <p className="text-sm text-red-500 mt-2">{gdpData.error}</p>
        )}
      </div>
    )
  }
  
  // Prepare chart data for GDP
  const gdpChartData = {
    labels: gdpData.historicalGDP.map(d => d.year),
    datasets: [{
      label: 'GDP (Current US$)',
      data: gdpData.historicalGDP.map(d => d.value),
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true,
    }]
  }
  
  // Prepare chart data for GDP per capita
  const gdpPerCapitaChartData = {
    labels: gdpData.historicalGDPPerCapita.map(d => d.year),
    datasets: [{
      label: 'GDP per Capita (Current US$)',
      data: gdpData.historicalGDPPerCapita.map(d => d.value),
      backgroundColor: '#8B5CF6',
    }]
  }
  
  // Prepare chart data for GDP growth
  const gdpGrowthChartData = {
    labels: gdpData.historicalGDPGrowth.map(d => d.year),
    datasets: [{
      label: 'GDP Growth Rate (%)',
      data: gdpData.historicalGDPGrowth.map(d => d.value),
      borderColor: '#10B981',
      backgroundColor: gdpData.historicalGDPGrowth.map(d => 
        d.value >= 0 ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'
      ),
    }]
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || ''
            if (label) {
              label += ': '
            }
            if (context.parsed.y !== null) {
              if (context.dataset.label.includes('GDP') && !context.dataset.label.includes('Growth')) {
                label += formatGDP(context.parsed.y)
              } else if (context.dataset.label.includes('per Capita')) {
                label += formatGDPPerCapita(context.parsed.y)
              } else {
                label += context.parsed.y.toFixed(2) + '%'
              }
            }
            return label
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            if (value >= 1e12) return '$' + (value / 1e12).toFixed(1) + 'T'
            if (value >= 1e9) return '$' + (value / 1e9).toFixed(1) + 'B'
            if (value >= 1e6) return '$' + (value / 1e6).toFixed(1) + 'M'
            return value
          }
        }
      }
    }
  }
  
  return (
    <div className="space-y-8">
      {/* Key Economic Indicators */}
      <Section title="Key Economic Indicators">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <EconomicCard
            title="GDP"
            value={formatGDP(gdpData.currentGDP)}
            icon="💰"
            color="blue"
          />
          <EconomicCard
            title="GDP per Capita"
            value={formatGDPPerCapita(gdpData.currentGDPPerCapita)}
            icon="👤"
            color="purple"
          />
          <EconomicCard
            title="GDP Growth"
            value={formatGrowthRate(gdpData.currentGDPGrowth)}
            icon="📈"
            color={gdpData.currentGDPGrowth >= 0 ? 'green' : 'red'}
          />
          <EconomicCard
            title="Population"
            value={indicators?.population?.value ? 
              indicators.population.value.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 
              country.population?.toLocaleString() || 'N/A'
            }
            icon="🌍"
            color="orange"
          />
        </div>
      </Section>
      
      {/* Additional Indicators */}
      {indicators && (
        <Section title="Additional Economic Data">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {indicators.inflation?.value !== null && (
              <IndicatorCard
                label="Inflation Rate"
                value={`${indicators.inflation.value.toFixed(2)}%`}
                year={indicators.inflation.year}
              />
            )}
            {indicators.unemployment?.value !== null && (
              <IndicatorCard
                label="Unemployment Rate"
                value={`${indicators.unemployment.value.toFixed(2)}%`}
                year={indicators.unemployment.year}
              />
            )}
            {indicators.tradeBalance?.value !== null && (
              <IndicatorCard
                label="Trade Balance"
                value={formatGDP(indicators.tradeBalance.value)}
                year={indicators.tradeBalance.year}
              />
            )}
          </div>
        </Section>
      )}
      
      {/* GDP Historical Chart */}
      {gdpData.historicalGDP.length > 0 && (
        <Section title="GDP Trend (Last 10 Years)">
          <div className="h-80 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <Line data={gdpChartData} options={chartOptions} />
          </div>
        </Section>
      )}
      
      {/* GDP per Capita Chart */}
      {gdpData.historicalGDPPerCapita.length > 0 && (
        <Section title="GDP per Capita Trend">
          <div className="h-80 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <Bar data={gdpPerCapitaChartData} options={chartOptions} />
          </div>
        </Section>
      )}
      
      {/* GDP Growth Rate Chart */}
      {gdpData.historicalGDPGrowth.length > 0 && (
        <Section title="GDP Growth Rate Trend">
          <div className="h-80 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <Bar data={gdpGrowthChartData} options={{
              ...chartOptions,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function(value) {
                      return value + '%'
                    }
                  }
                }
              }
            }} />
          </div>
        </Section>
      )}
      
      {/* Data Source */}
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Data source: World Bank API • Last updated: {new Date(gdpData.lastUpdated).toLocaleDateString()}
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
      {children}
    </div>
  )
}

function EconomicCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    orange: 'from-orange-500 to-orange-600',
  }
  
  return (
    <div className={`p-6 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg`}>
      <div className="text-4xl mb-3">{icon}</div>
      <p className="text-sm opacity-90 mb-1">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

function IndicatorCard({ label, value, year }) {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
      {year && <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Year: {year}</p>}
    </div>
  )
}

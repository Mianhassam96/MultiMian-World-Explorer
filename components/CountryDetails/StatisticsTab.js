'use client'

import { useEffect, useRef } from 'react'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { formatNumber, getPopulationCategory } from '@/lib/utils'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function StatisticsTab({ country }) {
  const languages = country.languages ? Object.values(country.languages) : []
  const currencies = country.currencies ? Object.values(country.currencies) : []
  
  const languageData = {
    labels: languages.length > 0 ? languages : ['No Data'],
    datasets: [{
      data: languages.length > 0 ? languages.map(() => 1) : [1],
      backgroundColor: [
        '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#6366F1'
      ],
    }]
  }
  
  const populationCategory = getPopulationCategory(country.population)
  
  const statsData = [
    { label: 'Population', value: country.population, color: '#3B82F6' },
    { label: 'Area (km²)', value: country.area, color: '#8B5CF6' },
    { label: 'Density', value: country.population / country.area, color: '#EC4899' },
  ]
  
  const barData = {
    labels: statsData.map(s => s.label),
    datasets: [{
      label: 'Statistics',
      data: statsData.map(s => s.value),
      backgroundColor: statsData.map(s => s.color),
    }]
  }
  
  return (
    <div className="space-y-8">
      <Section title="Population Statistics">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <StatCard 
            label="Total Population" 
            value={formatNumber(country.population)}
            icon="👥"
          />
          <StatCard 
            label="Population Category" 
            value={populationCategory}
            icon="📊"
          />
          <StatCard 
            label="Density" 
            value={`${(country.population / country.area).toFixed(2)} /km²`}
            icon="🏘️"
          />
        </div>
      </Section>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Section title="Language Distribution">
          <div className="h-64 flex items-center justify-center">
            {languages.length > 0 ? (
              <Doughnut 
                data={languageData}
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
            ) : (
              <p className="text-gray-500">No language data available</p>
            )}
          </div>
        </Section>
        
        <Section title="Key Metrics">
          <div className="h-64">
            <Bar 
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    type: 'logarithmic',
                  }
                },
                plugins: {
                  legend: {
                    display: false,
                  }
                }
              }}
            />
          </div>
        </Section>
      </div>
      
      <Section title="Quick Facts">
        <div className="grid md:grid-cols-2 gap-4">
          <FactCard 
            label="Languages Spoken" 
            value={languages.length}
            description={languages.join(', ') || 'N/A'}
          />
          <FactCard 
            label="Currencies Used" 
            value={currencies.length}
            description={currencies.map(c => c.name).join(', ') || 'N/A'}
          />
          <FactCard 
            label="Bordering Countries" 
            value={country.borders?.length || 0}
            description={country.landlocked ? 'Landlocked' : 'Has coastline'}
          />
          <FactCard 
            label="Time Zones" 
            value={country.timezones?.length || 0}
            description={country.timezones?.[0] || 'N/A'}
          />
        </div>
      </Section>
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

function StatCard({ label, value, icon }) {
  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  )
}

function FactCard({ label, value, description }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{value}</span>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{description}</p>
    </div>
  )
}

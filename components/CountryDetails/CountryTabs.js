'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import OverviewTab from './OverviewTab'
import GeographyTab from './GeographyTab'
import CultureTab from './CultureTab'
import BordersTab from './BordersTab'
import StatisticsTab from './StatisticsTab'

export default function CountryTabs({ country, borderCountries }) {
  const [activeTab, setActiveTab] = useState('overview')
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'geography', label: 'Geography', icon: '🗺️' },
    { id: 'culture', label: 'Culture', icon: '🎭' },
    { id: 'borders', label: 'Borders', icon: '🔗' },
    { id: 'statistics', label: 'Statistics', icon: '📊' },
  ]
  
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400"
              />
            )}
          </button>
        ))}
      </div>
      
      <div className="p-8">
        {activeTab === 'overview' && <OverviewTab country={country} />}
        {activeTab === 'geography' && <GeographyTab country={country} />}
        {activeTab === 'culture' && <CultureTab country={country} />}
        {activeTab === 'borders' && <BordersTab country={country} borderCountries={borderCountries} />}
        {activeTab === 'statistics' && <StatisticsTab country={country} />}
      </div>
    </div>
  )
}

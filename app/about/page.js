'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AboutPage() {
  const features = [
    {
      icon: '🔍',
      title: 'Smart Search',
      description: 'Find any country instantly with our intelligent search system'
    },
    {
      icon: '🎯',
      title: 'Advanced Filters',
      description: 'Filter by region, population, language, and currency'
    },
    {
      icon: '📊',
      title: 'Data Visualization',
      description: 'Beautiful charts and statistics for better insights'
    },
    {
      icon: '🗺️',
      title: 'Interactive Map',
      description: 'Explore countries on an interactive world map'
    },
    {
      icon: '⚖️',
      title: 'Country Comparison',
      description: 'Compare up to 3 countries side by side'
    },
    {
      icon: '❤️',
      title: 'Favorites System',
      description: 'Save your favorite countries for quick access'
    },
  ]

  const techStack = [
    { name: 'Next.js 14', icon: '⚡' },
    { name: 'React 18', icon: '⚛️' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Framer Motion', icon: '✨' },
    { name: 'Chart.js', icon: '📊' },
    { name: 'Leaflet Maps', icon: '🗺️' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 dark:from-black dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-green-400 bg-clip-text text-transparent">
            About MultiMian
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your ultimate destination for exploring comprehensive information about every country in the world
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 mb-16 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-white/90">
            MultiMian World Explorer is designed to make global information accessible and engaging. 
            We believe that understanding our world starts with knowing about the countries that make it unique. 
            Our platform provides detailed, accurate, and up-to-date information about every nation on Earth.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-12 mb-16 shadow-lg"
        >
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Built With Modern Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{tech.icon}</div>
                <p className="font-semibold text-gray-900 dark:text-white">{tech.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Creator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white text-center"
        >
          <div className="text-6xl mb-4">👨‍💻</div>
          <h2 className="text-3xl font-bold mb-4">Created by Mian Hassan</h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Full-stack developer passionate about creating beautiful and functional web applications. 
            This project combines modern web technologies with comprehensive global data to deliver 
            an exceptional user experience.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/Mianhassam96"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              GitHub Profile
            </a>
            <a
              href="mailto:mianhassam96@gmail.com"
              className="px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Data Source */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Data powered by{' '}
            <a
              href="https://restcountries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              REST Countries API
            </a>
          </p>
          <Link href="/">
            <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all">
              Start Exploring →
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

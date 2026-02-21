import axios from 'axios'

const WORLD_BANK_BASE_URL = 'https://api.worldbank.org/v2'

// Cache for World Bank API responses
const gdpCache = new Map()
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour

/**
 * Fetch GDP data for a country
 * @param {string} countryCode - ISO 2-letter country code
 * @param {number} years - Number of years to fetch (default: 10)
 * @returns {Promise<Object>} GDP data with current and historical values
 */
export const fetchGDPData = async (countryCode, years = 10) => {
  const cacheKey = `gdp_${countryCode}_${years}`
  const now = Date.now()
  const cached = gdpCache.get(cacheKey)
  
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  
  try {
    const currentYear = new Date().getFullYear()
    const startYear = currentYear - years
    
    // Fetch GDP (current US$)
    const gdpResponse = await axios.get(
      `${WORLD_BANK_BASE_URL}/country/${countryCode}/indicator/NY.GDP.MKTP.CD`,
      {
        params: {
          format: 'json',
          date: `${startYear}:${currentYear}`,
          per_page: years + 5 // Extra to ensure we get data
        }
      }
    )
    
    // Fetch GDP per capita (current US$)
    const gdpPerCapitaResponse = await axios.get(
      `${WORLD_BANK_BASE_URL}/country/${countryCode}/indicator/NY.GDP.PCAP.CD`,
      {
        params: {
          format: 'json',
          date: `${startYear}:${currentYear}`,
          per_page: years + 5
        }
      }
    )
    
    // Fetch GDP growth rate
    const gdpGrowthResponse = await axios.get(
      `${WORLD_BANK_BASE_URL}/country/${countryCode}/indicator/NY.GDP.MKTP.KD.ZG`,
      {
        params: {
          format: 'json',
          date: `${startYear}:${currentYear}`,
          per_page: years + 5
        }
      }
    )
    
    const gdpData = gdpResponse.data?.[1] || []
    const gdpPerCapitaData = gdpPerCapitaResponse.data?.[1] || []
    const gdpGrowthData = gdpGrowthResponse.data?.[1] || []
    
    // Process and format data
    const processedData = {
      countryCode,
      countryName: gdpData[0]?.country?.value || 'Unknown',
      currentGDP: null,
      currentGDPPerCapita: null,
      currentGDPGrowth: null,
      historicalGDP: [],
      historicalGDPPerCapita: [],
      historicalGDPGrowth: [],
      lastUpdated: new Date().toISOString()
    }
    
    // Get current values (most recent non-null data)
    for (const item of gdpData) {
      if (item.value !== null) {
        processedData.currentGDP = item.value
        break
      }
    }
    
    for (const item of gdpPerCapitaData) {
      if (item.value !== null) {
        processedData.currentGDPPerCapita = item.value
        break
      }
    }
    
    for (const item of gdpGrowthData) {
      if (item.value !== null) {
        processedData.currentGDPGrowth = item.value
        break
      }
    }
    
    // Process historical data
    processedData.historicalGDP = gdpData
      .filter(item => item.value !== null)
      .map(item => ({
        year: item.date,
        value: item.value
      }))
      .reverse()
      .slice(0, years)
    
    processedData.historicalGDPPerCapita = gdpPerCapitaData
      .filter(item => item.value !== null)
      .map(item => ({
        year: item.date,
        value: item.value
      }))
      .reverse()
      .slice(0, years)
    
    processedData.historicalGDPGrowth = gdpGrowthData
      .filter(item => item.value !== null)
      .map(item => ({
        year: item.date,
        value: item.value
      }))
      .reverse()
      .slice(0, years)
    
    // Cache the result
    gdpCache.set(cacheKey, { data: processedData, timestamp: now })
    
    return processedData
  } catch (error) {
    console.error(`Error fetching GDP data for ${countryCode}:`, error)
    
    // Return empty data structure on error
    return {
      countryCode,
      countryName: 'Unknown',
      currentGDP: null,
      currentGDPPerCapita: null,
      currentGDPGrowth: null,
      historicalGDP: [],
      historicalGDPPerCapita: [],
      historicalGDPGrowth: [],
      error: error.message
    }
  }
}

/**
 * Fetch multiple economic indicators for a country
 * @param {string} countryCode - ISO 2-letter country code
 * @returns {Promise<Object>} Economic indicators
 */
export const fetchEconomicIndicators = async (countryCode) => {
  try {
    const currentYear = new Date().getFullYear()
    
    // Fetch multiple indicators
    const indicators = {
      inflation: 'FP.CPI.TOTL.ZG', // Inflation, consumer prices (annual %)
      unemployment: 'SL.UEM.TOTL.ZS', // Unemployment, total (% of total labor force)
      tradeBalance: 'NE.RSB.GNFS.CD', // External balance on goods and services (current US$)
      population: 'SP.POP.TOTL' // Population, total
    }
    
    const results = {}
    
    for (const [key, indicator] of Object.entries(indicators)) {
      try {
        const response = await axios.get(
          `${WORLD_BANK_BASE_URL}/country/${countryCode}/indicator/${indicator}`,
          {
            params: {
              format: 'json',
              date: `${currentYear - 5}:${currentYear}`,
              per_page: 10
            }
          }
        )
        
        const data = response.data?.[1] || []
        const latestData = data.find(item => item.value !== null)
        
        results[key] = {
          value: latestData?.value || null,
          year: latestData?.date || null
        }
      } catch (err) {
        results[key] = { value: null, year: null, error: err.message }
      }
    }
    
    return results
  } catch (error) {
    console.error(`Error fetching economic indicators for ${countryCode}:`, error)
    return {}
  }
}

/**
 * Format GDP value to readable string
 * @param {number} value - GDP value
 * @returns {string} Formatted GDP string
 */
export const formatGDP = (value) => {
  if (!value) return 'N/A'
  
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)} Trillion`
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)} Billion`
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)} Million`
  }
  
  return `$${value.toLocaleString()}`
}

/**
 * Format GDP per capita
 * @param {number} value - GDP per capita value
 * @returns {string} Formatted string
 */
export const formatGDPPerCapita = (value) => {
  if (!value) return 'N/A'
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}

/**
 * Format growth rate
 * @param {number} value - Growth rate value
 * @returns {string} Formatted string with sign
 */
export const formatGrowthRate = (value) => {
  if (value === null || value === undefined) return 'N/A'
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

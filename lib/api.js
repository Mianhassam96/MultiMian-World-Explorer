const BASE_URL = 'https://restcountries.com/v3.1'

// Cache for API responses
const cache = new Map()
const CACHE_DURATION = 1000 * 60 * 30 // 30 minutes

const fetchWithCache = async (url) => {
  const now = Date.now()
  const cached = cache.get(url)
  
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch data')
  
  const data = await response.json()
  cache.set(url, { data, timestamp: now })
  
  return data
}

export const fetchAllCountries = async () => {
  const url = `${BASE_URL}/all?fields=name,capital,population,region,subregion,flags,cca3,cca2,languages,currencies,area,borders,timezones,latlng`
  return fetchWithCache(url)
}

export const fetchCountryByCode = async (code) => {
  const url = `${BASE_URL}/alpha/${code}`
  return fetchWithCache(url)
}

export const fetchCountriesByCodes = async (codes) => {
  const url = `${BASE_URL}/alpha?codes=${codes.join(',')}`
  return fetchWithCache(url)
}

export const searchCountries = async (query) => {
  const url = `${BASE_URL}/name/${query}`
  return fetchWithCache(url)
}

export const filterByRegion = async (region) => {
  const url = `${BASE_URL}/region/${region}`
  return fetchWithCache(url)
}

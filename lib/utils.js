export const formatNumber = (num) => {
  if (!num) return 'N/A'
  return new Intl.NumberFormat('en-US').format(num)
}

export const formatArea = (area) => {
  if (!area) return 'N/A'
  return `${formatNumber(area)} km²`
}

export const getRegionColor = (region) => {
  const colors = {
    Africa: 'bg-yellow-500',
    Americas: 'bg-green-500',
    Asia: 'bg-red-500',
    Europe: 'bg-blue-500',
    Oceania: 'bg-purple-500',
    Antarctic: 'bg-cyan-500',
  }
  return colors[region] || 'bg-gray-500'
}

export const getPopulationCategory = (population) => {
  if (population > 100000000) return 'Very Large'
  if (population > 50000000) return 'Large'
  if (population > 10000000) return 'Medium'
  if (population > 1000000) return 'Small'
  return 'Very Small'
}

export const calculateDensity = (population, area) => {
  if (!population || !area) return 'N/A'
  return (population / area).toFixed(2)
}

import Link from 'next/link'
import Image from 'next/image'

export default function BordersTab({ country, borderCountries }) {
  if (!country.borders || country.borders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl mb-2">🏝️</p>
        <p className="text-gray-600 dark:text-gray-400">
          This country has no land borders (island nation or isolated territory)
        </p>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Neighboring Countries ({borderCountries.length})
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Click on any country to explore its details
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {borderCountries.map((border) => (
          <Link key={border.cca3} href={`/countries/${border.cca3}`}>
            <div className="glass rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative h-32 mb-3 rounded overflow-hidden">
                <Image
                  src={border.flags.svg}
                  alt={border.name.common}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                {border.name.common}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {border.capital?.[0] || 'N/A'}
              </p>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Border Codes
        </h4>
        <div className="flex flex-wrap gap-2">
          {country.borders.map((code) => (
            <span 
              key={code}
              className="px-3 py-1 bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 rounded-full text-sm font-medium"
            >
              {code}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

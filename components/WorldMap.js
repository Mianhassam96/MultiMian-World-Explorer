'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useRouter } from 'next/navigation'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { formatNumber } from '@/lib/utils'

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function WorldMap({ countries }) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  const validCountries = countries.filter(c => c.latlng && c.latlng.length === 2)
  
  return (
    <div className="glass rounded-2xl overflow-hidden h-[600px]">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {validCountries.map((country) => (
          <Marker
            key={country.cca3}
            position={[country.latlng[0], country.latlng[1]]}
            eventHandlers={{
              click: () => {
                router.push(`/countries/${country.cca3}`)
              }
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center space-x-2 mb-2">
                  <img
                    src={country.flags.svg}
                    alt={country.name.common}
                    className="w-12 h-8 object-cover rounded"
                  />
                  <h3 className="font-bold text-lg">{country.name.common}</h3>
                </div>
                <div className="space-y-1 text-sm">
                  <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
                  <p><strong>Population:</strong> {formatNumber(country.population)}</p>
                  <p><strong>Region:</strong> {country.region}</p>
                </div>
                <button
                  onClick={() => router.push(`/countries/${country.cca3}`)}
                  className="mt-3 w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

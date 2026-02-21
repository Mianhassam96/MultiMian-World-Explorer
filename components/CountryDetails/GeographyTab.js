import { formatArea } from '@/lib/utils'

export default function GeographyTab({ country }) {
  return (
    <div className="space-y-6">
      <Section title="Location">
        <InfoRow label="Continent" value={country.continents?.join(', ') || 'N/A'} />
        <InfoRow label="Region" value={country.region} />
        <InfoRow label="Subregion" value={country.subregion || 'N/A'} />
        <InfoRow 
          label="Coordinates" 
          value={country.latlng ? `${country.latlng[0]}°, ${country.latlng[1]}°` : 'N/A'} 
        />
        <InfoRow label="Landlocked" value={country.landlocked ? 'Yes' : 'No'} />
      </Section>
      
      <Section title="Physical Geography">
        <InfoRow label="Total Area" value={formatArea(country.area)} />
        <InfoRow label="Borders" value={country.borders?.length || 0} />
        <InfoRow label="Coastline" value={country.landlocked ? 'Landlocked' : 'Has coastline'} />
      </Section>
      
      <Section title="Time Zones">
        <div className="space-y-2">
          {country.timezones?.map((tz, i) => (
            <div key={i} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              {tz}
            </div>
          )) || <p className="text-gray-500">No timezone information</p>}
        </div>
      </Section>
      
      {country.latlng && (
        <Section title="Map Location">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Map: {country.latlng[0]}°, {country.latlng[1]}°</p>
          </div>
        </Section>
      )}
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

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-gray-200 dark:border-gray-700">
      <span className="text-gray-600 dark:text-gray-400 font-medium">{label}</span>
      <span className="text-gray-900 dark:text-white text-right ml-4">{value}</span>
    </div>
  )
}

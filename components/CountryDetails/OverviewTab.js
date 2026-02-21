import { formatNumber } from '@/lib/utils'

export default function OverviewTab({ country }) {
  return (
    <div className="space-y-6">
      <Section title="Basic Information">
        <InfoRow label="Official Name" value={country.name.official} />
        <InfoRow label="Common Name" value={country.name.common} />
        <InfoRow label="Native Names" value={
          country.name.nativeName 
            ? Object.values(country.name.nativeName).map(n => n.common).join(', ')
            : 'N/A'
        } />
        <InfoRow label="Capital" value={country.capital?.join(', ') || 'N/A'} />
        <InfoRow label="Region" value={country.region} />
        <InfoRow label="Subregion" value={country.subregion || 'N/A'} />
      </Section>
      
      <Section title="Demographics">
        <InfoRow label="Population" value={formatNumber(country.population)} />
        <InfoRow label="Area" value={`${formatNumber(country.area)} km²`} />
        <InfoRow 
          label="Population Density" 
          value={`${(country.population / country.area).toFixed(2)} people/km²`} 
        />
      </Section>
      
      <Section title="Codes & Identifiers">
        <InfoRow label="ISO Alpha-2" value={country.cca2} />
        <InfoRow label="ISO Alpha-3" value={country.cca3} />
        <InfoRow label="Top Level Domain" value={country.tld?.join(', ') || 'N/A'} />
        <InfoRow label="Calling Code" value={
          country.idd?.root 
            ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}`
            : 'N/A'
        } />
      </Section>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
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

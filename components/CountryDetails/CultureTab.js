export default function CultureTab({ country }) {
  const languages = country.languages ? Object.values(country.languages) : []
  const currencies = country.currencies ? Object.entries(country.currencies) : []
  
  return (
    <div className="space-y-6">
      <Section title="Languages">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {languages.length > 0 ? (
            languages.map((lang, i) => (
              <div key={i} className="px-4 py-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-center">
                <span className="text-blue-900 dark:text-blue-100 font-medium">{lang}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No language information</p>
          )}
        </div>
      </Section>
      
      <Section title="Currencies">
        <div className="space-y-3">
          {currencies.length > 0 ? (
            currencies.map(([code, currency]) => (
              <div key={code} className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-green-900 dark:text-green-100">{currency.name}</p>
                    <p className="text-sm text-green-700 dark:text-green-300">Code: {code}</p>
                  </div>
                  <span className="text-3xl">{currency.symbol}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No currency information</p>
          )}
        </div>
      </Section>
      
      <Section title="Symbols">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Flag</h4>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">{country.flag}</p>
              {country.flags?.alt && (
                <p className="text-sm text-gray-500 mt-2">{country.flags.alt}</p>
              )}
            </div>
          </div>
          
          {country.coatOfArms?.svg && (
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Coat of Arms</h4>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <img 
                  src={country.coatOfArms.svg} 
                  alt="Coat of Arms" 
                  className="h-32 object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </Section>
      
      <Section title="Additional Information">
        <InfoRow label="Start of Week" value={country.startOfWeek || 'N/A'} />
        <InfoRow label="Driving Side" value={country.car?.side || 'N/A'} />
        <InfoRow label="Independent" value={country.independent ? 'Yes' : 'No'} />
        <InfoRow label="UN Member" value={country.unMember ? 'Yes' : 'No'} />
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

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-gray-200 dark:border-gray-700">
      <span className="text-gray-600 dark:text-gray-400 font-medium">{label}</span>
      <span className="text-gray-900 dark:text-white text-right ml-4">{value}</span>
    </div>
  )
}

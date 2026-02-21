import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCountryStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      recentlyViewed: [],
      theme: 'light',
      
      addFavorite: (country) => {
        const favorites = get().favorites
        if (!favorites.find(c => c.cca3 === country.cca3)) {
          set({ favorites: [...favorites, country] })
        }
      },
      
      removeFavorite: (cca3) => {
        set({ favorites: get().favorites.filter(c => c.cca3 !== cca3) })
      },
      
      isFavorite: (cca3) => {
        return get().favorites.some(c => c.cca3 === cca3)
      },
      
      addToRecentlyViewed: (country) => {
        const recent = get().recentlyViewed.filter(c => c.cca3 !== country.cca3)
        set({ recentlyViewed: [country, ...recent].slice(0, 10) })
      },
      
      toggleTheme: () => {
        set({ theme: get().theme === 'light' ? 'dark' : 'light' })
      },
    }),
    {
      name: 'country-storage',
    }
  )
)

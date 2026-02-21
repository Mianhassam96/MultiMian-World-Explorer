'use client'

import { useEffect } from 'react'

export function ThemeProvider({ children }) {
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light'
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [])
  
  return <>{children}</>
}

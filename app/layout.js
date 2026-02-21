import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'

export const metadata = {
  title: 'MultiMian World Explorer',
  description: 'Explore detailed information about countries around the world',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

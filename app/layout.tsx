"use client"
import { useEffect } from 'react'
import { AuthProvider } from '@/hooks/auth-context'
import { useFavorites } from '@/hooks/use-favorites'
import { useProperties } from '@/hooks/use-properties'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ weight: ['400', '600', '700'], subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <DataProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

function DataProvider({ children }: { children: React.ReactNode }) {
  const { fetchFavorites } = useFavorites()
  const { fetchProperties } = useProperties()

  useEffect(() => {
    fetchProperties()
    fetchFavorites()
  }, [])

  return <>{children}</>
}


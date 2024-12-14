"use client"
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
      <body className={poppins.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}


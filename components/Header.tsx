'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { CalendarDays, User, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Mock authentication state
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({ name: 'John Doe', role: 'user' })

  useEffect(() => {
    // Here you would typically check for a session or token
    const checkAuth = async () => {
      // Mock authentication check
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(loggedIn)
      if (loggedIn) {
        setUser({ name: 'John Doe', role: 'user' })
      }
    }
    checkAuth()
  }, [])

  const login = () => {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
    setUser({ name: 'John Doe', role: 'user' })
  }

  const logout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  return { isLoggedIn, user, login, logout }
}

export function Header() {
  const { isLoggedIn, user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            Homesphere
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/properties" className="text-gray-600 hover:text-orange-500">Properties</Link>
            <Link href="/agents" className="text-gray-600 hover:text-orange-500">Agents</Link>
            <Link href="/about" className="text-gray-600 hover:text-orange-500">About</Link>
            {isLoggedIn && (
              <Link href="/bookings" className="text-gray-600 hover:text-orange-500 flex items-center">
                <CalendarDays className="mr-1" size={18} />
                Bookings
              </Link>
            )}
            <Link href="/contact" className="text-gray-600 hover:text-orange-500">Contact</Link>
          </nav>
          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              <div className="relative group">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span>{user?.name}</span>
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link href="/profile-settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100">
                    Profile Settings
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-100">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}


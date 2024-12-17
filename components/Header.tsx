'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { CalendarDays, User, LogOut, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from '@/hooks/auth-context'

export function Header() {
  const { user, logout } = useAuth()
  const router = useRouter();
  console.log(user)

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
            {user && (
              <Link href="/bookings" className="text-gray-600 hover:text-orange-500 flex items-center">
                <CalendarDays className="mr-1" size={18} />
                Bookings
              </Link>
            )}
            <Link href="/contact" className="text-gray-600 hover:text-orange-500">Contact</Link>
          </nav>
          <div className="flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-full px-4 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.imageUrl || "/placeholder.svg?height=32&width=32"} alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white rounded-lg shadow-lg border border-gray-200">
                  <DropdownMenuItem asChild className="hover:bg-orange-100">
                    <Link href="/profile-settings" className="flex items-center px-4 py-2">
                      <User className="mr-2 h-4 w-4 text-orange-500" />
                      <span>Profile Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-orange-100">
                    <Link href="/bookings" className="flex items-center px-4 py-2">
                      <CalendarDays className="mr-2 h-4 w-4 text-orange-500" />
                      <span>Bookings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
                  <DropdownMenuItem onClick={handleLogout} className="hover:bg-orange-100">
                    <div className="flex items-center px-4 py-2">
                      <LogOut className="mr-2 h-4 w-4 text-orange-500" />
                      <span>Log out</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-gray-600 hover:text-orange-500">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
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


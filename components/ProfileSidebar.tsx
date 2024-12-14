'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronRight, User, BookMarked, CalendarDays, LayoutDashboard } from 'lucide-react'

export function ProfileSidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={`bg-white h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'} shadow-lg`}>
      <Button
        className="absolute -right-3 top-20 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronRight className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      <div className="p-4">
        <Link href="/profile-settings" className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} mb-8`}>
          <User className="h-8 w-8 text-orange-500" />
          {isOpen && <span className="ml-2 text-lg font-semibold text-gray-800">Profile</span>}
        </Link>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} p-2 rounded-md hover:bg-orange-100 text-gray-700 hover:text-orange-500`}>
                <LayoutDashboard className="h-6 w-6" />
                {isOpen && <span className="ml-2">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link href="/savedproperties" className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} p-2 rounded-md hover:bg-orange-100 text-gray-700 hover:text-orange-500`}>
                <BookMarked className="h-6 w-6" />
                {isOpen && <span className="ml-2">Saved Properties</span>}
              </Link>
            </li>
            <li>
              <Link href="/bookings" className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} p-2 rounded-md hover:bg-orange-100 text-gray-700 hover:text-orange-500`}>
                <CalendarDays className="h-6 w-6" />
                {isOpen && <span className="ml-2">Bookings</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}


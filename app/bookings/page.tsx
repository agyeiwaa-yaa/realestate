'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import Link from 'next/link'

// Mock user data (replace with actual authentication in a real app)
const currentUser = {
  id: 1,
  role: 2, // 1: admin, 2: agent, 3: user
  name: 'John Doe',
}

// Mock bookings data
const mockBookings = [
  { id: 1, propertyId: 1, propertyTitle: 'Luxurious Villa', date: '2023-06-15', time: '14:00', status: 'pending', userId: 2, agentId: 1 },
  { id: 2, propertyId: 2, propertyTitle: 'Modern Apartment', date: '2023-06-16', time: '10:00', status: 'accepted', userId: 3, agentId: 1 },
  { id: 3, propertyId: 3, propertyTitle: 'Cozy Cottage', date: '2023-06-17', time: '11:00', status: 'pending', userId: 4, agentId: 1 },
]

export default function BookingsPage() {
  const [bookings, setBookings] = useState(mockBookings)

  const handleAcceptBooking = (bookingId: number) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'accepted' } : booking
    ))
    toast.success('Booking accepted successfully!')
  }

  const handleCancelBooking = (bookingId: number) => {
    setBookings(bookings.filter(booking => booking.id !== bookingId))
    toast.success('Booking cancelled successfully!')
  }

  const filteredBookings = currentUser.role === 2 
    ? bookings.filter(booking => booking.agentId === currentUser.id)
    : bookings.filter(booking => booking.userId === currentUser.id)

  return (
    <div className="bg-orange-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          {currentUser.role === 2 ? 'Manage Bookings' : 'Your Bookings'}
        </h1>
        <div className="grid gap-6">
          {filteredBookings.map(booking => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{booking.propertyTitle}</h2>
                  <p className="text-gray-600">Date: {booking.date}</p>
                  <p className="text-gray-600">Time: {booking.time}</p>
                  <p className="text-gray-600">Status: <span className={`font-semibold ${booking.status === 'accepted' ? 'text-green-600' : 'text-orange-500'}`}>{booking.status}</span></p>
                </div>
                <div className="space-x-2">
                  {currentUser.role === 2 && booking.status === 'pending' && (
                    <Button onClick={() => handleAcceptBooking(booking.id)} className="bg-green-500 hover:bg-green-600">
                      Accept
                    </Button>
                  )}
                  <Button onClick={() => handleCancelBooking(booking.id)} className="bg-red-500 hover:bg-red-600">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


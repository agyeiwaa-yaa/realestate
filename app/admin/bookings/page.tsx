'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'

// Mock bookings data
const mockBookings = [
  { id: 1, propertyId: 1, propertyTitle: 'Luxurious Villa', date: '2023-06-15', time: '14:00', status: 'pending', userId: 2, userName: 'Alice Smith', agentId: 1, agentName: 'John Doe' },
  { id: 2, propertyId: 2, propertyTitle: 'Modern Apartment', date: '2023-06-16', time: '10:00', status: 'accepted', userId: 3, userName: 'Bob Johnson', agentId: 1, agentName: 'John Doe' },
  { id: 3, propertyId: 3, propertyTitle: 'Cozy Cottage', date: '2023-06-17', time: '11:00', status: 'pending', userId: 4, userName: 'Carol Williams', agentId: 1, agentName: 'John Doe' },
]

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState(mockBookings)

  const handleUpdateStatus = (bookingId: number, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ))
    toast.success(`Booking status updated to ${newStatus}!`)
  }

  const handleDeleteBooking = (bookingId: number) => {
    setBookings(bookings.filter(booking => booking.id !== bookingId))
    toast.success('Booking deleted successfully!')
  }

  return (
    <div className="bg-orange-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Admin Bookings Management</h1>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3 text-left">Property</th>
                <th className="p-3 text-left">Date & Time</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Agent</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id} className="border-b border-gray-200">
                  <td className="p-3">{booking.propertyTitle}</td>
                  <td className="p-3">{`${booking.date} ${booking.time}`}</td>
                  <td className="p-3">{booking.userName}</td>
                  <td className="p-3">{booking.agentName}</td>
                  <td className="p-3">
                    <span className={`font-semibold ${booking.status === 'accepted' ? 'text-green-600' : 'text-orange-500'}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="space-x-2">
                      <Button onClick={() => handleUpdateStatus(booking.id, 'accepted')} className="bg-green-500 hover:bg-green-600">
                        Accept
                      </Button>
                      <Button onClick={() => handleUpdateStatus(booking.id, 'rejected')} className="bg-red-500 hover:bg-red-600">
                        Reject
                      </Button>
                      <Button onClick={() => handleDeleteBooking(booking.id)} className="bg-gray-500 hover:bg-gray-600">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


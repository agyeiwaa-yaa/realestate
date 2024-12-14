'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from 'next/link'

// Mock data for user dashboard
const mockUserData = {
  savedProperties: 5,
  totalBookings: 3,
  recentBookings: [
    { id: 1, property: 'Luxurious Villa', date: '2023-06-15', time: '14:00', status: 'Confirmed' },
    { id: 2, property: 'Modern Apartment', date: '2023-06-16', time: '10:00', status: 'Pending' },
    { id: 3, property: 'Cozy Cottage', date: '2023-06-17', time: '11:00', status: 'Confirmed' },
  ],
}

export default function UserDashboard() {
  const [userData, setUserData] = useState(mockUserData)

  useEffect(() => {
    // Here you would typically fetch the user data from your API
    // For now, we're using the mock data
    setUserData(mockUserData)
  }, [])

  return (
    <div className="bg-orange-50 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.savedProperties}</div>
            <Link href="/savedproperties" className="text-orange-500 hover:text-orange-600">View all</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.totalBookings}</div>
            <Link href="/bookings" className="text-orange-500 hover:text-orange-600">View all</Link>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData.recentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.property}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


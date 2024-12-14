'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for agent dashboard
const mockAgentData = {
  assignedProperties: 10,
  totalBookings: 25,
  upcomingBookings: [
    { id: 1, property: 'Luxurious Villa', date: '2023-06-15', time: '14:00', client: 'Alice Smith' },
    { id: 2, property: 'Modern Apartment', date: '2023-06-16', time: '10:00', client: 'Bob Johnson' },
    { id: 3, property: 'Cozy Cottage', date: '2023-06-17', time: '11:00', client: 'Carol Williams' },
  ],
}

export default function AgentDashboard() {
  const [agentData, setAgentData] = useState(mockAgentData)

  useEffect(() => {
    // Here you would typically fetch the agent data from your API
    // For now, we're using the mock data
    setAgentData(mockAgentData)
  }, [])

  return (
    <div className="bg-orange-50 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Agent Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agentData.assignedProperties}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agentData.totalBookings}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Client</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentData.upcomingBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.property}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>{booking.client}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


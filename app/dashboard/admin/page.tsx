'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Mock data for analytics
const mockAnalytics = {
  totalUsers: 1000,
  totalProperties: 500,
  totalBookings: 250,
  popularLocations: [
    { name: 'New York', count: 100 },
    { name: 'Los Angeles', count: 80 },
    { name: 'Chicago', count: 60 },
    { name: 'Houston', count: 40 },
    { name: 'Phoenix', count: 30 },
  ],
  propertyViews: [
    { date: '2023-06-01', views: 1000 },
    { date: '2023-06-02', views: 1200 },
    { date: '2023-06-03', views: 800 },
    { date: '2023-06-04', views: 1500 },
    { date: '2023-06-05', views: 2000 },
    { date: '2023-06-06', views: 1800 },
    { date: '2023-06-07', views: 2200 },
  ],
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(mockAnalytics)

  useEffect(() => {
    // Here you would typically fetch the analytics data from your API
    // For now, we're using the mock data
    setAnalytics(mockAnalytics)
  }, [])

  return (
    <div className="bg-orange-50 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalProperties}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalBookings}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.popularLocations}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="count" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Property Views (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.propertyViews}>
                <XAxis dataKey="date" />
                <YAxis />
                <Bar dataKey="views" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { PropertyCard } from '@/components/PropertyCard'

// Mock data for saved properties
const mockSavedProperties = [
  { id: 1, title: "Luxurious Villa", price: 1200000, bedrooms: 5, bathrooms: 4, sqft: 4500, image: "/placeholder.svg?height=300&width=400" },
  { id: 2, title: "Modern Apartment", price: 450000, bedrooms: 2, bathrooms: 2, sqft: 1200, image: "/placeholder.svg?height=300&width=400" },
]

export default function SavedPropertiesPage() {
  const [savedProperties, setSavedProperties] = useState(mockSavedProperties)

  useEffect(() => {
    // In a real application, you would fetch the saved properties from an API or local storage
    // For this example, we're using the mock data
  }, [])

  return (
    <div className="bg-orange-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Your Saved Properties</h1>
        {savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">You haven't saved any properties yet.</p>
        )}
      </div>
    </div>
  )
}


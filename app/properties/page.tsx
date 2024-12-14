import { PropertyCard } from "@/components/PropertyCard"

// Mock data for properties
const properties = [
  { id: 1, title: "Luxurious Villa", price: 1200000, bedrooms: 5, bathrooms: 4, sqft: 4500, image: "/placeholder.svg?height=300&width=400" },
  { id: 2, title: "Modern Apartment", price: 450000, bedrooms: 2, bathrooms: 2, sqft: 1200, image: "/placeholder.svg?height=300&width=400" },
  { id: 3, title: "Cozy Cottage", price: 350000, bedrooms: 3, bathrooms: 2, sqft: 1800, image: "/placeholder.svg?height=300&width=400" },
  { id: 4, title: "Suburban Family Home", price: 550000, bedrooms: 4, bathrooms: 3, sqft: 2500, image: "/placeholder.svg?height=300&width=400" },
  { id: 5, title: "Downtown Loft", price: 400000, bedrooms: 1, bathrooms: 1, sqft: 1000, image: "/placeholder.svg?height=300&width=400" },
  { id: 6, title: "Beachfront Condo", price: 750000, bedrooms: 3, bathrooms: 2, sqft: 1600, image: "/placeholder.svg?height=300&width=400" },
]

export default function PropertiesPage() {
  return (
    <div className="bg-orange-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </div>
  )
}


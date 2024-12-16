'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Home, Bed, Bath, Square, MapPin, Heart, CalendarDays } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

// Mock data for a single property
const property = {
  id: 1,
  title: "Luxurious Villa",
  price: 1200000,
  bedrooms: 5,
  bathrooms: 4,
  sqft: 4500,
  image: "/placeholder.svg?height=600&width=800",
  description: "This stunning luxurious villa offers breathtaking views and top-of-the-line amenities. With its spacious layout, high-end finishes, and prime location, it's the perfect home for those seeking the ultimate in comfort and style.",
  address: "123 Luxury Lane, Beverly Hills, CA 90210",
  features: [
    "Gourmet kitchen with high-end appliances",
    "Private pool and spa",
    "Home theater",
    "Wine cellar",
    "3-car garage",
  ]
}

type PageProps = {
  params: {
    propertyId: string
  }
}

export default function EditPropertyPage({ params }: PageProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    if (!isFavorite) {
      toast.success('Property added to favorites!')
    } else {
      toast.info('Property removed from favorites')
    }
    // Here you would typically update the favorite status in your backend or local storage
  }

  return (
    <div className="bg-orange-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <Image
              src={property.image}
              alt={property.title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
              <Button
                onClick={toggleFavorite}
                className={`p-2 ${isFavorite ? 'bg-pink-100 text-pink-500' : 'bg-gray-100 text-gray-500'} rounded-full`}
              >
                <Heart className={isFavorite ? 'fill-current' : ''} size={24} />
              </Button>
            </div>
            <p className="text-orange-500 font-bold text-2xl mb-4">${property.price.toLocaleString()}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Bed size={24} className="mr-2" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Bath size={24} className="mr-2" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Square size={24} className="mr-2" />
                <span>{property.sqft} sqft</span>
              </div>
            </div>
            <div className="flex items-center text-gray-600 mb-6">
              <MapPin size={24} className="mr-2" />
              <span>{property.address}</span>
            </div>
            <p className="text-gray-700 mb-6">{property.description}</p>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Features</h2>
            <ul className="list-disc list-inside mb-6 text-gray-700">
              {property.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className="flex space-x-4">
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full text-lg flex-1">
                <Link href={`/buy-property/${property.id}`}>Buy Now</Link>
              </Button>
              <Button onClick={toggleFavorite} className={`${isFavorite ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-300 hover:bg-gray-400'} text-white font-bold py-2 px-6 rounded-full text-lg flex-1`}>
                {isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
              </Button>
              <Button asChild className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full text-lg flex-1">
                <Link href={`/bookings/create/${property.id}`}>
                  <CalendarDays className="mr-2" size={18} />
                  Book a Tour
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


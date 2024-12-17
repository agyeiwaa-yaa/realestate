'use client'

import { usePropertyActions } from '@/hooks/use-property-actions'
import { CalendarDays, MapPin, User, DollarSign } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useProperties } from '@/hooks/use-properties'
import { useEffect } from 'react'

export default function PropertyPage() {
  const params = useParams()
  const { properties, loading, fetchProperties, getPropertyById } = useProperties()
  const { handleBooking, handleFavorite, isPropertyFavorited } = usePropertyActions()
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  console.log('Current params:', params)
  console.log('All properties:', properties)
  
  const property = getPropertyById(params.id as string)
  console.log('Found property:', property)

  const isFavorite = property ? isPropertyFavorited(property.property_id) : false
  console.log(property, "here");
  

  // Only show loading when properties haven't been fetched yet
  if (loading && properties.length === 0) {
    return <div>Loading...</div>
  }

  // Show not found if we have properties but couldn't find this specific one
  if (!property && properties.length > 0) {
    return <div>Property not found</div>
  }

  // Ensure the image URL is correctly formatted
  const imageUrl = property?.image_url?.startsWith('http') || property?.image_url?.startsWith('/')
    ? property.image_url
    : `/images/${property?.image_url || 'placeholder.jpg'}`;

  return (
    <div className="bg-orange-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-96">
                <Image
                  src={imageUrl}
                  alt={property?.title || 'Property'}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold mb-4">{property?.title}</h1>
              <p className="text-gray-600 mb-6">{property?.description}</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <DollarSign className="text-orange-500 mr-2" size={20} />
                  <span className="text-xl font-semibold">${property?.price}</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="text-orange-500 mr-2" size={20} />
                  <span>{property?.location}</span>
                </li>
                <li className="flex items-center">
                  <User className="text-orange-500 mr-2" size={20} />
                  <span>Agent: {property?.agent_name}</span>
                </li>
              </ul>
              <div className="flex space-x-4">
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full text-lg flex-1">
                  <Link href={`/buy-property/${property?.property_id}`}>Buy Now</Link>
                </Button>
                <Button 
                  onClick={() => handleFavorite(property?.property_id)} 
                  className={`${isFavorite ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-300 hover:bg-gray-400'} text-white font-bold py-2 px-6 rounded-full text-lg flex-1`}
                >
                  {isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
                </Button>
                <Button 
                  onClick={() => handleBooking(property?.property_id, property?.agent_id)}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full text-lg flex-1"
                >
                  <CalendarDays className="mr-2" size={18} />
                  Book a Tour
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


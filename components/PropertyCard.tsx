import Image from 'next/image'
import Link from 'next/link'
import { Home, MapPin, User, Heart, CalendarDays } from 'lucide-react'
import { usePropertyActions } from '@/hooks/use-property-actions'
import { Button } from './ui/button'

interface PropertyCardProps {
  property_id: number
  title: string
  description: string
  price: string
  location: string
  image_url?: string
  agent_id: number
  agent_name: string
  isFavorited: boolean
}

export function PropertyCard({ property_id, title, description, price, location, image_url, agent_id, agent_name, isFavorited }: PropertyCardProps) {
  const { handleFavorite, handleBooking } = usePropertyActions()

  const getRandomPropertyImage = () => {
    return `https://via.placeholder.com/400x300.png?text=Property`; // Basic placeholder
  };
  
  return (
    <div className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
        <div className="relative h-48">
          <Image
            src={getRandomPropertyImage()}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold text-orange-500">
            ${price}
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault()
              handleFavorite(property_id)
            }}
            className={`absolute top-2 left-2 p-2 rounded-full ${
              isFavorited ? 'bg-pink-500' : 'bg-white'
            }`}
          >
            <Heart size={20} className={isFavorited ? 'text-white' : 'text-pink-500'} />
          </Button>
        </div>
        <Link href={`/properties/${property_id}`}>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">{title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin size={16} className="mr-1 text-orange-500" />
              <span className="text-sm">{location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <User size={16} className="mr-1 text-pink-500" />
              <span className="text-sm">{agent_name}</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}


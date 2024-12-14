import Image from 'next/image'
import Link from 'next/link'
import { Home, Bed, Bath, Square } from 'lucide-react'

interface PropertyCardProps {
  id?: number
  title?: any
  price?: number
  bedrooms?: number
  bathrooms?: number
  sqft?: number
  image?: any
}

export function PropertyCard({ id, title, price, bedrooms, bathrooms, sqft, image }: PropertyCardProps) {
  return (
    <Link href={`/properties/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
        <div className="relative h-48">
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
          <p className="text-orange-500 font-bold text-lg mb-2">${price?.toLocaleString()}</p>
          <div className="flex justify-between text-gray-600">
            <div className="flex items-center">
              <Bed size={18} className="mr-1" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath size={18} className="mr-1" />
              <span>{bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square size={18} className="mr-1" />
              <span>{sqft} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}


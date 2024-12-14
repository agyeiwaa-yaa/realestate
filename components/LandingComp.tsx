import { Button } from "@/components/ui/button"
import { ArrowRight, Home, DollarSign, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function LandingComp() {
  return (
    <section className="py-16 bg-gradient-to-b from-orange-100 to-pink-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Find Your Dream Home</h2>
            <p className="text-lg mb-8 text-gray-600">
              Discover a wide range of properties tailored to your needs. From cozy apartments to luxurious villas, we have the perfect home waiting for you.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Home className="text-orange-500 mr-4" size={24} />
                <span className="text-gray-700">Extensive property listings</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="text-orange-500 mr-4" size={24} />
                <span className="text-gray-700">Competitive pricing</span>
              </div>
              <div className="flex items-center">
                <Users className="text-orange-500 mr-4" size={24} />
                <span className="text-gray-700">Expert real estate agents</span>
              </div>
            </div>
            <Button asChild className="mt-8 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full text-lg">
              <Link href="/properties">
                Explore Properties <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Beautiful home interior"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}


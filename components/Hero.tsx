'use client'
import header from "@/public/cottage.jpg"
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Static Header Image */}
      <Image
        src={header}
        alt="Cozy cottage by the lake"
        fill
        style={{ objectFit: 'cover' }}
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Homesphere</h1>
          <p className="text-xl md:text-2xl mb-8">Find your dream home with us</p>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full text-lg">
            <Link href="/properties">View Properties</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

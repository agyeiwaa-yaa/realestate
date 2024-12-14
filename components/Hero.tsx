'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

const slides = [
  { id: 1, image: '/placeholder.svg?height=600&width=1200', alt: 'Beautiful house with a garden' },
  { id: 2, image: '/placeholder.svg?height=600&width=1200', alt: 'Modern apartment in the city center' },
  { id: 3, image: '/placeholder.svg?height=600&width=1200', alt: 'Cozy cottage by the lake' },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Actual Real Estate</h1>
          <p className="text-xl md:text-2xl mb-8">Find your dream home with us</p>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full text-lg">
            <Link href="/properties">View Properties</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Mock property data
const property = {
  id: 1,
  title: "Luxurious Villa",
  price: 1200000,
  image: "/placeholder.svg?height=600&width=800"
}

export default function BuyPropertyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically process the purchase request
    console.log('Purchase request submitted:', formData)
    toast.success('Purchase request submitted successfully!')
    // Redirect to payment page
    router.push(`/payment/${params.id}`)
  }

  return (
    <div className="bg-orange-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src={property.image}
                alt={property.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Purchase Request</h1>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">{property.title}</h2>
                <p className="text-xl text-orange-500 font-bold">${property.price.toLocaleString()}</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <Input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full text-lg">
                  Proceed to Payment
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import Image from 'next/image'

export default function PaymentPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically process the payment
    console.log('Payment submitted:', formData)
    toast.success('Payment processed successfully!')
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    })
  }

  return (
    <div className="bg-orange-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Payment illustration"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="md:w-1/2 p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Payment Details</h1>
                <p className="text-gray-600">Complete your purchase for property ID: {params.id}</p>
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
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                  <Input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <Input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                    <Input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full text-lg">
                  Process Payment
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


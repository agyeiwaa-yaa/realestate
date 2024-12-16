'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'

type BookTourPageProps = {
  params: {
    propertyId: string
  }
}

export default function BookTourPage({ params }: BookTourPageProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    date: '',
    time: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevData => ({
      ...prevData, 
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Here you would typically send the booking request to your backend
      console.log('Booking submitted:', { ...formData, propertyId: params.propertyId })
      
      // Simulating an async operation
      // await submitBooking({ ...formData, propertyId: params.propertyId })
      
      toast.success('Tour booking request submitted successfully!')
      router.push('/bookings')
    } catch (error) {
      toast.error('Failed to submit booking request')
      console.error(error)
    }
  }

  return (
    <div className="bg-orange-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-6">
            <h1 className="text-3xl font-bold text-white">Book a Tour</h1>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                <Input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full text-lg"
              >
                Submit Booking Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
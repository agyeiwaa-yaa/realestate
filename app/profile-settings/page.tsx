'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { toast } from 'sonner'
import { ProfileSidebar } from '@/components/ProfileSidebar'

// Mock user data
const user = {
  role: 2, // 1: admin, 2: agent, 3: user
  name: 'John Doe',
  email: 'john@example.com',
  phone: '123-456-7890',
  bio: 'Experienced real estate agent with 10 years in the industry.',
  workingHours: '9 AM - 5 PM',
}

export default function ProfileSettingsPage() {
  const [formData, setFormData] = useState(user)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically update the user profile
    console.log('Profile updated:', formData)
    toast.success('Profile updated successfully!')
  }

  return (
    <div className="bg-orange-50 min-h-screen">
      <ProfileSidebar />
      <div className="ml-16 md:ml-64 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-6">
            <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
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
              {formData.role <= 2 && (
                <>
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700">Working Hours</label>
                    <Input
                      type="text"
                      id="workingHours"
                      name="workingHours"
                      value={formData.workingHours}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </>
              )}
              {formData.role === 1 && (
                <div>
                  <label htmlFor="adminSettings" className="block text-sm font-medium text-gray-700">Admin Settings</label>
                  <Select
                    id="adminSettings"
                    name="adminSettings"
                    className="mt-1"
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </div>
              )}
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full text-lg">
                Update Profile
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


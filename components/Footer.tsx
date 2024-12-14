import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Submitted email:', email)
    toast.success("Subscribed!", {
      description: "Thank you for subscribing to our newsletter.",
    })
    setEmail('')
  }

  return (
    <footer className="bg-orange-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-pink-600">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/properties" className="hover:text-orange-500 transition-colors">Properties</Link></li>
              <li><Link href="/agents" className="hover:text-orange-500 transition-colors">Our Agents</Link></li>
              <li><Link href="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-pink-600">Contact</h3>
            <p>123 Real Estate St.</p>
            <p>Cityville, State 12345</p>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@actualrealestate.com</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-pink-600">About</h3>
            <p>Actual Real Estate is your trusted partner in finding the perfect home. With years of experience and a dedicated team, we're here to make your real estate dreams a reality.</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-pink-600">Newsletter</h3>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white"
              />
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p>&copy; 2023 Actual Real Estate. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-orange-500"><Facebook size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-orange-500"><Twitter size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-orange-500"><Instagram size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-orange-500"><Mail size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


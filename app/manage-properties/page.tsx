'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2, Plus } from 'lucide-react'
import { toast } from 'sonner'

// Mock data for properties
const initialProperties = [
  { id: 1, title: "Luxurious Villa", price: 1200000, agent: "John Doe" },
  { id: 2, title: "Modern Apartment", price: 450000, agent: "Jane Smith" },
  { id: 3, title: "Cozy Cottage", price: 350000, agent: "John Doe" },
]

export default function ManagePropertiesPage() {
  const [properties, setProperties] = useState(initialProperties)
  const [newProperty, setNewProperty] = useState({ title: '', price: '', agent: '' })
  const [editingProperty, setEditingProperty] = useState<null | { id: number, title: string, price: number, agent: string }>(null)

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault()
    const property = {
      id: properties.length + 1,
      title: newProperty.title,
      price: parseFloat(newProperty.price),
      agent: newProperty.agent
    }
    setProperties([...properties, property])
    setNewProperty({ title: '', price: '', agent: '' })
    toast.success('Property added successfully!')
  }

  const handleEditProperty = (property: { id: number, title: string, price: number, agent: string }) => {
    setEditingProperty(property)
  }

  const handleUpdateProperty = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProperty) {
      setProperties(properties.map(p => p.id === editingProperty.id ? editingProperty : p))
      setEditingProperty(null)
      toast.success('Property updated successfully!')
    }
  }

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter(p => p.id !== id))
    toast.success('Property deleted successfully!')
  }

  return (
    <div className="bg-orange-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Manage Properties</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New Property</h2>
          <form onSubmit={handleAddProperty} className="space-y-4">
            <Input
              type="text"
              placeholder="Property Title"
              value={newProperty.title}
              onChange={(e) => setNewProperty({...newProperty, title: e.target.value})}
              required
            />
            <Input
              type="number"
              placeholder="Price"
              value={newProperty.price}
              onChange={(e) => setNewProperty({...newProperty, price: e.target.value})}
              required
            />
            <Input
              type="text"
              placeholder="Agent Name"
              value={newProperty.agent}
              onChange={(e) => setNewProperty({...newProperty, agent: e.target.value})}
              required
            />
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">Add Property</Button>
          </form>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Property Listings</h2>
          <div className="space-y-4">
            {properties.map(property => (
              <div key={property.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
                  <p className="text-gray-600">Price: ${property.price.toLocaleString()}</p>
                  <p className="text-gray-600">Agent: {property.agent}</p>
                </div>
                <div className="space-x-2">
                  <Button onClick={() => handleEditProperty(property)} className="bg-pink-600 hover:bg-pink-700">
                    <Pencil size={18} />
                  </Button>
                  <Button onClick={() => handleDeleteProperty(property.id)} className="bg-red-500 hover:bg-red-600">
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {editingProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit Property</h2>
              <form onSubmit={handleUpdateProperty} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Property Title"
                  value={editingProperty.title}
                  onChange={(e) => setEditingProperty({...editingProperty, title: e.target.value})}
                  required
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={editingProperty.price}
                  onChange={(e) => setEditingProperty({...editingProperty, price: parseFloat(e.target.value)})}
                  required
                />
                <Input
                  type="text"
                  placeholder="Agent Name"
                  value={editingProperty.agent}
                  onChange={(e) => setEditingProperty({...editingProperty, agent: e.target.value})}
                  required
                />
                <div className="flex justify-end space-x-2">
                  <Button type="button" onClick={() => setEditingProperty(null)} className="bg-gray-300 hover:bg-gray-400 text-gray-800">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                    Update Property
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


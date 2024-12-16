import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone } from 'lucide-react'

// Mock data for agents
const agents = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567', image: '/placeholder.svg?height=300&width=300' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 (555) 234-5678', image: '/placeholder.svg?height=300&width=300' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 (555) 345-6789', image: '/placeholder.svg?height=300&width=300' },
  { id: 4, name: 'Bob Williams', email: 'bob@example.com', phone: '+1 (555) 456-7890', image: '/placeholder.svg?height=300&width=300' },
]

export default function AgentsPage() {
  return (
    <div className="bg-orange-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Agents</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <Card key={agent.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-2xl mb-4">{agent.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="text-orange-500 mr-2" size={18} />
                    <span>{agent.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="text-orange-500 mr-2" size={18} />
                    <span>{agent.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


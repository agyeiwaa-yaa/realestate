'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus } from 'lucide-react'
import { toast } from 'sonner'

// Mock user data
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'agent' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'buyer' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'agent' },
]

export default function UserManagementPage() {
  const [users, setUsers] = useState(mockUsers)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'buyer' })
  const [editingUser, setEditingUser] = useState<null | { id: number, name: string, email: string, role: string }>(null)

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    const user = {
      id: users.length + 1,
      ...newUser
    }
    setUsers([...users, user])
    setNewUser({ name: '', email: '', role: 'buyer' })
    toast.success('User added successfully!')
  }

  const handleEditUser = (user: { id: number, name: string, email: string, role: string }) => {
    setEditingUser(user)
  }

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u))
      setEditingUser(null)
      toast.success('User updated successfully!')
    }
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id))
    toast.success('User deleted successfully!')
  }

  return (
    <div className="bg-orange-50 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">User Management</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New User</h2>
        <form onSubmit={handleAddUser} className="space-y-4">
          <Input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="buyer">Buyer</option>
            <option value="agent">Agent</option>
          </select>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600">Add User</Button>
        </form>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">User List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditUser(user)} className="bg-pink-600 hover:bg-pink-700 mr-2">
                    <Pencil size={18} />
                  </Button>
                  <Button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 hover:bg-red-600">
                    <Trash2 size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit User</h2>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <Input
                type="text"
                placeholder="Name"
                value={editingUser.name}
                onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                required
              />
              <select
                value={editingUser.role}
                onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="buyer">Buyer</option>
                <option value="agent">Agent</option>
              </select>
              <div className="flex justify-end space-x-2">
                <Button type="button" onClick={() => setEditingUser(null)} className="bg-gray-300 hover:bg-gray-400 text-gray-800">
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  Update User
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

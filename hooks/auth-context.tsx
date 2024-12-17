// hooks/auth-context.tsx
"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type AuthContextType = {
  isAuthenticated: boolean
  user: any
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, fullName: string, roleId: number) => Promise<void>
  logout: () => void
  getToken: () => string
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      setUser(JSON.parse(localStorage.getItem('user') || 'null'))
    }
    setLoading(false)
  }, [])



  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setIsAuthenticated(true);
        setUser(response.user);
        toast.success('Login successful!');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Login failed');
    }
  };

  const signup = async (email: string, password: string, fullName: string, roleId: number) => {
    try {
      const response = await authApi.signup(email, password, fullName, roleId);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setIsAuthenticated(true);
        setUser(response.user);
        toast.success('Signup successful!');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Signup failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/');
  };

  const getToken = () => {
    return localStorage.getItem('token') || '';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, signup, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
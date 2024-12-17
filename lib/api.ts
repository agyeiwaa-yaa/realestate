// API Base URL
const API_BASE_URL = '/api';

// Types
export interface Property {
  property_id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  image_url: string;
  agent_id: number;
  agent_name: string;
}

export interface Booking {
  booking_id: number;
  property_id: number;
  buyer_id: number;
  agent_id: number;
  property_title: string;
  buyer_name: string;
  agent_name: string;
}

export interface User {
  user_id: number;
  full_name: string;
  email: string;
  role_id: number;
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  signup: async ( email: string, password: string,fullName: string, roleId: number) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password, roleId }),
    });
    return response.json();
  },
};

// Properties API
export const propertiesApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/properties`);
    return response.json();
  },

  create: async (data: Omit<Property, 'property_id' | 'agent_name'>) => {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

// Bookings API
export const bookingsApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    return response.json();
  },

  create: async (propertyId: number, agentId: number) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId, agentId }),
    });
    return response.json();
  },
};

// Favorites API
export const favoritesApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/favorites`);
    return response.json();
  },

  add: async (propertyId: number) => {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId }),
    });
    return response.json();
  },
};

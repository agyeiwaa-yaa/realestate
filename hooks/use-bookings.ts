import { useState } from 'react';
import { toast } from 'sonner';

export function useBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const createBooking = async (propertyId: number, agentId: number) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propertyId, agentId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const data = await response.json();
      toast.success('Booking created successfully');
      return data;
    } catch (error) {
      toast.error('Failed to create booking');
      throw error;
    }
  };

  return { bookings, loading, createBooking };
} 
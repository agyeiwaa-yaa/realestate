import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from './auth-context';

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, getToken } = useAuth();

  const fetchFavorites = async () => {
    if (!user) {
      setFavorites([]);
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch('/api/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch favorites');
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (propertyId: number) => {
    if (!user) {
      toast.error('Please login to save favorites');
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ propertyId }),
      });

      if (!response.ok) throw new Error('Failed to update favorites');
      await fetchFavorites();
      return response.json();
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast.error('Failed to update favorites');
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  return { favorites, loading, addToFavorites, fetchFavorites };
} 
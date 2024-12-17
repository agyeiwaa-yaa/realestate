import { useState, useEffect } from 'react';
import { propertiesApi, Property } from '@/lib/api';
import { toast } from 'sonner';

let cachedProperties: Property[] = []; // Cache to store properties

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>(cachedProperties);
  const [loading, setLoading] = useState(false);

  const fetchProperties = async () => {
    if (cachedProperties.length > 0) {
      setProperties(cachedProperties); // Use cached properties if available
      return;
    }

    try {
      setLoading(true);
      const data = await propertiesApi.getAll();
      cachedProperties = data; // Cache the fetched properties
      setProperties(data);
    } catch (error) {
      toast.error('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const getPropertyById = (id: string) => {
    return properties.find(property => property.property_id.toString() === id);
  };

  return { properties, loading, fetchProperties, getPropertyById };
} 
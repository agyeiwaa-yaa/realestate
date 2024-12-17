"use client"
import { PropertyCard } from "@/components/PropertyCard"
import { useProperties } from "@/hooks/use-properties";
import { useFavorites } from "@/hooks/use-favorites";
import { useEffect } from "react";

// Mock data for properties

export default function PropertiesPage() {
  const { properties, loading, fetchProperties } = useProperties();
  const { favorites, fetchFavorites } = useFavorites();

  useEffect(() => {
    fetchProperties();
    fetchFavorites();
  }, []);

  return (
    <div className="bg-orange-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties?.map((property) => (
            <PropertyCard 
              key={property.property_id} 
              {...property} 
              price={property.price.toString()} 
              isFavorited={favorites.some(fav => fav.property_id === property.property_id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}


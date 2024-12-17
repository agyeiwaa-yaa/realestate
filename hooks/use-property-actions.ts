import { useAuth } from './auth-context'
import { useBookings } from './use-bookings'
import { useFavorites } from './use-favorites'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function usePropertyActions() {
  const { user } = useAuth()
  const { createBooking } = useBookings()
  const { addToFavorites, favorites, fetchFavorites } = useFavorites()
  const router = useRouter()

  const handleBooking = async (propertyId: any, agentId: any) => {
    if (!user) {
      toast.error('Please login to book a property')
      router.push('/login')
      return
    }

    if (user.roleId !== 3) {
      toast.error('Only users can book properties')
      return
    }

    try {
      console.log('Creating booking:', { propertyId, agentId }) // Debug log
      const result = await createBooking(propertyId, agentId)
      console.log('Booking result:', result) // Debug log
      toast.success('Booking created successfully')
      router.push('/bookings')
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Failed to create booking')
    }
  }

  const handleFavorite = async (propertyId: any) =>  {
    if (!user) {
      toast.error('Please login to save favorites')
      router.push('/login')
      return
    }

    try {
      console.log('Updating favorites:', propertyId) // Debug log
      await addToFavorites(propertyId)
      await fetchFavorites() // Refresh favorites after adding
    } catch (error) {
      console.error('Favorite error:', error)
      toast.error('Failed to update favorites')
    }
  }

  const isPropertyFavorited = (propertyId: number) => {
    return favorites.some(fav => fav.property_id === propertyId)
  }

  return {
    handleBooking,
    handleFavorite,
    isPropertyFavorited,
    userRole: user?.role
  }
} 
import { create } from 'zustand'

export const useWishlistStore = create((set, get) => ({
  wishlist: [],
  
  toggleWishlist: (resourceId) => set((state) => {
    const isLiked = state.wishlist.includes(resourceId)
    if (isLiked) {
      return { wishlist: state.wishlist.filter(id => id !== resourceId) }
    } else {
      return { wishlist: [...state.wishlist, resourceId] }
    }
  }),
  
  isWishlisted: (resourceId) => get().wishlist.includes(resourceId),
}))

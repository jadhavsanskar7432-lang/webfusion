import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Search } from 'lucide-react'
import { ResourceCard } from '@/components/shared/ResourceCard'
import { EmptyState } from '@/components/shared/EmptyState'
import { useWishlistStore } from '@/store/wishlistStore'
import { useResourceStore } from '@/store/resourceStore'

export default function WishlistPage() {
  const { wishlist } = useWishlistStore()
  const { getResourceById } = useResourceStore()
  
  const wishlistedResources = wishlist.map(id => getResourceById(id)).filter(Boolean)

  return (
    <div className="container py-6 sm:py-8">
      <Link
        to="/discover"
        className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink mb-6 transition-colors duration-150"
      >
        <ArrowLeft size={16} />
        Back to Discover
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-medium text-ink mb-2 flex items-center gap-2">
          <Heart className="fill-moss text-moss" size={28} />
          Your Wishlist
        </h1>
        <p className="text-ink/60 text-sm">
          Keep track of resources you're interested in borrowing.
        </p>
      </div>

      {wishlistedResources.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          description="You haven't liked any resources yet. Discover what's available on campus."
          action={{ label: 'Explore Resources', onClick: () => window.location.href = '/discover' }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {wishlistedResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <ResourceCard resource={resource} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

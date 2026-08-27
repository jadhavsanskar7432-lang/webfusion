import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Star, Clock, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useUnsplashImage } from '@/hooks/useUnsplashImage'
import { useWishlistStore } from '@/store/wishlistStore'
import { cn } from '@/lib/cn'

const categoryColors = {
  camera: 'from-moss/20 to-moss/5',
  laptop: 'from-ink/15 to-ink/5',
  tripod: 'from-brass/20 to-brass/5',
  microphone: 'from-stamp/15 to-stamp/5',
  lighting: 'from-brass/25 to-brass/5',
  calculator: 'from-moss/15 to-moss/5',
  textbook: 'from-ink/10 to-ink/5',
  projector: 'from-moss/25 to-moss/5',
  sports: 'from-stamp/20 to-stamp/5',
  tools: 'from-ink/20 to-ink/5',
}

const categoryEmoji = {
  camera: '📷',
  laptop: '💻',
  tripod: '📐',
  microphone: '🎙️',
  lighting: '💡',
  calculator: '🧮',
  textbook: '📚',
  projector: '📽️',
  sports: '🏏',
  tools: '🔧',
}

export function ResourceCard({ resource, className }) {
  const { imageUrl } = useUnsplashImage(resource.category, resource.id)
  const { isWishlisted, toggleWishlist } = useWishlistStore()
  const liked = isWishlisted(resource.id)

  const handleLike = (e) => {
    e.preventDefault()
    toggleWishlist(resource.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      whileHover={{ y: -2 }}
      className={cn('group', className)}
    >
      <Link
        to={`/resource/${resource.id}`}
        id={`resource-card-${resource.id}`}
        className="block rounded-[4px] border border-ink/10 bg-card overflow-hidden transition-colors duration-150 hover:border-ink/20"
      >
        <div className={cn('relative h-48 bg-gradient-to-br flex items-center justify-center', categoryColors[resource.category] || 'from-ink/10 to-ink/5')}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={resource.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="text-5xl" role="img" aria-label={resource.category}>
              {categoryEmoji[resource.category] || '📦'}
            </span>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant={resource.available ? 'moss' : 'default'}>
              {resource.available ? 'Available' : 'Unavailable'}
            </Badge>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <Badge variant="outline" className="bg-card/80 backdrop-blur-sm">
              {resource.category}
            </Badge>
            <button
              onClick={handleLike}
              className="w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors duration-150 cursor-pointer shadow-sm"
              aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={16} className={cn("transition-colors duration-150", liked ? "fill-moss text-moss" : "text-ink/60")} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-body font-medium text-ink text-sm leading-tight group-hover:text-moss transition-colors duration-150">
              {resource.name}
            </h3>
            <p className="text-xs text-ink/60 mt-0.5">{resource.condition} condition</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-mono text-sm font-medium text-ink">
              ₹{resource.pricePerDay}<span className="text-xs text-ink/40 font-body">/day</span>
            </span>
            <div className="flex items-center gap-1 text-xs text-ink/60">
              <Star size={12} className="text-brass fill-brass" />
              <span className="font-mono">{resource.rating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-ink/50">
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              <span className="font-mono">{resource.distance < 1 ? `${Math.round(resource.distance * 1000)}m` : `${resource.distance.toFixed(1)}km`}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span className="font-mono">{resource.history.exchanges} exchanges</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-ink/5">
            <div className="w-5 h-5 rounded-full bg-moss/20 flex items-center justify-center text-[10px] font-medium text-moss">
              {resource.owner.name.charAt(0)}
            </div>
            <span className="text-xs text-ink/60 truncate">{resource.owner.name}</span>
            {resource.owner.verified && (
              <span className="text-[10px] text-moss">✓</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

ResourceCard.displayName = 'ResourceCard'

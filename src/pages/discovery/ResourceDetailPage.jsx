import { useParams, Link } from 'react-router-dom'
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, MapPin, Clock, Shield, ShieldCheck, Package, ChevronRight, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrustBadge } from '@/components/shared/TrustBadge'
import { PricingBreakdown } from '@/components/shared/PricingBreakdown'
import { RedactedSection } from '@/components/shared/RedactedField'
import { LocationDisplay } from '@/components/shared/LocationDisplay'
import { DetailSkeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/shared/EmptyState'
import { useResourceStore } from '@/store/resourceStore'
import { useExchangeStore } from '@/store/exchangeStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUnsplashImage } from '@/hooks/useUnsplashImage'
import { cn } from '@/lib/cn'

const categoryEmoji = {
  camera: '📷', laptop: '💻', tripod: '📐', microphone: '🎙️',
  lighting: '💡', calculator: '🧮', textbook: '📚', projector: '📽️',
  sports: '🏏', tools: '🔧',
}

const categoryColors = {
  camera: 'from-success/20 to-success/5',
  laptop: 'from-text-primary/15 to-text-primary/5',
  tripod: 'from-trust/20 to-trust/5',
  microphone: 'from-danger/15 to-danger/5',
  lighting: 'from-trust/25 to-trust/5',
  calculator: 'from-success/15 to-success/5',
  textbook: 'from-text-primary/10 to-text-primary/5',
  projector: 'from-success/25 to-success/5',
  sports: 'from-danger/20 to-danger/5',
  tools: 'from-text-primary/20 to-text-primary/5',
}

export default function ResourceDetailPage() {
  const { id } = useParams()
  const getResourceById = useResourceStore((s) => s.getResourceById)
  const { currentUser, createExchange, getActiveExchange } = useExchangeStore()

  const resource = useMemo(() => getResourceById(id), [id, getResourceById])
  const activeExchange = useMemo(() => resource ? getActiveExchange(resource.id) : null, [resource, getActiveExchange])
  const isRevealed = activeExchange && activeExchange.status !== 'requested'
  const isOwnResource = resource && resource.owner.id === currentUser.id
  const { imageUrl, regularUrl, photographer, photographerUrl } = useUnsplashImage(resource?.category, resource?.id)
  const { isWishlisted, toggleWishlist } = useWishlistStore()
  const liked = resource ? isWishlisted(resource.id) : false

  const handleLike = (e) => {
    e.preventDefault()
    if (resource) toggleWishlist(resource.id)
  }

  if (!resource) {
    return (
      <div className="container py-8">
        <EmptyState
          title="Resource not found"
          description="This resource doesn't exist or has been removed."
          action={{ label: 'Back to Discover', onClick: () => window.history.back() }}
        />
      </div>
    )
  }

  function handleBorrowRequest() {
    createExchange({
      resourceId: resource.id,
      borrowerId: currentUser.id,
      lenderId: resource.owner.id,
      duration: 1,
      borrowingCharge: resource.pricePerDay,
      platformFee: Math.round(resource.pricePerDay * 0.10),
      deposit: resource.deposit,
      totalAmount: resource.pricePerDay + Math.round(resource.pricePerDay * 0.10) + resource.deposit,
    })
  }

  return (
    <div className="container py-6 sm:py-8">
      <Link
        to="/discover"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors duration-150"
      >
        <ArrowLeft size={16} />
        Back to Discover
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            <div className={cn(
<<<<<<< Updated upstream
              'relative h-64 sm:h-80 rounded-[4px] bg-gradient-to-br flex items-center justify-center overflow-hidden',
              categoryColors[resource.category] || 'from-ink/10 to-ink/5'
=======
              'relative h-64 sm:h-80 rounded-[4px] bg-gradient-to-br flex items-center justify-center',
              categoryColors[resource.category] || 'from-text-primary/10 to-text-primary/5'
>>>>>>> Stashed changes
            )}>
              {(regularUrl || imageUrl) ? (
                <img
                  src={regularUrl || imageUrl}
                  alt={resource.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <span className="text-7xl" role="img" aria-label={resource.category}>
                  {categoryEmoji[resource.category] || '📦'}
                </span>
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant={resource.available ? 'success' : 'default'}>
                  {resource.available ? 'Available' : 'Unavailable'}
                </Badge>
                <Badge variant="outline" className="bg-surface/80 backdrop-blur-sm capitalize">
                  {resource.category}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleLike}
                  className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors duration-150 cursor-pointer shadow-sm"
                  aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart size={20} className={cn("transition-colors duration-150", liked ? "fill-moss text-moss" : "text-ink/60")} />
                </button>
              </div>
            </div>
            {photographer && (
              <p className="text-[11px] text-ink/35 mt-1.5">
                Photo by{' '}
                <a
                  href={`${photographerUrl}?utm_source=campus_circular&utm_medium=referral`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-ink/50 transition-colors duration-150"
                >
                  {photographer}
                </a>
                {' '}on{' '}
                <a
                  href="https://unsplash.com?utm_source=campus_circular&utm_medium=referral"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-ink/50 transition-colors duration-150"
                >
                  Unsplash
                </a>
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.05 }}
            className="space-y-4"
          >
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-medium text-text-primary mb-2">
                {resource.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-trust fill-trust" />
                  <span className="font-mono">{resource.rating}</span>
                  <span className="text-xs">({resource.history.exchanges} exchanges)</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span className="font-mono">{resource.distance < 1 ? `${Math.round(resource.distance * 1000)}m` : `${resource.distance.toFixed(1)}km`}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Package size={14} />
                  {resource.condition}
                </span>
              </div>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">{resource.description}</p>

            {resource.accessories.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-2">Included Accessories</h3>
                <div className="flex flex-wrap gap-2">
                  {resource.accessories.map((acc) => (
                    <Badge key={acc} variant="outline">{acc}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-[4px] border border-border-subtle bg-surface p-4">
              <h3 className="text-sm font-medium text-text-primary mb-3">Borrowing Terms</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-text-secondary text-xs">Daily Rate</p>
                  <p className="font-mono font-medium text-text-primary">₹{resource.pricePerDay}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-xs">Security Deposit</p>
                  <p className="font-mono font-medium text-text-primary">₹{resource.deposit.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-xs">Condition</p>
                  <p className="font-medium text-text-primary">{resource.condition}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-xs">Damage Reports</p>
                  <p className="font-mono font-medium text-text-primary">{resource.history.damageReports}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.1 }}
            className="rounded-[4px] border border-border-subtle bg-surface p-4"
          >
            <h3 className="text-sm font-medium text-text-primary mb-3">Owner</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-sm font-medium text-success">
                {resource.owner.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-text-primary">{resource.owner.name.split(' ')[0]}</span>
                  {resource.owner.verified && (
                    <ShieldCheck size={14} className="text-success" />
                  )}
                </div>
                <p className="text-xs text-text-secondary">{resource.owner.department} · Year {resource.owner.year}</p>
              </div>
            </div>
            <TrustBadge
              score={resource.owner.trustScore}
              verified={resource.owner.verified}
              size="sm"
              className="mb-3"
            />
            <Link
              to={`/trust/${resource.owner.id}`}
              className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors duration-150"
            >
              View full profile
              <ChevronRight size={12} />
            </Link>
          </motion.div>

          {isRevealed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="rounded-[4px] border border-success/20 bg-surface p-4 space-y-2"
            >
              <h3 className="text-sm font-medium text-success mb-2">Contact Details</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-text-secondary">Full Name</p>
                  <p className="text-text-primary">{resource.owner.name}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Phone</p>
                  <p className="font-mono text-text-primary">{resource.owner.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Email</p>
                  <p className="text-text-primary">{resource.owner.email}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <RedactedSection />
          )}

          <LocationDisplay location={resource.location} isRevealed={isRevealed} />

          <PricingBreakdown
            pricePerDay={resource.pricePerDay}
            deposit={resource.deposit}
            duration={1}
          />

          {!isOwnResource && (
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!resource.available || !!activeExchange}
              onClick={handleBorrowRequest}
              id={`borrow-btn-${resource.id}`}
            >
              {activeExchange
                ? `Status: ${activeExchange.status.replace('_', ' ')}`
                : resource.available
                  ? 'Request to Borrow'
                  : 'Currently Unavailable'}
            </Button>
          )}

          {isOwnResource && (
            <div className="rounded-[4px] border border-accent/20 bg-accent/5 p-3 text-center">
              <p className="text-xs text-accent font-medium">This is your listing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

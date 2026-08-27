import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, ShieldCheck } from 'lucide-react'
import { useUnsplashImage } from '@/hooks/useUnsplashImage'
import { ResourceModal } from '@/components/shared/ResourceModal'

const categoryEmoji = {
  camera: '📷', laptop: '💻', tripod: '📐', microphone: '🎙️',
  lighting: '💡', calculator: '🧮', textbook: '📚', projector: '📽️',
  sports: '🏅', tools: '🔧'
}

export function ResourceCard({ resource }) {
  const { imageUrl } = useUnsplashImage(resource.category, resource.id)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsModalOpen(true)}
        className="glass-card"
        style={{
          width: '220px',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Product Image Area */}
        <div style={{
          height: '180px',
          width: '100%',
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px 12px 0 0'
        }}>
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={resource.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
              loading="lazy"
            />
          ) : (
            <span style={{ fontSize: '64px' }}>{categoryEmoji[resource.category] || '📦'}</span>
          )}
          
          {/* Availability Badge */}
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            background: resource.available ? 'rgba(46, 172, 109, 0.2)' : 'rgba(235, 87, 87, 0.2)',
            border: `1px solid ${resource.available ? 'rgba(46, 172, 109, 0.4)' : 'rgba(235, 87, 87, 0.4)'}`,
            color: resource.available ? '#4ade80' : '#f87171',
            padding: '2px 8px', borderRadius: '999px',
            fontSize: '10px', fontWeight: 600, backdropFilter: 'blur(8px)',
          }}>
            {resource.available ? 'Available' : 'Unavailable'}
          </div>

          {/* Bottom Gradient Overlay for text legibility (if we had text on image, but we don't, it's just nice styling) */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)'
          }} />
        </div>

        {/* Info Area */}
        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <h3 style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              color: 'white',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {resource.name}
            </h3>
            <p style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.55)',
              margin: '2px 0 0',
              textTransform: 'capitalize'
            }}>
              {resource.category}
            </p>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />

          {/* Bottom Row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: 'white'
          }}>
            <span style={{ fontWeight: 600 }}>₹{resource.pricePerDay}<span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>/day</span></span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                ⭐ {resource.rating}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <MapPin size={10} /> {resource.distance < 1 ? `${Math.round(resource.distance * 1000)}m` : `${resource.distance.toFixed(1)}km`}
              </span>
            </div>
          </div>

          {/* Owner Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
            <div style={{
              width: '16px', height: '16px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '9px', fontWeight: 600, color: 'white'
            }}>
              {resource.owner.name.charAt(0)}
            </div>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
              {resource.owner.name.split(' ')[0]}
            </span>
            {resource.owner.verified && <ShieldCheck size={10} color="#4ade80" />}
          </div>
        </div>
      </motion.div>

      {isModalOpen && (
        <ResourceModal 
          resource={resource} 
          imageUrl={imageUrl} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  )
}

ResourceCard.displayName = 'ResourceCard'
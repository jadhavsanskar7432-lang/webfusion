import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ShieldCheck, X } from 'lucide-react'
import { PricingBreakdown } from '@/components/shared/PricingBreakdown'

const categoryEmoji = {
  camera: '📷', laptop: '💻', tripod: '📐', microphone: '🎙️',
  lighting: '💡', calculator: '🧮', textbook: '📚', projector: '📽️',
  sports: '🏅', tools: '🔧'
}

export function ResourceModal({ resource, onClose, imageUrl }) {
  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="glass-strong"
          style={{
            position: 'relative', zIndex: 51,
            width: '100%', maxWidth: '560px',
            maxHeight: '85vh', overflowY: 'auto',
            borderRadius: '20px', padding: '28px',
            color: 'white'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'rgba(0,0,0,0.3)', border: 'none',
              borderRadius: '50%', padding: '6px',
              cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 2,
            }}
          >
            <X size={18} />
          </button>

          {/* Large Image */}
          <div style={{
            width: '100%', height: '240px',
            borderRadius: '12px', overflow: 'hidden',
            marginBottom: '20px', position: 'relative',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {imageUrl ? (
              <img src={imageUrl} alt={resource.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '72px' }}>{categoryEmoji[resource.category] || '📦'}</span>
            )}
            <div style={{
              position: 'absolute', top: '12px', left: '12px',
              background: resource.available ? 'rgba(46, 172, 109, 0.2)' : 'rgba(235, 87, 87, 0.2)',
              border: `1px solid ${resource.available ? 'rgba(46, 172, 109, 0.4)' : 'rgba(235, 87, 87, 0.4)'}`,
              color: resource.available ? '#4ade80' : '#f87171',
              padding: '4px 10px', borderRadius: '999px',
              fontSize: '11px', fontWeight: 600, backdropFilter: 'blur(8px)',
            }}>
              {resource.available ? 'Available' : 'Unavailable'}
            </div>
          </div>

          {/* Header */}
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', margin: '0 0 8px 0', lineHeight: 1.2 }}>
            {resource.name}
          </h2>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <span className="glass" style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', textTransform: 'capitalize' }}>
              {resource.category}
            </span>
            <span className="glass" style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px' }}>
              {resource.condition} condition
            </span>
          </div>

          {/* Description */}
          <p style={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '14px', color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.5, marginBottom: '20px'
          }}>
            {resource.description || 'No description provided.'}
          </p>

          {/* Accessories */}
          {resource.accessories && resource.accessories.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Included Accessories
              </h3>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {resource.accessories.map((acc, i) => (
                  <span key={i} className="glass" style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
                    {acc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Breakdown (Inner glass panel) */}
          <div className="glass" style={{ borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              Pricing Breakdown (1 day)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: '"IBM Plex Mono", monospace', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Borrowing Charge</span>
                <span>₹{resource.pricePerDay}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Platform Fee</span>
                <span>₹{Math.round(resource.pricePerDay * 0.1)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Security Deposit <span style={{ fontSize: '10px', color: '#4ade80', marginLeft: '4px' }}>(Refundable)</span></span>
                <span>₹{resource.deposit || 500}</span>
              </div>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                <span>Total</span>
                <span>₹{resource.pricePerDay + Math.round(resource.pricePerDay * 0.1) + (resource.deposit || 500)}</span>
              </div>
            </div>
          </div>

          {/* Owner & Location */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 600 }}>
                {resource.owner.name.charAt(0)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>{resource.owner.name}</span>
                  {resource.owner.verified && <ShieldCheck size={14} color="#4ade80" />}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ⭐ {resource.owner.trustScore} Trust Score
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</span>
              <span style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                <MapPin size={12} />
                {resource.distance < 1 ? `${Math.round(resource.distance * 1000)}m` : `${resource.distance.toFixed(1)}km`}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button style={{
            width: '100%', padding: '16px', borderRadius: '999px',
            background: '#4B9EE5', color: 'white', border: 'none',
            fontSize: '15px', fontWeight: 600, cursor: 'pointer',
            transition: 'background 0.2s'
          }}>
            Request to Borrow
          </button>

        </motion.div>
      </div>
    </AnimatePresence>
  )
}

ResourceModal.displayName = 'ResourceModal'

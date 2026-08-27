import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SearchHero } from '@/components/discovery/SearchHero'
import { IntentDisplay } from '@/components/discovery/IntentDisplay'
import { RecommendedKit } from '@/components/discovery/RecommendedKit'
import { IsometricMap } from '@/components/discovery/IsometricMap'
import { extractIntent } from '@/lib/intentExtraction'
import { resources } from '@/data/resources'

const activities = [
  { user: 'Arjun Mehta', dept: 'Computer Science', item: 'Camera', status: 'Lending', avatar: 'A', color: '#4B9EE5' },
  { user: 'Priya Sharma', dept: 'Mechanical Engg', item: 'Tripod', status: 'Lending', avatar: 'P', color: '#E5954B' },
  { user: 'Rohan Desai', dept: 'Electrical Engg', item: 'Textbooks', status: 'Seeking', avatar: 'R', color: '#7C6FCD' },
  { user: 'Sneha Kulkarni', dept: 'Architecture', item: 'Camera', status: 'Lending', avatar: 'S', color: '#4BE5A0' },
  { user: 'Vikram Singh', dept: 'Physics', item: 'Camera', status: 'Lending', avatar: 'V', color: '#E54B4B' },
  { user: 'Kabir Patel', dept: 'Civil Engg', item: 'Projector', status: 'Seeking', avatar: 'K', color: '#B54BE5' },
]

const stats = [
  { value: '1,284', label: 'Resources Reused' },
  { value: '₹4.8L', label: 'Saved by borrowing' },
  { value: '82%', label: 'On-time returns' },
  { value: '320+', label: 'Students sharing' },
]

export default function HomePage() {
  const [intent, setIntent] = useState(null)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const matchedResources = useMemo(() => {
    if (!intent) return []
    if (intent.needs && intent.needs.length > 0) {
      return resources.filter((r) => intent.needs.includes(r.category))
    }
    if (intent.query) {
      const q = intent.query.toLowerCase()
      return resources.filter((r) =>
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        (r.description && r.description.toLowerCase().includes(q))
      )
    }
    return []
  }, [intent])

  function handleSearch(query) {
    const result = extractIntent(query)
    setIntent(result)
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column', background: '#F5EFE0' }}>

      {/* HERO */}
      <section style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        minHeight: 'calc(100dvh - 56px)',
        overflow: 'hidden',
      }}>

        {/* LEFT — Search */}
        <div style={{
          width: isDesktop ? '44%' : '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: isDesktop ? '48px 48px 48px 64px' : '32px 24px',
          zIndex: 1,
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Live badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid #E0D0B8',
              borderRadius: '999px',
              padding: '4px 12px',
              marginBottom: '24px',
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#4B9EE5', display: 'inline-block',
                animation: 'pulse 2s infinite',
              }} />
              <span style={{ fontSize: '11px', color: '#8A7A6A', fontWeight: 500, letterSpacing: '0.04em' }}>
                AI-Powered Resource Matching
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.6rem)',
              color: '#2A2018',
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              margin: '0 0 16px 0',
              fontWeight: 600,
            }}>
              Borrow what you need,{' '}
              <span style={{ color: '#4B9EE5' }}>from your campus.</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '16px',
              color: '#8A7A6A',
              lineHeight: 1.6,
              margin: '0 0 32px 0',
              maxWidth: '380px',
            }}>
              Tell us what you're trying to do. We'll find the perfect kit from students around you.
            </p>

            {/* Search */}
            <SearchHero onSearch={handleSearch} theme="warm" />
          </motion.div>
        </div>

        {/* RIGHT — Map + Panel */}
        {isDesktop && (
          <div style={{
            width: '56%',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
          }}>

          {/* Map area */}
          <div style={{
            flex: 1,
            background: 'linear-gradient(140deg, #EDE4D0 0%, #F0E8D8 50%, #E8DCC8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            position: 'relative',
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{ width: '100%', maxWidth: '420px' }}
            >
              <IsometricMap />
            </motion.div>
          </div>

          {/* Activity panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            style={{
              width: '220px',
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(8px)',
              borderLeft: '1px solid #E0D0B8',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {/* Panel header */}
            <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid #E0D0B8' }}>
              <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#8A7A6A', margin: 0 }}>
                Campus Circular
              </p>
              <p style={{ fontSize: '9px', color: '#A09080', margin: '2px 0 0' }}>Shared Resource Network State</p>
            </div>

            {/* Column labels */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '6px 16px', borderBottom: '1px solid #E0D0B8',
            }}>
              <span style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#B0A090', fontWeight: 600 }}>Student Name</span>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#B0A090', fontWeight: 600 }}>Items</span>
                <span style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#B0A090', fontWeight: 600 }}>Status</span>
              </div>
            </div>

            {/* Rows */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {activities.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.07, duration: 0.3 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '9px 16px',
                    borderBottom: '1px solid #EDE4D8',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      background: a.color, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '10px', fontWeight: 700,
                      color: 'white', flexShrink: 0,
                    }}>
                      {a.avatar}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: '10px', fontWeight: 600, color: '#2A2018', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.user}</p>
                      <p style={{ fontSize: '8px', color: '#A09080', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.dept}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, marginLeft: '8px' }}>
                    <span style={{ fontSize: '9px', fontFamily: 'monospace', color: '#5A4A3A' }}>{a.item}</span>
                    <span style={{
                      fontSize: '8px', fontWeight: 700, padding: '2px 6px', borderRadius: '999px',
                      background: a.status === 'Lending' ? '#D4EDDA' : '#FFF3CD',
                      color: a.status === 'Lending' ? '#1E6640' : '#7A5800',
                    }}>
                      {a.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer button */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid #E0D0B8' }}>
              <button style={{
                width: '100%', fontSize: '10px', fontWeight: 600, color: '#8A7A6A',
                padding: '7px', border: '1px solid #D0C0A8', borderRadius: '6px',
                background: 'transparent', cursor: 'pointer',
              }}>
                View Full Network Profile →
              </button>
            </div>
          </motion.div>
        </div>
        )}
      </section>

      {/* STATS STRIP */}
      <div style={{ background: '#EDE4D0', borderTop: '1px solid #D4C4A8' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'Fraunces, serif', fontSize: '2rem', fontWeight: 600, color: '#2A2018', margin: 0 }}>{s.value}</p>
              <p style={{ fontSize: '12px', color: '#8A7A6A', margin: '4px 0 0' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RESULTS */}
      {intent && (
        <div id="results-section" style={{ padding: '48px 32px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <IntentDisplay intent={intent} />
          {matchedResources.length > 0 && (
            <RecommendedKit resources={matchedResources} intent={intent} />
          )}
        </div>
      )}
    </div>
  )
}

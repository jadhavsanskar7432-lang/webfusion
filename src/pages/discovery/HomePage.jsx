import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SearchHero } from '@/components/discovery/SearchHero'
import { IntentDisplay } from '@/components/discovery/IntentDisplay'
import { RecommendedKit } from '@/components/discovery/RecommendedKit'
import { extractIntent } from '@/lib/intentExtraction'
import { resources } from '@/data/resources'

const activities = [
  { user: 'Aarav M.', action: 'listed a Canon EOS', location: 'Engg Block', time: '2m ago', icon: '📷' },
  { user: 'Priya S.', action: 'borrowed a Tripod', location: 'Media Lab', time: '5m ago', icon: '🎬' },
  { user: 'Rohan D.', action: 'listed a MacBook Pro', location: 'Library', time: '12m ago', icon: '💻' },
  { user: 'Sneha K.', action: 'returned a Projector', location: 'Seminar Hall', time: '18m ago', icon: '📽️' },
  { user: 'Vikram S.', action: 'requested a Mic', location: 'Auditorium', time: '24m ago', icon: '🎤' },
]

export default function HomePage() {
  const [intent, setIntent] = useState(null)

  const matchedResources = useMemo(() => {
    if (!intent || intent.needs.length === 0) {
      if (intent && intent.query) {
        return resources.filter((r) =>
          r.name.toLowerCase().includes(intent.query) ||
          r.category.toLowerCase().includes(intent.query) ||
          r.description.toLowerCase().includes(intent.query)
        )
      }
      return []
    }
    return resources.filter((r) => intent.needs.includes(r.category))
  }, [intent])

  function handleSearch(query) {
    const result = extractIntent(query)
    setIntent(result)
    
    // Automatically scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col">
      <section className="relative flex-1 flex flex-col items-center justify-center pb-24 px-4 min-h-[calc(100dvh-56px)] overflow-hidden">
        {/* Background Dot Grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" className="text-accent" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>

        {/* Left Floating Cards */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -6 }}
          animate={{ opacity: 1, x: 0, rotate: -6 }}
          transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
          className="hidden md:block absolute left-[-20px] md:left-[4%] top-[30%] z-10 bg-surface border border-border-subtle rounded-lg p-3 w-48 shadow-xl shadow-black/30"
        >
          <div className="h-24 rounded bg-success/20 mb-3 flex items-center justify-center text-4xl">
            📷
          </div>
          <p className="text-sm font-medium text-text-primary truncate">Canon EOS 1500D</p>
          <p className="text-[10px] text-text-secondary mt-1">📍 Engineering Block · 280m</p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-mono text-xs font-semibold text-text-primary">₹150/day</span>
            <span className="text-[10px] text-text-secondary flex items-center gap-0.5">⭐ 4.9</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -3 }}
          animate={{ opacity: 1, x: 0, rotate: -3 }}
          transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
          className="hidden md:block absolute left-[2%] top-[52%] z-0 bg-surface/60 backdrop-blur-sm border border-border-subtle/40 rounded-lg p-2 w-40 text-xs text-text-secondary shadow-lg"
        >
          📷 3 cameras nearby
        </motion.div>

        {/* Right Activity Ticker */}
        <div className="hidden md:flex absolute right-[3%] top-[25%] z-10 flex-col gap-2 w-56">
          {activities.slice(0, 4).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.4, ease: 'easeOut' }}
              className="flex items-center gap-3 bg-surface/70 backdrop-blur-sm border border-border-subtle/50 rounded-lg px-3 py-2 shadow-sm"
            >
              <span className="text-base shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-primary font-body truncate">
                  <span className="font-medium">{item.user}</span> {item.action}
                </p>
                <p className="text-[10px] text-text-secondary mt-0.5 flex items-center justify-between">
                  <span className="truncate">{item.location}</span>
                  <span className="shrink-0">{item.time}</span>
                </p>
              </div>
            </motion.div>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            className="text-[10px] text-text-secondary text-center mt-1"
          >
            Live campus activity
          </motion.p>
        </div>

        <SearchHero onSearch={handleSearch} />
      </section>

      <div className="bg-surface border-t border-border-subtle w-full mt-auto relative z-20">
        <div className="max-w-5xl mx-auto py-8 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 text-center">
            <div className="md:border-r border-border-subtle">
              <p className="font-display text-3xl text-text-primary">1,284</p>
              <p className="font-body text-sm text-text-secondary mt-1">Resources Reused</p>
            </div>
            <div className="md:border-r border-border-subtle">
              <p className="font-display text-3xl text-text-primary">₹4.8L</p>
              <p className="font-body text-sm text-text-secondary mt-1">Saved by borrowing</p>
            </div>
            <div className="md:border-r border-border-subtle">
              <p className="font-display text-3xl text-text-primary">82%</p>
              <p className="font-body text-sm text-text-secondary mt-1">On-time returns</p>
            </div>
            <div>
              <p className="font-display text-3xl text-text-primary">320+</p>
              <p className="font-body text-sm text-text-secondary mt-1">Students sharing</p>
            </div>
          </div>
        </div>
      </div>

      {intent && (
        <section id="results-section" className="container py-16 space-y-8">
          <IntentDisplay intent={intent} />
          <RecommendedKit resources={matchedResources} intent={intent} />
        </section>
      )}
    </div>
  )
}

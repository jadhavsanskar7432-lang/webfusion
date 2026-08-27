import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MatchScore } from '@/components/shared/MatchScore'
import { TrustBadge } from '@/components/shared/TrustBadge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { computeMatchScores, sortByCheapest, sortByClosest } from '@/lib/matching'
import { MapPin, Star, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'

export function CompareView({ resources, needs = [], className }) {
  const [sortMode, setSortMode] = useState('bestMatch')

  const matchResults = useMemo(() => {
    const scored = computeMatchScores(resources, needs)
    switch (sortMode) {
      case 'cheapest':
        return sortByCheapest(scored)
      case 'closest':
        return sortByClosest(scored)
      default:
        return scored
    }
  }, [resources, needs, sortMode])

  const topThree = matchResults.slice(0, 3)

  if (topThree.length === 0) return null

  return (
    <div className={cn('', className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-medium text-ink">Smart Match</h2>
        <div className="flex items-center gap-1 bg-ink/5 rounded-[4px] p-0.5">
          {[
            { key: 'bestMatch', label: 'Best Match' },
            { key: 'cheapest', label: 'Cheapest' },
            { key: 'closest', label: 'Closest' },
          ].map((mode) => (
            <button
              key={mode.key}
              onClick={() => setSortMode(mode.key)}
              className={cn(
                'px-3 py-1 rounded-[4px] text-xs font-medium transition-colors duration-150 cursor-pointer',
                sortMode === mode.key
                  ? 'bg-card text-ink shadow-sm'
                  : 'text-ink/50 hover:text-ink'
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topThree.map((match, index) => (
          <motion.div
            key={match.resource.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: index * 0.05 }}
            className={cn(
              'rounded-[4px] border bg-card p-5 flex flex-col items-center text-center',
              index === 0 ? 'border-moss/30' : 'border-ink/10'
            )}
          >
            {index === 0 && (
              <Badge variant="moss" className="mb-4">Top Pick</Badge>
            )}

            <MatchScore
              score={match.totalScore}
              explanation={match.explanation}
              size={index === 0 ? 140 : 110}
              delay={index * 200}
            />

            <h3 className="font-body font-medium text-ink text-sm mt-4 mb-1">
              {match.resource.name}
            </h3>

            <div className="flex items-center gap-3 text-xs text-ink/50 mb-3">
              <span className="flex items-center gap-1">
                <MapPin size={10} />
                <span className="font-mono">
                  {match.resource.distance < 1 ? `${Math.round(match.resource.distance * 1000)}m` : `${match.resource.distance.toFixed(1)}km`}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <Star size={10} className="text-brass fill-brass" />
                <span className="font-mono">{match.resource.rating}</span>
              </span>
            </div>

            <div className="flex items-center justify-center mb-3">
              <span className="font-mono text-lg font-semibold text-ink">
                ₹{match.resource.pricePerDay}
              </span>
              <span className="text-xs text-ink/40 ml-1">/day</span>
            </div>

            <TrustBadge
              score={match.resource.owner.trustScore}
              verified={match.resource.owner.verified}
              size="sm"
              className="mb-4"
            />

            <div className="w-full space-y-1.5 mb-4">
              {Object.entries(match.scores).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between text-[11px]">
                  <span className="text-ink/40 capitalize">{key}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1 rounded-full bg-ink/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-moss/60"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="font-mono text-ink/50 w-6 text-right">{Math.round(value)}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link to={`/resource/${match.resource.id}`} className="w-full">
              <Button variant={index === 0 ? 'primary' : 'outline'} size="sm" className="w-full gap-1">
                View Details
                <ArrowRight size={14} />
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

CompareView.displayName = 'CompareView'

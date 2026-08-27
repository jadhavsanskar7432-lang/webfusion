import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, MapPin, ArrowRight } from 'lucide-react'
import { MatchScore } from '@/components/shared/MatchScore'
import { TrustBadge } from '@/components/shared/TrustBadge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { computeMatchScores } from '@/lib/matching'
import { cn } from '@/lib/cn'

const SORT_TABS = [
  { key: 'match', label: 'Best Match' },
  { key: 'price', label: 'Cheapest' },
  { key: 'distance', label: 'Closest' },
]

export function CompareView({ resources }) {
  const [sortBy, setSortBy] = useState('match')

  const scoredResources = useMemo(() => {
    const results = computeMatchScores(resources, [])
    return results.map(result => ({
      ...result.resource,
      matchResult: {
        overall: result.totalScore,
        explanation: result.explanation,
        factors: [
          { name: 'Distance', score: Math.round(result.scores.distance) },
          { name: 'Trust', score: Math.round(result.scores.trust) },
          { name: 'Condition', score: Math.round(result.scores.condition) },
          { name: 'Price', score: Math.round(result.scores.price) },
          { name: 'Suitability', score: Math.round(result.scores.suitability) }
        ]
      }
    }))
  }, [resources])

  const sorted = useMemo(() => {
    const copy = [...scoredResources]
    switch (sortBy) {
      case 'price':
        return copy.sort((a, b) => a.pricePerDay - b.pricePerDay)
      case 'distance':
        return copy.sort((a, b) => a.distance - b.distance)
      default:
        return copy.sort((a, b) => b.matchResult.overall - a.matchResult.overall)
    }
  }, [scoredResources, sortBy])

  const top3 = sorted.slice(0, 3)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-medium text-text-primary">Smart Match</h2>
        <div className="flex gap-1 bg-surface border border-border-subtle rounded-[4px] p-0.5">
          {SORT_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSortBy(tab.key)}
              className={cn(
                'px-3 py-1 text-xs font-medium rounded-[4px] transition-colors duration-150 cursor-pointer',
                sortBy === tab.key
                  ? 'bg-accent text-accent-foreground'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {top3.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            className={cn(
              'rounded-[4px] border bg-surface p-6 flex flex-col items-center text-center',
              index === 0 ? 'border-accent/30' : 'border-border-subtle'
            )}
          >
            {index === 0 && (
              <Badge variant="success" className="mb-4">Top Pick</Badge>
            )}

            <MatchScore
              score={resource.matchResult.overall}
              explanation={resource.matchResult.explanation}
              delay={index * 200}
            />

            <h3 className="font-display text-base font-medium text-text-primary mt-4 mb-1">
              {resource.name}
            </h3>
            <div className="flex items-center gap-3 text-xs text-text-secondary mb-1">
              <span className="flex items-center gap-0.5">
                <MapPin size={11} />
                <span className="font-mono">{resource.distance < 1 ? `${Math.round(resource.distance * 1000)}m` : `${resource.distance.toFixed(1)}km`}</span>
              </span>
              <span className="flex items-center gap-0.5">
                <Star size={11} className="text-trust fill-trust" />
                <span className="font-mono">{resource.rating}</span>
              </span>
            </div>
            <p className="font-mono text-lg font-semibold text-text-primary mb-2">
              ₹{resource.pricePerDay}<span className="text-xs text-text-secondary font-body">/day</span>
            </p>

            <TrustBadge score={resource.owner.trustScore} verified={resource.owner.verified} size="sm" className="mb-4" />

            <div className="w-full space-y-1.5 mb-4">
              {resource.matchResult.factors.map((factor) => (
                <div key={factor.name} className="flex items-center gap-2 text-xs">
                  <span className="w-20 text-text-secondary text-right">{factor.name}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-text-primary/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                  <span className="w-8 font-mono text-text-secondary text-right">{factor.score}</span>
                </div>
              ))}
            </div>

            <Link to={`/resource/${resource.id}`} className="w-full">
              <Button
                variant={index === 0 ? 'primary' : 'outline'}
                size="sm"
                className="w-full"
              >
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

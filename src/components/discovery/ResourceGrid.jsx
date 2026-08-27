import { useState, useMemo } from 'react'
import { ResourceCard } from '@/components/shared/ResourceCard'
import { EmptyState } from '@/components/shared/EmptyState'
import { useResourceStore } from '@/store/resourceStore'
import { cn } from '@/lib/cn'

const CATEGORIES = ['all', 'camera', 'laptop', 'tripod', 'microphone', 'lighting', 'calculator', 'textbook', 'projector', 'sports', 'tools']
const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'distance', label: 'Nearest' },
]

export function ResourceGrid() {
  const resources = useResourceStore((s) => s.resources)
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('relevance')

  const filtered = useMemo(() => {
    let result = resources
    if (category !== 'all') {
      result = result.filter((r) => r.category === category)
    }
    switch (sort) {
      case 'price-asc':
        return [...result].sort((a, b) => a.pricePerDay - b.pricePerDay)
      case 'price-desc':
        return [...result].sort((a, b) => b.pricePerDay - a.pricePerDay)
      case 'rating':
        return [...result].sort((a, b) => b.rating - a.rating)
      case 'distance':
        return [...result].sort((a, b) => a.distance - b.distance)
      default:
        return result
    }
  }, [resources, category, sort])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                'px-3 py-1.5 rounded-[4px] text-xs font-medium capitalize transition-colors duration-150 cursor-pointer',
                category === cat
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-surface border border-border-subtle text-text-secondary hover:text-text-primary hover:border-accent/30'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="ml-auto text-xs border border-border-subtle rounded-[4px] px-2 py-1.5 bg-surface text-text-primary focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No resources found"
          description="Try selecting a different category."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  )
}

ResourceGrid.displayName = 'ResourceGrid'

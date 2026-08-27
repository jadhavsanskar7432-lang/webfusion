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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <div className="glass" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '6px', borderRadius: '12px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={category === cat ? 'glass-strong' : ''}
              style={{
                padding: '6px 14px', borderRadius: '8px', fontSize: '13px',
                fontWeight: category === cat ? 600 : 400, textTransform: 'capitalize',
                color: category === cat ? 'white' : 'rgba(255,255,255,0.7)',
                cursor: 'pointer', border: 'none', background: 'transparent'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="glass"
          style={{
            marginLeft: 'auto', padding: '8px 12px', borderRadius: '8px',
            fontSize: '13px', color: 'white', cursor: 'pointer', outline: 'none'
          }}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ color: 'black' }}>{opt.label}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No resources found"
          description="Try selecting a different category."
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  )
}

ResourceGrid.displayName = 'ResourceGrid'

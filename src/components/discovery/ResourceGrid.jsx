import { Search, X } from 'lucide-react'
import { ResourceCard } from '@/components/shared/ResourceCard'
import { EmptyState } from '@/components/shared/EmptyState'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { useResourceStore } from '@/store/resourceStore'
import { cn } from '@/lib/cn'

const sortOptions = [
  { value: 'bestMatch', label: 'Best Match' },
  { value: 'cheapest', label: 'Cheapest First' },
  { value: 'closest', label: 'Closest First' },
  { value: 'rating', label: 'Highest Rated' },
]

export function ResourceGrid({ className }) {
  const { categories, filters, setSearch, setCategory, setSort, resetFilters, getFilteredResources } = useResourceStore()
  const filtered = getFilteredResources()

  return (
    <div className={cn('', className)}>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/30" />
          <input
            id="discover-search"
            type="text"
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="w-full h-10 pl-9 pr-4 rounded-[4px] border border-ink/10 bg-card text-sm font-body text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss transition-colors duration-150"
          />
          {filters.search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <Select
          value={filters.sort}
          onValueChange={setSort}
          options={sortOptions}
          className="w-full sm:w-44"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setCategory('all')}
          className={cn(
            'px-3 py-1 rounded-[4px] text-xs font-medium transition-colors duration-150 cursor-pointer',
            filters.category === 'all'
              ? 'bg-moss text-card'
              : 'bg-ink/5 text-ink/60 hover:bg-ink/10'
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'px-3 py-1 rounded-[4px] text-xs font-medium capitalize transition-colors duration-150 cursor-pointer',
              filters.category === cat
                ? 'bg-moss text-card'
                : 'bg-ink/5 text-ink/60 hover:bg-ink/10'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {(filters.search || filters.category !== 'all') && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-ink/40">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
          {filters.search && (
            <Badge variant="outline" className="gap-1">
              &quot;{filters.search}&quot;
              <button onClick={() => setSearch('')} className="ml-1 cursor-pointer">
                <X size={10} />
              </button>
            </Badge>
          )}
          {filters.category !== 'all' && (
            <Badge variant="moss" className="gap-1 capitalize">
              {filters.category}
              <button onClick={() => setCategory('all')} className="ml-1 cursor-pointer">
                <X size={10} />
              </button>
            </Badge>
          )}
          <button
            onClick={resetFilters}
            className="text-xs text-ink/40 hover:text-ink cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          title="No resources found"
          description="Try adjusting your filters or search terms."
          action={{ label: 'Reset Filters', onClick: resetFilters }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  )
}

ResourceGrid.displayName = 'ResourceGrid'

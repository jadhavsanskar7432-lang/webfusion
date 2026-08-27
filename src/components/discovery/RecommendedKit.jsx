import { motion } from 'framer-motion'
import { ResourceCard } from '@/components/shared/ResourceCard'
import { EmptyState } from '@/components/shared/EmptyState'
import { PackageSearch } from 'lucide-react'
import { cn } from '@/lib/cn'

export function RecommendedKit({ resources, intent, className }) {
  if (!resources || resources.length === 0) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No matches found"
        description="Try a different search or browse all resources."
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className={cn('', className)}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-xl font-medium text-ink">
            Recommended Kit
          </h2>
          {intent && (
            <p className="text-sm text-ink/50 mt-0.5">
              {resources.length} resource{resources.length !== 1 ? 's' : ''} matched for {intent.label.toLowerCase()}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </motion.div>
  )
}

RecommendedKit.displayName = 'RecommendedKit'

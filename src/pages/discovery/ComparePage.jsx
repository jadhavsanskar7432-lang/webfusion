import { useMemo } from 'react'
import { CompareView } from '@/components/discovery/CompareView'
import { EmptyState } from '@/components/shared/EmptyState'
import { useResourceStore } from '@/store/resourceStore'
import { BarChart3 } from 'lucide-react'

export default function ComparePage() {
  const resources = useResourceStore((s) => s.resources)

  const availableResources = useMemo(() => {
    return resources.filter((r) => r.available)
  }, [resources])

  if (availableResources.length === 0) {
    return (
      <div className="container py-8">
        <EmptyState
          icon={BarChart3}
          title="No resources to compare"
          description="There are no available resources to compare right now."
        />
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-medium text-ink mb-1">
          Smart Match
        </h1>
        <p className="text-sm text-ink/50">
          Compare resources side-by-side with our multi-factor scoring algorithm.
        </p>
      </div>
      <CompareView resources={availableResources} />
    </div>
  )
}

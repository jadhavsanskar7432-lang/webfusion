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
    <div style={{ maxWidth: '1000px', padding: '16px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '32px', color: 'white', margin: '0 0 8px 0' }}>
          Smart Match
        </h1>
        <p style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
          Compare resources side-by-side with our multi-factor scoring algorithm.
        </p>
      </div>
      <CompareView resources={availableResources} />
    </div>
  )
}

import { ResourceGrid } from '@/components/discovery/ResourceGrid'

export default function DiscoverPage() {
  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-medium text-ink mb-1">
          Discover Resources
        </h1>
        <p className="text-sm text-ink/50">
          Browse and find items available for borrowing on campus.
        </p>
      </div>
      <ResourceGrid />
    </div>
  )
}

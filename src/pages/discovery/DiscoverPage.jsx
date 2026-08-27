import { ResourceGrid } from '@/components/discovery/ResourceGrid'

export default function DiscoverPage() {
  return (
    <div style={{ maxWidth: '1000px', padding: '16px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '32px', color: 'white', margin: '0 0 8px 0' }}>
          Discover Resources
        </h1>
        <p style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
          Browse and find items available for borrowing on campus.
        </p>
      </div>
      <ResourceGrid />
    </div>
  )
}

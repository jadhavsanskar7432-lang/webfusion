import { Construction, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function ComingSoonPage({ title = 'Coming Soon', description }) {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-56px)] text-center py-16">
      <div className="w-20 h-20 rounded-full bg-ink/5 flex items-center justify-center mb-6">
        <Construction size={36} className="text-ink/30" />
      </div>
      <h1 className="font-display text-3xl font-medium text-ink mb-2">{title}</h1>
      <p className="text-sm text-ink/50 max-w-md mb-2">
        {description || 'This feature is currently under development and will be available soon.'}
      </p>
      <div className="flex items-center gap-1.5 text-xs text-ink/30 mb-8">
        <Clock size={12} />
        <span>Expected in the next update</span>
      </div>
      <Link to="/">
        <Button variant="outline" size="sm">
          Back to Home
        </Button>
      </Link>
    </div>
  )
}

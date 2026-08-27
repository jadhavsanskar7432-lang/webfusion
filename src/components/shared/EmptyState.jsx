import { cn } from '@/lib/cn'
import { PackageOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmptyState({ icon: Icon = PackageOpen, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="w-16 h-16 rounded-full bg-ink/5 flex items-center justify-center mb-4">
        <Icon size={28} className="text-ink/30" />
      </div>
      <h3 className="font-display text-lg font-medium text-ink mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-ink/50 max-w-sm mb-4">{description}</p>
      )}
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}

EmptyState.displayName = 'EmptyState'

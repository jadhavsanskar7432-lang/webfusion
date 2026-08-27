import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

const STATUSES = [
  { key: 'requested', label: 'Requested' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'handover', label: 'Handover' },
  { key: 'borrowed', label: 'Borrowed' },
  { key: 'return_due', label: 'Return Due' },
  { key: 'inspection', label: 'Inspection' },
  { key: 'settlement', label: 'Settlement' },
  { key: 'rated', label: 'Rated' },
]

export function LifecycleTracker({ currentStatus, className }) {
  const currentIndex = STATUSES.findIndex((s) => s.key === currentStatus)

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <div className="flex items-center min-w-max px-2 py-4">
        {STATUSES.map((status, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          const isUpcoming = index > currentIndex

          return (
            <div key={status.key} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono border transition-colors duration-150',
                    isCompleted && 'bg-moss border-moss text-card',
                    isCurrent && 'bg-moss/10 border-moss text-moss',
                    isUpcoming && 'bg-transparent border-ink/15 text-ink/30'
                  )}
                >
                  {isCompleted ? <Check size={14} /> : index + 1}
                </div>
                <span
                  className={cn(
                    'text-[10px] whitespace-nowrap',
                    isCompleted && 'text-moss font-medium',
                    isCurrent && 'text-moss font-medium',
                    isUpcoming && 'text-ink/30'
                  )}
                >
                  {status.label}
                </span>
              </div>

              {index < STATUSES.length - 1 && (
                <div
                  className={cn(
                    'w-8 h-px mx-1 mt-[-16px]',
                    index < currentIndex ? 'bg-moss' : 'bg-ink/10'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

LifecycleTracker.displayName = 'LifecycleTracker'

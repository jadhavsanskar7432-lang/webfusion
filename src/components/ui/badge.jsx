import { cva } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-[4px] px-2 py-0.5 text-xs font-medium font-body transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-ink/10 text-ink',
        moss: 'bg-moss/10 text-moss',
        stamp: 'bg-stamp/10 text-stamp',
        brass: 'bg-brass/10 text-brass',
        outline: 'border border-ink/10 text-ink',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export function Badge({ className, variant, children, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {children}
    </span>
  )
}

Badge.displayName = 'Badge'
export { badgeVariants }

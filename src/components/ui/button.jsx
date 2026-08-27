import { cva } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-body text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss disabled:pointer-events-none disabled:opacity-50 rounded-[4px] cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-ink text-card hover:bg-ink/90',
        primary: 'bg-moss text-card hover:bg-moss/90',
        outline: 'border border-ink/10 bg-transparent text-ink hover:bg-ink/5',
        ghost: 'bg-transparent text-ink hover:bg-ink/5',
        stamp: 'bg-stamp text-card hover:bg-stamp/90',
        brass: 'bg-brass text-card hover:bg-brass/90',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export function Button({ className, variant, size, children, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  )
}

Button.displayName = 'Button'
export { buttonVariants }

import { cn } from '@/lib/cn'
import { computePricing } from '@/lib/settlement'

export function PricingBreakdown({ pricePerDay, deposit, duration = 1, className }) {
  const pricing = computePricing({ pricePerDay, duration, deposit })

  return (
    <div className={cn('rounded-[4px] border border-ink/10 bg-card p-4 space-y-3', className)}>
      <h4 className="text-sm font-medium text-ink">Pricing Breakdown</h4>
      <div className="space-y-2">
        {pricing.breakdown.map((item, index) => {
          const isTotal = item.type === 'total'
          const isDeposit = item.type === 'deposit'

          return (
            <div
              key={index}
              className={cn(
                'flex items-center justify-between',
                isTotal && 'pt-2 border-t border-ink/10'
              )}
            >
              <span className={cn(
                'text-sm',
                isTotal ? 'font-medium text-ink' : 'text-ink/60'
              )}>
                {item.label}
                {isDeposit && (
                  <span className="ml-1.5 text-[10px] font-medium text-moss bg-moss/10 px-1.5 py-0.5 rounded-[4px]">
                    Refundable
                  </span>
                )}
              </span>
              <span className={cn(
                'font-mono text-sm',
                isTotal ? 'font-semibold text-ink' : 'text-ink/80'
              )}>
                ₹{item.amount.toLocaleString('en-IN')}
              </span>
            </div>
          )
        })}
      </div>
      <p className="text-[11px] text-ink/40 pt-1 border-t border-ink/5">
        Security deposit is fully refundable if the item is returned on time and in the same condition.
      </p>
    </div>
  )
}

PricingBreakdown.displayName = 'PricingBreakdown'

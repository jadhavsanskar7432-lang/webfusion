import { Lock } from 'lucide-react'
import { cn } from '@/lib/cn'

export function RedactedField({ label, className }) {
  return (
    <div className={cn('flex items-center gap-3 py-2', className)}>
      <Lock size={14} className="text-ink/30 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-ink/40 mb-0.5">{label}</p>
        <div className="h-5 w-full rounded-[4px] bg-ink/5 border border-dashed border-ink/15 flex items-center px-2">
          <span className="text-xs text-ink/20 blur-[3px] select-none pointer-events-none">
            ████████████████
          </span>
        </div>
      </div>
    </div>
  )
}

export function RedactedSection({ className }) {
  return (
    <div className={cn('rounded-[4px] border border-ink/10 bg-card p-4 space-y-1', className)}>
      <div className="flex items-center gap-2 mb-3">
        <Lock size={16} className="text-ink/30" />
        <span className="text-sm font-medium text-ink/60">Contact Details</span>
      </div>
      <RedactedField label="Full Name" />
      <RedactedField label="Phone Number" />
      <RedactedField label="Email Address" />
      <p className="text-[11px] text-ink/40 pt-3 mt-2 border-t border-ink/5 leading-relaxed">
        Contact details are shared once your booking is confirmed, so every exchange stays protected by the platform.
      </p>
    </div>
  )
}

RedactedField.displayName = 'RedactedField'
RedactedSection.displayName = 'RedactedSection'

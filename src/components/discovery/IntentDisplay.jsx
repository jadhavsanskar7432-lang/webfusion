import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Clock, Target, Zap } from 'lucide-react'
import { cn } from '@/lib/cn'

export function IntentDisplay({ intent, className }) {
  if (!intent) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className={cn('rounded-[4px] border border-ink/10 bg-card p-4', className)}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-[4px] bg-moss/10 flex items-center justify-center shrink-0">
          <Target size={16} className="text-moss" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-ink mb-1">
            We understood: <span className="text-moss">{intent.label}</span>
          </p>
          <p className="text-xs text-ink/50 mb-3">{intent.description}</p>

          <div className="flex flex-wrap gap-2">
            {intent.needs.map((need) => (
              <Badge key={need} variant="moss">
                {need}
              </Badge>
            ))}
            {intent.duration !== 'flexible' && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock size={10} />
                {intent.duration}
              </Badge>
            )}
            {intent.urgency !== 'flexible' && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap size={10} />
                {intent.urgency}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

IntentDisplay.displayName = 'IntentDisplay'

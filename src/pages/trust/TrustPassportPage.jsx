import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Shield, Clock, Repeat, Eye, AlertTriangle, Award, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/shared/EmptyState'
import { users } from '@/data/users'
import { cn } from '@/lib/cn'

function StatCard({ icon: Icon, label, value, suffix = '%', color = 'text-text-primary' }) {
  return (
    <div className="rounded-[4px] border border-border-subtle bg-surface p-4 text-center">
      <Icon size={20} className={cn('mx-auto mb-2', color)} />
      <p className={cn('font-mono text-2xl font-semibold mb-0.5', color)}>
        {value}{suffix}
      </p>
      <p className="text-xs text-text-secondary">{label}</p>
    </div>
  )
}

export default function TrustPassportPage() {
  const { userId } = useParams()

  const user = useMemo(() => users.find((u) => u.id === userId), [userId])

  if (!user) {
    return (
      <div className="container py-8">
        <EmptyState
          title="User not found"
          description="This user profile doesn't exist."
          action={{ label: 'Go Home', onClick: () => window.history.back() }}
        />
      </div>
    )
  }

  const scoreColor = user.trustScore >= 90
    ? 'text-success'
    : user.trustScore >= 80
      ? 'text-trust'
      : 'text-text-primary'

  return (
    <div className="container py-6 sm:py-8 max-w-2xl">
      <Link
        to="/discover"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors duration-150"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="rounded-[4px] border border-border-subtle bg-surface p-6 sm:p-8 mb-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center text-2xl font-display font-semibold text-success shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-display text-xl sm:text-2xl font-medium text-text-primary">
                {user.name}
              </h1>
              {user.verified ? (
                <ShieldCheck size={20} className="text-success shrink-0" />
              ) : (
                <Shield size={20} className="text-text-secondary/60 shrink-0" />
              )}
            </div>
            <p className="text-sm text-text-secondary mb-3">
              {user.department} · Year {user.year}
            </p>
            <div className="flex items-center gap-2">
              <Badge variant={user.verified ? 'success' : 'default'}>
                {user.verified ? 'Verified Student' : 'Unverified'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border-subtle/50 text-center">
          <p className="text-xs text-text-secondary uppercase tracking-wider mb-2">Trust Score</p>
          <p className={cn('font-display text-5xl font-semibold', scoreColor)}>
            {user.trustScore}
          </p>
          <p className="text-sm text-text-secondary mt-1">
            {user.trustScore >= 90
              ? 'Highly trusted member of the community'
              : user.trustScore >= 80
                ? 'Trusted member with good track record'
                : user.trustScore >= 70
                  ? 'Member in good standing'
                  : 'New to the platform'}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, delay: 0.05 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
      >
        <StatCard icon={Clock} label="On-Time Returns" value={user.onTimeReturnRate} color="text-success" />
        <StatCard icon={Repeat} label="Exchanges" value={user.successfulExchanges} suffix="" color="text-text-primary" />
        <StatCard icon={Eye} label="Condition Accuracy" value={user.conditionAccuracy} color="text-trust" />
        <StatCard icon={AlertTriangle} label="Response Rate" value={user.responseRate} color="text-success" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, delay: 0.1 }}
        className="rounded-[4px] border border-border-subtle bg-surface p-6 mb-6"
      >
        <h3 className="text-sm font-medium text-text-primary mb-4">Behaviour Details</h3>
        <div className="space-y-3">
          {[
            { label: 'On-Time Return Rate', value: user.onTimeReturnRate, explanation: `Returned items on time ${user.onTimeReturnRate}% of the time` },
            { label: 'Condition Accuracy', value: user.conditionAccuracy, explanation: `Item condition matched listing description ${user.conditionAccuracy}% of exchanges` },
            { label: 'Response Rate', value: user.responseRate, explanation: `Responds to borrow requests ${user.responseRate}% of the time` },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-text-secondary">{stat.label}</span>
                <span className="font-mono text-sm font-medium text-text-primary">{stat.value}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-text-primary/5 overflow-hidden mb-1">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    stat.value >= 90 ? 'bg-success' : stat.value >= 75 ? 'bg-trust' : 'bg-danger'
                  )}
                  style={{ width: `${stat.value}%` }}
                />
              </div>
              <p className="text-[11px] text-text-secondary/80">{stat.explanation}</p>
            </div>
          ))}
          <div className="pt-2 border-t border-border-subtle/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Unresolved Disputes</span>
              <span className={cn(
                'font-mono text-sm font-medium',
                user.unresolvedDisputes > 0 ? 'text-danger' : 'text-success'
              )}>
                {user.unresolvedDisputes}
              </span>
            </div>
            <p className="text-[11px] text-text-secondary/80 mt-0.5">
              {user.unresolvedDisputes === 0 ? 'No unresolved disputes — clean record' : `${user.unresolvedDisputes} dispute(s) pending resolution`}
            </p>
          </div>
        </div>
      </motion.div>

      {user.badges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, delay: 0.15 }}
          className="rounded-[4px] border border-border-subtle bg-surface p-6"
        >
          <h3 className="text-sm font-medium text-text-primary mb-4">Earned Badges</h3>
          <div className="flex flex-wrap gap-2">
            {user.badges.map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-1.5 px-3 py-2 rounded-[4px] border border-trust/20 bg-trust/5"
              >
                <Award size={14} className="text-trust" />
                <span className="text-sm font-medium text-trust">{badge}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { CircleDot, Search, BarChart3, User, Menu, X, ChevronDown } from 'lucide-react'
import { useExchangeStore } from '@/store/exchangeStore'
import { users } from '@/data/users'
import { cn } from '@/lib/cn'

const navLinks = [
  { to: '/', label: 'Home', icon: Search },
  { to: '/discover', label: 'Discover', icon: CircleDot },
  { to: '/compare', label: 'Compare', icon: BarChart3 },
]

export function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const { currentUser, setCurrentUser } = useExchangeStore()

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-ink/10">
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-150">
          <CircleDot size={22} className="text-moss" />
          <span className="font-display text-base font-semibold text-ink">Campus Circular</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-sm transition-colors duration-150',
                  isActive
                    ? 'bg-moss/10 text-moss font-medium'
                    : 'text-ink/60 hover:text-ink hover:bg-ink/5'
                )}
              >
                <Icon size={15} />
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 px-2 py-1 rounded-[4px] hover:bg-ink/5 transition-colors duration-150 cursor-pointer"
              aria-label="Switch user"
            >
              <div className="w-7 h-7 rounded-full bg-moss/20 flex items-center justify-center text-xs font-medium text-moss">
                {currentUser.name.charAt(0)}
              </div>
              <span className="hidden sm:block text-sm text-ink/80 max-w-[120px] truncate">
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown size={14} className="text-ink/40" />
            </button>

            {userDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-56 rounded-[4px] border border-ink/10 bg-card py-1 shadow-lg z-50">
                  <div className="px-3 py-2 border-b border-ink/5">
                    <p className="text-[11px] text-ink/40 uppercase tracking-wider">Logged in as</p>
                  </div>
                  {users.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        setCurrentUser(user)
                        setUserDropdownOpen(false)
                      }}
                      className={cn(
                        'flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors duration-150 cursor-pointer',
                        currentUser.id === user.id
                          ? 'bg-moss/10 text-moss'
                          : 'text-ink hover:bg-ink/5'
                      )}
                    >
                      <div className="w-6 h-6 rounded-full bg-moss/20 flex items-center justify-center text-[10px] font-medium text-moss shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{user.name}</p>
                        <p className="text-[10px] text-ink/40">{user.department}</p>
                      </div>
                    </button>
                  ))}
                  <div className="border-t border-ink/5 mt-1 pt-1">
                    <Link
                      to={`/trust/${currentUser.id}`}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors duration-150"
                    >
                      <User size={14} />
                      View Profile
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            className="md:hidden p-1.5 rounded-[4px] hover:bg-ink/5 transition-colors duration-150 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-ink/5 bg-card py-2 px-4">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2.5 rounded-[4px] text-sm transition-colors duration-150',
                  isActive
                    ? 'bg-moss/10 text-moss font-medium'
                    : 'text-ink/60 hover:text-ink'
                )}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}

Navbar.displayName = 'Navbar'

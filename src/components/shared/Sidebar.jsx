import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, CircleDot } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { useExchangeStore } from '@/store/exchangeStore'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/discover', label: 'Discover' },
  { to: '/compare', label: 'Compare' },
]

export function Sidebar() {
  const location = useLocation()
  const { theme, toggleTheme } = useThemeStore()
  const { currentUser } = useExchangeStore()

  return (
    <aside className="glass-strong" style={{
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      width: '200px',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 40,
    }}>
      {/* Logo Area */}
      <div style={{
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: '8px'
      }}>
        <CircleDot size={18} color="white" />
        <span style={{
          fontFamily: 'Fraunces, serif',
          color: 'white',
          fontSize: '15px',
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}>
          Campus Circular
        </span>
      </div>

      {/* Nav Links */}
      <nav style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '16px 24px',
      }}>
        {navLinks.map(({ to, label }) => {
          const isActive = location.pathname === to
          return (
            <Link
              key={to}
              to={to}
              style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '14px',
                color: isActive ? 'white' : 'rgba(255, 255, 255, 0.55)',
                fontWeight: isActive ? 600 : 400,
                padding: '6px 0',
                transition: 'color 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)'
              }}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div style={{
        marginTop: 'auto',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 600,
            color: 'white'
          }}>
            {currentUser?.name?.charAt(0) || 'U'}
          </div>
          <span style={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '13px',
            color: 'white',
            fontWeight: 500
          }}>
            {currentUser?.name?.split(' ')[0] || 'User'}
          </span>
        </div>
        <button
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' 
            ? <Sun size={16} color="rgba(255, 255, 255, 0.5)" /> 
            : <Moon size={16} color="rgba(255, 255, 255, 0.5)" />}
        </button>
      </div>
    </aside>
  )
}

Sidebar.displayName = 'Sidebar'

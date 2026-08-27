import { Sidebar } from '@/components/shared/Sidebar'

export function InnerLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      {/* Background */}
      <div className="campus-bg" />
      {/* Sidebar */}
      <Sidebar />
      {/* Content */}
      <main style={{
        marginLeft: '200px',
        flex: 1,
        minHeight: '100vh',
        overflowY: 'auto',
        padding: '32px',
        color: 'white',
      }}>
        {children}
      </main>
    </div>
  )
}

InnerLayout.displayName = 'InnerLayout'

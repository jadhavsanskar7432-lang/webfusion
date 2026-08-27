import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const HomePage = lazy(() => import('@/pages/discovery/HomePage'))
const DiscoverPage = lazy(() => import('@/pages/discovery/DiscoverPage'))
const ResourceDetailPage = lazy(() => import('@/pages/discovery/ResourceDetailPage'))
const ComparePage = lazy(() => import('@/pages/discovery/ComparePage'))
const TrustPassportPage = lazy(() => import('@/pages/trust/TrustPassportPage'))
const ComingSoonPage = lazy(() => import('@/pages/ComingSoonPage'))

function PageLoader() {
  return (
    <div className="container py-8 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  )
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/resource/:id" element={<ResourceDetailPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/trust/:userId" element={<TrustPassportPage />} />
        <Route path="/agreement" element={<ComingSoonPage title="Borrow Agreement" description="Review and confirm borrowing terms before proceeding with the exchange." />} />
        <Route path="/handover" element={<ComingSoonPage title="Exchange Tracker" description="Track the handover process and confirm exchange with both parties." />} />
        <Route path="/settlement" element={<ComingSoonPage title="Settlement" description="View deposit refund calculations and finalize the exchange." />} />
        <Route path="/requests" element={<ComingSoonPage title="Community Requests" description="Post what you need when no listing matches, and let other students respond." />} />
        <Route path="/admin" element={<ComingSoonPage title="Admin Command Center" description="Monitor exchanges, resolve disputes, and manage platform activity." />} />
        <Route path="*" element={<ComingSoonPage title="Page Not Found" description="The page you're looking for doesn't exist." />} />
      </Routes>
    </Suspense>
  )
}

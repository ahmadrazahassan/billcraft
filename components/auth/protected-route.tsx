'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export function ProtectedRoute({ children, redirectTo = '/auth/login' }: ProtectedRouteProps) {
  const { user, loading, mounted } = useAuth()
  const router = useRouter()

  // Ultra perfect redirect logic for protected routes
  useEffect(() => {
    if (mounted && !loading && !user) {
      // Use replace to prevent back navigation to protected pages when not authenticated
      router.replace(redirectTo)
    }
  }, [user, loading, mounted, router, redirectTo])

  // Show sophisticated loading spinner while mounting or checking authentication
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          </div>
          <p className="text-slate-600 font-medium">Verifying access...</p>
        </div>
      </div>
    )
  }

  // Don't render children if user is not authenticated
  if (!user) {
    return null
  }

  return <>{children}</>
} 
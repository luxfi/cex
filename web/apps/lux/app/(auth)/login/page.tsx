'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getLoginUrl, isAuthenticated } from '../../../lib/auth'

function LoginRedirect() {
  const searchParams = useSearchParams()

  useEffect(() => {
    // If already authenticated, go to trade
    if (isAuthenticated()) {
      window.location.href = searchParams.get('redirect') || '/trade'
      return
    }

    // Redirect to lux.id OAuth
    const redirect = searchParams.get('redirect') || '/trade'
    window.location.href = getLoginUrl(redirect)
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-zinc-100">LUX</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-muted-1 mb-6">Redirecting to Lux ID...</p>
        <p className="text-sm text-muted-2">
          Not redirected?{' '}
          <a href={getLoginUrl()} className="text-zinc-300 hover:text-white font-semibold">
            Click here
          </a>
        </p>
        <p className="mt-8">
          <Link href="/" className="text-sm text-muted-2 hover:text-muted-1">
            &larr; Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-primary px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white/70">Loading...</p>
          </div>
        </div>
      }
    >
      <LoginRedirect />
    </Suspense>
  )
}

'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { getSignupUrl, isAuthenticated } from '../../../lib/auth'

export default function SignupPage() {
  useEffect(() => {
    if (isAuthenticated()) {
      window.location.href = '/trade'
      return
    }
    window.location.href = getSignupUrl('/trade')
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-zinc-100">LUX</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-muted-1 mb-6">Redirecting to Lux ID sign up...</p>
        <p className="text-sm text-muted-2">
          Not redirected?{' '}
          <a href={getSignupUrl()} className="text-zinc-300 hover:text-white font-semibold">
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

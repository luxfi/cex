'use client'

import { useEffect, useState } from 'react'
import { handleCallback } from '../../../lib/auth'

export default function AuthCallbackPage() {
  const [error, setError] = useState('')

  useEffect(() => {
    const result = handleCallback()
    if (result) {
      // Redirect to the state URL (e.g. /trade) or default
      window.location.href = result.state || '/trade'
    } else {
      setError('Authentication failed. No access token received.')
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Authentication Error</h1>
          <p className="text-muted-1 mb-6">{error}</p>
          <a
            href="/login"
            className="px-6 py-3 bg-cta text-cta-text rounded-lg font-semibold hover:bg-white transition-colors"
          >
            Try Again
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white/70">Signing you in...</p>
      </div>
    </div>
  )
}

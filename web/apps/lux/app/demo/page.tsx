'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DemoPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/trade')
  }, [router])

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-white text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
        <p className="text-lg">Redirecting to trading platform...</p>
      </div>
    </div>
  )
}

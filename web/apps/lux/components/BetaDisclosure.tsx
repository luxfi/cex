'use client'

import { useState, useEffect } from 'react'

export function BetaDisclosure() {
  const [showDisclosure, setShowDisclosure] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check if user has already accepted the disclosure
    const hasAccepted = localStorage.getItem('betaDisclosureAccepted')
    if (!hasAccepted) {
      setShowDisclosure(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('betaDisclosureAccepted', 'true')
    setShowDisclosure(false)
  }

  // Don't render anything on server or if already accepted
  if (!isClient || !showDisclosure) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
      <div className="relative max-w-3xl w-full max-h-[90vh] bg-gradient-to-br from-secondary via-accent to-secondary rounded-2xl shadow-2xl flex flex-col">
        {/* Gold accent border glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent pointer-events-none" />

        {/* Scrollable Content */}
        <div className="relative overflow-y-auto flex-1 p-8 pb-4">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-block px-4 py-2 bg-gold/20 border border-gold/40 rounded-full mb-4">
                <span className="text-gold font-bold text-sm uppercase tracking-wider">Beta Software</span>
              </div>
              <h2 className="text-3xl font-bold text-white">
                Important Disclosure
              </h2>
            </div>

            {/* Main Content */}
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <div className="bg-accent/50 border border-gold/20 rounded-xl p-6 space-y-4">
                <p className="text-lg font-semibold text-gold-light">
                  This is beta software for informational purposes only.
                </p>

                <div className="space-y-3 text-sm">
                  <p>
                    <strong className="text-white">KYC/AML Disclosure:</strong> Pursuant to exempt advisor regulations for a New York operating Wyoming LLC exempt advisor with seed round, this application is effectively a beta app that is not ready for public use.
                  </p>

                  <p>
                    This platform is currently in limited beta testing and is provided for informational and evaluation purposes only. The services and features displayed are not available for public use at this time.
                  </p>

                  <p>
                    <strong className="text-white">Important:</strong> No brokerage accounts can be opened, no real trades can be executed, and no financial services are currently available through this beta application. All displayed trading functionality is for demonstration purposes only.
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-400 text-center space-y-1">
                <p>
                  By clicking "I Understand", you acknowledge that you have read and understood this disclosure.
                </p>
                <p>
                  This beta software is provided "as is" without warranties of any kind.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Action Button */}
        <div className="relative border-t border-gold/20 p-6 bg-gradient-to-br from-secondary via-accent to-secondary">
          <div className="flex justify-center">
            <button
              onClick={handleAccept}
              className="bg-white hover:bg-gray-100 text-black font-bold px-12 py-4 rounded-xl text-lg shadow-lg shadow-white/20 hover:shadow-white/30 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import {
  BETA_TITLE,
  BETA_BADGE,
  BETA_HEADLINE,
  BETA_BODY,
  BETA_ACCEPT,
  BETA_FOOTER,
} from '../lib/branding'

export function BetaDisclosure() {
  const [showDisclosure, setShowDisclosure] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const hasAccepted = localStorage.getItem('betaDisclosureAccepted')
    if (!hasAccepted) {
      setShowDisclosure(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('betaDisclosureAccepted', 'true')
    setShowDisclosure(false)
  }

  if (!isClient || !showDisclosure) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
      <div className="relative max-w-3xl w-full max-h-[90vh] bg-gradient-to-br from-secondary via-accent to-secondary rounded-2xl shadow-2xl flex flex-col">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent pointer-events-none" />

        <div className="relative overflow-y-auto flex-1 p-8 pb-4">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-block px-4 py-2 bg-gold/20 border border-gold/40 rounded-full mb-4">
                <span className="text-gold font-bold text-sm uppercase tracking-wider">{BETA_BADGE}</span>
              </div>
              <h2 className="text-3xl font-bold text-white">{BETA_TITLE}</h2>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <div className="bg-accent/50 border border-gold/20 rounded-xl p-6 space-y-4">
                <p className="text-lg font-semibold text-gold-light">{BETA_HEADLINE}</p>
                <div className="space-y-3 text-sm">
                  {BETA_BODY.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="text-xs text-gray-400 text-center space-y-1">
                {BETA_FOOTER.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-gold/20 p-6 bg-gradient-to-br from-secondary via-accent to-secondary">
          <div className="flex justify-center">
            <button
              onClick={handleAccept}
              className="bg-white hover:bg-gray-100 text-black font-bold px-12 py-4 rounded-xl text-lg shadow-lg shadow-white/20 hover:shadow-white/30 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              {BETA_ACCEPT}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { createContext, useContext } from 'react'
import { type BrandingConfig, getBranding } from './branding'

const BrandingContext = createContext<BrandingConfig>(getBranding())

export function BrandingProvider({
  branding,
  children,
}: {
  branding?: Partial<BrandingConfig>
  children: React.ReactNode
}) {
  const config = branding
    ? { ...getBranding(), ...branding }
    : getBranding()

  return (
    <BrandingContext.Provider value={config}>
      {children}
    </BrandingContext.Provider>
  )
}

export function useBranding(): BrandingConfig {
  return useContext(BrandingContext)
}

/**
 * @luxats/ui
 * Shared UI components for the Lux Exchange ecosystem
 * Built on top of @hanzo/ui for maximum reusability and consistency
 */

// Layout components
export { default as Header } from './header'
export { default as Footer } from './Footer'
export { default as Logo } from './Logo'

// Re-export commonly used @hanzo/ui components for convenience
export * from '@hanzo/ui/primitives'
export * from '@hanzo/ui/components'
export { cn } from '@hanzo/ui/util'

// Re-export types
export type { LinkDef } from '@hanzo/ui/types'
export type { SiteDef } from '../site-def'
export type { BrandingConfig } from '../site-def/branding'

// Branding
export { getBranding, createBranding, setBranding } from '../site-def/branding'
export { BrandingProvider, useBranding } from '../site-def/BrandingProvider'

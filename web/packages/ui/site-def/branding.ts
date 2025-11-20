/**
 * White-label branding configuration.
 *
 * Each tenant provides overrides via env vars or a config file.
 * The defaults below match the Lux Exchange brand, but any name,
 * color, or URL can be swapped without touching component code.
 */

export interface BrandingConfig {
  /** Display name shown in nav, footer, titles */
  name: string
  /** Short name for compact UI (logo monogram, tab titles) */
  shortName: string
  /** 2-char monogram for the icon logo */
  monogram: string
  /** Legal entity for copyright & disclosures */
  legalName: string
  /** Primary brand color (used for logo, accents) */
  brandColor: string
  /** Accent color for CTA buttons */
  accentColor: string
  /** Danger/sell color */
  dangerColor: string
  /** Support email */
  supportEmail: string
  /** Marketing tagline */
  tagline: string
  /** Marketing description */
  description: string
  /** Base URL for the platform */
  baseUrl: string
  /** Links to terms, privacy, etc. */
  legal: {
    termsUrl: string
    privacyUrl: string
    cookiesUrl: string
    disclosuresUrl: string
  }
  /** Social links (optional) */
  social?: {
    twitter?: string
    discord?: string
    telegram?: string
    linkedin?: string
  }
  /** Regulatory text (for US broker-dealer, ATS, etc.) */
  regulatory?: {
    finraDisclaimer?: string
    riskWarning?: string
    brokerName?: string
    brokerFinra?: string
  }
}

/** Default Lux Exchange branding */
const defaultBranding: BrandingConfig = {
  name: 'Lux Exchange',
  shortName: 'Lux',
  monogram: 'LX',
  legalName: 'Lux Financial Inc.',
  brandColor: '#e4e4e7',
  accentColor: '#e4e4e7',
  dangerColor: '#ef4444',
  supportEmail: 'support@lux.exchange',
  tagline: 'Trade Everything. All Markets. One Platform.',
  description: 'Stocks, crypto, forex, and commodities with real-time data, advanced analytics, and 24/5 market access.',
  baseUrl: 'https://exchange.lux.financial',
  legal: {
    termsUrl: '/terms',
    privacyUrl: '/privacy',
    cookiesUrl: '/cookies',
    disclosuresUrl: '/disclosures',
  },
  social: {
    twitter: 'https://x.com/luxfinancial',
    discord: 'https://discord.gg/lux',
  },
  regulatory: {
    finraDisclaimer: 'Securities offered through Alpaca Securities LLC, member FINRA/SIPC.',
    riskWarning: 'Trading involves risk. Past performance does not guarantee future results.',
    brokerName: 'Alpaca Securities LLC',
    brokerFinra: 'FINRA/SIPC',
  },
}

/**
 * Build a branding config by merging env vars and overrides
 * onto the defaults.
 *
 * Env vars (all optional, prefix NEXT_PUBLIC_BRAND_):
 *   NEXT_PUBLIC_BRAND_NAME
 *   NEXT_PUBLIC_BRAND_SHORT_NAME
 *   NEXT_PUBLIC_BRAND_MONOGRAM
 *   NEXT_PUBLIC_BRAND_LEGAL_NAME
 *   NEXT_PUBLIC_BRAND_COLOR
 *   NEXT_PUBLIC_BRAND_ACCENT_COLOR
 *   NEXT_PUBLIC_BRAND_SUPPORT_EMAIL
 *   NEXT_PUBLIC_BRAND_TAGLINE
 *   NEXT_PUBLIC_BRAND_BASE_URL
 */
export function createBranding(overrides?: Partial<BrandingConfig>): BrandingConfig {
  const env = typeof process !== 'undefined' ? process.env : {} as Record<string, string | undefined>

  return {
    ...defaultBranding,
    ...(env.NEXT_PUBLIC_BRAND_NAME && { name: env.NEXT_PUBLIC_BRAND_NAME }),
    ...(env.NEXT_PUBLIC_BRAND_SHORT_NAME && { shortName: env.NEXT_PUBLIC_BRAND_SHORT_NAME }),
    ...(env.NEXT_PUBLIC_BRAND_MONOGRAM && { monogram: env.NEXT_PUBLIC_BRAND_MONOGRAM }),
    ...(env.NEXT_PUBLIC_BRAND_LEGAL_NAME && { legalName: env.NEXT_PUBLIC_BRAND_LEGAL_NAME }),
    ...(env.NEXT_PUBLIC_BRAND_COLOR && { brandColor: env.NEXT_PUBLIC_BRAND_COLOR }),
    ...(env.NEXT_PUBLIC_BRAND_ACCENT_COLOR && { accentColor: env.NEXT_PUBLIC_BRAND_ACCENT_COLOR }),
    ...(env.NEXT_PUBLIC_BRAND_SUPPORT_EMAIL && { supportEmail: env.NEXT_PUBLIC_BRAND_SUPPORT_EMAIL }),
    ...(env.NEXT_PUBLIC_BRAND_TAGLINE && { tagline: env.NEXT_PUBLIC_BRAND_TAGLINE }),
    ...(env.NEXT_PUBLIC_BRAND_BASE_URL && { baseUrl: env.NEXT_PUBLIC_BRAND_BASE_URL }),
    ...overrides,
    legal: {
      ...defaultBranding.legal,
      ...overrides?.legal,
    },
    social: {
      ...defaultBranding.social,
      ...overrides?.social,
    },
    regulatory: {
      ...defaultBranding.regulatory,
      ...overrides?.regulatory,
    },
  }
}

/** Singleton branding instance */
let _branding: BrandingConfig | null = null

export function getBranding(): BrandingConfig {
  if (!_branding) {
    _branding = createBranding()
  }
  return _branding
}

export function setBranding(config: Partial<BrandingConfig>): void {
  _branding = createBranding(config)
}

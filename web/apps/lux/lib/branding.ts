/**
 * Centralized branding configuration.
 *
 * Every user-visible string that mentions the company, product, or domain
 * lives here so the entire platform can be white-labeled by editing this
 * single file (or overriding via environment variables at build time).
 */

const env = (key: string, fallback: string) =>
  (typeof process !== 'undefined' ? process.env?.[key] : undefined) ?? fallback

// ---------------------------------------------------------------------------
// Core identity
// ---------------------------------------------------------------------------
export const BRAND_NAME        = env('NEXT_PUBLIC_BRAND_NAME', 'Lux ATS')
export const BRAND_SHORT       = env('NEXT_PUBLIC_BRAND_SHORT_NAME', 'Lux')
export const BRAND_TAGLINE     = env('NEXT_PUBLIC_BRAND_TAGLINE', 'Trade Everything. $0 Commission.')
export const BRAND_DESCRIPTION = env('NEXT_PUBLIC_BRAND_DESCRIPTION', 'Trade stocks, crypto, precious metals, and more with $0 commission.')
export const BRAND_LEGAL_ENTITY = env('NEXT_PUBLIC_BRAND_LEGAL_ENTITY', 'Lux Exchange LLC')

// ---------------------------------------------------------------------------
// Product names (appear in nav, pricing, product pages)
// ---------------------------------------------------------------------------
export const PRODUCT_STANDARD  = env('NEXT_PUBLIC_PRODUCT_STANDARD', `${BRAND_SHORT} Pro Trader`)
export const PRODUCT_ELITE     = env('NEXT_PUBLIC_PRODUCT_ELITE', `${BRAND_SHORT} Elite Pro Trader`)
export const PRODUCT_MARKET    = env('NEXT_PUBLIC_PRODUCT_MARKET', `${BRAND_SHORT} Markets`)

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------
export const EMAIL_SUPPORT       = env('NEXT_PUBLIC_EMAIL_SUPPORT', `support@${BRAND_SHORT.toLowerCase()}ats.com`)
export const EMAIL_SALES         = env('NEXT_PUBLIC_EMAIL_SALES', `sales@${BRAND_SHORT.toLowerCase()}ats.com`)
export const EMAIL_PRIVACY       = env('NEXT_PUBLIC_EMAIL_PRIVACY', `privacy@${BRAND_SHORT.toLowerCase()}ats.com`)
export const EMAIL_INSTITUTIONAL = env('NEXT_PUBLIC_EMAIL_INSTITUTIONAL', `institutional@${BRAND_SHORT.toLowerCase()}ats.com`)

// ---------------------------------------------------------------------------
// Auth / IAM
// ---------------------------------------------------------------------------
export const IAM_URL       = env('NEXT_PUBLIC_IAM_URL', 'https://lux.id')
export const IAM_CLIENT_ID = env('NEXT_PUBLIC_IAM_CLIENT_ID', 'lux-ats')
export const IAM_LABEL     = env('NEXT_PUBLIC_IAM_LABEL', `${BRAND_SHORT} ID`)

// ---------------------------------------------------------------------------
// API endpoints
// ---------------------------------------------------------------------------
export const CEX_API_URL    = env('NEXT_PUBLIC_CEX_API_URL', 'http://localhost:8091')
export const BROKER_API_URL = env('NEXT_PUBLIC_BROKER_API_URL', 'http://localhost:8090')
export const KMS_URL        = env('NEXT_PUBLIC_KMS_URL', 'https://kms.lux.network')

// ---------------------------------------------------------------------------
// Chart / data overlay
// ---------------------------------------------------------------------------
export const CHART_WATERMARK = env('NEXT_PUBLIC_CHART_WATERMARK', `${BRAND_SHORT} ATS`)
export const CHART_DATA_SOURCE = env('NEXT_PUBLIC_CHART_DATA_SOURCE', `${BRAND_SHORT} Network`)

// ---------------------------------------------------------------------------
// Navigation structure (white-label can override via JSON env var)
// ---------------------------------------------------------------------------
export interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}

const defaultNav: NavItem[] = [
  {
    label: 'PRODUCTS', href: '#',
    children: [
      { label: PRODUCT_STANDARD, href: '/products/pro-trader', description: 'Institutional-grade trading platform' },
      { label: PRODUCT_ELITE, href: '/products/elite-pro-trader', description: 'Premium suite for high-frequency trading' },
      { label: PRODUCT_MARKET, href: '/products/global-marketplace', description: 'Bloomberg Terminal for Private Markets' },
    ],
  },
  { label: 'TRADE', href: '/trade' },
  {
    label: 'MARKETS', href: '#',
    children: [
      { label: 'Stocks', href: '/markets/stocks' },
      { label: 'Crypto', href: '/markets/crypto' },
      { label: 'Forex', href: '/markets/forex' },
      { label: 'Futures', href: '/markets/futures' },
      { label: 'Indices', href: '/markets/indices' },
    ],
  },
  { label: 'NEWS', href: '/news' },
  { label: 'INVEST', href: '/invest' },
  { label: 'PRICING', href: '/pricing' },
  { label: 'LEARN', href: '/learn' },
  { label: 'HELP', href: '/help' },
]

let _nav: NavItem[] | null = null
export function getNavItems(): NavItem[] {
  if (_nav) return _nav
  try {
    const raw = env('NEXT_PUBLIC_NAV_JSON', '')
    if (raw) { _nav = JSON.parse(raw); return _nav! }
  } catch { /* use default */ }
  _nav = defaultNav
  return _nav
}

// ---------------------------------------------------------------------------
// Footer links
// ---------------------------------------------------------------------------
export interface FooterSection {
  title: string
  links: { label: string; href: string }[]
}

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: PRODUCT_STANDARD, href: '/products/pro-trader' },
      { label: PRODUCT_ELITE, href: '/products/elite-pro-trader' },
      { label: PRODUCT_MARKET, href: '/products/global-marketplace' },
    ],
  },
  {
    title: 'Trading',
    links: [
      { label: 'Stocks', href: '/markets/stocks' },
      { label: 'Crypto', href: '/markets/crypto' },
      { label: 'Options', href: '/markets/options' },
      { label: 'ETFs', href: '/markets/etfs' },
      { label: 'Forex', href: '/markets/forex' },
      { label: 'Futures', href: '/markets/futures' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Learning Center', href: '/learn' },
      { label: 'API Docs', href: '/api-docs' },
      { label: 'Status', href: '/status' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Disclosures', href: '/disclosures' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Disclosure / compliance text
// ---------------------------------------------------------------------------
export const BETA_TITLE = 'Important Disclosure'
export const BETA_BADGE = 'Beta Software'
export const BETA_HEADLINE = 'This is beta software for informational purposes only.'
export const BETA_BODY = `KYC/AML Disclosure: Pursuant to exempt advisor regulations for a New York operating Wyoming LLC exempt advisor with seed round, this application is effectively a beta app that is not ready for public use.\n\nThis platform is currently in limited beta testing and is provided for informational and evaluation purposes only. The services and features displayed are not available for public use at this time.\n\nNo brokerage accounts can be opened, no real trades can be executed, and no financial services are currently available through this beta application. All displayed trading functionality is for demonstration purposes only.`
export const BETA_ACCEPT = 'I Understand'
export const BETA_FOOTER = `By clicking "${BETA_ACCEPT}", you acknowledge that you have read and understood this disclosure. This beta software is provided "as is" without warranties of any kind.`

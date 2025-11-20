'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, User, LogOut, Settings, Briefcase } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useBranding } from '@luxats/ui/site-def/BrandingProvider'

export function Header() {
  const brand = useBranding()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated')
    const email = localStorage.getItem('userEmail')
    const userData = localStorage.getItem('lux_user')

    if (authStatus === 'true' && email) {
      setIsAuthenticated(true)
      setUserEmail(email)
      
      // Get user's name if available
      if (userData) {
        try {
          const user = JSON.parse(userData)
          const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim()
          setUserName(fullName || email.split('@')[0])
        } catch (e) {
          setUserName(email.split('@')[0])
        }
      } else {
        setUserName(email.split('@')[0])
      }
    }
  }, [])

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('lux_user')
    
    setIsAuthenticated(false)
    setUserEmail('')
    setUserName('')
    
    // Redirect to home
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-primary/80 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">{brand.shortName}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {/* Products Dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium text-white/90 hover:text-white transition-colors flex items-center gap-1">
                PRODUCTS
                <ChevronDown size={16} className={`transition-transform group-hover:rotate-180`} />
              </button>
              <div className="absolute left-0 top-full pt-2 z-50">
                <div className="w-64 bg-primary/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    href="/products/pro-trader"
                    className="block px-4 py-3 text-sm text-white/90 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5"
                  >
                    <div className="font-semibold">Lux Pro Trader™</div>
                    <div className="text-xs text-white/60 mt-1">Institutional-grade trading platform</div>
                  </Link>
                  <Link
                    href="/products/elite-pro-trader"
                    className="block px-4 py-3 text-sm text-white/90 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5"
                  >
                    <div className="font-semibold">Lux Elite Pro Trader™</div>
                    <div className="text-xs text-white/60 mt-1">Premium suite for high-frequency trading</div>
                  </Link>
                  <Link
                    href="/products/global-marketplace"
                    className="block px-4 py-3 text-sm text-white/90 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <div className="font-semibold">Lux Markets™</div>
                    <div className="text-xs text-white/60 mt-1">Bloomberg Terminal for Private Markets</div>
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/trade" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              TRADE
            </Link>
            {/* Markets Dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium text-white/90 hover:text-white transition-colors flex items-center gap-1">
                MARKETS
                <ChevronDown size={16} className={`transition-transform group-hover:rotate-180`} />
              </button>
              <div className="absolute left-0 top-full pt-2 z-50">
                <div className="w-48 bg-primary/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    href="/markets/stocks"
                    className="block px-4 py-3 text-sm text-white/90 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5"
                  >
                    📈 Stocks
                  </Link>
                  <Link
                    href="/markets/crypto"
                    className="block px-4 py-3 text-sm text-white/90 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5"
                  >
                    ₿ Crypto
                  </Link>
                  <Link
                    href="/markets/forex"
                    className="block px-4 py-3 text-sm text-white/90 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5"
                  >
                    💱 Forex
                  </Link>
                  <Link
                    href="/markets/futures"
                    className="block px-4 py-3 text-sm text-white/90 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5"
                  >
                    📊 Futures
                  </Link>
                  <Link
                    href="/markets/indices"
                    className="block px-4 py-3 text-sm text-white/90 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    📉 Indices
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/news" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              NEWS
            </Link>
            <Link href="/invest" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              INVEST
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              PRICING
            </Link>
            <Link href="/learn" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              LEARN
            </Link>
            <Link href="/help" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              HELP
            </Link>
          </div>

          {/* CTA Buttons / User Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {isAuthenticated ? (
              // User Profile Dropdown
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                    <User size={16} className="text-success" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">{userName}</div>
                    <div className="text-xs text-white/60">Demo Account</div>
                  </div>
                  <ChevronDown size={16} className="text-white/60 transition-transform group-hover:rotate-180" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full pt-2 z-50">
                  <div className="w-56 bg-primary/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-3 border-b border-white/10">
                      <div className="text-sm font-medium text-white">{userName}</div>
                      <div className="text-xs text-white/60 mt-0.5">{userEmail}</div>
                    </div>
                    
                    <Link
                      href="/account?tab=portfolio"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white/90 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5"
                    >
                      <Briefcase size={16} />
                      <span>Portfolio</span>
                    </Link>
                    
                    <Link
                      href="/account"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white/90 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5"
                    >
                      <Settings size={16} />
                      <span>Account Settings</span>
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-danger hover:bg-danger/10 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Login/Signup Buttons
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
                >
                  LOG IN
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2 bg-success text-white text-sm font-medium rounded-lg hover:bg-success/90 transition-all shadow-lg shadow-success/20"
                >
                  Join {brand.shortName}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-primary/95 backdrop-blur-xl">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {isAuthenticated && (
              <div className="mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <User size={20} className="text-success" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{userName}</div>
                    <div className="text-xs text-white/60">{userEmail}</div>
                  </div>
                </div>
                <Link
                  href="/account?tab=portfolio"
                  className="block rounded-lg px-3 py-2 mt-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
                >
                  💼 Portfolio
                </Link>
                <Link
                  href="/account"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
                >
                  ⚙️ Account Settings
                </Link>
              </div>
            )}

            {/* Products Section */}
            <div className="mb-2">
              <div className="px-3 py-2 text-xs font-semibold text-white/60 uppercase">Products</div>
              <Link
                href="/products/pro-trader"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
              >
                Lux Pro Trader™
              </Link>
              <Link
                href="/products/elite-pro-trader"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
              >
                Lux Elite Pro Trader™
              </Link>
              <Link
                href="/products/global-marketplace"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
              >
                Lux Markets™
              </Link>
            </div>

            <Link
              href="/account?tab=portfolio"
              className="block rounded-lg px-3 py-2 text-base font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
            >
              TRADE
            </Link>

            {/* Markets Section */}
            <div className="mb-2">
              <div className="px-3 py-2 text-xs font-semibold text-white/60 uppercase">Markets</div>
              <Link
                href="/markets/stocks"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
              >
                📈 Stocks
              </Link>
              <Link
                href="/markets/crypto"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
              >
                ₿ Crypto
              </Link>
              <Link
                href="/markets/forex"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
              >
                💱 Forex
              </Link>
              <Link
                href="/markets/futures"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
              >
                📊 Futures
              </Link>
              <Link
                href="/markets/indices"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
              >
                📉 Indices
              </Link>
            </div>

            <Link
              href="/news"
              className="block rounded-lg px-3 py-2 text-base font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
            >
              NEWS
            </Link>
            <Link
              href="/invest"
              className="block rounded-lg px-3 py-2 text-base font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
            >
              INVEST
            </Link>
            <Link
              href="/pricing"
              className="block rounded-lg px-3 py-2 text-base font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
            >
              PRICING
            </Link>
            <Link
              href="/learn"
              className="block rounded-lg px-3 py-2 text-base font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
            >
              LEARN
            </Link>
            <Link
              href="/help"
              className="block rounded-lg px-3 py-2 text-base font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
            >
              HELP
            </Link>

            {/* Auth Buttons */}
            <div className="mt-4 space-y-2">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full block rounded-lg px-3 py-2 text-base font-medium text-danger hover:bg-danger/10 transition-colors text-center"
                >
                  Log Out
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block rounded-lg px-3 py-2 text-base font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    LOG IN
                  </Link>
                  <Link
                    href="/signup"
                    className="block rounded-lg px-3 py-2 text-base font-medium bg-success text-white hover:bg-success/90 transition-colors text-center"
                  >
                    Join {brand.shortName}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

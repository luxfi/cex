'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, User, LogOut, Settings, Briefcase } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Logo from '@luxats/ui/components/Logo'
import { isAuthenticated as checkAuth, getUserInfo, logout as doLogout, type UserInfo } from '../lib/auth'
import { BRAND_SHORT, getNavItems, type NavItem } from '../lib/branding'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useState<UserInfo | null>(null)
  const router = useRouter()
  const navItems = getNavItems()

  useEffect(() => {
    const ok = checkAuth()
    setAuthed(ok)
    if (ok) { getUserInfo().then(setUser) }
  }, [])

  const handleLogout = () => {
    doLogout()
    setAuthed(false)
    setUser(null)
    router.push('/')
  }

  const displayName = user?.name || user?.preferred_username || user?.email?.split('@')[0] || ''

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-primary/80 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo href="/" size="sm" />
          </div>

          {/* Desktop Navigation — driven by branding config */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map((item) =>
              item.children ? (
                <DropdownNav key={item.label} item={item} />
              ) : (
                <Link key={item.label} href={item.href} className="text-sm font-medium text-white/90 hover:text-white transition-colors">
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTA / User Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {authed ? (
              <UserMenu displayName={displayName} user={user} onLogout={handleLogout} />
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors">LOG IN</Link>
                <Link href="/signup" className="px-6 py-2 bg-cta text-cta-text text-sm font-medium rounded-lg hover:bg-white transition-all shadow-lg shadow-zinc-500/10">
                  Join {BRAND_SHORT}
                </Link>
              </>
            )}
          </div>

          <div className="flex lg:hidden">
            <button type="button" className="text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — driven by branding config */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-primary/95 backdrop-blur-xl">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {authed && (
              <div className="mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center"><User size={20} className="text-zinc-300" /></div>
                  <div>
                    <div className="text-sm font-medium text-white">{displayName}</div>
                    {user?.email && <div className="text-xs text-white/60">{user.email}</div>}
                  </div>
                </div>
                <Link href="/account?tab=portfolio" className="block rounded-lg px-3 py-2 mt-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors">Portfolio</Link>
                <Link href="/account" className="block rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors">Account Settings</Link>
              </div>
            )}

            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="mb-2">
                  <div className="px-3 py-2 text-xs font-semibold text-white/60 uppercase">{item.label}</div>
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} className="block rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors">{child.label}</Link>
                  ))}
                </div>
              ) : (
                <Link key={item.label} href={item.href} className="block rounded-lg px-3 py-2 text-base font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors">{item.label}</Link>
              )
            )}

            <div className="mt-4 space-y-2">
              {authed ? (
                <button onClick={handleLogout} className="w-full block rounded-lg px-3 py-2 text-base font-medium text-danger hover:bg-danger/10 transition-colors text-center">Log Out</button>
              ) : (
                <>
                  <Link href="/login" className="block rounded-lg px-3 py-2 text-base font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors">LOG IN</Link>
                  <Link href="/signup" className="block rounded-lg px-3 py-2 text-base font-medium bg-cta text-cta-text hover:bg-white transition-colors text-center">Join {BRAND_SHORT}</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function DropdownNav({ item }: { item: NavItem }) {
  return (
    <div className="relative group">
      <button className="text-sm font-medium text-white/90 hover:text-white transition-colors flex items-center gap-1">
        {item.label}
        <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
      </button>
      <div className="absolute left-0 top-full pt-2 z-50">
        <div className="w-64 bg-primary/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          {item.children!.map((child, i) => (
            <Link
              key={child.href}
              href={child.href}
              className={`block px-4 py-3 text-sm text-white/90 hover:bg-white/5 hover:text-white transition-colors ${
                i < item.children!.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <div className="font-semibold">{child.label}</div>
              {child.description && <div className="text-xs text-white/60 mt-1">{child.description}</div>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function UserMenu({ displayName, user, onLogout }: { displayName: string; user: UserInfo | null; onLogout: () => void }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10">
        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center"><User size={16} className="text-zinc-300" /></div>
        <div className="text-left"><div className="text-sm font-medium text-white">{displayName}</div></div>
        <ChevronDown size={16} className="text-white/60 transition-transform group-hover:rotate-180" />
      </button>
      <div className="absolute right-0 top-full pt-2 z-50">
        <div className="w-56 bg-primary/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="px-4 py-3 border-b border-white/10">
            <div className="text-sm font-medium text-white">{displayName}</div>
            {user?.email && <div className="text-xs text-white/60 mt-0.5">{user.email}</div>}
          </div>
          <Link href="/account?tab=portfolio" className="flex items-center gap-3 px-4 py-3 text-sm text-white/90 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5"><Briefcase size={16} /><span>Portfolio</span></Link>
          <Link href="/account" className="flex items-center gap-3 px-4 py-3 text-sm text-white/90 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5"><Settings size={16} /><span>Account Settings</span></Link>
          <button onClick={onLogout} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-danger hover:bg-danger/10 transition-colors"><LogOut size={16} /><span>Log Out</span></button>
        </div>
      </div>
    </div>
  )
}

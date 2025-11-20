'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Globe, Zap, Shield, Smartphone } from 'lucide-react'

export default function WebTradingPage() {
  const router = useRouter()

  const handleLaunchPlatform = () => {
    // Redirect to login if not authenticated
    router.push('/login?redirect=/trade')
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-success hover:text-success/80 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <Globe className="w-20 h-20 text-success mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Web Trading Platform</h1>
            <p className="text-muted-1 text-lg mb-8">
              Trade anywhere, anytime with our powerful browser-based platform
            </p>
            <button
              onClick={handleLaunchPlatform}
              className="inline-block px-8 py-4 bg-success hover:bg-success/90 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Launch Web Platform
            </button>
            <p className="text-muted-1 text-sm mt-4">
              No download required • Works on any device
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="glass-effect rounded-lg p-6 text-center">
              <Zap className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-muted-1">
                Real-time data and instant order execution directly from your browser
              </p>
            </div>

            <div className="glass-effect rounded-lg p-6 text-center">
              <Shield className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Bank-Level Security</h3>
              <p className="text-muted-1">
                256-bit encryption and two-factor authentication protect your account
              </p>
            </div>

            <div className="glass-effect rounded-lg p-6 text-center">
              <Smartphone className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Fully Responsive</h3>
              <p className="text-muted-1">
                Optimized for desktop, tablet, and mobile devices
              </p>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Platform Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Advanced Charting</h3>
                <ul className="space-y-2 text-muted-1">
                  <li>→ 100+ technical indicators</li>
                  <li>→ Multiple chart types & time frames</li>
                  <li>→ Drawing tools & annotations</li>
                  <li>→ Save custom chart templates</li>
                  <li>→ Compare multiple symbols</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Trading Tools</h3>
                <ul className="space-y-2 text-muted-1">
                  <li>→ One-click trading</li>
                  <li>→ Advanced order types</li>
                  <li>→ Real-time quotes & level 2 data</li>
                  <li>→ Custom watchlists & alerts</li>
                  <li>→ Portfolio analytics</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Market Data</h3>
                <ul className="space-y-2 text-muted-1">
                  <li>→ Real-time streaming quotes</li>
                  <li>→ Market depth & order book</li>
                  <li>→ News & earnings calendar</li>
                  <li>→ Analyst ratings & research</li>
                  <li>→ Economic indicators</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Account Management</h3>
                <ul className="space-y-2 text-muted-1">
                  <li>→ Real-time account balances</li>
                  <li>→ Transaction history</li>
                  <li>→ Tax reporting & documents</li>
                  <li>→ Deposit & withdrawal</li>
                  <li>→ Performance tracking</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">System Requirements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Supported Browsers</h3>
                <ul className="space-y-2 text-muted-1">
                  <li>→ Google Chrome (recommended)</li>
                  <li>→ Mozilla Firefox</li>
                  <li>→ Apple Safari</li>
                  <li>→ Microsoft Edge</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Requirements</h3>
                <ul className="space-y-2 text-muted-1">
                  <li>→ Stable internet connection (1 Mbps+)</li>
                  <li>→ JavaScript enabled</li>
                  <li>→ Cookies enabled</li>
                  <li>→ Modern browser version</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Prefer a Desktop App?</h2>
            <p className="text-muted-1 mb-6">
              For the most advanced features and performance, download our native desktop application.
            </p>
            <Link
              href="/download"
              className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
            >
              View Desktop Downloads
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { ArrowLeft, TrendingUp, BarChart3, Shield, Zap, Globe, Lock } from 'lucide-react'

export default function ProTraderPage() {
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

          {/* Hero Section */}
          <div className="mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-zinc-800 text-success text-sm font-semibold mb-6">
              INSTITUTIONAL-GRADE TRADING
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Lux Pro Trader™
            </h1>
            <p className="text-xl text-muted-1 mb-8 max-w-3xl">
              Launch your institutional-grade web & mobile trading platform with multi-asset execution, 
              real-time NAV analytics, risk dashboards, and automated onboarding workflows.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 bg-success text-primary rounded-lg font-semibold hover:bg-white transition-all"
              >
                Start Trading
              </Link>
              <Link
                href="/demo"
                className="px-8 py-4 border-2 border-zinc-700 rounded-lg font-semibold hover:bg-success/5 transition-all"
              >
                Try Demo
              </Link>
            </div>
          </div>

          {/* Key Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Platform Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-effect p-6 rounded-xl">
                <TrendingUp className="w-12 h-12 text-success mb-4" />
                <h3 className="text-xl font-bold mb-3">Multi-Asset Execution</h3>
                <p className="text-muted-1">
                  Trade public equities, private secondaries, and tokenized assets from a single unified platform.
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl">
                <BarChart3 className="w-12 h-12 text-success mb-4" />
                <h3 className="text-xl font-bold mb-3">Real-Time NAV Analytics</h3>
                <p className="text-muted-1">
                  Access real-time Net Asset Value calculations and comprehensive portfolio analytics at your fingertips.
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl">
                <Shield className="w-12 h-12 text-success mb-4" />
                <h3 className="text-xl font-bold mb-3">Risk Dashboards</h3>
                <p className="text-muted-1">
                  Monitor and manage risk with institutional-grade dashboards featuring advanced metrics and alerts.
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl">
                <Zap className="w-12 h-12 text-success mb-4" />
                <h3 className="text-xl font-bold mb-3">Automated Onboarding</h3>
                <p className="text-muted-1">
                  Streamlined KYC/AML workflows with automated identity verification and compliance checks.
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl">
                <Globe className="w-12 h-12 text-success mb-4" />
                <h3 className="text-xl font-bold mb-3">Web & Mobile Access</h3>
                <p className="text-muted-1">
                  Trade anywhere with our responsive web platform and native mobile apps for iOS and Android.
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl">
                <Lock className="w-12 h-12 text-success mb-4" />
                <h3 className="text-xl font-bold mb-3">Enterprise Security</h3>
                <p className="text-muted-1">
                  Bank-level encryption, multi-factor authentication, and cold storage for digital assets.
                </p>
              </div>
            </div>
          </section>

          {/* Asset Classes */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Supported Asset Classes</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-effect p-8 rounded-xl text-center">
                <div className="text-4xl font-bold text-success mb-3">Public Equities</div>
                <p className="text-muted-1">
                  Access global stock markets with real-time pricing and $0 commission trading on U.S. equities.
                </p>
              </div>

              <div className="glass-effect p-8 rounded-xl text-center">
                <div className="text-4xl font-bold text-success mb-3">Private Secondaries</div>
                <p className="text-muted-1">
                  Trade pre-IPO shares and private company equity through our regulated secondary marketplace.
                </p>
              </div>

              <div className="glass-effect p-8 rounded-xl text-center">
                <div className="text-4xl font-bold text-success mb-3">Tokenized Assets</div>
                <p className="text-muted-1">
                  Invest in blockchain-based securities and tokenized real-world assets with instant settlement.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Specs */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Technical Specifications</h2>
            <div className="glass-effect p-8 rounded-xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-success">Platform Capabilities</h3>
                  <ul className="space-y-3 text-muted-1">
                    <li className="flex items-start gap-3">
                      <span className="text-success mt-1">•</span>
                      <span>Real-time market data and order execution</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-success mt-1">•</span>
                      <span>Advanced charting with 100+ technical indicators</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-success mt-1">•</span>
                      <span>Portfolio performance tracking and attribution</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-success mt-1">•</span>
                      <span>Tax reporting and document generation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-success mt-1">•</span>
                      <span>Multi-currency support and FX conversion</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-success">Security & Compliance</h3>
                  <ul className="space-y-3 text-muted-1">
                    <li className="flex items-start gap-3">
                      <span className="text-success mt-1">•</span>
                      <span>SEC registered broker-dealer</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-success mt-1">•</span>
                      <span>FINRA and SIPC member protection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-success mt-1">•</span>
                      <span>SOC 2 Type II certified infrastructure</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-success mt-1">•</span>
                      <span>256-bit SSL encryption for all data</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-success mt-1">•</span>
                      <span>Automated regulatory reporting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Transparent Pricing</h2>
            <div className="glass-effect p-8 rounded-xl">
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">$0 Commission Trading</h3>
                  <p className="text-muted-1 mb-4">
                    Trade U.S. stocks and ETFs with zero commissions. Options trades are $0.65 per contract.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">No Hidden Fees</h3>
                  <p className="text-muted-1 mb-4">
                    No account minimums, no inactivity fees, no platform fees. Just transparent, competitive pricing.
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-1">
                * Regulatory fees may apply. See our{' '}
                <Link href="/pricing" className="text-success hover:underline">
                  full pricing page
                </Link>{' '}
                for details.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="glass-effect p-12 rounded-2xl">
              <h2 className="text-4xl font-bold mb-4">Ready to Start Trading?</h2>
              <p className="text-xl text-muted-1 mb-8 max-w-2xl mx-auto">
                Join thousands of traders who trust Lux Pro Trader for institutional-grade execution.
              </p>
              <Link
                href="/signup"
                className="inline-block px-12 py-4 bg-success text-primary rounded-lg font-semibold text-lg hover:bg-white transition-all"
              >
                Open Free Account
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { ArrowLeft, Building2, Users, Lock, Layers, TrendingUp, Globe2 } from 'lucide-react'

export default function GlobalMarketplacePage() {
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
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-success/20 text-blue-400 text-sm font-semibold mb-6">
              PRIVATE MARKETS INFRASTRUCTURE
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Lux Markets™
            </h1>
            <p className="text-xl text-muted-1 mb-8 max-w-3xl">
              The Bloomberg Terminal for Private Markets. Full-stack platform unifying LPs, GPs, family offices, 
              broker-dealers, and allocators on one regulated, scalable exchange infrastructure.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-success text-primary rounded-lg font-semibold hover:opacity-90 transition-all"
              >
                Get Early Access
              </Link>
              <Link
                href="/demo"
                className="px-8 py-4 border-2 border-blue-500/30 rounded-lg font-semibold hover:bg-blue-500/5 transition-all"
              >
                View Platform Demo
              </Link>
            </div>
          </div>

          {/* Vision */}
          <section className="mb-16">
            <div className="glass-effect p-12 rounded-2xl border border-blue-500/20 text-center">
              <h2 className="text-3xl font-bold mb-6">Democratizing Private Markets</h2>
              <p className="text-xl text-muted-1 max-w-3xl mx-auto">
                Lux Markets brings institutional-grade private market infrastructure to everyone—
                from individual investors to the world's largest allocators. Our platform combines embedded 
                compliance, tokenization-as-a-service, and secondary liquidity matching to create the future 
                of private capital markets.
              </p>
            </div>
          </section>

          {/* Core Platform Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Platform Capabilities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-effect p-6 rounded-xl border border-blue-500/20">
                <Building2 className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Unified Marketplace</h3>
                <p className="text-muted-1">
                  Single platform connecting LPs, GPs, family offices, broker-dealers, and allocators for seamless capital deployment.
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl border border-blue-500/20">
                <Lock className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Embedded Compliance</h3>
                <p className="text-muted-1">
                  Automated KYC/AML, accreditation verification, and regulatory reporting built directly into the platform.
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl border border-blue-500/20">
                <Layers className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Tokenization-as-a-Service</h3>
                <p className="text-muted-1">
                  Transform traditional securities into digital tokens with smart contract-based automation and instant settlement.
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl border border-blue-500/20">
                <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Secondary Liquidity</h3>
                <p className="text-muted-1">
                  Sophisticated matching engine for secondary transactions in private equity, venture capital, and real assets.
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl border border-blue-500/20">
                <Users className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Multi-Party Workflows</h3>
                <p className="text-muted-1">
                  Collaborative tools for syndication, co-investment, and allocation management across stakeholders.
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl border border-blue-500/20">
                <Globe2 className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Global Infrastructure</h3>
                <p className="text-muted-1">
                  Scalable, regulated exchange infrastructure supporting cross-border transactions and multi-jurisdiction compliance.
                </p>
              </div>
            </div>
          </section>

          {/* Market Participants */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Built for Every Participant</h2>
            <div className="space-y-6">
              <div className="glass-effect p-6 rounded-xl border border-blue-500/20">
                <h3 className="text-2xl font-bold mb-3">Limited Partners (LPs)</h3>
                <p className="text-muted-1 mb-4">
                  Discover and invest in top-tier funds, manage allocations across strategies, and access secondary liquidity for existing positions.
                </p>
                <ul className="grid md:grid-cols-2 gap-3 text-muted-1">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>Comprehensive fund due diligence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>Portfolio monitoring and reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>Secondary market access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>Direct co-investment opportunities</span>
                  </li>
                </ul>
              </div>

              <div className="glass-effect p-6 rounded-xl border border-blue-500/20">
                <h3 className="text-2xl font-bold mb-3">General Partners (GPs)</h3>
                <p className="text-muted-1 mb-4">
                  Raise capital efficiently, manage investor relations, and provide liquidity options to your LPs through integrated secondary markets.
                </p>
                <ul className="grid md:grid-cols-2 gap-3 text-muted-1">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>Digital fundraising and closing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>Automated investor onboarding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>Portfolio company analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>LP portal and reporting</span>
                  </li>
                </ul>
              </div>

              <div className="glass-effect p-6 rounded-xl border border-blue-500/20">
                <h3 className="text-2xl font-bold mb-3">Family Offices & Allocators</h3>
                <p className="text-muted-1 mb-4">
                  Access institutional-quality deal flow, manage complex portfolios, and optimize allocation strategies with real-time analytics.
                </p>
                <ul className="grid md:grid-cols-2 gap-3 text-muted-1">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>Curated investment opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>Multi-strategy portfolio management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>Risk analytics and attribution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>Tax optimization tools</span>
                  </li>
                </ul>
              </div>

              <div className="glass-effect p-6 rounded-xl border border-blue-500/20">
                <h3 className="text-2xl font-bold mb-3">Broker-Dealers</h3>
                <p className="text-muted-1 mb-4">
                  White-label platform capabilities, integrated clearing, and access to proprietary deal flow for your client base.
                </p>
                <ul className="grid md:grid-cols-2 gap-3 text-muted-1">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>White-label solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>Integrated compliance tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>Revenue sharing models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">✓</span>
                    <span>Client management CRM</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Enterprise-Grade Technology</h2>
            <div className="glass-effect p-8 rounded-xl border border-blue-500/20">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-400">Security</h3>
                  <ul className="space-y-3 text-muted-1">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>SOC 2 Type II certified</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Bank-level encryption (AES-256)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Multi-sig cold storage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Penetration testing & audits</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-400">Blockchain</h3>
                  <ul className="space-y-3 text-muted-1">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Multi-chain support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Smart contract automation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Instant settlement (T+0)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Immutable audit trail</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-400">Compliance</h3>
                  <ul className="space-y-3 text-muted-1">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Automated KYC/AML</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Accreditation verification</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Regulatory reporting</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Multi-jurisdiction support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">The Future of Private Markets</h2>
            <div className="glass-effect p-8 rounded-xl border border-blue-500/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-red-400">Traditional Approach</h3>
                  <ul className="space-y-3 text-muted-1">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Fragmented platforms and databases</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Manual compliance and paperwork</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Limited secondary market liquidity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Weeks to months for settlement</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>High minimum investments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Opaque pricing and fees</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-400">Lux Markets</h3>
                  <ul className="space-y-3 text-muted-1">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>Unified platform for all participants</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>Automated compliance and onboarding</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>Deep secondary market liquidity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>Instant settlement via blockchain</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>Fractional ownership opportunities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>Transparent pricing and low fees</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="glass-effect p-12 rounded-2xl border border-blue-500/20">
              <h2 className="text-4xl font-bold mb-4">Join the Private Markets Revolution</h2>
              <p className="text-xl text-muted-1 mb-8 max-w-2xl mx-auto">
                Be among the first to access Lux Markets. Limited spots available for launch partners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-12 py-4 bg-gradient-to-r from-blue-500 to-success text-primary rounded-lg font-semibold text-lg hover:opacity-90 transition-all"
                >
                  Request Early Access
                </Link>
                <Link
                  href="/whitepaper"
                  className="px-12 py-4 border-2 border-blue-500/30 rounded-lg font-semibold text-lg hover:bg-blue-500/5 transition-all"
                >
                  Read Whitepaper
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

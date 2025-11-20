'use client'

import Link from 'next/link'
import { ArrowLeft, Building2, Users, TrendingUp, Shield } from 'lucide-react'

export default function InstitutionalPage() {
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

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Institutional Services</h1>
          <p className="text-muted-1 text-lg mb-12">
            Enterprise-grade trading solutions for institutions, hedge funds, and professional traders
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-effect rounded-lg p-8">
              <Building2 className="w-12 h-12 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">Prime Brokerage</h2>
              <p className="text-muted-1 mb-4">
                Comprehensive prime brokerage services tailored to your institutional needs.
              </p>
              <ul className="space-y-2 text-muted-1">
                <li>→ Multi-asset execution services</li>
                <li>→ Securities lending & financing</li>
                <li>→ Centralized clearing</li>
                <li>→ Risk management tools</li>
                <li>→ Dedicated relationship management</li>
              </ul>
            </div>

            <div className="glass-effect rounded-lg p-8">
              <Users className="w-12 h-12 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">Hedge Fund Solutions</h2>
              <p className="text-muted-1 mb-4">
                Specialized services designed for hedge funds and asset managers.
              </p>
              <ul className="space-y-2 text-muted-1">
                <li>→ Portfolio margining</li>
                <li>→ Advanced execution algorithms</li>
                <li>→ Custom reporting & analytics</li>
                <li>→ OTC derivatives clearing</li>
                <li>→ Multi-custodian access</li>
              </ul>
            </div>

            <div className="glass-effect rounded-lg p-8">
              <TrendingUp className="w-12 h-12 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">API & Algorithmic Trading</h2>
              <p className="text-muted-1 mb-4">
                Enterprise-grade APIs for systematic and algorithmic trading strategies.
              </p>
              <ul className="space-y-2 text-muted-1">
                <li>→ FIX protocol connectivity</li>
                <li>→ REST & WebSocket APIs</li>
                <li>→ Co-location services</li>
                <li>→ Ultra-low latency execution</li>
                <li>→ Direct market access (DMA)</li>
              </ul>
            </div>

            <div className="glass-effect rounded-lg p-8">
              <Shield className="w-12 h-12 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">Compliance & Risk</h2>
              <p className="text-muted-1 mb-4">
                Comprehensive compliance and risk management solutions.
              </p>
              <ul className="space-y-2 text-muted-1">
                <li>→ Real-time risk monitoring</li>
                <li>→ Pre-trade compliance checks</li>
                <li>→ Regulatory reporting</li>
                <li>→ Position & exposure limits</li>
                <li>→ Audit trail & recordkeeping</li>
              </ul>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Why Choose Lux</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Global Reach</h3>
                <p className="text-muted-1">
                  Access to markets across North America, Europe, Asia, and beyond through a single platform.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Advanced Technology</h3>
                <p className="text-muted-1">
                  State-of-the-art infrastructure with sub-millisecond execution and 99.99% uptime.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Dedicated Support</h3>
                <p className="text-muted-1">
                  24/7 institutional support team with deep market expertise and technical knowledge.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Pricing</h2>
            <p className="text-muted-1 mb-6">
              Competitive, transparent pricing tailored to your trading volume and needs. Our institutional pricing includes:
            </p>
            <ul className="grid md:grid-cols-2 gap-4 text-muted-1">
              <li>→ Volume-based commission tiers</li>
              <li>→ Tiered margin rates</li>
              <li>→ Exchange fee rebates</li>
              <li>→ No platform fees</li>
              <li>→ Custom pricing for large accounts</li>
              <li>→ Transparent cost structure</li>
            </ul>
          </div>

          <div className="glass-effect rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Get Started</h2>
            <p className="text-muted-1 mb-6">
              Contact our institutional sales team to learn how Lux can support your organization's trading needs.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-white font-semibold">Institutional Sales</p>
                <p className="text-muted-1">Phone: +1 (973) 224-7098</p>
                <p className="text-muted-1">Email: <a href="mailto:institutional@luxats.com" className="text-success hover:underline">institutional@luxats.com</a></p>
              </div>
              <button className="px-8 py-3 bg-success hover:bg-success/90 text-white font-semibold rounded-lg transition-colors">
                Request a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

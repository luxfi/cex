'use client'

import Link from 'next/link'
import { ArrowLeft, Gauge, Network, Database, Cpu, LineChart, Server } from 'lucide-react'

export default function EliteProTraderPage() {
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
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-success/20 text-yellow-400 text-sm font-semibold mb-6">
              PREMIUM INSTITUTIONAL SUITE
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Lux Elite Pro Trader™
            </h1>
            <p className="text-xl text-muted-1 mb-8 max-w-3xl">
              Expanded premium suite for high-frequency institutional users, featuring advanced order-routing, 
              derivatives access, and cross-asset liquidity aggregation with enterprise-grade clearing rails.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-success text-primary rounded-lg font-semibold hover:opacity-90 transition-all"
              >
                Request Access
              </Link>
              <Link
                href="/demo"
                className="px-8 py-4 border-2 border-yellow-500/30 rounded-lg font-semibold hover:bg-yellow-500/5 transition-all"
              >
                Schedule Demo
              </Link>
            </div>
          </div>

          {/* Elite Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Elite Platform Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-effect p-6 rounded-xl border border-yellow-500/20">
                <Gauge className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">High-Frequency Trading</h3>
                <p className="text-muted-1">
                  Sub-millisecond execution with co-location options and direct market access for algorithmic trading strategies.
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl border border-yellow-500/20">
                <Network className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Advanced Order Routing</h3>
                <p className="text-muted-1">
                  Smart order routing across multiple venues with customizable algorithms and venue selection controls.
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl border border-yellow-500/20">
                <Database className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Derivatives Access</h3>
                <p className="text-muted-1">
                  Full access to options, futures, swaps, and structured products across global markets.
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl border border-yellow-500/20">
                <LineChart className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Cross-Asset Liquidity</h3>
                <p className="text-muted-1">
                  Aggregated liquidity across equities, fixed income, FX, commodities, and digital assets.
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl border border-yellow-500/20">
                <Cpu className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">FIX API Connectivity</h3>
                <p className="text-muted-1">
                  Industry-standard FIX protocol integration for seamless connectivity with existing trading systems.
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl border border-yellow-500/20">
                <Server className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Enterprise Clearing</h3>
                <p className="text-muted-1">
                  Integrated clearing through Apex and StoneX with prime brokerage services and margin optimization.
                </p>
              </div>
            </div>
          </section>

          {/* Target Users */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Built for Institutions</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="glass-effect p-6 rounded-xl text-center border border-yellow-500/20">
                <div className="text-3xl font-bold text-yellow-400 mb-3">Hedge Funds</div>
                <p className="text-muted-1 text-sm">
                  Multi-strategy execution with advanced risk controls
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl text-center border border-yellow-500/20">
                <div className="text-3xl font-bold text-yellow-400 mb-3">Broker-Dealers</div>
                <p className="text-muted-1 text-sm">
                  White-label solutions and clearing services
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl text-center border border-yellow-500/20">
                <div className="text-3xl font-bold text-yellow-400 mb-3">Market Makers</div>
                <p className="text-muted-1 text-sm">
                  Ultra-low latency for high-frequency strategies
                </p>
              </div>

              <div className="glass-effect p-6 rounded-xl text-center border border-yellow-500/20">
                <div className="text-3xl font-bold text-yellow-400 mb-3">Syndicate Leads</div>
                <p className="text-muted-1 text-sm">
                  Coordinated trading for large allocations
                </p>
              </div>
            </div>
          </section>

          {/* Technical Infrastructure */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Enterprise Infrastructure</h2>
            <div className="glass-effect p-8 rounded-xl border border-yellow-500/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-yellow-400">Performance</h3>
                  <ul className="space-y-3 text-muted-1">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>&lt;1ms average execution latency</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>99.99% uptime SLA guarantee</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>100,000+ orders per second capacity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Global co-location in major financial centers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Dedicated fiber connections to exchanges</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-yellow-400">Integration & APIs</h3>
                  <ul className="space-y-3 text-muted-1">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>FIX 4.2, 4.4, and 5.0 protocol support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>RESTful and WebSocket APIs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Real-time market data feeds</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Custom algorithmic strategy deployment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>White-label integration options</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Clearing Partners */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Clearing & Settlement</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-effect p-8 rounded-xl border border-yellow-500/20">
                <h3 className="text-2xl font-bold mb-4">Apex Clearing</h3>
                <p className="text-muted-1 mb-4">
                  Industry-leading clearing services for equities, options, and digital assets with T+0 settlement capabilities.
                </p>
                <ul className="space-y-2 text-muted-1">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">✓</span>
                    <span>$10B+ in daily clearing volume</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">✓</span>
                    <span>SIPC protection up to $500,000</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">✓</span>
                    <span>Excess insurance coverage available</span>
                  </li>
                </ul>
              </div>

              <div className="glass-effect p-8 rounded-xl border border-yellow-500/20">
                <h3 className="text-2xl font-bold mb-4">StoneX Integration</h3>
                <p className="text-muted-1 mb-4">
                  Global execution and clearing for futures, FX, and commodities through StoneX's institutional platform.
                </p>
                <ul className="space-y-2 text-muted-1">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">✓</span>
                    <span>Access to 170+ global exchanges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">✓</span>
                    <span>Multi-currency margin optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">✓</span>
                    <span>Prime brokerage services</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Enterprise Pricing</h2>
            <div className="glass-effect p-8 rounded-xl border border-yellow-500/20">
              <p className="text-lg text-muted-1 mb-6">
                Lux Elite Pro Trader is designed for institutional clients with custom pricing based on:
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">Trading Volume</div>
                  <p className="text-sm text-muted-1">Volume-based tiered pricing</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">Asset Classes</div>
                  <p className="text-sm text-muted-1">Coverage across markets</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">Infrastructure</div>
                  <p className="text-sm text-muted-1">Co-location and connectivity needs</p>
                </div>
              </div>
              <p className="text-center text-muted-1">
                Contact our institutional sales team for a customized quote.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="glass-effect p-12 rounded-2xl border border-yellow-500/20">
              <h2 className="text-4xl font-bold mb-4">Elevate Your Trading Infrastructure</h2>
              <p className="text-xl text-muted-1 mb-8 max-w-2xl mx-auto">
                Join leading hedge funds, broker-dealers, and market makers who trust Lux Elite Pro Trader.
              </p>
              <Link
                href="/contact"
                className="inline-block px-12 py-4 bg-gradient-to-r from-yellow-500 to-success text-primary rounded-lg font-semibold text-lg hover:opacity-90 transition-all"
              >
                Request Institutional Access
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

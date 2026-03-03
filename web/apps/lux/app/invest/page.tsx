'use client'

import Link from 'next/link'
import { ArrowLeft, TrendingUp, Shield, DollarSign, BarChart3 } from 'lucide-react'

export default function InvestPage() {
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

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Invest with Confidence</h1>
          <p className="text-muted-1 text-lg mb-12">
            Unlock your financial potential with Lux Exchange' comprehensive investment platform
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="glass-effect rounded-lg p-8">
              <TrendingUp className="w-12 h-12 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">Diverse Investment Options</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                Access a wide range of investment opportunities including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                <li>Stocks & ETFs with $0 commission</li>
                <li>Options trading with advanced strategies</li>
                <li>Cryptocurrencies & digital assets</li>
                <li>Forex & global currencies</li>
                <li>Commodities & futures</li>
                <li>IPOs & new listings</li>
              </ul>
            </div>

            <div className="glass-effect rounded-lg p-8">
              <Shield className="w-12 h-12 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">Protected & Secure</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                Your investments are protected by industry-leading security:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                <li>SIPC protection up to $500,000</li>
                <li>256-bit SSL encryption</li>
                <li>Two-factor authentication</li>
                <li>Regular security audits</li>
                <li>Segregated client accounts</li>
                <li>Real-time fraud monitoring</li>
              </ul>
            </div>

            <div className="glass-effect rounded-lg p-8">
              <DollarSign className="w-12 h-12 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">Competitive Pricing</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                Maximize your returns with our low-cost structure:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                <li>$0 stock & ETF commissions</li>
                <li>Competitive options pricing</li>
                <li>No account minimums</li>
                <li>No inactivity fees</li>
                <li>Transparent fee structure</li>
                <li>Volume discounts available</li>
              </ul>
              <Link
                href="/pricing"
                className="inline-block mt-4 text-success hover:text-success/80 transition-colors"
              >
                View detailed pricing →
              </Link>
            </div>

            <div className="glass-effect rounded-lg p-8">
              <BarChart3 className="w-12 h-12 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">Advanced Tools</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                Professional-grade tools for informed investing:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                <li>Real-time market data & charts</li>
                <li>Technical analysis indicators</li>
                <li>Portfolio analytics & insights</li>
                <li>Research reports & analysis</li>
                <li>Mobile & desktop platforms</li>
                <li>API for algorithmic trading</li>
              </ul>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Investment Accounts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Individual Brokerage</h3>
                <p className="text-muted-1">
                  Standard taxable investment account with full access to all markets and products.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Retirement Accounts</h3>
                <p className="text-muted-1">
                  IRA, Roth IRA, and other tax-advantaged accounts for long-term wealth building.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Margin Accounts</h3>
                <p className="text-muted-1">
                  Leverage your portfolio with competitive margin rates and flexible terms.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-success hover:bg-white text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Start Investing Today
            </Link>
            <p className="text-muted-1 text-sm mt-4">
              Open an account in minutes. No minimum deposit required.
            </p>
          </div>

          <div className="mt-16 text-xs text-muted-1 leading-relaxed space-y-2">
            <p>
              <strong>Important Disclosures:</strong> All investments involve risk, including possible loss of principal. Past performance does not guarantee future results. Please read our <Link href="/terms" className="text-success hover:underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-success hover:underline">Privacy Policy</Link>.
            </p>
            <p>
              Securities products offered by Lux Securities, Inc., member FINRA/SIPC. Cryptocurrency services provided by Lux Crypto LLC (NMLS #pending).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

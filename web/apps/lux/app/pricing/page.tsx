'use client'

import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'

export default function PricingPage() {
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

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Transparent Pricing</h1>
          <p className="text-muted-1 text-lg mb-12">
            No hidden fees. No surprises. Just straightforward pricing designed to help you succeed.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="glass-effect rounded-lg p-8 border-2 border-zinc-700">
              <h2 className="text-2xl font-bold mb-4">Pro Trader™</h2>
              <div className="mb-6">
                <span className="text-4xl font-bold text-success">$0</span>
                <span className="text-muted-1 ml-2">/ month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">$0 commission on stocks & ETFs</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">Real-time market data</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">Mobile & web trading</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">Basic charting tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">Educational resources</span>
                </li>
              </ul>
              <Link
                href="/products/pro-trader"
                className="block w-full text-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
              >
                Learn More
              </Link>
            </div>

            <div className="glass-effect rounded-lg p-8 border-2 border-success relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cta text-cta-text text-sm font-semibold rounded-full">
                Most Popular
              </div>
              <h2 className="text-2xl font-bold mb-4">Elite Pro Trader™</h2>
              <div className="mb-6">
                <span className="text-4xl font-bold text-success">$29</span>
                <span className="text-muted-1 ml-2">/ month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">Everything in Lux Pro Trader</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">Advanced charting & indicators</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">Level 2 market data</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">Options trading</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">Priority customer support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">Extended hours trading</span>
                </li>
              </ul>
              <Link
                href="/products/elite-pro-trader"
                className="block w-full text-center px-6 py-3 bg-success hover:bg-white text-white font-semibold rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>

            <div className="glass-effect rounded-lg p-8 border-2 border-zinc-700">
              <h2 className="text-2xl font-bold mb-4">Markets™</h2>
              <div className="mb-6">
                <span className="text-4xl font-bold text-success">$99</span>
                <span className="text-muted-1 ml-2">/ month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">Everything in Elite Pro</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">Global markets access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">Forex & commodities</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">Cryptocurrency trading</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">API access for algo trading</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-1">Dedicated account manager</span>
                </li>
              </ul>
              <Link
                href="/products/global-marketplace"
                className="block w-full text-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Commission & Fee Schedule</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-white font-semibold">Product</th>
                    <th className="text-left py-3 px-4 text-white font-semibold">Commission</th>
                    <th className="text-left py-3 px-4 text-white font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-muted-1">
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Stocks & ETFs</td>
                    <td className="py-3 px-4 text-success font-semibold">$0.00</td>
                    <td className="py-3 px-4">Online U.S. listed equities</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Options</td>
                    <td className="py-3 px-4">$0.65 per contract</td>
                    <td className="py-3 px-4">Plus regulatory fees</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Cryptocurrency</td>
                    <td className="py-3 px-4">0.5% - 1.5%</td>
                    <td className="py-3 px-4">Volume-based pricing</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Forex</td>
                    <td className="py-3 px-4">Variable spread</td>
                    <td className="py-3 px-4">Competitive market spreads</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Futures</td>
                    <td className="py-3 px-4">$1.25 per contract</td>
                    <td className="py-3 px-4">Plus exchange fees</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Margin Interest</td>
                    <td className="py-3 px-4">6.5% - 9.5%</td>
                    <td className="py-3 px-4">Based on account balance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Additional Fees</h2>
            <div className="space-y-3 text-muted-1">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span>Account Maintenance Fee</span>
                <span className="text-success font-semibold">$0</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span>Inactivity Fee</span>
                <span className="text-success font-semibold">$0</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span>Account Minimum</span>
                <span className="text-success font-semibold">$0</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span>Withdrawal Fee (Domestic)</span>
                <span className="text-success font-semibold">$0</span>
              </div>
              <div className="flex justify-between items-center pb-3">
                <span>Wire Transfer Fee</span>
                <span>$25 domestic / $45 international</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-success hover:bg-white text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Open Your Account
            </Link>
            <p className="text-muted-1 text-sm mt-4">
              Start with any plan. Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="mt-16 text-xs text-muted-1 leading-relaxed space-y-2">
            <p>
              <strong>Regulatory Fees:</strong> Certain transactions are subject to regulatory fees charged by exchanges and regulatory organizations. These fees are passed through to customers and may change without notice.
            </p>
            <p>
              <strong>Activity Assessment Fee:</strong> The SEC charges an activity assessment fee on sell transactions of certain securities. This fee is calculated based on the total dollar amount of the transaction.
            </p>
            <p>
              For complete fee information, please refer to our <Link href="/agreements" className="text-success hover:underline">Fee Schedule</Link> and <Link href="/terms" className="text-success hover:underline">Terms & Conditions</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MessageCircle, BookOpen, Search } from 'lucide-react'

export default function HelpPage() {
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

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Help Center</h1>
          <p className="text-muted-1 text-lg mb-12">
            We're here to help you succeed. Get answers to your questions and support when you need it.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="glass-effect rounded-lg p-6 hover:border-zinc-600 transition-all cursor-pointer">
              <Phone className="w-10 h-10 text-success mb-4" />
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-muted-1 mb-4">Speak with our support team</p>
              <p className="text-white font-semibold">+1 (973) 224-7098</p>
              <p className="text-muted-1 text-sm mt-2">Mon-Fri: 8am-8pm ET</p>
            </div>

            <div className="glass-effect rounded-lg p-6 hover:border-zinc-600 transition-all cursor-pointer">
              <Mail className="w-10 h-10 text-success mb-4" />
              <h3 className="text-xl font-bold mb-2">Email Support</h3>
              <p className="text-muted-1 mb-4">Get help via email</p>
              <a href="mailto:support@luxats.com" className="text-success hover:underline">
                support@luxats.com
              </a>
              <p className="text-muted-1 text-sm mt-2">Response within 24 hours</p>
            </div>

            <div className="glass-effect rounded-lg p-6 hover:border-zinc-600 transition-all cursor-pointer">
              <MessageCircle className="w-10 h-10 text-success mb-4" />
              <h3 className="text-xl font-bold mb-2">Live Chat</h3>
              <p className="text-muted-1 mb-4">Chat with us in real-time</p>
              <button className="px-4 py-2 bg-success hover:bg-white text-white rounded-lg transition-colors">
                Start Chat
              </button>
              <p className="text-muted-1 text-sm mt-2">Available 24/7</p>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Search className="w-8 h-8 text-success" />
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              <div className="border-b border-white/10 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-white">How do I open an account?</h3>
                <p className="text-muted-1">
                  Opening an account is quick and easy. Click "Sign Up" in the navigation menu and follow the steps. You'll need:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-1 ml-4 mt-2">
                  <li>Valid government-issued ID</li>
                  <li>Social Security Number</li>
                  <li>Bank account information for funding</li>
                  <li>Employment and financial information</li>
                </ul>
                <p className="text-muted-1 mt-2">
                  Most accounts are approved within minutes.
                </p>
              </div>

              <div className="border-b border-white/10 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-white">What are your trading hours?</h3>
                <p className="text-muted-1">
                  Regular trading hours are 9:30 AM - 4:00 PM ET, Monday through Friday. Elite Pro Trader™ and Markets™ members have access to extended hours trading from 4:00 AM - 8:00 PM ET.
                </p>
              </div>

              <div className="border-b border-white/10 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-white">How do I fund my account?</h3>
                <p className="text-muted-1">
                  You can fund your account through:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-1 ml-4 mt-2">
                  <li>ACH bank transfer (3-5 business days, free)</li>
                  <li>Wire transfer (same day, $25 fee)</li>
                  <li>Check deposit (5-7 business days, free)</li>
                  <li>Account transfer from another broker (5-7 business days, free)</li>
                </ul>
              </div>

              <div className="border-b border-white/10 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-white">Are there any account minimums?</h3>
                <p className="text-muted-1">
                  There is no minimum deposit required to open a standard account. However, certain features may require minimum balances:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-1 ml-4 mt-2">
                  <li>Margin trading: $2,000 minimum</li>
                  <li>Pattern day trading: $25,000 minimum</li>
                  <li>Options trading: Varies by level</li>
                </ul>
              </div>

              <div className="border-b border-white/10 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-white">How is my account protected?</h3>
                <p className="text-muted-1">
                  Lux Securities is a member of SIPC, which protects securities customers of its members up to $500,000 (including $250,000 for claims for cash). Additionally, we carry excess SIPC coverage and use 256-bit SSL encryption for all data transmission.
                </p>
              </div>

              <div className="border-b border-white/10 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-white">What trading platforms do you offer?</h3>
                <p className="text-muted-1">
                  We offer multiple platform options:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-1 ml-4 mt-2">
                  <li>Web Trading Platform (browser-based)</li>
                  <li>Mobile Apps (iOS & Android)</li>
                  <li>Desktop Applications (Mac & Windows)</li>
                  <li>API Access (for algorithmic trading)</li>
                </ul>
              </div>

              <div className="pb-6">
                <h3 className="text-xl font-semibold mb-3 text-white">How do I withdraw funds?</h3>
                <p className="text-muted-1">
                  You can withdraw funds through ACH bank transfer (free) or wire transfer ($25 fee). Withdrawals are typically processed within 1-3 business days. Log into your account and navigate to "Transfer Funds" to initiate a withdrawal.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-success" />
              <h2 className="text-3xl font-bold">Learning Resources</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Trading Guides</h3>
                <ul className="space-y-2 text-muted-1">
                  <li>
                    <Link href="/learn" className="hover:text-success transition-colors">
                      → Getting Started with Trading
                    </Link>
                  </li>
                  <li>
                    <Link href="/learn" className="hover:text-success transition-colors">
                      → Understanding Market Orders
                    </Link>
                  </li>
                  <li>
                    <Link href="/learn" className="hover:text-success transition-colors">
                      → Options Trading Basics
                    </Link>
                  </li>
                  <li>
                    <Link href="/learn" className="hover:text-success transition-colors">
                      → Technical Analysis 101
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white">Platform Tutorials</h3>
                <ul className="space-y-2 text-muted-1">
                  <li>
                    <Link href="/learn" className="hover:text-success transition-colors">
                      → How to Place Your First Trade
                    </Link>
                  </li>
                  <li>
                    <Link href="/learn" className="hover:text-success transition-colors">
                      → Using Advanced Charting Tools
                    </Link>
                  </li>
                  <li>
                    <Link href="/learn" className="hover:text-success transition-colors">
                      → Setting Up Watchlists & Alerts
                    </Link>
                  </li>
                  <li>
                    <Link href="/learn" className="hover:text-success transition-colors">
                      → Mobile App Guide
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-4 text-muted-1">
              <div>
                <p className="text-white font-semibold mb-1">Lux Markets</p>
                <p>The Trump Building</p>
                <p>40 Wall Street, Suite 2702</p>
                <p>New York, NY 10005</p>
              </div>
              <div>
                <p><strong className="text-white">Phone:</strong> +1 (973) 224-7098</p>
                <p><strong className="text-white">Email:</strong> <a href="mailto:support@luxats.com" className="text-success hover:underline">support@luxats.com</a></p>
              </div>
              <div>
                <p className="text-sm">
                  Lux Securities, Inc. is a member of FINRA, SIPC, and NYSE.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { ArrowLeft, Shield, Users, TrendingUp, Globe } from 'lucide-react'

export default function AboutPage() {
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

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Lux</h1>
          <p className="text-muted-1 text-lg mb-12">
            Empowering investors worldwide with cutting-edge technology and transparent trading
          </p>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-1 leading-relaxed">
              <p>
                Lux Markets was founded with a simple mission: to democratize access to financial markets and empower every investor with professional-grade tools and resources.
              </p>
              <p>
                In an industry dominated by traditional brokerages with high fees and complex interfaces, we saw an opportunity to revolutionize the trading experience. We built a platform that combines institutional-quality technology with an intuitive, user-friendly design.
              </p>
              <p>
                Today, Lux serves thousands of traders worldwide, from beginners taking their first steps in the market to sophisticated investors managing complex portfolios. Our commitment to innovation, transparency, and customer success drives everything we do.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-effect rounded-lg p-8">
              <Shield className="w-12 h-12 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">Regulated & Secure</h2>
              <p className="text-muted-1 leading-relaxed">
                Lux Assets Management LLC is a member of FINRA, SIPC, and NYSE. We maintain the highest standards of regulatory compliance and employ bank-level security to protect your assets and personal information.
              </p>
            </div>

            <div className="glass-effect rounded-lg p-8">
              <Users className="w-12 h-12 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">Customer First</h2>
              <p className="text-muted-1 leading-relaxed">
                Your success is our success. We provide 24/7 customer support, extensive educational resources, and tools designed to help you make informed investment decisions. We're here whenever you need us.
              </p>
            </div>

            <div className="glass-effect rounded-lg p-8">
              <TrendingUp className="w-12 h-12 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">Advanced Technology</h2>
              <p className="text-muted-1 leading-relaxed">
                Our proprietary trading platform leverages cutting-edge technology to deliver lightning-fast execution, real-time data, and professional-grade charting tools. Trade with confidence knowing you have the best tools at your fingertips.
              </p>
            </div>

            <div className="glass-effect rounded-lg p-8">
              <Globe className="w-12 h-12 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">Global Markets</h2>
              <p className="text-muted-1 leading-relaxed">
                Access markets around the world from a single platform. Trade U.S. stocks, international equities, cryptocurrencies, forex, commodities, and more. The global marketplace is at your fingertips.
              </p>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Transparency</h3>
                <p className="text-muted-1">
                  No hidden fees. No surprises. We believe in clear, straightforward pricing and honest communication with our customers.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Innovation</h3>
                <p className="text-muted-1">
                  We're constantly evolving our platform and services to meet the changing needs of modern investors. Your feedback drives our innovation.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Accessibility</h3>
                <p className="text-muted-1">
                  Financial markets should be accessible to everyone, not just the wealthy. We've eliminated barriers to entry while maintaining professional-grade capabilities.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Education</h3>
                <p className="text-muted-1">
                  Knowledge is power. We provide extensive educational resources to help you become a more informed and successful investor.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Regulatory Information</h2>
            <div className="space-y-4 text-muted-1 leading-relaxed">
              <p>
                <strong className="text-white">Lux Assets Management LLC</strong> is a registered broker-dealer and member of the Financial Industry Regulatory Authority (FINRA), the Securities Investor Protection Corporation (SIPC), and the New York Stock Exchange (NYSE).
              </p>
              <p>
                Our firm is subject to rigorous regulatory oversight and maintains all required licenses and registrations. We adhere to the highest standards of conduct and are committed to protecting the interests of our clients.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white font-semibold mb-1">FINRA Member</p>
                  <p className="text-sm">Regulatory oversight & protection</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white font-semibold mb-1">SIPC Member</p>
                  <p className="text-sm">Securities protection up to $500,000</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white font-semibold mb-1">NYSE Member</p>
                  <p className="text-sm">Direct market access</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <div className="space-y-4 text-muted-1">
              <div>
                <p className="text-white font-semibold mb-1">Lux Markets</p>
                <p>The Trump Building</p>
                <p>40 Wall Street, Suite 2702</p>
                <p>New York, NY 10005</p>
              </div>
              <div>
                <p><strong className="text-white">Phone:</strong> +1 (973) 224-7098</p>
                <p><strong className="text-white">Email:</strong> <a href="mailto:support@lux.exchange" className="text-success hover:underline">support@lux.exchange</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

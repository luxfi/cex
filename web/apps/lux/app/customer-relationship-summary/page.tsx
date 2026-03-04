'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CustomerRelationshipSummaryPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-success hover:text-success/80 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Customer Relationship Summary (Form CRS)</h1>
          <p className="text-muted-1 mb-8">Last Updated: {currentDate}</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <div className="glass-effect rounded-lg p-6 border border-blue-500/20 bg-blue-500/5 mb-8">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">About This Document</h3>
                <p className="text-muted-1 leading-relaxed">
                  This Customer Relationship Summary (Form CRS) provides information about Lux Assets Management LLC and the brokerage services we offer through Alpaca Securities LLC. Form CRS is designed to help you understand the services we provide, the fees you will pay, and conflicts of interest that may exist.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                Lux Assets Management LLC ("Lux ATS," "we," "us") provides access to brokerage services through Alpaca Securities LLC, a registered broker-dealer and member of FINRA and SIPC. We are not an investment adviser and do not provide investment advice or recommendations.
              </p>
              <p className="text-muted-1 leading-relaxed">
                Free and simple tools are available to research firms and financial professionals at <a href="https://www.investor.gov/CRS" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Investor.gov/CRS</a>, which also provides educational materials about broker-dealers, investment advisers, and investing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">What investment services and advice can you provide me?</h2>
              
              <div className="glass-effect rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Brokerage Services</h3>
                <p className="text-muted-1 leading-relaxed mb-4">
                  We offer self-directed brokerage services through Alpaca Securities LLC. This means you make your own investment decisions. We do not provide investment advice or recommendations regarding the purchase or sale of any security or investment strategy.
                </p>
                <p className="text-muted-1 leading-relaxed mb-4">
                  <strong className="text-white">Available Investments:</strong> Through our platform, you can trade:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                  <li>Stocks (U.S. and international equities)</li>
                  <li>Exchange-Traded Funds (ETFs)</li>
                  <li>Options</li>
                  <li>Cryptocurrencies (through Alpaca Crypto LLC)</li>
                </ul>
              </div>

              <div className="glass-effect rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Account Monitoring</h3>
                <p className="text-muted-1 leading-relaxed">
                  We do not monitor your account or investments. As a self-directed investor, you are responsible for monitoring your own account and making your own investment decisions. We provide you with tools and information to help you manage your investments, but we do not provide ongoing advice or recommendations.
                </p>
              </div>

              <div className="glass-effect rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Investment Authority</h3>
                <p className="text-muted-1 leading-relaxed">
                  You have complete discretion and authority over your account. We do not have discretionary authority to make investment decisions on your behalf. All investment decisions are made by you.
                </p>
              </div>

              <div className="glass-effect rounded-lg p-6 border border-purple-500/20 bg-purple-500/5">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Conversation Starters</h3>
                <p className="text-muted-1 mb-2">Ask us:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                  <li>"Given my financial situation, should I choose a brokerage service? Why or why not?"</li>
                  <li>"How will you choose investments to recommend to me?"</li>
                  <li>"What is your relevant experience, including your licenses, education and other qualifications?"</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">What fees will I pay?</h2>
              
              <div className="glass-effect rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Trading Commissions</h3>
                <p className="text-muted-1 leading-relaxed mb-4">
                  We offer $0 commission trading for online U.S. equity trades and ETFs in a brokerage account. However, you may still pay the following fees:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                  <li><strong className="text-white">Options:</strong> Per-contract fees may apply</li>
                  <li><strong className="text-white">Regulatory Fees:</strong> SEC fees and FINRA Trading Activity Fees</li>
                  <li><strong className="text-white">Cryptocurrency:</strong> Different fee structures apply</li>
                </ul>
              </div>

              <div className="glass-effect rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Other Fees</h3>
                <p className="text-muted-1 leading-relaxed mb-4">
                  Additional fees that may apply include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                  <li>Wire transfer fees</li>
                  <li>Returned check fees</li>
                  <li>Account transfer fees</li>
                  <li>Paper statement fees (if requested)</li>
                  <li>Margin interest (if you trade on margin)</li>
                  <li>Market data subscription fees (optional)</li>
                </ul>
              </div>

              <div className="glass-effect rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Important Information About Fees</h3>
                <p className="text-muted-1 leading-relaxed">
                  You will pay fees and costs whether you make or lose money on your investments. Fees and costs will reduce any amount of money you make on your investments over time. Please make sure you understand what fees and costs you are paying.
                </p>
              </div>

              <div className="glass-effect rounded-lg p-6 border border-purple-500/20 bg-purple-500/5">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Conversation Starter</h3>
                <p className="text-muted-1 mb-2">Ask us:</p>
                <p className="text-muted-1 ml-4">"Help me understand how these fees and costs might affect my investments. If I give you $10,000 to invest, how much will go to fees and costs, and how much will be invested for me?"</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">What are your legal obligations to me when providing recommendations? How else does your firm make money and what conflicts of interest do you have?</h2>
              
              <div className="glass-effect rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Standard of Conduct</h3>
                <p className="text-muted-1 leading-relaxed">
                  We do not provide investment advice or recommendations. As a self-directed brokerage platform, you make your own investment decisions. When we do provide services, we must act in your best interest and not place our interests ahead of yours.
                </p>
              </div>

              <div className="glass-effect rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">How We Make Money</h3>
                <p className="text-muted-1 leading-relaxed mb-4">
                  We and our service providers (including Alpaca Securities LLC) make money through:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                  <li><strong className="text-white">Payment for Order Flow:</strong> We may receive payment from market makers for routing your orders to them</li>
                  <li><strong className="text-white">Margin Interest:</strong> Interest charged on margin loans</li>
                  <li><strong className="text-white">Securities Lending:</strong> Revenue from lending your securities to other parties</li>
                  <li><strong className="text-white">Market Data Fees:</strong> Optional subscription fees for premium market data</li>
                  <li><strong className="text-white">Other Service Fees:</strong> Fees for specific services like wire transfers</li>
                </ul>
              </div>

              <div className="glass-effect rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Conflicts of Interest</h3>
                <p className="text-muted-1 leading-relaxed mb-4">
                  Our financial incentives and conflicts of interest include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                  <li>We receive payment for order flow, which creates an incentive to route orders to certain market makers</li>
                  <li>We earn interest on margin loans, which creates an incentive for you to trade on margin</li>
                  <li>We may earn revenue from securities lending</li>
                </ul>
                <p className="text-muted-1 leading-relaxed mt-4">
                  Despite these conflicts, we are required to seek best execution for your orders and act in your best interest.
                </p>
              </div>

              <div className="glass-effect rounded-lg p-6 border border-purple-500/20 bg-purple-500/5">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Conversation Starter</h3>
                <p className="text-muted-1 mb-2">Ask us:</p>
                <p className="text-muted-1 ml-4">"How might your conflicts of interest affect me, and how will you address them?"</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How do your financial professionals make money?</h2>
              <div className="glass-effect rounded-lg p-6">
                <p className="text-muted-1 leading-relaxed">
                  Our platform is self-directed and automated. We do not employ financial professionals who provide investment advice or recommendations. Customer service representatives who assist with technical or account-related questions are typically compensated through salary and do not receive compensation based on the products you buy, the amount of assets in your account, or the number of transactions you make.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Do you or your financial professionals have legal or disciplinary history?</h2>
              <div className="glass-effect rounded-lg p-6 mb-6">
                <p className="text-muted-1 leading-relaxed mb-4">
                  No. Visit <a href="https://www.investor.gov/CRS" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Investor.gov/CRS</a> for a free and simple search tool to research us and our financial professionals.
                </p>
              </div>

              <div className="glass-effect rounded-lg p-6 border border-purple-500/20 bg-purple-500/5">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Conversation Starter</h3>
                <p className="text-muted-1 mb-2">Ask us:</p>
                <p className="text-muted-1 ml-4">"As a financial professional, do you have any disciplinary history? For what type of conduct?"</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
              <div className="glass-effect rounded-lg p-6 mb-6">
                <p className="text-muted-1 leading-relaxed mb-4">
                  For additional information about our services, please visit our website or contact us directly:
                </p>
                <p className="text-white mb-2"><strong>Lux Assets Management LLC</strong></p>
                <p className="text-muted-1">
                  The Trump Building<br />
                  40 Wall Street, Suite 2702<br />
                  New York, NY 10005
                </p>
                <p className="text-muted-1 mt-3">Email: support@lux.exchange</p>
                <p className="text-muted-1">Phone: +1 (973) 224-7098</p>
                <p className="text-muted-1 mt-4">Website: <Link href="/" className="text-primary hover:underline">lux.exchange</Link></p>
              </div>

              <div className="glass-effect rounded-lg p-6 border border-purple-500/20 bg-purple-500/5">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Conversation Starters</h3>
                <p className="text-muted-1 mb-2">Ask us:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                  <li>"Who is my primary contact person?"</li>
                  <li>"Is he or she a representative of an investment adviser or a broker-dealer?"</li>
                  <li>"Who can I talk to if I have concerns about how this person is treating me?"</li>
                </ul>
              </div>
            </section>

            <section className="border-t pt-8">
              <p className="text-sm text-muted-1">
                Services provided by <strong>Lux Assets Management LLC</strong> through Alpaca Securities LLC (member FINRA/SIPC) and Alpaca Crypto LLC (NMLS # 2160858).
              </p>
              <p className="text-sm text-muted-1 mt-2">
                © {new Date().getFullYear()} Lux Assets Management LLC. All rights reserved.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ExtendedHoursRiskPage() {
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

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Extended Hours Trading Risk Disclosure</h1>
          <p className="text-muted-1 mb-8">Important information about pre-market and after-hours trading</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <div className="glass-effect rounded-lg p-6 border border-yellow-500/20 bg-yellow-500/5 mb-8">
                <h3 className="text-xl font-semibold mb-3 text-yellow-400">⚠️ Important Notice</h3>
                <p className="text-muted-1 leading-relaxed">
                  Trading during extended hours sessions involves unique risks that differ from regular trading hours. Please carefully review this disclosure before participating in extended hours trading.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">What is Extended Hours Trading?</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                Extended hours trading refers to the ability to buy and sell securities outside of the regular market hours. The regular trading session for U.S. stock markets is typically 9:30 AM to 4:00 PM Eastern Time. Extended hours trading includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                <li><strong className="text-white">Pre-Market Session:</strong> Typically 4:00 AM to 9:30 AM ET</li>
                <li><strong className="text-white">After-Hours Session:</strong> Typically 4:00 PM to 8:00 PM ET</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Key Risks of Extended Hours Trading</h2>
              
              <div className="space-y-6">
                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">1. Risk of Lower Liquidity</h3>
                  <p className="text-muted-1 leading-relaxed">
                    Liquidity refers to the ability of market participants to buy and sell securities. Generally, the more orders available in a market, the greater the liquidity. Extended hours trading typically has less liquidity than trading during regular market hours, which means:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4 mt-3">
                    <li>It may be more difficult to execute your order</li>
                    <li>Your order may only be partially executed</li>
                    <li>You may not be able to trade at all</li>
                    <li>Orders may take longer to fill</li>
                  </ul>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">2. Risk of Higher Volatility</h3>
                  <p className="text-muted-1 leading-relaxed">
                    Volatility refers to the changes in price that securities undergo when trading. Generally, the less liquidity in a market, the higher the volatility. Extended hours trading can lead to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4 mt-3">
                    <li>Larger and more rapid price movements</li>
                    <li>Greater price uncertainty</li>
                    <li>Prices that differ significantly from regular hours</li>
                    <li>Increased risk of losses</li>
                  </ul>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">3. Risk of Changing Prices</h3>
                  <p className="text-muted-1 leading-relaxed">
                    The prices of securities traded in extended hours trading may not reflect the prices either:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4 mt-3">
                    <li>At the end of regular market hours, or</li>
                    <li>Upon the opening of regular market hours the next day</li>
                  </ul>
                  <p className="text-muted-1 leading-relaxed mt-3">
                    As a result, you may receive an inferior price in extended hours trading than you would during regular market hours.
                  </p>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">4. Risk of Unlinked Markets</h3>
                  <p className="text-muted-1 leading-relaxed">
                    Depending on the extended hours trading system or the time of day, the prices displayed on a particular extended hours trading system may not reflect the prices in other concurrently operating extended hours trading systems dealing in the same securities. Accordingly, you may receive an inferior price in one extended hours trading system than you would in another extended hours trading system.
                  </p>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">5. Risk of News Announcements</h3>
                  <p className="text-muted-1 leading-relaxed">
                    Normally, issuers make news announcements that may affect the price of their securities after regular market hours. Similarly, important financial information is frequently announced outside of regular market hours. In extended hours trading, these announcements may occur during trading, and if combined with lower liquidity and higher volatility, may cause an exaggerated and unsustainable effect on the price of a security.
                  </p>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">6. Risk of Wider Spreads</h3>
                  <p className="text-muted-1 leading-relaxed">
                    The spread refers to the difference in price between what you can buy a security for and what you can sell it for. Lower liquidity and higher volatility in extended hours trading may result in wider than normal spreads for a particular security, which means:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4 mt-3">
                    <li>Your order may only be partially executed</li>
                    <li>You may receive an inferior price</li>
                    <li>Trading costs may be higher</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Order Types and Limitations</h2>
              <div className="glass-effect rounded-lg p-6">
                <p className="text-muted-1 leading-relaxed mb-4">
                  During extended hours trading, certain order types may not be available or may function differently than during regular hours:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                  <li><strong className="text-white">Limit Orders Only:</strong> Many extended hours sessions only accept limit orders</li>
                  <li><strong className="text-white">No Market Orders:</strong> Market orders may not be accepted during extended hours</li>
                  <li><strong className="text-white">Day Orders Only:</strong> Orders typically do not carry over between sessions</li>
                  <li><strong className="text-white">No Stop Orders:</strong> Stop and stop-limit orders may not be available</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Professional Participation</h2>
              <p className="text-muted-1 leading-relaxed">
                Many professional traders and institutional investors have access to better information and more sophisticated trading systems during extended hours. This may put individual investors at a disadvantage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Computer System Failures</h2>
              <p className="text-muted-1 leading-relaxed">
                Like all electronic trading systems, extended hours trading systems are subject to system failures that may prevent you from entering or executing orders. Your ability to recover losses caused by system failures may be subject to the limitations of federal and state laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                Before engaging in extended hours trading, you should:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                <li>Carefully review the extended hours trading rules and procedures</li>
                <li>Understand how your orders will be executed</li>
                <li>Consider whether extended hours trading is appropriate for your investment goals</li>
                <li>Be aware of the specific hours during which extended hours trading is available</li>
                <li>Understand how prices are determined during extended hours</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="glass-effect rounded-lg p-6">
                <p className="text-muted-1 mb-3">
                  If you have questions about extended hours trading, please contact:
                </p>
                <p className="text-white mb-2"><strong>Lux Exchange LLC</strong></p>
                <p className="text-muted-1">
                  The Trump Building<br />
                  40 Wall Street, Suite 2702<br />
                  New York, NY 10005
                </p>
                <p className="text-muted-1 mt-3">Email: support@luxprotrader.com</p>
                <p className="text-muted-1">Phone: +1 (973) 224-7098</p>
              </div>
            </section>

            <section className="border-t pt-8">
              <p className="text-sm text-muted-1">
                Services provided by <strong>Lux Exchange LLC</strong> through Alpaca Securities LLC (member FINRA/SIPC).
              </p>
              <p className="text-sm text-muted-1 mt-2">
                © {new Date().getFullYear()} Lux Exchange LLC. All rights reserved.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

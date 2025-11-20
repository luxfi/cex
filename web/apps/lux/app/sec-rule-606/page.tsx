'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SECRule606Page() {
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

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">SEC Rule 606 Reports</h1>
          <p className="text-muted-1 mb-8">Order Routing and Execution Quality Disclosures</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">About SEC Rule 606</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                SEC Rule 606 requires broker-dealers to make publicly available quarterly reports that provide information on their order routing practices. These reports help investors understand how their orders are routed and executed.
              </p>
              <p className="text-muted-1 leading-relaxed">
                The rule requires disclosure of the venues to which customer orders were routed for execution, as well as information about payment for order flow and other compensation arrangements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">What Information is Disclosed?</h2>
              <div className="space-y-4">
                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Order Routing Venues</h3>
                  <p className="text-muted-1">
                    Information about the top venues to which orders were routed for execution, including exchanges, market makers, and electronic communication networks (ECNs).
                  </p>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Order Types</h3>
                  <p className="text-muted-1">
                    Breakdown by order type including market orders, marketable limit orders, non-marketable limit orders, and other order types.
                  </p>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Payment for Order Flow</h3>
                  <p className="text-muted-1">
                    Disclosure of any monetary payment, service, or property received for directing orders to particular venues for execution.
                  </p>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Execution Statistics</h3>
                  <p className="text-muted-1">
                    Information about execution quality including fill rates, speed of execution, and price improvement.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Quarterly Reports</h2>
              <p className="text-muted-1 mb-4">
                Rule 606 reports are published quarterly and cover order routing for the previous quarter. Reports are typically available within one month after the quarter ends.
              </p>
              
              <div className="space-y-4">
                <div className="glass-effect rounded-lg p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold text-white">Q4 2024 Report</h3>
                    <span className="text-sm text-muted-1">January - March 2025</span>
                  </div>
                  <p className="text-muted-1 mb-4">
                    Order routing disclosure for the fourth quarter of 2024.
                  </p>
                  <Link href="#" className="text-primary hover:underline font-semibold">
                    View Report (PDF) →
                  </Link>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold text-white">Q3 2024 Report</h3>
                    <span className="text-sm text-muted-1">October - December 2024</span>
                  </div>
                  <p className="text-muted-1 mb-4">
                    Order routing disclosure for the third quarter of 2024.
                  </p>
                  <Link href="#" className="text-primary hover:underline font-semibold">
                    View Report (PDF) →
                  </Link>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <p className="text-muted-1">
                    Additional historical reports are available upon request. Please contact customer support.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Order Routing Practices</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                Lux Exchange LLC, through Alpaca Securities LLC, routes customer orders to various execution venues with the goal of obtaining the best execution for customer orders. Factors considered include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                <li>Price improvement opportunities</li>
                <li>Speed of execution</li>
                <li>Likelihood of execution and settlement</li>
                <li>Size of the order</li>
                <li>Trading characteristics of the security</li>
                <li>Availability of accurate information</li>
                <li>Cost of executing the order</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Payment for Order Flow</h2>
              <div className="glass-effect rounded-lg p-6">
                <p className="text-muted-1 leading-relaxed mb-4">
                  Alpaca Securities LLC may receive payment for order flow from market makers and other execution venues. This means that we may receive compensation for routing your orders to these venues for execution.
                </p>
                <p className="text-muted-1 leading-relaxed mb-4">
                  Payment for order flow is disclosed in our Rule 606 reports and does not result in additional charges to you. Our duty of best execution means we must seek to obtain the most favorable terms reasonably available for customer orders.
                </p>
                <p className="text-muted-1 leading-relaxed">
                  For more information about payment for order flow and how it may impact your orders, please review our quarterly Rule 606 reports or contact customer support.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Best Execution</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                We are committed to seeking best execution for all customer orders. Best execution means seeking to obtain the most favorable terms reasonably available under the circumstances for customer transactions. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                <li>Regular and rigorous review of execution quality</li>
                <li>Monitoring of order routing destinations</li>
                <li>Assessment of execution quality metrics</li>
                <li>Comparison of execution quality across venues</li>
                <li>Adjustment of routing practices as market conditions change</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Requesting Specific Order Information</h2>
              <div className="glass-effect rounded-lg p-6">
                <p className="text-muted-1 leading-relaxed mb-4">
                  In addition to quarterly reports, customers may request information about the routing and execution of their specific orders placed in the prior six months. This information includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4 mb-4">
                  <li>The venue to which the order was routed</li>
                  <li>Whether the order was a market order or limit order</li>
                  <li>The time of the order and execution</li>
                  <li>The terms of the order as specified by the customer</li>
                </ul>
                <p className="text-muted-1 leading-relaxed">
                  To request this information, please contact customer support at support@luxprotrader.com or call +1 (973) 224-7098.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
              <div className="space-y-4">
                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">SEC Information</h3>
                  <p className="text-muted-1 mb-3">
                    For more information about SEC Rule 606 and order execution:
                  </p>
                  <a 
                    href="https://www.sec.gov/rules/final/2018/34-84528.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline font-semibold"
                  >
                    SEC Rule 606 Final Rule (SEC.gov) →
                  </a>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">FINRA Resources</h3>
                  <p className="text-muted-1 mb-3">
                    Additional information about order execution and investor protection:
                  </p>
                  <a 
                    href="https://www.finra.org/investors/learn-to-invest/advanced-investing/understanding-order-execution" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline font-semibold"
                  >
                    Understanding Order Execution (FINRA.org) →
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="glass-effect rounded-lg p-6">
                <p className="text-muted-1 mb-3">
                  For questions about our order routing practices or to request specific order information:
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

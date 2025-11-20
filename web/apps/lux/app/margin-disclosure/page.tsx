'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function MarginDisclosurePage() {
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

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Margin Disclosure Statement</h1>
          <p className="text-muted-1 mb-8">Important information about margin trading risks and requirements</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <div className="glass-effect rounded-lg p-6 border border-red-500/20 bg-red-500/5 mb-8">
                <h3 className="text-xl font-semibold mb-3 text-red-400">⚠️ Critical Risk Warning</h3>
                <p className="text-muted-1 leading-relaxed font-semibold">
                  Margin trading involves significant risks. You can lose more than your initial investment. This disclosure contains important information about margin trading. Please read it carefully before trading on margin.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">What is Margin Trading?</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                Margin trading allows you to borrow money from your broker to purchase securities. This is also known as "buying on margin." When you trade on margin, your brokerage account serves as collateral for the loan. The securities you purchase and any cash in your account are used to secure the borrowed funds.
              </p>
              <p className="text-muted-1 leading-relaxed">
                Margin trading can increase your potential returns, but it also amplifies your potential losses. You can lose more than your initial investment when trading on margin.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Key Risks of Margin Trading</h2>
              
              <div className="space-y-6">
                <div className="glass-effect rounded-lg p-6 border border-red-500/20">
                  <h3 className="text-xl font-semibold text-white mb-3">1. You Can Lose More Than You Invest</h3>
                  <p className="text-muted-1 leading-relaxed">
                    When you trade on margin, you are borrowing money to invest. If your investments decline in value, you not only lose your own money, but you still owe the money you borrowed plus interest. This means your losses can exceed your initial investment.
                  </p>
                </div>

                <div className="glass-effect rounded-lg p-6 border border-red-500/20">
                  <h3 className="text-xl font-semibold text-white mb-3">2. Your Firm Can Force the Sale of Securities</h3>
                  <p className="text-muted-1 leading-relaxed mb-3">
                    If the value of securities in your margin account declines, your broker may issue a "margin call," requiring you to deposit additional funds or securities. If you cannot meet the margin call, your broker has the right to sell your securities without contacting you to bring your account back into compliance.
                  </p>
                  <p className="text-muted-1 leading-relaxed">
                    You cannot control which securities are sold or when they are sold. Your broker can sell your securities at any time without notice, even if the sale results in a loss.
                  </p>
                </div>

                <div className="glass-effect rounded-lg p-6 border border-red-500/20">
                  <h3 className="text-xl font-semibold text-white mb-3">3. Your Firm Can Increase Margin Requirements</h3>
                  <p className="text-muted-1 leading-relaxed">
                    Your broker can increase the "house" margin requirements at any time, without advance notice. This may result in a margin call even if the value of your securities has not changed.
                  </p>
                </div>

                <div className="glass-effect rounded-lg p-6 border border-red-500/20">
                  <h3 className="text-xl font-semibold text-white mb-3">4. You Are Not Entitled to an Extension of Time</h3>
                  <p className="text-muted-1 leading-relaxed">
                    While your broker may voluntarily extend the time to meet a margin call, you do not have a right to an extension. Your broker can immediately sell your securities without waiting for you to meet the margin call.
                  </p>
                </div>

                <div className="glass-effect rounded-lg p-6 border border-red-500/20">
                  <h3 className="text-xl font-semibold text-white mb-3">5. Interest Charges</h3>
                  <p className="text-muted-1 leading-relaxed">
                    You will be charged interest on money you borrow on margin. These interest charges are in addition to any other fees and commissions, and will reduce your overall returns or increase your losses.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Margin Requirements</h2>
              
              <div className="space-y-4">
                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Initial Margin Requirement</h3>
                  <p className="text-muted-1 leading-relaxed mb-3">
                    Federal Reserve Regulation T requires you to deposit at least 50% of the purchase price of securities bought on margin. This is called the "initial margin requirement." Some securities may have higher initial margin requirements.
                  </p>
                  <p className="text-muted-1 leading-relaxed">
                    <strong className="text-white">Example:</strong> If you want to purchase $10,000 worth of securities on margin, you must deposit at least $5,000 (50%) in cash or eligible securities. You can then borrow the remaining $5,000 from your broker.
                  </p>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Maintenance Margin Requirement</h3>
                  <p className="text-muted-1 leading-relaxed mb-3">
                    After you purchase securities on margin, FINRA and the exchanges require you to maintain a minimum amount of equity in your account, known as the "maintenance margin requirement." The minimum maintenance requirement is typically 25% of the total market value of the securities in your margin account.
                  </p>
                  <p className="text-muted-1 leading-relaxed mb-3">
                    However, many brokerage firms have higher "house" maintenance requirements, often between 30% to 40%. These higher requirements help protect both you and the broker from larger losses.
                  </p>
                  <p className="text-muted-1 leading-relaxed">
                    <strong className="text-white">Example:</strong> If your account has $10,000 worth of securities and a 30% maintenance requirement, you must maintain at least $3,000 in equity. If the value of your securities falls and your equity drops below $3,000, you will receive a margin call.
                  </p>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Special Margin Requirements</h3>
                  <p className="text-muted-1 leading-relaxed">
                    Certain securities may have higher margin requirements due to volatility or other risk factors. These special requirements can change at any time based on market conditions. It is your responsibility to understand the margin requirements for securities you wish to trade.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Margin Calls</h2>
              <div className="glass-effect rounded-lg p-6">
                <p className="text-muted-1 leading-relaxed mb-4">
                  A margin call occurs when the equity in your margin account falls below the required maintenance level. When you receive a margin call, you must take one of the following actions:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4 mb-4">
                  <li><strong className="text-white">Deposit Additional Funds:</strong> Add cash or marginable securities to your account</li>
                  <li><strong className="text-white">Sell Securities:</strong> Liquidate positions to reduce your margin loan</li>
                  <li><strong className="text-white">Accept Liquidation:</strong> Allow your broker to sell securities in your account</li>
                </ul>
                <p className="text-muted-1 leading-relaxed">
                  <strong className="text-white">Important:</strong> Your broker is not required to notify you before liquidating securities in your account to meet a margin call. Your broker can sell your securities at any time without waiting for you to meet the margin call, and you may not have any say in which securities are sold.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Interest on Margin Loans</h2>
              <div className="glass-effect rounded-lg p-6">
                <p className="text-muted-1 leading-relaxed mb-4">
                  Interest is charged on the amount you borrow (your margin debit balance). The interest rate varies based on several factors:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4 mb-4">
                  <li>The size of your margin debit balance</li>
                  <li>Current market interest rates</li>
                  <li>The broker's base lending rate</li>
                </ul>
                <p className="text-muted-1 leading-relaxed mb-4">
                  Interest is typically calculated daily and charged monthly. Current margin interest rates are available in your account settings or by contacting customer support.
                </p>
                <p className="text-muted-1 leading-relaxed">
                  Interest charges reduce your overall returns. You must earn more on your investments than the interest you pay on your margin loan to profit from margin trading.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Is Margin Trading Right for You?</h2>
              <div className="glass-effect rounded-lg p-6">
                <p className="text-muted-1 leading-relaxed mb-4">
                  Margin trading is not appropriate for everyone. Before trading on margin, consider:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4 mb-4">
                  <li>Your investment objectives and risk tolerance</li>
                  <li>Your financial situation and ability to withstand losses</li>
                  <li>Your investment experience and knowledge</li>
                  <li>Whether you understand the risks involved</li>
                  <li>Whether you can afford to lose more than your initial investment</li>
                  <li>Whether you can meet potential margin calls</li>
                </ul>
                <p className="text-muted-1 leading-relaxed">
                  If you have questions about whether margin trading is appropriate for you, please consult with a financial advisor or contact customer support.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
              <div className="space-y-4">
                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">FINRA Resources</h3>
                  <p className="text-muted-1 mb-3">
                    For more information about margin trading:
                  </p>
                  <a 
                    href="https://www.finra.org/investors/learn-to-invest/advanced-investing/purchasing-margin" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline font-semibold"
                  >
                    Purchasing on Margin (FINRA.org) →
                  </a>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">SEC Resources</h3>
                  <p className="text-muted-1 mb-3">
                    Investor education about margin:
                  </p>
                  <a 
                    href="https://www.sec.gov/investor/pubs/margin.htm" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline font-semibold"
                  >
                    Margin: Borrowing Money to Pay for Stocks (SEC.gov) →
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="glass-effect rounded-lg p-6">
                <p className="text-muted-1 mb-3">
                  For questions about margin trading or your specific margin requirements:
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
              <p className="text-sm text-muted-1 mb-3">
                <strong>Lux Exchange LLC</strong> provides access to brokerage services through Alpaca Securities LLC, member FINRA/SIPC. Margin trading is subject to Alpaca Securities' margin agreement and requirements.
              </p>
              <p className="text-sm text-muted-1">
                © {new Date().getFullYear()} Lux Exchange LLC. All rights reserved.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

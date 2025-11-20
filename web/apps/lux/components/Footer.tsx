'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-primary/50 backdrop-blur-xl">
      {/* Download Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">Download Mobile App</h3>
          <p className="text-white/70 mb-6">Trade on the go with our award-winning mobile app</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href="https://apps.apple.com/us/app/luxats"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
              </svg>
              Download on App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.luxats"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              Get it on Google Play
            </a>
          </div>
          <h4 className="text-lg font-semibold text-white mb-4">Desktop & Web Platforms</h4>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link href="/download/mac" className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20">
              Mac
            </Link>
            <Link href="/download/windows" className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20">
              Windows
            </Link>
            <Link href="/web-trading" className="px-6 py-2 bg-success hover:bg-success/90 text-white rounded-lg transition-colors border border-success font-semibold">
              Web Trading
            </Link>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-white/70 hover:text-white text-sm transition-colors">
                  Help
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/pro-trader" className="text-white/70 hover:text-white text-sm transition-colors">
                  Pro Trader™
                </Link>
              </li>
              <li>
                <Link href="/products/elite-pro-trader" className="text-white/70 hover:text-white text-sm transition-colors">
                  Elite Pro Trader™
                </Link>
              </li>
              <li>
                <Link href="/products/global-marketplace" className="text-white/70 hover:text-white text-sm transition-colors">
                  Markets™
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Trading</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/invest" className="text-white/70 hover:text-white text-sm transition-colors">
                  Invest
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white/70 hover:text-white text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/web-trading" className="text-white/70 hover:text-white text-sm transition-colors">
                  Web Trading
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/download" className="text-white/70 hover:text-white text-sm transition-colors">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-white/70 hover:text-white text-sm transition-colors">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/institutional" className="text-white/70 hover:text-white text-sm transition-colors">
                  Institutional
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/signup" className="text-white/70 hover:text-white text-sm transition-colors">
                  Open Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-white/70 hover:text-white text-sm transition-colors">
                  Log In
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-white/70 hover:text-white text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-white/70 hover:text-white text-sm transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Member Of Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex items-center justify-center space-x-6 mb-6">
            <span className="text-white/70 text-sm">Member of:</span>
            <div className="flex items-center space-x-4 text-white/90 font-semibold text-sm">
              <span>FINRA</span>
              <span>•</span>
              <span>SIPC</span>
            </div>
          </div>
        </div>

        {/* Alpaca Attribution Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="bg-gradient-to-br from-blue-950/30 to-purple-950/20 border-2 border-cyan-500/30 rounded-xl p-6 space-y-4 shadow-lg shadow-cyan-500/10">
            <h3 className="text-cyan-400 font-bold text-base mb-3 flex items-center gap-2">
              <span className="text-2xl">🏗️</span> Built on Alpaca
            </h3>
            <p className="text-white/80 leading-relaxed">
              <strong className="text-white">Lux Exchange LLC</strong> is powered by Alpaca's technology infrastructure.
            </p>
            <p className="text-white/80 leading-relaxed">
              Securities Brokerage services are provided by <strong className="text-white">Alpaca Securities LLC</strong> ("Alpaca Securities"), member <a href="https://www.finra.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline font-bold">FINRA</a>/<a href="https://www.sipc.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline font-bold">SIPC</a>, a wholly-owned subsidiary of AlpacaDB, Inc. Technology and services are offered by AlpacaDB, Inc.
            </p>
            <p className="text-white/80 leading-relaxed">
              Cryptocurrency services are made available by <strong className="text-white">Alpaca Crypto LLC</strong> ("Alpaca Crypto"), a FinCEN registered money services business (NMLS # 2160858), and a wholly-owned subsidiary of AlpacaDB, Inc. Alpaca Crypto is not a member of SIPC or FINRA. Cryptocurrencies are not stocks and your cryptocurrency investments are not protected by either FDIC or SIPC.
            </p>
            <p className="text-white/80 leading-relaxed">
              This is not an offer, solicitation of an offer, or advice to buy or sell securities or cryptocurrencies, or open a brokerage account or cryptocurrency account in any jurisdiction where Alpaca Securities or Alpaca Crypto respectively, are not registered or licensed, as applicable.
            </p>
            <div className="pt-3 border-t border-cyan-500/20">
              <Link href="/disclosures" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-sm underline decoration-2 underline-offset-4">
                📋 View Important Disclosures →
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-white/10 pt-8 space-y-4 text-white/70 text-xs leading-relaxed">
          <p>
            All investments involve risk, including possible loss of principal. The past performance of a security, market, or financial product does not guarantee future results. Electronic trading poses unique risk to investors. System response and access times may vary due to market conditions, system performance, and other factors. Market volatility, volume, and system availability may delay account access and trade executions.
          </p>

          <p>
            Commission-free trading applies to online U.S. equity trades and exchange-traded funds (ETFs) through Alpaca Securities. Sell orders are subject to an activity assessment fee. Other exclusions and conditions may apply. Relevant SEC and FINRA fees may apply.
          </p>

          <p>
            Margin trading involves interest charges and risks, including the potential to lose more than deposited or the need to deposit additional collateral in a falling market. Please review the <Link href="/margin-disclosure" className="text-cyan-400 hover:text-cyan-300 underline font-semibold">Margin Disclosure Statement</Link> to determine whether a margin account aligns with your investment objectives and risk tolerance.
          </p>

          <p>
            Options trading entails significant risk and is not appropriate for all investors. Certain complex options strategies carry additional risk. Before trading options, please read <a href="https://www.theocc.com/company-information/documents-and-archives/options-disclosure-document" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline font-semibold">Characteristics and Risks of Standardized Options</a>.
          </p>

          <p>
            Cryptocurrency is highly speculative in nature, involves a high degree of risks, such as volatile market price swings, market manipulation, flash crashes, and cybersecurity risks. For more information, please see our <Link href="/crypto-risk-disclosures" className="text-cyan-400 hover:text-cyan-300 underline font-semibold">Cryptocurrency Risk Disclosures</Link>.
          </p>

          <p>
            High-yield/non-investment-grade bonds involve greater price volatility and risk of default than investment-grade bonds. Any fixed income security sold or redeemed prior to maturity may be subject to loss. Diversification and asset allocation do not ensure a profit or guarantee against loss.
          </p>

          <p>
            No content on the website shall be considered a recommendation or solicitation for the purchase or sale of securities, futures or other investment products. All information and data on the website are for reference only and no historical data shall be considered as the basis for judging future trends.
          </p>

          <div className="pt-4 space-y-2">
            <div className="flex flex-wrap gap-4 text-xs">
              <Link href="/customer-relationship-summary" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">
                Customer Relationship Summary
              </Link>
              <Link href="/sec-rule-606" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">
                SEC RULE 606
              </Link>
              <Link href="/extended-hours-risk" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">
                Extended Hours Trading Risk Disclosure
              </Link>
              <Link href="/agreements" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">
                Agreements & Statements
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="text-center space-y-3 text-white/60 text-xs">
            <p className="text-white/70">
              <strong>Lux Exchange LLC</strong> provides access to brokerage services through Alpaca Securities LLC (member FINRA/SIPC) and cryptocurrency services through Alpaca Crypto LLC (NMLS # 2160858).
            </p>
            <p>
              © {new Date().getFullYear()} <strong className="text-white/80">Lux Exchange LLC</strong>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

'use client'

import Link from 'next/link'
import { ArrowLeft, BookOpen, Video, FileText, TrendingUp, Target, Shield } from 'lucide-react'

export default function LearnPage() {
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

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Learn to Trade</h1>
          <p className="text-muted-1 text-lg mb-12">
            Master the markets with our comprehensive educational resources
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="glass-effect rounded-lg p-6 hover:border-success/50 transition-all">
              <BookOpen className="w-10 h-10 text-success mb-4" />
              <h3 className="text-xl font-bold mb-2">Trading Guides</h3>
              <p className="text-muted-1 mb-4">Step-by-step guides for every trading topic</p>
              <div className="text-success font-semibold">50+ Guides</div>
            </div>

            <div className="glass-effect rounded-lg p-6 hover:border-success/50 transition-all">
              <Video className="w-10 h-10 text-success mb-4" />
              <h3 className="text-xl font-bold mb-2">Video Tutorials</h3>
              <p className="text-muted-1 mb-4">Learn by watching expert traders</p>
              <div className="text-success font-semibold">100+ Videos</div>
            </div>

            <div className="glass-effect rounded-lg p-6 hover:border-success/50 transition-all">
              <FileText className="w-10 h-10 text-success mb-4" />
              <h3 className="text-xl font-bold mb-2">Market Analysis</h3>
              <p className="text-muted-1 mb-4">Daily market insights and research</p>
              <div className="text-success font-semibold">Updated Daily</div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                  <span className="bg-success text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  What is Trading?
                </h3>
                <p className="text-muted-1 ml-10">
                  Learn the fundamentals of financial markets, how they work, and the different types of securities you can trade including stocks, options, ETFs, and more.
                </p>
              </div>

              <div className="border-b border-white/10 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                  <span className="bg-success text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Opening Your First Account
                </h3>
                <p className="text-muted-1 ml-10">
                  Step-by-step guide to opening your trading account, from application to funding. Learn about account types, verification requirements, and initial funding options.
                </p>
              </div>

              <div className="border-b border-white/10 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                  <span className="bg-success text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Platform Navigation
                </h3>
                <p className="text-muted-1 ml-10">
                  Get familiar with our trading platform. Learn how to navigate the interface, use charting tools, place orders, and monitor your portfolio.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                  <span className="bg-success text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Your First Trade
                </h3>
                <p className="text-muted-1 ml-10">
                  Ready to trade? Learn how to research stocks, analyze opportunities, place your first order, and manage your positions.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-effect rounded-lg p-8">
              <TrendingUp className="w-10 h-10 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">Technical Analysis</h2>
              <p className="text-muted-1 mb-4">
                Master the art of reading charts and using technical indicators to make informed trading decisions.
              </p>
              <ul className="space-y-2 text-muted-1">
                <li>→ Understanding Chart Patterns</li>
                <li>→ Key Technical Indicators</li>
                <li>→ Support & Resistance Levels</li>
                <li>→ Trend Analysis Strategies</li>
                <li>→ Volume Analysis</li>
              </ul>
            </div>

            <div className="glass-effect rounded-lg p-8">
              <Target className="w-10 h-10 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">Trading Strategies</h2>
              <p className="text-muted-1 mb-4">
                Learn proven trading strategies used by professionals to maximize returns and manage risk.
              </p>
              <ul className="space-y-2 text-muted-1">
                <li>→ Day Trading Fundamentals</li>
                <li>→ Swing Trading Techniques</li>
                <li>→ Position Trading Strategies</li>
                <li>→ Options Trading Strategies</li>
                <li>→ Risk Management Principles</li>
              </ul>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Advanced Topics</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Options Trading</h3>
                <ul className="space-y-2 text-muted-1 text-sm">
                  <li>→ Call & Put Options</li>
                  <li>→ Covered Calls</li>
                  <li>→ Protective Puts</li>
                  <li>→ Spreads & Straddles</li>
                  <li>→ Options Greeks</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Margin Trading</h3>
                <ul className="space-y-2 text-muted-1 text-sm">
                  <li>→ Understanding Leverage</li>
                  <li>→ Margin Requirements</li>
                  <li>→ Margin Calls</li>
                  <li>→ Risk Management</li>
                  <li>→ Best Practices</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Portfolio Management</h3>
                <ul className="space-y-2 text-muted-1 text-sm">
                  <li>→ Asset Allocation</li>
                  <li>→ Diversification</li>
                  <li>→ Rebalancing Strategies</li>
                  <li>→ Tax Optimization</li>
                  <li>→ Performance Tracking</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <Shield className="w-10 h-10 text-success mb-4" />
            <h2 className="text-3xl font-bold mb-4">Risk Management</h2>
            <p className="text-muted-1 mb-4">
              Understanding and managing risk is crucial to long-term trading success. Learn how to protect your capital while pursuing growth opportunities.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Key Principles</h3>
                <ul className="space-y-2 text-muted-1">
                  <li>→ Position Sizing</li>
                  <li>→ Stop-Loss Orders</li>
                  <li>→ Risk-Reward Ratios</li>
                  <li>→ Diversification</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Common Mistakes</h3>
                <ul className="space-y-2 text-muted-1">
                  <li>→ Overleveraging</li>
                  <li>→ Emotional Trading</li>
                  <li>→ Ignoring Stop Losses</li>
                  <li>→ Lack of Research</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Recommended Reading</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">For Beginners</h3>
                <ul className="space-y-2 text-muted-1">
                  <li>• "The Intelligent Investor" by Benjamin Graham</li>
                  <li>• "A Random Walk Down Wall Street" by Burton Malkiel</li>
                  <li>• "Common Stocks and Uncommon Profits" by Philip Fisher</li>
                  <li>• "One Up On Wall Street" by Peter Lynch</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">For Advanced Traders</h3>
                <ul className="space-y-2 text-muted-1">
                  <li>• "Market Wizards" by Jack Schwager</li>
                  <li>• "Reminiscences of a Stock Operator" by Edwin Lefèvre</li>
                  <li>• "Technical Analysis of the Financial Markets" by John Murphy</li>
                  <li>• "Options as a Strategic Investment" by Lawrence McMillan</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-success hover:bg-success/90 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Start Your Trading Journey
            </Link>
            <p className="text-muted-1 text-sm mt-4">
              Open an account and access all educational resources for free
            </p>
          </div>

          <div className="mt-16 text-xs text-muted-1 leading-relaxed">
            <p>
              <strong>Educational Disclaimer:</strong> The content provided here is for educational purposes only and should not be considered as investment advice. Trading involves risk, and you should only trade with money you can afford to lose. Always conduct your own research before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { ArrowLeft, Download, Monitor, Smartphone, Apple } from 'lucide-react'

export default function DownloadPage() {
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

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Download Trading Platforms</h1>
          <p className="text-muted-1 text-lg mb-12">
            Trade anywhere, anytime with our multi-platform trading solutions
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-effect rounded-lg p-8">
              <Monitor className="w-12 h-12 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">Desktop Applications</h2>
              <p className="text-muted-1 mb-6">
                Professional-grade trading platforms optimized for desktop performance with advanced charting and analysis tools.
              </p>
              <div className="space-y-4">
                <Link
                  href="/download/mac"
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Apple className="w-8 h-8" />
                    <div>
                      <p className="font-semibold">Mac Application</p>
                      <p className="text-sm text-muted-1">macOS 11.0 or later</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-success" />
                </Link>
                <Link
                  href="/download/windows"
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Monitor className="w-8 h-8" />
                    <div>
                      <p className="font-semibold">Windows Application</p>
                      <p className="text-sm text-muted-1">Windows 10 or later</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-success" />
                </Link>
              </div>
            </div>

            <div className="glass-effect rounded-lg p-8">
              <Smartphone className="w-12 h-12 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-4">Mobile Applications</h2>
              <p className="text-muted-1 mb-6">
                Trade on the go with our award-winning mobile apps. Full-featured trading at your fingertips.
              </p>
              <div className="space-y-4">
                <a
                  href="https://apps.apple.com/us/app/luxats"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                    </svg>
                    <div>
                      <p className="font-semibold">iOS App</p>
                      <p className="text-sm text-muted-1">iPhone & iPad</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-success" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.luxats"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div>
                      <p className="font-semibold">Android App</p>
                      <p className="text-sm text-muted-1">Android 8.0+</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-success" />
                </a>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Platform Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Advanced Charting</h3>
                <ul className="space-y-2 text-muted-1 text-sm">
                  <li>→ 100+ Technical Indicators</li>
                  <li>→ Multiple Chart Types</li>
                  <li>→ Drawing Tools</li>
                  <li>→ Custom Time Frames</li>
                  <li>→ Save Chart Templates</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Real-Time Data</h3>
                <ul className="space-y-2 text-muted-1 text-sm">
                  <li>→ Live Market Quotes</li>
                  <li>→ Level 2 Market Data</li>
                  <li>→ Real-Time News Feed</li>
                  <li>→ Economic Calendar</li>
                  <li>→ Earnings Reports</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Trading Tools</h3>
                <ul className="space-y-2 text-muted-1 text-sm">
                  <li>→ One-Click Trading</li>
                  <li>→ Advanced Order Types</li>
                  <li>→ Custom Watchlists</li>
                  <li>→ Price Alerts</li>
                  <li>→ Portfolio Analytics</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Web Trading Platform</h2>
            <p className="text-muted-1 mb-6">
              No download required. Access our full-featured trading platform directly from your web browser.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Benefits</h3>
                <ul className="space-y-2 text-muted-1">
                  <li>→ No installation required</li>
                  <li>→ Works on any device</li>
                  <li>→ Automatic updates</li>
                  <li>→ Cloud-based portfolios</li>
                  <li>→ Cross-platform sync</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">System Requirements</h3>
                <ul className="space-y-2 text-muted-1">
                  <li>→ Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                  <li>→ Stable internet connection</li>
                  <li>→ JavaScript enabled</li>
                  <li>→ Cookies enabled</li>
                </ul>
              </div>
            </div>
            <Link
              href="/web-trading"
              className="inline-block px-8 py-3 bg-success hover:bg-white text-white font-semibold rounded-lg transition-colors"
            >
              Launch Web Platform
            </Link>
          </div>

          <div className="glass-effect rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-muted-1 mb-4">
              Having trouble downloading or installing our platforms? Our support team is here to help.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/help"
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
              >
                Visit Help Center
              </Link>
              <a
                href="mailto:support@lux.exchange"
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AgreementsPage() {
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

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Agreements & Statements</h1>
          <p className="text-muted-1 mb-8">Important legal documents and account agreements</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Customer Agreements</h2>
              <div className="space-y-4">
                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Brokerage Account Agreement</h3>
                  <p className="text-muted-1 mb-4">
                    The customer agreement that governs your brokerage account with Alpaca Securities LLC, provided through Lux Assets Management LLC.
                  </p>
                  <Link href="#" className="text-primary hover:underline font-semibold">
                    View Document →
                  </Link>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Cryptocurrency Account Agreement</h3>
                  <p className="text-muted-1 mb-4">
                    Agreement for cryptocurrency trading services provided by Alpaca Crypto LLC through our platform.
                  </p>
                  <Link href="#" className="text-primary hover:underline font-semibold">
                    View Document →
                  </Link>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Margin Agreement</h3>
                  <p className="text-muted-1 mb-4">
                    Terms and conditions for margin trading, including risks and requirements.
                  </p>
                  <Link href="/margin-disclosure" className="text-primary hover:underline font-semibold">
                    View Margin Disclosure →
                  </Link>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Disclosure Statements</h2>
              <div className="space-y-4">
                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Customer Relationship Summary (Form CRS)</h3>
                  <p className="text-muted-1 mb-4">
                    A brief relationship summary that describes the types of services we offer and the fees you will pay.
                  </p>
                  <Link href="/customer-relationship-summary" className="text-primary hover:underline font-semibold">
                    View Form CRS →
                  </Link>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Extended Hours Trading Risk Disclosure</h3>
                  <p className="text-muted-1 mb-4">
                    Important information about the risks of trading outside of regular market hours.
                  </p>
                  <Link href="/extended-hours-risk" className="text-primary hover:underline font-semibold">
                    View Disclosure →
                  </Link>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">SEC Rule 606 Reports</h3>
                  <p className="text-muted-1 mb-4">
                    Quarterly reports on order routing practices as required by SEC Rule 606.
                  </p>
                  <Link href="/sec-rule-606" className="text-primary hover:underline font-semibold">
                    View Reports →
                  </Link>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Options Disclosure Document</h3>
                  <p className="text-muted-1 mb-4">
                    Characteristics and Risks of Standardized Options (OCC publication).
                  </p>
                  <a 
                    href="https://www.theocc.com/company-information/documents-and-archives/options-disclosure-document" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline font-semibold"
                  >
                    View Document (OCC) →
                  </a>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Cryptocurrency Risk Disclosures</h3>
                  <p className="text-muted-1 mb-4">
                    Important information about the unique risks associated with cryptocurrency trading.
                  </p>
                  <Link href="/crypto-risk-disclosures" className="text-primary hover:underline font-semibold">
                    View Disclosure →
                  </Link>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Privacy & Data</h2>
              <div className="space-y-4">
                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Privacy Policy</h3>
                  <p className="text-muted-1 mb-4">
                    How we collect, use, and protect your personal information.
                  </p>
                  <Link href="/privacy" className="text-primary hover:underline font-semibold">
                    View Privacy Policy →
                  </Link>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Cookie Policy</h3>
                  <p className="text-muted-1 mb-4">
                    Information about cookies and tracking technologies we use.
                  </p>
                  <Link href="/cookies" className="text-primary hover:underline font-semibold">
                    View Cookie Policy →
                  </Link>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Account Statements</h2>
              <div className="glass-effect rounded-lg p-6">
                <p className="text-muted-1 mb-4">
                  You will receive electronic confirmations for each trade and monthly account statements. These can be accessed through your account dashboard.
                </p>
                <p className="text-muted-1">
                  If you prefer paper statements, please contact customer support. Additional fees may apply.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="glass-effect rounded-lg p-6">
                <p className="text-white mb-2"><strong>Lux Assets Management LLC</strong></p>
                <p className="text-muted-1">
                  The Trump Building<br />
                  40 Wall Street, Suite 2702<br />
                  New York, NY 10005
                </p>
                <p className="text-muted-1 mt-3">Email: support@lux.exchange</p>
                <p className="text-muted-1">Phone: +1 (973) 224-7098</p>
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

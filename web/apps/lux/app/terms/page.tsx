'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsOfService() {
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

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Terms and Conditions</h1>
          <p className="text-muted-1 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <p className="text-muted-1 leading-relaxed mb-4">
                Alpaca Securities, LLC ("Alpaca Securities") and Alpaca Crypto, LLC ("Alpaca Crypto"), wholly-owned subsidiaries of AlpacaDB, Inc. (collectively "ALPACA"; "the Firm"). Alpaca Securities is a registered broker-dealer and member of FINRA and SIPC that provides online and mobile application-based discount stock brokerage services to self-directed investors. Alpaca Crypto provides digital asset trading services and is registered with FinCEN as a Money Service Business (registration # 31000188404516).
              </p>
              <p className="text-muted-1 leading-relaxed">
                These Terms and Conditions are in addition to any other agreements between you, Alpaca Securities, Alpaca Crypto and AlpacaDB (collectively, "Alpaca"), including any customer or account agreements and any other agreements that govern your use of software, products, goods, services, content, tools, and information provided by Alpaca through <strong>Lux Assets Management LLC</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">General</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                The website, Application Programming Interface ("API"), and mobile application for Android and iOS (collectively, the "Service") may include or make available certain content (the "Content"). Content includes, without limitation: (1) account positions, balances, transactions, confirmations, and order history; (2) general news and information, commentary, research reports, educational material and information and data concerning the financial markets, securities and other subjects; (3) market data such as quotations for securities transactions and/or last sale information for completed securities transactions reported in accordance with federal securities regulations; (4) financial and investment interactive tools, such as alerts or calculators; (5) tax preparation, bill payment and account management tools; (6) company names, logos, product and service names, trade names, trademarks and services marks (collectively, "Marks"); and (7) any other information, content, services, or software.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Acceptance of Terms and Conditions</h2>
              <p className="text-muted-1 leading-relaxed">
                By using the Service and the Content, you agree to follow and be bound by these Terms and Conditions, including the policies referenced herein. Brokerage account customers are granted additional levels of access to the website and their relationship with Alpaca is governed by additional agreements and terms of use, such as the Customer Agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Plans</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                When creating a user account/onboarding through the Services you will have the option to subscribe to a market data plan. We offer a 'Basic' market data plan, which is made available at no cost, as well as a 'Pro' market data plan, that is made available on a paid subscription basis (a "Paid Subscription").
              </p>
              <div className="glass-effect rounded-lg p-6 border border-yellow-500/20 bg-yellow-500/5">
                <p className="text-yellow-400 font-semibold mb-3">IMPORTANT:</p>
                <p className="text-muted-1 leading-relaxed">
                  BY PURCHASING A PAID SUBSCRIPTION, YOU ACKNOWLEDGE THAT YOUR PAID SUBSCRIPTION HAS AN INITIAL AND RECURRING PAYMENT CHARGE AT OUR THEN-CURRENT RATES, AND AGREE THAT WE MAY SUBMIT MONTHLY OR YEARLY CHARGES, AS APPLICABLE, IN ADVANCE THROUGH YOUR CHOSEN PAYMENT METHOD WITHOUT FURTHER AUTHORIZATION FROM YOU UNTIL CANCELLED BY YOU, OR YOU CHANGE YOUR PAYMENT METHOD. UNLESS CANCELLED PRIOR TO THE CONCLUSION OF YOUR THEN-CURRENT PAID SUBSCRIPTION TERM, UPON SUCH CONCLUSION YOUR PAID SUBSCRIPTION SHALL AUTOMATICALLY RENEW AT OUR THEN-CURRENT RATES WITHOUT ADDITIONAL NOTICE TO YOU.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Personal and Non-Commercial Usage</h2>
              <p className="text-muted-1 leading-relaxed">
                Other than as set forth herein, you agree to use the Services and Content solely for your own personal and non-commercial purposes. Should you wish to use the Services and Content for any other purposes, including without limitation commercial usage, or making the Services and Content available to others through your own application (a "User Application"), you shall provide us with 30 days advance written notice prior to making such User Application available to others. We reserve the right to restrict your User Application's connectivity to the Service and Content, and may disallow any connectivity entirely, if we determine the User Application may interfere with our Services or otherwise be detrimental to us, as may be determined in our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Disclaimer and Limitations of Liability</h2>
              <div className="glass-effect rounded-lg p-6 border border-red-500/20 bg-red-500/5">
                <p className="text-muted-1 leading-relaxed mb-4">
                  The Content and the Service are provided on an "as is" and "as available" basis. To the fullest extent permitted under applicable law, Alpaca and the Third Party Providers expressly disclaim all warranties of any kind with respect to the Content and the Service, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose and non-infringement. Neither Alpaca nor Third Party Providers guarantee the accuracy, timeliness, completeness or usefulness of any Content. You agree to use the Content and the Service only at your own risk.
                </p>
                <p className="text-muted-1 leading-relaxed font-semibold">
                  ALPACA AND THE THIRD PARTY PROVIDERS WILL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, REVENUE, INCOME, GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES (EVEN IF ALPACA OR ANY THIRD PARTY PROVIDER HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES).
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">No Recommendations</h2>
              <p className="text-muted-1 leading-relaxed">
                Alpaca Securities provides self-directed investors with discount brokerage services, and does not make recommendations of any kind. You are solely responsible for evaluating the merits and risks associated with the use of any Content provided through the Service before making any decisions based on such Content. You agree not to hold Alpaca or any Third-Party Provider liable for any possible claim for damages arising from any decision you make based on the Content or other information made available to you through the Service or any Third-Party Provider websites. Past performance data should not be construed as indicative of future results.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">U.S. Residents Only</h2>
              <p className="text-muted-1 leading-relaxed">
                The Content and the Service are intended for United States residents only. They shall not be considered a solicitation to any person in any jurisdiction where such solicitation would be illegal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Content</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                Content posted on the Service is published as of its stated date or, if no date is stated, the date of first posting. Neither Alpaca nor the Third-Party Providers have undertaken any duty to update any such information.
              </p>
              <p className="text-muted-1 leading-relaxed mb-4">
                Alpaca does not prepare, edit, or endorse Third Party Content. Alpaca does not guarantee the accuracy, timeliness, completeness or usefulness of Third Party Content, and is not responsible or liable for any content, advertising, products, or other materials on or available from third party sites.
              </p>
              <p className="text-muted-1 leading-relaxed mb-4">
                Any price quotes may be delayed 20 minutes or longer, according to the rules and regulations applicable to exchanges and Third Party Providers. Neither Alpaca nor the Third-Party Providers make any representations, warranties or other guarantees as to the accuracy or timeliness of any price quotes.
              </p>
              <p className="text-muted-1 leading-relaxed">
                Content is provided exclusively for personal and noncommercial access and use. No part of the Service or Content may be copied, reproduced, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted or distributed in any way (including "mirroring") to any other computer, server, web site or other medium for publication or distribution or for any commercial enterprise, without our express prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Mobile Service</h2>
              <p className="text-muted-1 leading-relaxed">
                In the event that you are using our mobile application, you are responsible for any fees, including data, access and usage fees by an internet provider or mobile carrier, that you incur when accessing the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Agreement not with App Stores</h2>
              <p className="text-muted-1 leading-relaxed">
                You acknowledge and agree that the availability of our mobile application is dependent on the third party from which you received it, e.g., the Google Play or Apple App Store (each, an "App Store"). When you download our mobile application through the App Store, you agree that: (i) these Terms and Conditions are concluded between you and us and not between you and the App Store, and that we (not the App Store), are responsible for our software; (ii) the App Store has no obligation to furnish any maintenance and support services with regards to our mobile application or handle any warranty claims; (iii) the App Store is not responsible for addressing any claims you have or any claims of any third party relating to our mobile application; (iv) the App Store is a third party beneficiary of these Terms and Conditions as related to your license of our mobile application, and the App Store will have the right to enforce these Terms and Conditions as related to your license of our mobile application against you; and (v) you must also comply with all applicable App Store terms of service when using our mobile application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Termination; Modification</h2>
              <p className="text-muted-1 leading-relaxed">
                You agree that, without notice, we may terminate these Terms and Conditions, or suspend your access to the Service or the Content, with or without cause at any time and effective immediately. These Terms and Conditions will terminate immediately without notice if you, in our sole discretion, fail to comply with any provision of these Terms and Conditions. We shall not be liable to you or any third party for the termination or suspension of the Service or the Content, or any claims related to such termination or suspension.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Communications</h2>
              <p className="text-muted-1 leading-relaxed">
                By using the Service or the Content, you consent to any form of recording and retention of any communication, information and data exchanged between you and us or our representatives or agents.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">External Links</h2>
              <p className="text-muted-1 leading-relaxed">
                We and/or the Third-Party Providers may provide links to other websites or resources. Because neither we or the Third-Party Providers have any control over such sites and resources, you acknowledge and agree that neither we nor the Third Party Providers are responsible for the availability of such external sites or resources. We and the Third Party Providers do not endorse and are not liable for any content, advertising, products, or other materials on or available through such sites or resources. You further acknowledge and agree that neither we nor the Third Party Providers shall be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such site or resource.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Applicable Policies</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                In addition to these Terms and Conditions, your access to and use of the Content and the Service is subject to our then-current policies relating to the Content and the Service, including, without limitation, our Privacy Policy available on the Service. You agree to be bound by these policies and all other policies applicable to the access and use of the Content and the Service.
              </p>
              <p className="text-muted-1 leading-relaxed">
                By using the Service, you are consenting to have your personal data transferred to and processed by us and our affiliates. As part of providing you the Service, we may need to provide you with certain communications, such as service announcements and administrative messages. These communications are considered part of the Service, which you may not be able to opt-out from receiving.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
              <p className="text-muted-1 leading-relaxed">
                You will indemnify and hold harmless Alpaca and the Third Party Providers, and the officers, directors, agents, partners, employees, licensors, distributors, and representatives of Alpaca and the Third Party Providers, from and against any and all claims, demands, actions, causes of action, suits, proceedings, losses, damages, costs, and expenses, including reasonable attorneys' fees, arising from or relating to your access and/or use of, or interaction with the Content (including, without limitation, Third Party Content), or any act, error, or omission of your use of your account or any user of your account, in connection therewith.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Revisions</h2>
              <p className="text-muted-1 leading-relaxed">
                We may at any time revise these Terms and Conditions by updating this document and making it available to you through the Services. You agree to be bound by subsequent revisions and agree to review these Terms and Conditions periodically for changes. The most updated version of this document will be available for your review.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Applicable Law and Venue; Severability</h2>
              <p className="text-muted-1 leading-relaxed">
                You agree that these Terms and Conditions shall be governed by and interpreted in accordance with the laws of the State of California, without giving effect to principles of conflicts of law. Any legal action or proceeding arising under these Terms and Conditions will be brought exclusively in courts located in San Mateo County, California, and you hereby irrevocably consent to the personal jurisdiction and venue therein. If any provision of these Terms and Conditions is deemed unlawful, void or for any reason unenforceable, then that provision will be deemed severable from these Terms and Conditions and will not affect the validity and enforceability of the remaining provisions.
              </p>
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
                <strong>Lux Assets Management LLC</strong> provides access to brokerage services through Alpaca Securities LLC (member FINRA/SIPC) and cryptocurrency services through Alpaca Crypto LLC (NMLS # 2160858).
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

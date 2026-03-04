import Link from 'next/link'

export default function DisclosuresPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Important Disclosures</h1>
        
        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">About Lux ATS</h2>
            <p className="mb-4">
              <strong>Lux Assets Management LLC</strong> is a trading platform built on Alpaca's technology infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Brokerage Services</h2>
            <p className="mb-4">
              Securities Brokerage services are provided by <strong>Alpaca Securities LLC</strong> ("Alpaca Securities"), member <a href="https://www.finra.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">FINRA</a>/<a href="https://www.sipc.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SIPC</a>, a wholly-owned subsidiary of AlpacaDB, Inc. Technology and services are offered by AlpacaDB, Inc.
            </p>
            <p className="mb-4">
              Brokerage services are provided to customers who can write automated investment code and self direct their own investments. Alpaca brokerage services are only provided to customers who agree to electronically sign agreements and agree to receive messages, confirmations, and statements electronically. <a href="#suitability" className="text-primary hover:underline">Is Alpaca right for me?</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Cryptocurrency Services</h2>
            <p className="mb-4">
              Cryptocurrency services are made available by <strong>Alpaca Crypto LLC</strong> ("Alpaca Crypto"), a FinCEN registered money services business (NMLS # 2160858), and a wholly-owned subsidiary of AlpacaDB, Inc. Alpaca Crypto is not a member of SIPC or FINRA. Cryptocurrencies are not stocks and your cryptocurrency investments are not protected by either FDIC or SIPC. Please see the <Link href="/disclosure-library" className="text-primary hover:underline">Disclosure Library</Link> for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Important Notice</h2>
            <p className="mb-4">
              This is not an offer, solicitation of an offer, or advice to buy or sell securities or cryptocurrencies, or open a brokerage account or cryptocurrency account in any jurisdiction where Alpaca Securities or Alpaca Crypto respectively, are not registered or licensed, as applicable.
            </p>
          </section>

          <section id="suitability">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Is Alpaca Right for Me?</h2>
            <p className="mb-4">
              Brokerage services are provided by Alpaca Securities LLC ("Alpaca"), member <a href="https://www.finra.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">FINRA</a>/<a href="https://www.sipc.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SIPC</a>, a wholly-owned subsidiary of AlpacaDB, Inc. Technology and services are offered by AlpacaDB, Inc.
            </p>
            <p className="mb-4">
              Brokerage services are provided to customers who can write automated investment code and self direct their own investments. Alpaca brokerage services are only provided to customers who agree to electronically sign agreements and agree to receive messages, confirmations, and statements electronically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Paper Trading</h2>
            <p className="mb-4">
              The Paper Trading API is offered by AlpacaDB, Inc. and does not require real money or permit a user to transact in real securities in the market. Providing use of the Paper Trading API is not an offer or solicitation to buy or sell securities, securities derivative or futures products of any kind, or any type of trading or investment advice, recommendation or strategy, given or in any manner endorsed by AlpacaDB, Inc. or any AlpacaDB, Inc. affiliate. Information made available through the Paper Trading API is not an offer or solicitation of any kind in any jurisdiction where AlpacaDB, Inc. or any AlpacaDB, Inc. affiliate is not authorized to do business.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Third Party Access</h2>
            <p className="mb-4">
              You should know that the use or granting of any third party access to your account information or place transactions in your account at your direction is solely at your risk. Alpaca does not warrant against loss of use or any direct, indirect or consequential damages or losses to you caused by your assent, expressed or implied, to a third party accessing your account or information, including access provided through any other third party apps, systems, or sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Market Data and System Performance</h2>
            <p className="mb-4">
              Market prices, data and other information available through Alpaca are not warranted as to completeness or accuracy and are subject to change without notice. System response and account access times may vary due to a variety of factors, including trading volumes, market conditions, system performance, and other factors. A more complete description of the impact these factors may have can be found in our <a href="#automated-risks" className="text-primary hover:underline">risks of automated trading systems</a> section.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Investment Risks</h2>
            <p className="mb-4">
              All investments involve risk and the past performance of a security, or financial product does not guarantee future results or returns. Keep in mind that while diversification may help spread risk it does not assure a profit, or protect against loss, in a down market. There is always the potential of losing money when you invest in securities, or other financial products. Investors should consider their investment objectives and risks carefully before investing.
            </p>
          </section>

          <section id="automated-risks">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Risks of Automated Trading Systems</h2>
            <p className="mb-4">
              There are risks unique to automated trading algorithms that you should know about and plan for. You should setup a method or system of continuous monitoring or alerting to let you know if there is a mechanical failure, such as connectivity issues, power loss, a computer crash, or system quirk. You should also monitor for instances where your automated trading system experiences anomalies that could result in errant, missing, or duplicated orders. A more complete description of these and other risks can be found in our FAQ section.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Conditional Orders</h2>
            <p className="mb-4">
              Conditional orders may have increased risk as a result of their reliance on trigger processing, market data, and other internal and external systems. Such orders are not sent to the market until specified conditions are met. During that time, issues such as system outages with downstream technologies or third parties may occur. Conditional orders triggering near the market close may fail to execute that day. Furthermore, our executing partner may impose controls on conditional orders to limit erroneous trades triggering downstream orders. Alpaca Securities may not always be made aware of such changes to external controls immediately, which may lead to some conditional orders not being executed. As such, it is important to monitor conditional orders for reasonability. Conditional orders are "Not Held" orders whose execution instructions are on a best efforts basis upon being triggered. Furthermore, conditional orders may be subject to the increased risks of stop orders and market orders outlined above. Given the increased potential risk of using conditional orders, the client agrees that Alpaca Securities cannot be held responsible for losses, damages, or missed opportunity costs associated with market data problems, systems issues, and user error, among other factors. By using conditional orders the client understands and accepts the risks outlined above. Alpaca Securities encourages leveraging the use of Paper accounts to become more comfortable with the intricacies associated with these orders.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">ETF Risks</h2>
            <p className="mb-4">
              ETFs can entail risks similar to direct stock ownership, including market, sector, or industry risks. Some ETFs may involve international risk, currency risk, commodity risk, and interest rate risk. Trading prices may not reflect the net asset value of the underlying securities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Margin Trading</h2>
            <p className="mb-4">
              All accounts are opened as margin accounts. You should know that margin trading involves interest charges and risks, including the potential to lose more than deposited or the need to deposit additional collateral in a falling market. Before using margin, customers must determine whether this type of trading strategy is right for them given their specific investment objectives, experience, risk tolerance, and financial situation. For more information please see Alpaca's <Link href="/margin-disclosure" className="text-primary hover:underline">Margin Disclosure Statement</Link> and <Link href="/margin-agreement" className="text-primary hover:underline">Margin Agreement</Link>. These disclosures contain information on Alpaca's lending policies, interest charges, and the risks associated with margin accounts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Commission-Free Trading</h2>
            <p className="mb-4">
              Commission-Free trading means that there are no commission charges for Alpaca self-directed individual cash brokerage accounts that trade U.S. listed securities through an API. Relevant SEC and FINRA fees may apply.
            </p>
          </section>

          <section className="border-t pt-8 mt-8">
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Lux Assets Management LLC</strong> provides access to brokerage services through Alpaca Securities LLC (member FINRA/SIPC) and cryptocurrency services through Alpaca Crypto LLC (NMLS # 2160858).
              </p>
              <p>© {new Date().getFullYear()} <strong>Lux Assets Management LLC</strong>. All rights reserved.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Additional Resources</h2>
            <div className="space-y-2">
              <Link href="/customer-relationship-summary" className="block text-primary hover:underline">
                Customer Relationship Summary
              </Link>
              <Link href="/sec-rule-606" className="block text-primary hover:underline">
                SEC RULE 606
              </Link>
              <Link href="/extended-hours-risk" className="block text-primary hover:underline">
                Extended Hours Trading Risk Disclosure
              </Link>
              <Link href="/agreements" className="block text-primary hover:underline">
                Agreements & Statements
              </Link>
              <Link href="/disclosure-library" className="block text-primary hover:underline">
                Disclosure Library
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'

export default function CryptoRiskDisclosuresPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">ALPACA CRYPTO LLC</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-8">CRYPTOCURRENCY RISK DISCLOSURES</h2>
        
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Cryptocurrency is a digital representation of value that functions as a medium of exchange, a unit of account, or a store of value, but it does not have legal tender status. Cryptocurrency is sometimes exchanged for U.S. dollars or other currencies around the world, but they are not generally backed or supported by any government or central bank.
          </p>

          <p>
            Cryptocurrency is highly speculative in nature, involves a high degree of risks, such as volatile market price swings, flash crashes, market manipulation and cybersecurity risks. It can rapidly and significantly decrease in value. It is reasonably possible for the value of cryptocurrency to decrease to zero or near zero in a very short amount of time. Transactions in cryptocurrency may be irreversible, and, accordingly, losses due to fraudulent or accidental transactions may not be revocable. The nature of cryptocurrency may lead to an increased risk of fraud or cyber-attack.
          </p>

          <p>
            Cryptocurrency is not regulated or is lightly regulated in most countries. However, one or more countries may take regulatory action, including within the U.S., that could severely restrict the right to acquire, own, hold, sell or use cryptocurrency, which would adversely impact its value.
          </p>

          <p>
            The future development of various cryptocurrencies and their underlying software protocols is uncertain. The slowing or stopping of the development or acceptance of cryptocurrency may negatively affect their value.
          </p>

          <p>
            You should have appropriate knowledge and experience before engaging in substantial cryptocurrency trading. You should conduct extensive research into the legitimacy of each individual cryptocurrency, including its underlying protocol, before investing. The features, functions, characteristics, operation, use and other properties of the specific cryptocurrency may be complex, technical, or difficult to understand or evaluate. Further, cryptocurrency may be vulnerable to attacks on the security, integrity or operation, including attacks using computing power sufficient to overwhelm the normal operation of the cryptocurrency's blockchain or other underlying technology.
          </p>

          <p>
            The value of cryptocurrency may result from the continued willingness of market participants to exchange U.S. Dollars (or other government-backed currencies) for cryptocurrency. Therefore, should the market for a cryptocurrency disappear, the cryptocurrency may suffer a total and permanent loss of value. Negative consumer perception of specific cryptocurrency or cryptocurrency generally may negatively affect their value.
          </p>

          <p>
            Under certain market conditions, you may find it difficult or impossible to liquidate a position quickly at a reasonable price. This can occur, for example, when the market for a particular cryptocurrency suddenly drops, or if trading is halted due to recent news events, unusual trading activity, or changes in underlying cryptocurrency systems.
          </p>

          <p>
            Subject to jurisdictional and/or licensing limitations, cryptocurrency services are made available by Alpaca Crypto LLC ("Alpaca Crypto"). Cryptocurrency is not covered by either FDIC or SIPC insurance or any other government-backed or third party insurance.
          </p>

          <p>
            Your ability to purchase cryptocurrency through Alpaca Crypto is contingent on Alpaca's ability to source such cryptocurrency from third party providers. Therefore, Alpaca Crypto makes no promises regarding the timing or ability to purchase cryptocurrency using the Alpaca Crypto Platform. Alpaca Crypto may be forced to suspend or discontinue the ability to purchase or sell cryptocurrency without notice.
          </p>

          <p>
            Technical and market factors outside of Alpaca Crypto's control may adversely affect the value of a cryptocurrency. These factors include, without limitation, (i) technical defects, limitations or changes to a given cryptocurrency, (ii) Forks (as discussed in the Alpaca Crypto Customer Agreement), and (iii) the emergence of competing cryptocurrency.
          </p>

          <p>
            The software protocols that underlie various cryptocurrency is typically open source. As a result, (i) the development and control of such cryptocurrency is outside of Alpaca Crypto's control and (ii) such software protocols are subject to sudden and dramatic changes (including Forks) that might have a significant impact on the availability, usability or value of a given cryptocurrency.
          </p>

          <section className="mt-12">
            <h3 className="text-xl font-semibold text-foreground mb-4">Additional Resources</h3>
            <p className="mb-4">Several federal agencies have also published advisory documents surrounding the risks of cryptocurrency:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a href="https://www.consumerfinance.gov/about-us/newsroom/consumer-advisory-on-crypto-assets/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  CFPB's Consumer Advisory
                </a>
              </li>
              <li>
                <a href="https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/CustomerAdvisory_VirtualCurrency" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  CFTC's Customer Advisory
                </a>
              </li>
              <li>
                <a href="https://www.sec.gov/investor/alerts/ia_virtualcurrencies.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  SEC's Investor Alert
                </a>
              </li>
              <li>
                <a href="https://www.finra.org/investors/alerts/bitcoin-more-bit-risky" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  FINRA's Investor Alert
                </a>
              </li>
            </ul>
          </section>

          <section className="border-t pt-8 mt-12">
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Lux Assets Management LLC</strong> provides access to cryptocurrency services through Alpaca Crypto LLC (NMLS # 2160858).
              </p>
              <p className="mt-2">© {new Date().getFullYear()} Lux Assets Management LLC. All rights reserved.</p>
            </div>
          </section>

          <section className="mt-8">
            <Link href="/disclosures" className="text-primary hover:underline">
              ← Back to All Disclosures
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}

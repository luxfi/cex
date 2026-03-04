'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { Footer } from './Footer'
import { BetaDisclosure } from './BetaDisclosure'
import { TickerTape } from './TickerTape'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Don't show footer on trading pages
  const isTradingPage = pathname.startsWith('/trade') || pathname.startsWith('/demo')

  return (
    <>
      <BetaDisclosure />
      <Header />
      <div className="sticky top-16 z-40">
        <TickerTape />
      </div>
      <main className={isTradingPage ? '' : 'min-h-screen'}>
        {children}
      </main>
      {!isTradingPage && <Footer />}
    </>
  )
}

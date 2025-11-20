import SymbolDetailClient from './SymbolDetailClient'

// Generate static params for popular symbols
export async function generateStaticParams() {
  // Pre-generate pages for popular symbols
  const popularSymbols = [
    'NASDAQ:AAPL', 'NASDAQ:MSFT', 'NASDAQ:GOOGL', 'NASDAQ:AMZN', 'NASDAQ:TSLA',
    'NASDAQ:NVDA', 'NASDAQ:META', 'NYSE:JPM', 'NYSE:V', 'NYSE:WMT',
    'NASDAQ:NFLX', 'NASDAQ:AMD', 'NYSE:DIS', 'NYSE:BA', 'NASDAQ:INTC'
  ]

  return popularSymbols.map((symbol) => ({
    symbol: encodeURIComponent(symbol),
  }))
}

export default async function SymbolDetailPage({ 
  params 
}: { 
  params: Promise<{ symbol: string }> 
}) {
  // Await the params (Next.js 15+)
  const resolvedParams = await params
  
  // Decode the symbol parameter
  const symbol = decodeURIComponent(resolvedParams.symbol).toUpperCase()

  return <SymbolDetailClient symbol={symbol} />
}

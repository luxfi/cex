/**
 * API client for the CEX/Broker backend.
 *
 * All trading operations (orders, accounts, market data, transfers)
 * go through the Go backend — NOT directly to Alpaca from the browser.
 */

import { getToken } from './auth'

const CEX_API = process.env.NEXT_PUBLIC_CEX_API_URL || 'http://localhost:8091'
const BROKER_API =
  process.env.NEXT_PUBLIC_BROKER_API_URL || 'http://localhost:8090'

async function request<T>(
  base: string,
  path: string,
  opts: RequestInit = {}
): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers as Record<string, string>),
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${base}${path}`, { ...opts, headers })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`API ${res.status}: ${body}`)
  }
  return res.json() as Promise<T>
}

// ---- CEX matching engine ----

export const cex = {
  health: () => request<{ status: string }>(CEX_API, '/healthz'),

  placeOrder: (order: {
    symbol: string
    side: 'buy' | 'sell'
    type: 'market' | 'limit' | 'stop' | 'stop_limit'
    qty: string
    limit_price?: string
    stop_price?: string
    time_in_force?: string
  }) =>
    request(CEX_API, '/api/v1/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    }),

  getOrders: () => request(CEX_API, '/api/v1/orders'),

  cancelOrder: (id: string) =>
    request(CEX_API, `/api/v1/orders/${id}`, { method: 'DELETE' }),

  getOrderbook: (symbol: string) =>
    request(CEX_API, `/api/v1/orderbook/${symbol}`),
}

// ---- Broker (Alpaca/IBKR/etc. via SOR) ----

export const broker = {
  // Providers
  listProviders: () =>
    request<{ providers: string[] }>(BROKER_API, '/api/v1/providers'),

  // Accounts
  listAccounts: (provider?: string) =>
    request(
      BROKER_API,
      `/api/v1/accounts${provider ? `?provider=${provider}` : ''}`
    ),

  createAccount: (data: {
    provider?: string
    given_name: string
    family_name: string
    date_of_birth: string
    tax_id: string
    tax_id_type?: string
    country_of_tax_residence: string
    email: string
    phone: string
    street: string[]
    city: string
    state: string
    postal_code: string
    country: string
    enabled_assets?: string[]
  }) =>
    request(BROKER_API, '/api/v1/accounts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getAccount: (provider: string, accountId: string) =>
    request(BROKER_API, `/api/v1/accounts/${provider}/${accountId}`),

  getPortfolio: (provider: string, accountId: string) =>
    request(BROKER_API, `/api/v1/accounts/${provider}/${accountId}/portfolio`),

  // Orders via broker
  createOrder: (
    provider: string,
    accountId: string,
    order: {
      symbol: string
      side: string
      type: string
      qty?: string
      notional?: string
      time_in_force: string
      limit_price?: string
      stop_price?: string
    }
  ) =>
    request(
      BROKER_API,
      `/api/v1/accounts/${provider}/${accountId}/orders`,
      { method: 'POST', body: JSON.stringify(order) }
    ),

  listOrders: (provider: string, accountId: string) =>
    request(BROKER_API, `/api/v1/accounts/${provider}/${accountId}/orders`),

  cancelOrder: (provider: string, accountId: string, orderId: string) =>
    request(
      BROKER_API,
      `/api/v1/accounts/${provider}/${accountId}/orders/${orderId}`,
      { method: 'DELETE' }
    ),

  // Transfers
  createTransfer: (
    provider: string,
    accountId: string,
    data: { type: string; amount: string; direction: string; relationship_id?: string }
  ) =>
    request(
      BROKER_API,
      `/api/v1/accounts/${provider}/${accountId}/transfers`,
      { method: 'POST', body: JSON.stringify(data) }
    ),

  listTransfers: (provider: string, accountId: string) =>
    request(BROKER_API, `/api/v1/accounts/${provider}/${accountId}/transfers`),

  // Bank relationships
  createBankRelationship: (
    provider: string,
    accountId: string,
    data: {
      account_owner_name: string
      bank_account_type: string
      bank_account_number: string
      bank_routing_number: string
    }
  ) =>
    request(
      BROKER_API,
      `/api/v1/accounts/${provider}/${accountId}/bank-relationships`,
      { method: 'POST', body: JSON.stringify(data) }
    ),

  listBankRelationships: (provider: string, accountId: string) =>
    request(
      BROKER_API,
      `/api/v1/accounts/${provider}/${accountId}/bank-relationships`
    ),

  // Assets
  listAssets: (provider: string, assetClass?: string) =>
    request(
      BROKER_API,
      `/api/v1/assets/${provider}${assetClass ? `?class=${assetClass}` : ''}`
    ),

  getAsset: (provider: string, symbol: string) =>
    request(BROKER_API, `/api/v1/assets/${provider}/${symbol}`),

  // Market data
  getSnapshot: (provider: string, symbol: string) =>
    request(BROKER_API, `/api/v1/market/${provider}/snapshot/${symbol}`),

  getSnapshots: (provider: string, symbols: string[]) =>
    request(
      BROKER_API,
      `/api/v1/market/${provider}/snapshots?symbols=${symbols.join(',')}`
    ),

  getBars: (
    provider: string,
    symbol: string,
    opts?: { timeframe?: string; start?: string; end?: string; limit?: number }
  ) => {
    const params = new URLSearchParams()
    if (opts?.timeframe) params.set('timeframe', opts.timeframe)
    if (opts?.start) params.set('start', opts.start)
    if (opts?.end) params.set('end', opts.end)
    if (opts?.limit) params.set('limit', String(opts.limit))
    return request(
      BROKER_API,
      `/api/v1/market/${provider}/bars/${symbol}?${params.toString()}`
    )
  },

  getLatestTrades: (provider: string, symbols: string[]) =>
    request(
      BROKER_API,
      `/api/v1/market/${provider}/trades/latest?symbols=${symbols.join(',')}`
    ),

  getLatestQuotes: (provider: string, symbols: string[]) =>
    request(
      BROKER_API,
      `/api/v1/market/${provider}/quotes/latest?symbols=${symbols.join(',')}`
    ),

  getClock: (provider: string) =>
    request(BROKER_API, `/api/v1/market/${provider}/clock`),

  getCalendar: (provider: string, start?: string, end?: string) => {
    const params = new URLSearchParams()
    if (start) params.set('start', start)
    if (end) params.set('end', end)
    return request(
      BROKER_API,
      `/api/v1/market/${provider}/calendar?${params.toString()}`
    )
  },

  // Smart Order Routing
  smartOrder: (data: {
    symbol: string
    qty: string
    side: string
    type?: string
    time_in_force?: string
    limit_price?: string
    accounts: Record<string, string>
  }) =>
    request(BROKER_API, '/api/v1/smart-order', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Consolidated BBO
  getBBO: (symbol: string) => request(BROKER_API, `/api/v1/bbo/${symbol}`),
}

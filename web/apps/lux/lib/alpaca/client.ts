/**
 * Alpaca API Client
 * 
 * This is a simple client for interacting with the Alpaca API.
 * For production, consider using the official @alpacahq/alpaca-trade-api package.
 */

import type { Asset, Order, Position, Portfolio, MarketData } from '@luxats/types'

export class AlpacaClient {
  private apiKey: string
  private apiSecret: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.ALPACA_API_KEY || ''
    this.apiSecret = process.env.ALPACA_API_SECRET || ''
    this.baseUrl = process.env.ALPACA_API_URL || 'https://paper-api.alpaca.markets'

    if (!this.apiKey || !this.apiSecret) {
      console.warn('Alpaca API credentials not found in environment variables')
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const headers = {
      'APCA-API-KEY-ID': this.apiKey,
      'APCA-API-SECRET-KEY': this.apiSecret,
      'Content-Type': 'application/json',
      ...options.headers,
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`Alpaca API error: ${response.statusText}`)
    }

    return response.json()
  }

  // Account endpoints
  async getAccount() {
    return this.request('/v2/account')
  }

  // Positions endpoints
  async getPositions(): Promise<Position[]> {
    return this.request('/v2/positions')
  }

  async getPosition(symbol: string): Promise<Position> {
    return this.request(`/v2/positions/${symbol}`)
  }

  // Orders endpoints
  async getOrders(params?: { status?: string; limit?: number }): Promise<Order[]> {
    const query = new URLSearchParams(params as Record<string, string>).toString()
    return this.request(`/v2/orders?${query}`)
  }

  async placeOrder(order: {
    symbol: string
    qty: number
    side: 'buy' | 'sell'
    type: 'market' | 'limit' | 'stop' | 'stop_limit'
    time_in_force: 'day' | 'gtc' | 'ioc' | 'fok'
    limit_price?: number
    stop_price?: number
  }): Promise<Order> {
    return this.request('/v2/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    })
  }

  async cancelOrder(orderId: string): Promise<void> {
    return this.request(`/v2/orders/${orderId}`, {
      method: 'DELETE',
    })
  }

  // Market data endpoints
  async getMarketData(symbol: string): Promise<MarketData> {
    return this.request(`/v2/stocks/${symbol}/quotes/latest`)
  }

  async getAssets(params?: { status?: string; asset_class?: string }): Promise<Asset[]> {
    const query = new URLSearchParams(params as Record<string, string>).toString()
    return this.request(`/v2/assets?${query}`)
  }

  // Portfolio summary
  async getPortfolio(): Promise<Portfolio> {
    const [account, positions] = await Promise.all([
      this.getAccount(),
      this.getPositions(),
    ])

    return {
      id: account.id,
      name: 'Trading Account',
      accountType: 'individual',
      totalValue: parseFloat(account.equity),
      cashBalance: parseFloat(account.cash),
      buyingPower: parseFloat(account.buying_power),
      positions: positions,
      totalPnL: parseFloat(account.equity) - parseFloat(account.last_equity),
      totalPnLPercent:
        ((parseFloat(account.equity) - parseFloat(account.last_equity)) /
          parseFloat(account.last_equity)) *
        100,
      dayPnL: parseFloat(account.equity) - parseFloat(account.last_equity),
      dayPnLPercent:
        ((parseFloat(account.equity) - parseFloat(account.last_equity)) /
          parseFloat(account.last_equity)) *
        100,
    }
  }
}

// Export a singleton instance
export const alpaca = new AlpacaClient()

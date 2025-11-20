/**
 * Trading Types
 * Shared types for trading platform (LUX) and portfolio assets
 */

export interface Asset {
  symbol: string;
  name: string;
  type: AssetType;
  exchange?: string;
  currentPrice?: number;
  change24h?: number;
  changePercent24h?: number;
  volume24h?: number;
  marketCap?: number;
  logo?: string;
}

export type AssetType = 
  | 'stock'
  | 'crypto'
  | 'option'
  | 'etf'
  | 'commodity'
  | 'forex';

export interface Position {
  id: string;
  asset: Asset;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  currentValue: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  costBasis: number;
  openDate: string;
}

export interface Order {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  type: OrderType;
  quantity: number;
  price?: number;
  stopPrice?: number;
  limitPrice?: number;
  status: OrderStatus;
  createdAt: string;
  filledAt?: string;
  filledQuantity?: number;
  filledPrice?: number;
  commission?: number;
}

export type OrderType = 
  | 'market'
  | 'limit'
  | 'stop'
  | 'stop-limit'
  | 'trailing-stop';

export type OrderStatus = 
  | 'pending'
  | 'open'
  | 'filled'
  | 'partially-filled'
  | 'cancelled'
  | 'rejected';

export interface Trade {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  value: number;
  commission: number;
  timestamp: string;
  orderId: string;
}

export interface Portfolio {
  id: string;
  name: string;
  accountType: 'individual' | 'joint' | 'ira' | 'corporate';
  totalValue: number;
  cashBalance: number;
  buyingPower: number;
  positions: Position[];
  totalPnL: number;
  totalPnLPercent: number;
  dayPnL: number;
  dayPnLPercent: number;
}

export interface MarketData {
  symbol: string;
  price: number;
  bid: number;
  ask: number;
  bidSize: number;
  askSize: number;
  volume: number;
  timestamp: string;
}

export interface OptionContract {
  symbol: string;
  underlying: string;
  strike: number;
  expiration: string;
  type: 'call' | 'put';
  price: number;
  bid: number;
  ask: number;
  volume: number;
  openInterest: number;
  impliedVolatility: number;
  delta?: number;
  gamma?: number;
  theta?: number;
  vega?: number;
  rho?: number;
}

export interface LeapPromotion {
  id: string;
  underlying: 'BTC' | 'ETH';
  type: 'call';
  strikes: number[];
  expirations: string[];
  minimumTransfer: number; // $1M+
  bonus: string;
  terms: string;
  active: boolean;
}

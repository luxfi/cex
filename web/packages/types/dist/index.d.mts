/**
 * Portfolio Types
 * Shared types for investment portfolio data across the Beyond Equity ecosystem
 */
interface PortfolioCompany {
    id: string;
    name: string;
    description: string;
    logo?: string;
    website?: string;
    sector: InvestmentSector;
    stage: InvestmentStage;
    investmentDate: string;
    investmentAmount?: number;
    currentValuation?: number;
    status: 'active' | 'exited' | 'written-off';
    metrics?: PortfolioMetrics;
    updates?: PortfolioUpdate[];
}
interface PortfolioMetrics {
    revenue?: number;
    growth?: number;
    employees?: number;
    fundingRounds?: FundingRound[];
    moic?: number;
    irr?: number;
}
interface FundingRound {
    round: string;
    amount: number;
    date: string;
    valuation?: number;
    leadInvestors?: string[];
}
interface PortfolioUpdate {
    id: string;
    date: string;
    title: string;
    content: string;
    type: 'milestone' | 'funding' | 'product' | 'team' | 'exit';
}
type InvestmentSector = 'ai' | 'blockchain' | 'quantum' | 'robotics' | 'longevity' | 'clean-energy' | 'space' | 'cybersecurity' | 'advanced-materials';
type InvestmentStage = 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c' | 'series-d+' | 'growth' | 'late-stage';
interface PortfolioSummary {
    totalCompanies: number;
    totalInvested: number;
    currentValue: number;
    totalMoic: number;
    totalIrr: number;
    sectorDistribution: Record<InvestmentSector, number>;
    stageDistribution: Record<InvestmentStage, number>;
}

/**
 * Trading Types
 * Shared types for trading platform (BEGM) and portfolio assets
 */
interface Asset {
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
type AssetType = 'stock' | 'crypto' | 'option' | 'etf' | 'commodity' | 'forex';
interface Position {
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
interface Order {
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
type OrderType = 'market' | 'limit' | 'stop' | 'stop-limit' | 'trailing-stop';
type OrderStatus = 'pending' | 'open' | 'filled' | 'partially-filled' | 'cancelled' | 'rejected';
interface Trade {
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
interface Portfolio {
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
interface MarketData {
    symbol: string;
    price: number;
    bid: number;
    ask: number;
    bidSize: number;
    askSize: number;
    volume: number;
    timestamp: string;
}
interface OptionContract {
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
interface LeapPromotion {
    id: string;
    underlying: 'BTC' | 'ETH';
    type: 'call';
    strikes: number[];
    expirations: string[];
    minimumTransfer: number;
    bonus: string;
    terms: string;
    active: boolean;
}

/**
 * User & Account Types
 * Shared types for user management and authentication
 */
interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    createdAt: string;
    updatedAt: string;
    verified: boolean;
    kycStatus: KYCStatus;
    accountType: AccountType;
    preferences?: UserPreferences;
}
type KYCStatus = 'not-started' | 'pending' | 'approved' | 'rejected' | 'expired';
type AccountType = 'retail' | 'accredited' | 'institutional' | 'white-label';
interface UserPreferences {
    theme: 'light' | 'dark' | 'system';
    language: string;
    currency: string;
    notifications: NotificationPreferences;
    trading: TradingPreferences;
}
interface NotificationPreferences {
    email: boolean;
    sms: boolean;
    push: boolean;
    priceAlerts: boolean;
    orderUpdates: boolean;
    newsUpdates: boolean;
    portfolioUpdates: boolean;
}
interface TradingPreferences {
    defaultOrderType: 'market' | 'limit';
    confirmations: boolean;
    advancedMode: boolean;
    showGreeks: boolean;
}
interface Account {
    id: string;
    userId: string;
    accountNumber: string;
    accountType: 'individual' | 'joint' | 'ira' | 'corporate';
    status: AccountStatus;
    balance: number;
    buyingPower: number;
    marginEnabled: boolean;
    optionsEnabled: boolean;
    cryptoEnabled: boolean;
    createdAt: string;
}
type AccountStatus = 'active' | 'pending' | 'suspended' | 'closed';
interface Session {
    id: string;
    userId: string;
    token: string;
    expiresAt: string;
    createdAt: string;
    ipAddress?: string;
    userAgent?: string;
}

export type { Account, AccountStatus, AccountType, Asset, AssetType, FundingRound, InvestmentSector, InvestmentStage, KYCStatus, LeapPromotion, MarketData, NotificationPreferences, OptionContract, Order, OrderStatus, OrderType, Portfolio, PortfolioCompany, PortfolioMetrics, PortfolioSummary, PortfolioUpdate, Position, Session, Trade, TradingPreferences, User, UserPreferences };

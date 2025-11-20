/**
 * User & Account Types
 * Shared types for user management and authentication
 */

export interface User {
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

export type KYCStatus = 
  | 'not-started'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'expired';

export type AccountType = 
  | 'retail'
  | 'accredited'
  | 'institutional'
  | 'white-label';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  currency: string;
  notifications: NotificationPreferences;
  trading: TradingPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  priceAlerts: boolean;
  orderUpdates: boolean;
  newsUpdates: boolean;
  portfolioUpdates: boolean;
}

export interface TradingPreferences {
  defaultOrderType: 'market' | 'limit';
  confirmations: boolean;
  advancedMode: boolean;
  showGreeks: boolean;
}

export interface Account {
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

export type AccountStatus = 
  | 'active'
  | 'pending'
  | 'suspended'
  | 'closed';

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Portfolio Types
 * Shared types for investment portfolio data across the Lux Exchange ecosystem
 */

export interface PortfolioCompany {
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

export interface PortfolioMetrics {
  revenue?: number;
  growth?: number;
  employees?: number;
  fundingRounds?: FundingRound[];
  moic?: number; // Multiple on Invested Capital
  irr?: number; // Internal Rate of Return
}

export interface FundingRound {
  round: string;
  amount: number;
  date: string;
  valuation?: number;
  leadInvestors?: string[];
}

export interface PortfolioUpdate {
  id: string;
  date: string;
  title: string;
  content: string;
  type: 'milestone' | 'funding' | 'product' | 'team' | 'exit';
}

export type InvestmentSector = 
  | 'ai'
  | 'blockchain'
  | 'quantum'
  | 'robotics'
  | 'longevity'
  | 'clean-energy'
  | 'space'
  | 'cybersecurity'
  | 'advanced-materials';

export type InvestmentStage = 
  | 'pre-seed'
  | 'seed'
  | 'series-a'
  | 'series-b'
  | 'series-c'
  | 'series-d+'
  | 'growth'
  | 'late-stage';

export interface PortfolioSummary {
  totalCompanies: number;
  totalInvested: number;
  currentValue: number;
  totalMoic: number;
  totalIrr: number;
  sectorDistribution: Record<InvestmentSector, number>;
  stageDistribution: Record<InvestmentStage, number>;
}

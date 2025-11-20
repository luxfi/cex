import type { PortfolioCompany } from '@luxats/types';

/**
 * Portfolio Companies
 * This data is shared across all apps in the ecosystem
 */

export const portfolioCompanies: PortfolioCompany[] = [
  {
    id: 'sandboxaq',
    name: 'SandboxAQ',
    description: 'Enterprise SaaS company delivering solutions at the nexus of AI and Quantum technology (LQM). Partnerships with Saudi Aramco, Sanofi, and US Army.',
    logo: '/portfolio-images/sandboxaq-logo.svg',
    website: 'https://www.sandboxaq.com',
    sector: 'ai',
    stage: 'series-b',
    investmentDate: '2022-01-01',
    status: 'active',
    metrics: {
      fundingRounds: [
        {
          round: 'Series B',
          amount: 740000000,
          date: '2023-02-01',
          leadInvestors: ['Various leading investors']
        }
      ]
    }
  },
  {
    id: 'xai',
    name: 'X.AI',
    description: "Elon Musk's AI company building Grok, an AI assistant with real-time access to information. Valued at $50 billion.",
    logo: '/portfolio-images/xai-logo.svg',
    website: 'https://x.ai',
    sector: 'ai',
    stage: 'growth',
    investmentDate: '2023-01-01',
    currentValuation: 50000000000,
    status: 'active'
  },
  {
    id: 'spacex',
    name: 'SpaceX',
    description: 'Leading aerospace manufacturer and space transportation company. Valuation surged to $350 billion through stock buyback program.',
    logo: '/portfolio-images/spacex-logo.svg',
    website: 'https://www.spacex.com',
    sector: 'space',
    stage: 'late-stage',
    investmentDate: '2002-01-01',
    currentValuation: 350000000000,
    status: 'active'
  },
  {
    id: 'palantir',
    name: 'Palantir Technologies',
    description: 'Public software company specializing in big data analytics for government and commercial clients. Known for AI Platform (AIP).',
    logo: '/portfolio-images/palantir-logo.svg',
    website: 'https://www.palantir.com',
    sector: 'ai',
    stage: 'late-stage',
    investmentDate: '2003-01-01',
    status: 'active'
  },
  {
    id: 'axispoint',
    name: 'AxisPoint',
    description: 'Technology company focused on advanced solutions.',
    logo: '/portfolio-images/axispoint-logo.svg',
    sector: 'ai',
    stage: 'growth',
    investmentDate: '2020-01-01',
    status: 'active'
  }
];

/**
 * Get portfolio company by ID
 */
export function getPortfolioCompany(id: string): PortfolioCompany | undefined {
  return portfolioCompanies.find(company => company.id === id);
}

/**
 * Get companies by sector
 */
export function getCompaniesBySector(sector: string): PortfolioCompany[] {
  return portfolioCompanies.filter(company => company.sector === sector);
}

/**
 * Get companies by stage
 */
export function getCompaniesByStage(stage: string): PortfolioCompany[] {
  return portfolioCompanies.filter(company => company.stage === stage);
}

/**
 * Get portfolio summary statistics
 */
export function getPortfolioSummary() {
  const totalCompanies = portfolioCompanies.length;
  const activeCompanies = portfolioCompanies.filter(c => c.status === 'active').length;
  
  const totalValue = portfolioCompanies.reduce((sum, company) => {
    return sum + (company.currentValuation || 0);
  }, 0);

  const sectorDistribution = portfolioCompanies.reduce((acc, company) => {
    acc[company.sector] = (acc[company.sector] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stageDistribution = portfolioCompanies.reduce((acc, company) => {
    acc[company.stage] = (acc[company.stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalCompanies,
    activeCompanies,
    totalValue,
    sectorDistribution,
    stageDistribution
  };
}

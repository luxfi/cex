import { PortfolioCompany } from '@luxats/types';

/**
 * Portfolio Companies
 * This data is shared across all apps in the ecosystem
 */
declare const portfolioCompanies: PortfolioCompany[];
/**
 * Get portfolio company by ID
 */
declare function getPortfolioCompany(id: string): PortfolioCompany | undefined;
/**
 * Get companies by sector
 */
declare function getCompaniesBySector(sector: string): PortfolioCompany[];
/**
 * Get companies by stage
 */
declare function getCompaniesByStage(stage: string): PortfolioCompany[];
/**
 * Get portfolio summary statistics
 */
declare function getPortfolioSummary(): {
    totalCompanies: number;
    activeCompanies: number;
    totalValue: number;
    sectorDistribution: Record<string, number>;
    stageDistribution: Record<string, number>;
};

export { getCompaniesBySector, getCompaniesByStage, getPortfolioCompany, getPortfolioSummary, portfolioCompanies };

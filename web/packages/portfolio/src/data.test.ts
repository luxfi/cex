import { describe, it, expect } from 'vitest'
import {
  portfolioCompanies,
  getPortfolioCompany,
  getCompaniesBySector,
  getCompaniesByStage,
  getPortfolioSummary,
} from './data'

describe('Portfolio Data', () => {
  describe('portfolioCompanies', () => {
    it('should have at least one company', () => {
      expect(portfolioCompanies).toBeDefined()
      expect(portfolioCompanies.length).toBeGreaterThan(0)
    })

    it('should have required fields for all companies', () => {
      portfolioCompanies.forEach((company) => {
        expect(company).toHaveProperty('id')
        expect(company).toHaveProperty('name')
        expect(company).toHaveProperty('description')
        expect(company).toHaveProperty('sector')
        expect(company).toHaveProperty('stage')
        expect(company).toHaveProperty('investmentDate')
        expect(company).toHaveProperty('status')
      })
    })

    it('should have unique IDs for all companies', () => {
      const ids = portfolioCompanies.map((c) => c.id)
      const uniqueIds = new Set(ids)
      expect(ids.length).toBe(uniqueIds.size)
    })

    it('should have valid sectors', () => {
      const validSectors = ['ai', 'space', 'biotech', 'fintech', 'crypto', 'healthcare', 'energy']
      portfolioCompanies.forEach((company) => {
        expect(validSectors).toContain(company.sector)
      })
    })

    it('should have valid stages', () => {
      const validStages = ['seed', 'series-a', 'series-b', 'series-c', 'growth', 'late-stage', 'public']
      portfolioCompanies.forEach((company) => {
        expect(validStages).toContain(company.stage)
      })
    })

    it('should have valid statuses', () => {
      const validStatuses = ['active', 'exited', 'acquired', 'public']
      portfolioCompanies.forEach((company) => {
        expect(validStatuses).toContain(company.status)
      })
    })
  })

  describe('getPortfolioCompany', () => {
    it('should return a company by ID', () => {
      const company = getPortfolioCompany('sandboxaq')
      expect(company).toBeDefined()
      expect(company?.id).toBe('sandboxaq')
      expect(company?.name).toBe('SandboxAQ')
    })

    it('should return undefined for non-existent ID', () => {
      const company = getPortfolioCompany('non-existent-id')
      expect(company).toBeUndefined()
    })

    it('should return SpaceX by ID', () => {
      const company = getPortfolioCompany('spacex')
      expect(company).toBeDefined()
      expect(company?.name).toBe('SpaceX')
      expect(company?.sector).toBe('space')
    })

    it('should return Palantir by ID', () => {
      const company = getPortfolioCompany('palantir')
      expect(company).toBeDefined()
      expect(company?.name).toBe('Palantir Technologies')
      expect(company?.sector).toBe('ai')
    })
  })

  describe('getCompaniesBySector', () => {
    it('should return companies in AI sector', () => {
      const aiCompanies = getCompaniesBySector('ai')
      expect(aiCompanies.length).toBeGreaterThan(0)
      aiCompanies.forEach((company) => {
        expect(company.sector).toBe('ai')
      })
    })

    it('should return companies in space sector', () => {
      const spaceCompanies = getCompaniesBySector('space')
      expect(spaceCompanies.length).toBeGreaterThan(0)
      spaceCompanies.forEach((company) => {
        expect(company.sector).toBe('space')
      })
    })

    it('should return empty array for non-existent sector', () => {
      const companies = getCompaniesBySector('non-existent-sector')
      expect(companies).toEqual([])
    })

    it('should return all AI companies including SandboxAQ, X.AI, and Palantir', () => {
      const aiCompanies = getCompaniesBySector('ai')
      const companyNames = aiCompanies.map(c => c.name)
      expect(companyNames).toContain('SandboxAQ')
      expect(companyNames).toContain('X.AI')
      expect(companyNames).toContain('Palantir Technologies')
    })
  })

  describe('getCompaniesByStage', () => {
    it('should return companies in series-b stage', () => {
      const seriesBCompanies = getCompaniesByStage('series-b')
      seriesBCompanies.forEach((company) => {
        expect(company.stage).toBe('series-b')
      })
    })

    it('should return companies in growth stage', () => {
      const growthCompanies = getCompaniesByStage('growth')
      expect(growthCompanies.length).toBeGreaterThan(0)
      growthCompanies.forEach((company) => {
        expect(company.stage).toBe('growth')
      })
    })

    it('should return companies in late-stage', () => {
      const lateStageCompanies = getCompaniesByStage('late-stage')
      expect(lateStageCompanies.length).toBeGreaterThan(0)
      lateStageCompanies.forEach((company) => {
        expect(company.stage).toBe('late-stage')
      })
    })

    it('should return empty array for non-existent stage', () => {
      const companies = getCompaniesByStage('non-existent-stage')
      expect(companies).toEqual([])
    })
  })

  describe('getPortfolioSummary', () => {
    it('should return summary with correct structure', () => {
      const summary = getPortfolioSummary()
      expect(summary).toHaveProperty('totalCompanies')
      expect(summary).toHaveProperty('activeCompanies')
      expect(summary).toHaveProperty('totalValue')
      expect(summary).toHaveProperty('sectorDistribution')
      expect(summary).toHaveProperty('stageDistribution')
    })

    it('should calculate total companies correctly', () => {
      const summary = getPortfolioSummary()
      expect(summary.totalCompanies).toBe(portfolioCompanies.length)
      expect(summary.totalCompanies).toBeGreaterThan(0)
    })

    it('should calculate active companies correctly', () => {
      const summary = getPortfolioSummary()
      const activeCount = portfolioCompanies.filter(c => c.status === 'active').length
      expect(summary.activeCompanies).toBe(activeCount)
    })

    it('should calculate total value correctly', () => {
      const summary = getPortfolioSummary()
      expect(summary.totalValue).toBeGreaterThan(0)
      expect(typeof summary.totalValue).toBe('number')
    })

    it('should include SpaceX and X.AI valuations in total value', () => {
      const summary = getPortfolioSummary()
      // SpaceX: $350B, X.AI: $50B = at least $400B total
      expect(summary.totalValue).toBeGreaterThanOrEqual(400000000000)
    })

    it('should create sector distribution', () => {
      const summary = getPortfolioSummary()
      expect(summary.sectorDistribution).toBeDefined()
      expect(typeof summary.sectorDistribution).toBe('object')
      expect(Object.keys(summary.sectorDistribution).length).toBeGreaterThan(0)
    })

    it('should have AI sector in distribution', () => {
      const summary = getPortfolioSummary()
      expect(summary.sectorDistribution).toHaveProperty('ai')
      expect(summary.sectorDistribution.ai).toBeGreaterThan(0)
    })

    it('should have space sector in distribution', () => {
      const summary = getPortfolioSummary()
      expect(summary.sectorDistribution).toHaveProperty('space')
      expect(summary.sectorDistribution.space).toBeGreaterThan(0)
    })

    it('should create stage distribution', () => {
      const summary = getPortfolioSummary()
      expect(summary.stageDistribution).toBeDefined()
      expect(typeof summary.stageDistribution).toBe('object')
      expect(Object.keys(summary.stageDistribution).length).toBeGreaterThan(0)
    })

    it('should count all companies in sector distribution', () => {
      const summary = getPortfolioSummary()
      const totalInSectors = Object.values(summary.sectorDistribution).reduce(
        (sum, count) => sum + count,
        0
      )
      expect(totalInSectors).toBe(portfolioCompanies.length)
    })

    it('should count all companies in stage distribution', () => {
      const summary = getPortfolioSummary()
      const totalInStages = Object.values(summary.stageDistribution).reduce(
        (sum, count) => sum + count,
        0
      )
      expect(totalInStages).toBe(portfolioCompanies.length)
    })
  })

  describe('Portfolio Companies Details', () => {
    it('should have SandboxAQ with correct details', () => {
      const company = getPortfolioCompany('sandboxaq')
      expect(company).toBeDefined()
      expect(company?.sector).toBe('ai')
      expect(company?.stage).toBe('series-b')
      expect(company?.metrics?.fundingRounds).toBeDefined()
      expect(company?.metrics?.fundingRounds?.[0].amount).toBe(740000000)
    })

    it('should have SpaceX with $350B valuation', () => {
      const company = getPortfolioCompany('spacex')
      expect(company).toBeDefined()
      expect(company?.currentValuation).toBe(350000000000)
      expect(company?.sector).toBe('space')
      expect(company?.stage).toBe('late-stage')
    })

    it('should have X.AI with $50B valuation', () => {
      const company = getPortfolioCompany('xai')
      expect(company).toBeDefined()
      expect(company?.currentValuation).toBe(50000000000)
      expect(company?.sector).toBe('ai')
      expect(company?.stage).toBe('growth')
    })

    it('should have Palantir as an AI company', () => {
      const company = getPortfolioCompany('palantir')
      expect(company).toBeDefined()
      expect(company?.sector).toBe('ai')
      expect(company?.stage).toBe('late-stage')
      expect(company?.description).toContain('AI Platform')
    })
  })
})

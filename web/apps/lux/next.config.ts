import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // output: 'export', // enable for static builds
  reactStrictMode: true,
  transpilePackages: ['@luxats/ui', '@luxats/types', '@luxats/portfolio', '@hanzo/ui'],
}

export default nextConfig

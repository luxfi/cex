const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withCSS = require('@zeit/next-css')
const autoprefixer = require('autoprefixer')
const withTM = require('next-transpile-modules')
const comments = require('postcss-discard-comments')
const postcss = require('poststylus')
const rupture = require('rupture')
const articlesFromJson = require('./assets/tempData/articles')
const moviesFromJson = require('./assets/tempData/moviesBuild')
const facets = require('./settings/facets')

module.exports = withBundleAnalyzer(
  withCSS(
    withTM({
      transpileModules: ['react-financial-charts'],
      stylusLoaderOptions: {
        use: [
          rupture(),
          postcss([
            autoprefixer(),
            'rucksack-css',
            comments({ removeAll: true }),
          ]),
        ],
      },

      webpack: config => {
        config.module.rules.push({
          test: /\.mjs$/,
          type: 'javascript/auto',
        })

        config.module.rules.push({
          test: /\.(eot|woff|woff2|ttf|webp|txt|jpg|png|jpeg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                context: '',
                outputPath: 'static',
                publicPath: '_next/static',
                name: '[path][name].[hash].[ext]',
              },
            },
          ],
        })

        config.module.rules.unshift({
          test: /moviesGenerator.js$/,
          use: [
            {
              loader: 'val-loader',
            },
          ],
        })

        return config
      },

      async exportPathMap() {
        const articles = articlesFromJson.reduce(
          (as, a) => ({
            ...as,
            [`/article/${a.articleSlug}`]: {
              page: '/article',
              query: { slug: a.articleSlug },
            },
          }),
          {},
        )

        const movies = moviesFromJson.reduce(
          (ms, m) => ({
            ...ms,
            [`/film/${m.movieSlug}`]: {
              page: '/film',
              query: { slug: m.movieSlug },
            },
            [`/trade/${m.movieSlug}`]: {
              page: '/trade',
              query: { slug: m.movieSlug },
            },
            [`/ticketing/${m.movieSlug}`]: {
              page: '/ticketing',
              query: { slug: m.movieSlug },
            },
            [`/ticketing/${m.movieSlug}/checkout`]: {
              page: '/checkout',
              query: { slug: m.movieSlug },
            },
            [`/ticketing/${m.movieSlug}/checkout/payment`]: {
              page: '/checkout/payment',
              query: { slug: m.movieSlug },
            },
            [`/offering/${m.movieSlug}`]: {
              page: '/offering',
              query: { slug: m.movieSlug },
            },
            [`/pro/${m.movieSlug}`]: {
              page: '/pro',
              query: { slug: m.movieSlug },
            },
          }),
          {},
        )

        const browseFacets = facets.reduce(
          (acc, f) => {
            let result = {...acc}
            for (let v of f.values) {
              result[`/browse/${f.name}/${v.key}`] = {
                page: '/browse',
                query: { facet: f.name, value: v.key}
              }
            }
            return result
          },
          {}
        )

        return {
          ...articles,
          ...movies,
          ...browseFacets,
          '/': { page: '/' },
          '/login': { page: '/login' },
          '/signup': { page: '/signup' },
          '/portfolio': { page: '/portfolio' },
          '/portfolio/newsfeed': { page: '/portfolio/newsfeed' },
          '/portfolio/rewards': { page: '/portfolio/rewards' },
          '/account': { page: '/account' },
          '/account/access': { page: '/account/access' },
          '/account/activity': { page: '/account/activity' },
          '/account/documents': { page: '/account/documents' },
          '/account/funds': { page: '/account/funds' },
          '/account/identity': { page: '/account/identity' },
          '/account/security': { page: '/account/security' },
          '/investorFaq': { page: '/investorFaq' },
          '/offering': { page: '/offering' },
          '/projectFaq': { page: '/projectFaq' },
          '/risks': { page: '/risks' },
          '/contact': { page: '/contact' },
          '/about': { page: '/about' },
          '/placeholder': { page: '/placeholder' },
          '/accountLevels': { page: '/accountLevels' },
          '/discover': { page: '/browse' },
          '/browse': { page: '/browse' },
        }
      },
    }),
  ),
)

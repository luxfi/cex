const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withStylus = require('@zeit/next-stylus')
const autoprefixer = require('autoprefixer')
const comments = require('postcss-discard-comments')
const postcss = require('poststylus')
const rupture = require('rupture')
const articlesFromJson = require('./assets/tempData/articles')
const moviesFromJson = require('./assets/tempData/movies')

module.exports = withBundleAnalyzer(
  withCSS(
    withSass(
      withStylus({
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
        webpack: (config) => {
          config.module.rules.push({
            test: /\.mjs$/,
            type: 'javascript/auto',
          })

          config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|webp|txt|jpg|png|jpeg|svg|gif)$/,
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
              [`/pro/${m.movieSlug}`]: {
                page: '/pro',
                query: { slug: m.movieSlug },
              },
            }),
            {},
          )

          // combine the map of post pages with the home
          return {
            ...articles,
            ...movies,
            '/': { page: '/' },
            '/login': { page: '/login' },
            '/signup': { page: '/signup' },
            '/portfolio': { page: '/portfolio' },
            '/portfolio/rewards': { page: '/portfolio/rewards' },
            '/account': { page: '/account' },
            '/account/kyc': { page: '/account/kyc' },
            '/investorFaq': { page: '/investorFaq' },
            '/projectFaq': { page: '/projectFaq' },
            '/risks': { page: '/risks' },
            '/contact': { page: '/contact' },
            '/about': { page: '/about' },
            '/placeholder': { page: '/placeholder' },
          }
        },
      }),
    ),
  ),
)

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
const moviesFromJson = require('./assets/tempData/movies')

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

<<<<<<< HEAD
          const movies = moviesFromJson.reduce(
            (movies, movie) =>
              Object.assign({}, movies, {
                [`/film/${movie.movieSlug}`]: {
                  page: '/film',
                  query: { slug: movie.movieSlug },
                },
                [`/trade/${movie.movieSlug}`]: {
                  page: '/trade',
                  query: { slug: movie.movieSlug },
                },
                [`/pro/${movie.movieSlug}`]: {
                  page: '/pro',
                  query: { slug: movie.movieSlug },
                },
                [`/offering/${movie.movieSlug}`]: {
                  page: '/offering',
                  query: { slug: movie.movieSlug },
                },
              }),
            {},
          )
=======
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
>>>>>>> master

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
          '/account/documents': { page: '/account/documents' },
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
)

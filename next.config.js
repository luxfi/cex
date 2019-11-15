const withCSS = require("@zeit/next-css")
const withSass = require("@zeit/next-sass")
const withStylus = require("@zeit/next-stylus")
const rupture = require("rupture")
const postcss = require("poststylus")
const autoprefixer = require("autoprefixer")
const comments = require("postcss-discard-comments")
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
  withCSS(
    withSass(
      withStylus({
        stylusLoaderOptions: {
          use: [
            rupture(),
            postcss([
              autoprefixer(),
              "rucksack-css",
              comments({ removeAll: true })
            ])
          ]
        },
        webpack: (config, { defaultLoaders, isServer }) => {
          config.module.rules.push({
            test: /\.mjs$/,
            type: "javascript/auto"
          })

          config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|webp|txt|jpg|png|jpeg|svg|gif)$/,
            use: [
              {
                loader: "file-loader",
                options: {
                  context: "",
                  outputPath: "static",
                  publicPath: "_next/static",
                  name: "[path][name].[hash].[ext]"
                }
              }
            ]
          })

          return config
        },
        async exportPathMap () {
          const articlesFromJson = require('./assets/tempData/articles')
          const moviesFromJson = require('./assets/tempData/movies')

          const articles = articlesFromJson.reduce(
            (articles, article) => {
              return Object.assign({}, articles, {
                [`/article/${article.articleSlug}`]: {
                  page: '/article',
                  query: { slug: article.articleSlug }
                }
              })
            },
            {}
          )

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
              }),
            {}
          )

          // combine the map of post pages with the home
          return Object.assign({}, articles, movies, {
            "/": { page: "/" },
            "/login": { page: "/login" },
            "/signup": { page: "/signup" },
            "/portfolio": { page: "/portfolio" },
            "/account": { page: "/account" },
            "/account/kyc": { page: "/account/kyc" },
            "/investorFaq": { page: "/investorFaq" },
            "/projectFaq": { page: "/projectFaq" },
            "/risks": { page: "/risks" },
            "/contact": { page: "/contact" },
            "/about": { page: "/about" }
          });
        }
      })
    )
  )
)

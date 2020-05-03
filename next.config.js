const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
//const withCSS = require('@zeit/next-css')
//const withSass = require('@zeit/next-sass')
const autoprefixer = require('autoprefixer')
const withTM = require('next-transpile-modules')
const comments = require('postcss-discard-comments')
const postcss = require('poststylus')
const rupture = require('rupture')

module.exports = withBundleAnalyzer(
  /*
  withSass({
    
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 2,
    }
  
  },
  */
  //withCSS(
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

    // exportPathMap: async function(defaultPathMap, {dev, dir, outDir, distDir, buildId}) {
    //   return {
    //     '/': { page: '/' },
    //   }
    // },

    webpack: config => {
      // Disable for performance boost during dev, but breaks source maps
      config.devtool = 'eval-source-map'

      //config.node = {fs: 'empty'}

      //config.target = 'node' 

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
  }
))


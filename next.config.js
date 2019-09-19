const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withStylus = require('@zeit/next-stylus')
const rupture = require('rupture')
const postcss      = require('poststylus')
const autoprefixer = require('autoprefixer')
const comments     = require('postcss-discard-comments')

module.exports = withCSS(withSass(withStylus({
  stylusLoaderOptions: {
    use: [
      rupture(),
      postcss([
        autoprefixer({ browsers :'> 1%' }),
        'rucksack-css',
        'css-mqpacker',
        comments({ removeAll: true })
      ])
    ]
  },
  webpack: (config, { defaultLoaders, isServer }) => {
    config.module.rules.push({
      test: /\.mjs$/,
      type: 'javascript/auto',
    })
    
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|txt|jpg|png|jpeg|svg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            context: '',
            outputPath: 'static',
            publicPath: '_next/static',
            name: '[path][name].[hash].[ext]'
          }
        }
      ]
    })

    return config
  }
})))

const withCSS = require('@zeit/next-css')
module.exports = withCSS({
    webpack: (config, { defaultLoaders, isServer }) => {
        config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|txt|jpg|png|svg|gif)$/,
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
})

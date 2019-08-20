const withCSS = require('@zeit/next-css')
module.exports = withCSS({
    webpack: (config, { isServer }) => {
        cssModules: true,
            config.module.rules.push({
                test: /\.(txt|jpg|png|svg)$/,
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

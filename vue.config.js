var MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8081
    },
    configureWebpack: {
        plugins: [
            new MergeJsonWebpackPlugin({
                "debug": false,
                "output": {
                    "groupBy": [
                        {
                            "pattern": "./antipatterns/*.json",
                            "fileName": "./assets/result.json"
                        }
                    ]
                },
                "globOptions": {
                    "nosort": false,
                    "prefixFileName": true,
                }
            }),
            new CopyWebpackPlugin([
                {
                    from: './*.md',
                    to: './assets/[name].[ext]'
                },
                {
                    from: './assets/sources.json',
                    to: './assets/[name].[ext]'
                }
            ])
        ]
    },
    baseUrl: process.env.NODE_ENV === 'production' ? '/service-based-antipatterns/' : '/service-based-antipatterns/'
};

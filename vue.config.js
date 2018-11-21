var MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");
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
                            "pattern": "./src/assets/*.json",
                            "fileName": "./assets/result.json"
                        }
                    ]
                },
                "globOptions": {
                    "nosort": false,
                    "prefixFileName": true,
                }
            })
        ]
    },
    baseUrl: process.env.NODE_ENV === 'production' ? '/service-based-antipatterns/' : '/service-based-antipatterns/'
};

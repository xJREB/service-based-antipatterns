var MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    devServer: {
        host: "0.0.0.0",
        port: 8081
    },
    configureWebpack: {
        plugins: [
            new MergeJsonWebpackPlugin({
                debug: false,
                output: {
                    groupBy: [
                        {
                            pattern: "./antipatterns/*.json",
                            fileName: "./assets/result.json"
                        }
                    ]
                },
                globOptions: {
                    nosort: false,
                    prefixFileName: true
                }
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "./*.md",
                        to: "./assets/[name].[ext]"
                    },
                    {
                        from: "./slr/*.md",
                        to: "./assets/[name].[ext]"
                    },
                    {
                        from: "./assets/*.json",
                        to: "./assets/[name].[ext]"
                    }
                ]
            })
        ]
    },
    publicPath:
        process.env.NODE_ENV === "production"
            ? "/service-based-antipatterns/"
            : "."
};

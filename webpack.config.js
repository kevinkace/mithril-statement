const path = require("path");

const HtmlWebpackPlugin  = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

const CSSPlugin = require("modular-css-webpack/plugin");

// Bundling assets for HtmlWebpackIncludeAssetsPlugi;
const assets = [
        "https://cdnjs.cloudflare.com/ajax/libs/mithril/1.1.6/mithril.js",
        "/index.css"
    ];

module.exports = {
    entry     : "./src/index.ts",
    devtool   : "source-map",
    devServer : {
        historyApiFallback : true,
        contentBase : "./dist"
    },
    externals : { mithril : "m" },

    module : {
        rules : [{
            test    : /\.tsx?$/,
            loader  : 'ts-loader',
            exclude : /node_modules/,
        }, {
            test    : /\.js$/,
            loader  : "babel-loader",
            exclude : /(node_modules)/
        }, {
            test   : /\.css$/,
            loader : "modular-css-webpack/loader",
            exclude : /(node_modules)/
        }]
    },
    plugins : [
        // Cleans build artifacts (pathsToClean, cleanOptions)
        new CleanWebpackPlugin([ "dist" ]),
        // Modular CSS
        new CSSPlugin({ css : "./index.css" }),
        // Tells webpack to use this plugin to generate the output
        new HtmlWebpackPlugin({
            title      : "App Name",
            template   : "./src/index.ejs"
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets,       // Include assets into template
            append : false // Include after existing
        })
    ],
    // Bundled JS
    output : {
        filename : "index.js",
        path     : path.resolve(__dirname, "dist")
    }
};

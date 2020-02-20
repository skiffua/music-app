const webpack = require("webpack");
const path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");

const outputDirectory = 'dist';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: 'bundle.js'
    },
    target: 'web',

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        compress: true,
        disableHostCheck: true
    },
    devtool: false,
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico'
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: 'sourcemaps/source.js.map',
        })
    ]
};

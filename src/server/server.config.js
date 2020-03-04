const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dist = 'dist';

module.exports = {
    name: 'server',
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        path: path.resolve(__dirname, dist),
        filename: 'index.js'
    },
    target: 'node',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }
        ]
    },
    devServer: {
        port: 8080
    },
    plugins: [
        // new CleanWebpackPlugin([dist]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../../public/index.html'),
        })
    ]
};
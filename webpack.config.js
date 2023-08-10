const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: {
        Content: './src/js/Content/Content.js',
        Sandbox: './src/js/Sandbox/Sandbox.js',
        Background: './src/js/Background/Background.js',
        popup: {
            import: './src/Popup/js/main.js',
            filename: 'Popup/main.js'
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/Popup/index.html',
            filename:'Popup/index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/manifest.json" },
                { from: "./src/images", to: "images" },
                { from: "./src/Popup/css", to: "Popup/css" },
                { from: "./src/Popup/images", to: "Popup/images" },
            ],
        }),
    ],
    resolve: {
        alias: {
            'Shared': path.resolve(__dirname, 'src/js/Shared'),
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: 'css-loader'
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                    output: { 
                        ascii_only: true 
                    },
                }
            })
        ]
    }
}
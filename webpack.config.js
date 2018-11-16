const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
require('babel-polyfill');

module.exports = 
{
    entry: ["babel-polyfill", './src/index.js'],
    output: 
    {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    // mode: Tells webpack to use its built-in optimizations accordingly.
    mode: 'development',    // Possible values for mode are: none, development or production(default).
    // devtool: Used for debugging, (Never use inline-source-map or eval-souce-map for production as they can increase bundle size and reduce the overall performance).
    devtool: "source-map",  
    // target: Webpack will combine for usage in particular environment.
    target: 'web',      // Default is web. Other options: node
    module:
    {
        rules:
        [
            { 
                test: /\.js$/,
                exclude: /node_modules/,
                use: 
                {
                    loader: 'babel-loader',
                    options: 
                    {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: 
                [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader:"file-loader",
                query:
                {
                    name:'[name].[ext]',
                    outputPath:'images/'
                    //the images will be emmited to dist/images folder
                    //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png);
                }
            },
            {
                enforce: 'pre',
                test: /\.js?$/,
                exclude: [/node_modules/],
                loader: 'eslint-loader',
                options: 
                {
                    fix: true,
                },
            },
        ]
    },
    plugins: 
    [
        new HtmlWebpackPlugin
        ({
            template: 'index.html'
        }),
        new webpack.ProvidePlugin
        ({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery'",
            "window.$": "jquery",
            Popper: ['popper.js', 'default']
        })
    ]
};
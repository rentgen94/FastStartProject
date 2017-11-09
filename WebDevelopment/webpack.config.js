const webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context: `${__dirname}`,
    entry: {
        start: './assets/javascripts/index.js',
    },
    output: {
        path: `${__dirname}/assets/build`,
        filename: '[name].js',
        publicPath: '/assets/build',
        library: '[name]',
    },

    module: {
        loaders: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.js$/,
                include: `${__dirname}\\assets\\javascripts`,                
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015"],
                }
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                loader: 'url-loader?limit=4096&name=[path][name].[ext]',
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css')
    ],

    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100,
    },

    devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : false,

};
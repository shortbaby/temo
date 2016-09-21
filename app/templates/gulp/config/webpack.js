/**
 * @fileOverview webpack配置文件
 * @author XiaoBin Li (lixiaobin@baijiahulian.com)
 */

'use strcit';
var webpack = require('webpack');
module.exports = {
    entry: {
        main: ['./src/main.js'],
        vendor: ['jquery', 'vue', 'vue-router', 'fastclick']
    },
    debug: true,
    output: {
        path: __dirname + '/output/src/',
        publicPath: '/output/src/',
        filename: '[name].js',
        chunkFilename: "[name].js",
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js"
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url'
            }
        ]
    },
    vue: {
        loaders: {
            css: 'style!css!sass',
            html:'html-loader'
        }
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
}
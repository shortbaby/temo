/**
 * @fileOverview webpack配置文件
 * @author XiaoBin Li (lixiaobin@baijiahulian.com)
 */

'use strcit';

module.exports = {
    entry: {
        main: ['./src/main.js']
    },
    debug: true,
    output: {
        path: __dirname + '/output/src/',
        publicPath: '/output/src/',
        filename: '[name].js'
    },
    plugins: [],
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
            }
        ]
    },
    externals: {
        '$': '$',
        'jquery': 'jQuery',
        'vue': 'Vue'
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
}
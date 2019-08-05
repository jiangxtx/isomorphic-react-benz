/**
 * @file webpack.server.config.js
 */

const webpack = require('webpack')
const path = require('path')
const HappyPack = require('happypack') // Happypack 只是作用在 loader 上，使用多个进程同时对文件进行编译
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

function resolve(...args) {
    return path.resolve(__dirname, ...args)
}

const moduleCSSReg = [
    /\.iso\.scss$/,
    /\.module\.scss$/
]

module.exports = {
    mode: "development",
    target: "node", // in order to ignore built-in modules like path, fs, etc.
    entry: [
        resolve('../app.js')
    ],
    output: {
        path: path.join(resolve('../dist'), 'server'),
        filename: "app.js",
        libraryTarget: "commonjs2", // 输出格式,将你的library暴露为CommonJS模块
    },
    devtool: "source-map",
    module: {
        rules: [/*{
            test: moduleCSSReg,
            exclude: /node_modules/,
            use: ['happypack/loader?id=modulescss']
        }, */{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['happypack/loader?id=jsx']
        }, {
            test: /\.(html|scss|png|jpe?g|gif|ico)$/,
            exclude: moduleCSSReg,
            use: ['happypack/loader?id=raw']
        }]
    },
    // resolve: { }, // TODO...
    plugins: [
        new HappyPack({
            id: 'jsx',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader',
                query: require('./config/serverBabel.config')
            }]
        }),
        new HappyPack({
            id: 'raw',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'raw-loader', // A loader for webpack that lets you import files as a string.
            }]
        }),
    ],
    node: {
        console: false,
        __filename: true,
        __dirname: true
    }
}

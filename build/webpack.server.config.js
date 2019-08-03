/**
 * @file webpack.server.config.js
 */

const webpack = require('webpack')
const path = require('path')
const Happypack = require('happypack') // Happypack 只是作用在 loader 上，使用多个进程同时对文件进行编译

function resolve(...args) {
    return path.resolve(__dirname, ...args)
}

const moduleCSSReg = [
    /\.iso\.scss$/,
    /\.module\.scss$/
]

module.exports = {
    mode: "development",
    target: "node",
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
        rules: [{
            test: moduleCSSReg,
            exclude: /node_modules/,
            use: ['happypack/loader?id=modulescss']
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['happypack/loader?id=jsx']
        }, {
            test: /\.(html|scss|png|jpe?g|gif|ico)$/,
            exclude: moduleCSSReg,
            use: ['happypack/loader?id=raw']
        }]
    },
    resolve: {
        alias: {
            // "@widgets": path.join()
        }
    }
}

/**
 * @file webpack.config.js
 */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HappyPack = require('happypack')

const resolve = require('./util').resolve;
const alias = require('./config/alias')
const WORKSPACE = path.resolve(__dirname, '..');
// const WORKSPACE = process.cwd();
const outputPath = resolve('dist');
const packConfig = require('./config/pack.config')
const baseOptimizationConfig = require('./config/optimization')

const IS_DEV = process.env.NODE_ENV === 'development'
const happyThreadPool = HappyPack.ThreadPool({ size: 4 })

const happyLoaderStr = id => `happypack/loader?id=${id}`

const miniCssExtractPluginLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        hmr: IS_DEV,
        reloadAll: true
    }
}

// define a baseed config
const config = {
    mode: 'production',
    context: WORKSPACE,
    entry: {},
    devtool: false,
    output: {
        // 输出解析文件的目录
        publicPath: packConfig.nonImagePublicPath,
        // 用于加载分块的 JSONP 函数名
        jsonpFunction: 'webpackJsonpForReact',
        // 所有输出文件的目标路径 absolute path required!
        path: outputPath,
        filename: 'assets/js/[name]_[chunkhash].js',
        chunkFilename: 'assets/js/[name]_[chunkhash].js',
    },
    optimization: {
        ...baseOptimizationConfig,
        // 各个模块之间的引用和加载的逻辑文件
        runtimeChunk: {
            name: 'react_webpack_runtime'
        },
        // splitChunks config...
        // splitChunks: { },
    },
    // 配置如何处理模块
    module: {
        rules: [{
            test: /\.html$/,
            use: IS_DEV ? ['cache-loader', happyLoaderStr('html')] : [happyLoaderStr('html')]
        }, {
            test: /\.scss$/,
            exclude: [],
            use: [miniCssExtractPluginLoader, happyLoaderStr('scss')]
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: IS_DEV
                ? ['cache-loader', `url-loader?limit=1&name=assets/img/[name].[ext]`]
                : [`url-loader?limit=1&name=assets/img/[name].[ext]`]
        }, {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: modulePath => {
                return /node_modules/.test(modulePath) || /bower_components/.test(modulePath)
            },
            use: IS_DEV ? ['cache-loader', happyLoaderStr('jsx')] : [happyLoaderStr('jsx')]
        }],
    },
    resolve: {
        alias: alias,
        extensions: ['.js', '.json'], // 用于配置在尝试过程中用到的后缀列表
        modules: ['node_modules', WORKSPACE], // 配置 Webpack 去哪些目录下寻找第三方模块
        // plugins: [
        //     new DedupPlugin({ verbose: true })
        // ]
    },
    plugins: [
        // 忽略regExp匹配的模块
        new webpack.IgnorePlugin(/(precomputed)/, /node_modules.+(elliptic)/),
        // 启用作用域提升, refer: https://webpack.js.org/plugins/module-concatenation-plugin/
        new webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name]_[contenthash].css',
            chunkFilename: 'assets/css/[name]_[contenthash].css',
            allChunks: true
        }),
        new HappyPack({
            id: 'html',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'html-loader',
                query: {
                    escape: '\\{\\{-(.+?)\\}\\}',
                    evaluate: '\\{\\{(.+?)\\}\\}',
                }
            }]
        }),
        new HappyPack({
            id: 'scss',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'css-loader',
                options: {
                    minimize: false
                }
            }, {
                loader: 'resolve-url-loader'
            }, {
                loader: 'sass-loader'
            }]
        }),
        new HappyPack({
            id: 'jsx',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader',
                query: {
                    presets: [
                        ['@babel/env', {
                            useBuiltIns: 'entry',
                            corejs: '^2.0.0',
                            modules: false,
                            targets: {
                                browsers: ['Android >= 4.2', 'iOS>= 7']
                            },
                            include: [
                                'es6.object.assign',
                                'transform-for-of'
                            ]
                        }],
                        '@babel/react',
                        '@babel/preset-typescript'
                    ]
                }
            }]
        }),
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                ISAVALON: JSON.stringify(false),
            }
        }),
        new webpack.DllReferencePlugin({
            context: ".",
            manifest: require(path.resolve(WORKSPACE, 'static/react_vendor.manifest.json'))
        }),
        // htmlPlugin TODO...
    ],
    bail: true,
}

if (!IS_DEV) {
    // 根据模块的相对路径生成一个四位数的hash作为模块id
    config.plugins.push(new webpack.HashModuleIdsPlugin())
}

module.exports = config

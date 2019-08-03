/**
 * @file webpack.dll.config.js
 */
'use strict'

const webpack = require('webpack')
const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const WORKSPACE = path.resolve(__dirname, '../')
const packConfig = require('./config/pack.config')
const webpackConfigOptions = require('./webpack.config.options')
const outputPath = path.join(WORKSPACE, 'dist/')

const plugins = [
    new webpack.DllPlugin({
        path: outputPath + 'react_vendor.manifest.json',
        name: '[name]_lib'
    }),
    new webpack.ProvidePlugin({
        _: 'lodash'
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
        filename: path.join(webpackConfigOptions.NODE_VIEW_DIST_DIR, 'layout.html'),
        template: path.join(webpackConfigOptions.NODE_VIEW_SRC_DIR, 'layout.html'),
        inject: false,
        ENABLE_DEBUG: isDev,
        minify: {
            removeComments: true,
            collapseWhitespace: false,
            removeAttributeQuotes: false
        },
        // anything else that you want to logger...
    })
]

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: {
        react_vendor: [
            'react',
            'react-dom',
            'prop-type',
            'classnames',
            'core-js/es6/map',
            'core-js/es6/set',
        ]
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions:{
                    autoprefixer: {
                        browsers: ['android 4.4', 'ios 8'],
                        add: true
                    },
                    discardComments: { removeAll: true },
                    zindex: false,
                    reduceIdents: false
                }
            }),
            new UglifyJSPlugin({
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    output: { comments: false }
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'ejs-loader',
                query: {
                    interpolate: '\\{\\{=(.+?)\\}\\}',
                    evaluate: '\\{\\{(.+?)\\}\\}',
                    escape: '\\{\\{-(.+?)\\}\\}'
                }
            }
        ]
    },
    output: {
        publicPath: packConfig.nonImagePublicPath,
        path: outputPath,
        filename: `assets/js/[name]_[chunkhash].js`,
        library: '[name]_lib'
    },
    plugins,
}

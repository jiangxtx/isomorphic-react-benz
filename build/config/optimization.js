/**
 * @file optimization.js webpack的 optimization 配置项，抽象于此 方便复用。
 */

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const optimization = {
    minimize: true, // 压缩js代码
    minimizer: [
        new UglifyJSPlugin({
            parallel: true,
            sourceMap: false,
            uglifyOptions: {
                output: { comments: false }
            }
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions:{
                autoprefixer: {
                    browsers: ['android 4.4', 'ios 8'],
                    add: true
                },
                discardComments: { removeAll: true },
                zindex: false,
                discardUnused: false,
                mergeIdents: false,
                reduceIdents: false
            }
        }),
    ]
}

module.exports = optimization

/**
 * @file webpack.config.options.js
 */

const path = require('path')
const resolve = function (dir) {
    return path.join(__dirname, '..', dir);
}

const isDev = process.env.NODE_ENV === 'development'

const cssnanoOptions = {
    autoprefixer: { browsers: ['android 4.4', 'ios 8'], add: true },
    discardComments: { removeAll: true },
    zindex: false,
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false
}

const moduleCssLoaderOptions = {
    mudules: true,
    minimize: cssnanoOptions,
    localIdentName: isDev ? '[name]_[local]_[hash:base64:5]' : '[hash:base64:8]'
}

module.exports = {
    pagesConfig: path.resolve(__dirname, './pages.config'),
    NODE_VIEW_SRC_DIR: resolve('routes/views'),
    NODE_VIEW_DIST_DIR: resolve('routes/views'),
    dllManifest: resolve('dist/react_vendor.manifest.json'),
    moduleCssLoaderOptions
}

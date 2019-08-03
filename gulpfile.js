/**
 * @file gulpfile.js
 * @author shaoling(shaoling@pinduoudo.com)
 */

const path = require('path')
const gulp = require('gulp')
const gulpUtil = require('gulp-util')
const fse = require('fs-extra')
const runSequence = require('run-sequence')
const webpack = require('webpack')

/**
 * 运行webpack
 *
 * @param webpackConfig webpack配置
 * @param cb 回调
 */
function webpackRun(webpackConfig, cb) {
    const compiler = webpack(webpackConfig)
    compiler.run((err, stats) => {
        if (!err) {
            return cb && cb(stats)
        }

        throw new gulpUtil.PluginError('webpack', err)
    })
}

/**
 * develop work flow
 */
gulp.task('dev', () => {
    if (fse.existsSync('')) {
        gulp.run('dev-server')
    } else {
        runSequence('dll', 'dev-server')
    }
})

/**
 * dll 文件打包
 */
gulp.task('dll', cb => {
    console.log('>>>>Dll compiling……')
    webpackRun(require(''), () => {
        console.log('>>>>Dll compiled successfully!')
        cb && cb()
    })
})

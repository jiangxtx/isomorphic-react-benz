/**
 * @file gulpfile.js
 */

const path = require('path')
const gulp = require('gulp')
const gulpUtil = require('gulp-util')
const fse = require('fs-extra')
const runSequence = require('run-sequence')
const webpack = require('webpack')
const express = require('express')

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
    if (fse.existsSync('./dist/react_vendor.manifest.json')) {
        gulp.run('dev-server')
    } else {
        // Maybe error here: [TypeError: gulp.hasTask is not a function]
        // maybe version conflicts. installed gulp@3x and resolved.
        runSequence('dll', 'dev-server')
    }
})

/**
 * dll 文件打包
 */
gulp.task('dll', cb => {
    console.log('>>>>Dll compiling……')
    webpackRun(require('./build/webpack.dll.config'), () => {
        console.log('>>>>Dll compiled successfully!')
        cb && cb()
    })
})

const server = express()
gulp.task('dev-server', () => {
    console.log('>>>>dev-server task begin...')
    const webpackServerConfig = require('./build/webpack.server.config')
    const { output } = webpackServerConfig;
    const outputFilePath = path.join(output.path, output.filename) // app.js

    let app, initialized;

    webpack(webpackServerConfig).watch({
        aggregateTimeout: 300, // 在重建之前添加一个延迟
        ignored: [/node_modules/, /^(?!\.(iso|module|mjs)).*\.scss$/],
    }, (err, stats) => {
        if (err) throw err

        app = require(outputFilePath)
        // if (initialized) {
        //     delete require.cache(outputFilePath)
        //     return
        // }

        console.log(`>>>Starting ${output.filename} at ${new Date().toLocaleDateString()} ...`)
        server.use((req, res, next) => app.handle(req, res, next))

        const port = +process.env.PORT || 3000
        server.listen(port, () => {
            console.log(`>>>server is listening on port: ${port}`)
        })

        initialized = true
    })
})

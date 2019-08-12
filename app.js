/**
 * @file app.js 服务端启动入口文件
 */

const express = require('express')
const cookieParser = require('cookie-parser') // Express的中间件，用来实现cookie的解析
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const NODE_VIEW_DIST_DIR = require('./build/webpack.config.options').NODE_VIEW_DIST_DIR
const routes = require('./routes')

const app = express()
app.use(cookieParser())

app.engine('.html', ejs.renderFile) // ejs内置的方法，配置当扩展名为html时候调用ejs进行渲染
app.set('view engine','html') // 模板引擎设置为ejs
app.set('layout', 'layout')
app.set('views', NODE_VIEW_DIST_DIR)

app.use(expressLayouts)
app.set('layout extractStyles', true)

// important! project's routes.
routes(app)

module.exports = app

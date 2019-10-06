/**
 * @file express-ejs-layouts.serve.js Layout support for ejs in express
 * @author shaoling(shaoling@pinduoudo.com)
 */

const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.get('/', function (req, res) {
    const locals = {
        title: 'My EJS Title',
        description: 'page descp',
        header: 'Page Header'
    }
    res.render('viewPage', locals)
})

const port = 3366
app.listen(port, () => {
    console.log('Listening on port: ', port)
})

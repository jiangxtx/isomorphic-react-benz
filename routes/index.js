/**
 * @file index.js
 */

const handlers = require('./server')

function routes(app) {
    // health check point
    app.get('/tick', (req, res, next) => {
        res.sendStatus(200)
    })

    app.use('/:page.html', (req, res, next) => {
        const page = req.params.page
        if (handlers[page]) {
            handlers[page](req, res, next)
        } else {
            next()
        }
    })
}

module.exports = routes

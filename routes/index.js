/**
 * @file index.js
 */

const handlers = require('./server')

function routes(app) {
    // health check point
    app.get('/tick', (req, res, next) => {
        // res.sendStatus(200)
        // res.write('stststst okjsk')
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write(`
            <div style="font-size: 36px;text-align: center;">
                <H1>Waooh, so Great!</H1>
                <H4 style="font-size: 24px;color: blue;">The Server is running healthy~~</H4>
            </div>
        `)
        res.end()
    })

    app.use('/:page.html', (req, res, next) => {
        const page = req.params.page
        console.log('>>>>page: ', page, handlers[page], handlers)
        if (handlers[page]) {
            handlers[page](req, res, next)
        } else {
            next()
        }
    })
}

module.exports = routes

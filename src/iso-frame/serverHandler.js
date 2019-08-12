/**
 * @file serverHandler.js
 */

import React from 'react'
import ReactDomServer from 'react-dom/server'
// import { Provider, useStaticRendering } from 'mobx-react'
import serialize from 'serialize-javascript';

// useStaticRendering(true)

/**
 * server端页面处理函数工厂
 *
 * @param App
 * @param options
 */
export function serverHandler(App, options = {}) {
    options = { forceCSR: false, ...options }
    const appConfig = App.appConfig
    const appView = appConfig.serverTemplateName

    const csrRenderOptions = {
        error: null,
        content: '',
        rawData: 'null',
    }

    return async (req, res, next) => {
        // force CSR mode
        if (options.forceCSR || req.query.hasOwnProperty('__csr')) {
            return res.render(appView, csrRenderOptions)
        }

        // turn to SSR mode
        try {
            const html = ReactDomServer.renderToString(
                <App />
            )

            res.render(appView, {
                error: null,
                content: html,
                rawData: serialize({ test: 'ok' }, { isJSON: true })
            })
        } catch (e) {
            console.error(e)
        }
    }
}

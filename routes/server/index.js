/**
 * @file index.js
 */

const pages = require('../../build/pages')
const { ROUTE_PREFIX } = require('../../src/constants')

const serverRoutes = pages.reduce(function (routes, pageName) {
    // TODO...兼容有的写了 benz_ladi.html 这样的写法，统一后可简化
    try {
        routes[pageName] = require('./' + pageName);
    } catch (e) {
        routes[pageName] = require('./' + pageName.replace(new RegExp(`^${ROUTE_PREFIX}`), ''));
    }
    return routes;
}, {});

module.exports = serverRoutes;

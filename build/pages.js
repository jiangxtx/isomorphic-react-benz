/**
 * @file pages.js
 */

const { ROUTE_PREFIX  } = require('../src/constants')

/**
 * 给pages追加项目路由前缀
 *
 * @returns {string[]}
 */
function patchPagePrefix(pageList) {
    const reg = new RegExp(`^${ROUTE_PREFIX}`);
    return pageList.map(pageName => reg.test(pageName) ? pageName : (ROUTE_PREFIX + pageName));
}

/**
 * 项目涉及页面路由name
 * @type {string[]}
 */
const pagenameList = [
    'yeli',
]

module.exports = patchPagePrefix(pagenameList)

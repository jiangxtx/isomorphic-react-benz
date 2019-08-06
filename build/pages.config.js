/**
 * @file pages.config.js
 */

const fse = require('fs-extra');
const pages = require('./pages')
const { ROUTE_PREFIX  } = require('../src/constants')

const WORKSPACE = process.cwd() // 项目根目录

function getPageConfig(page) {
    const pageName = page.pageName || page.key;
    let template = `routes/views/${pageName}.html`;

    if (!fse.existsSync(`${WORKSPACE}/${template}`)) {
        template = 'routes/views/_body.html';
    }

    return {
        'name': `react_${pageName}`,
        'template': template,
        'filename': `views/${pageName}.html`,
        // TODO...兼容有的写了 ishow_pagename.html 这样的写法，统一后可简化
        'entry': fs.existsSync(pathFromWorkspace(`routes/client/${pageName}.js`))
            ? `routes/client/${pageName}.js`
            : `routes/client/${pageName.replace(new RegExp(`^${PRE_URL}`), '')}.js`,
    };
}

module.exports = function() {
    const pageConfig = [{
        'name': 'react_boot',
        'entry': 'src/common/boot.js'
    }];
    Pages.forEach(key => {
        const page = {};
        page.key = key;
        pageConfig.push(getPageConfig(page));
    });

    return pageConfig;
};

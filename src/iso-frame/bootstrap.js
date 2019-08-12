/**
 * @file bootstrap.js CSR模式启动文件
 */

import React from 'react';
import ReactDom from 'react-dom';
// import { Provider } from 'mobx-react';

/**
 * 浏览器端入口启动函数
 *
 * @param {App} App 应用组件
 */
export function bootstrap(App, options = {}) {
    ReactDom.hydrate(
        <App />,
        document.getElementById('main')
    )

    // 解决ios平台active无效的问题
    document.addEventListener('touchstart', () => {})
}

/**
 * @file index.js
 */

import React from 'react'
import { appProvider } from '../../iso-frame/appProvider'

import './index.scss';

const configs = {
    serverTemplateName: 'benz_alia',
    title: '奔驰SSR',
}

@appProvider({}, configs)
export default class App extends React.Component {
    render() {
        return (
            <div className="alias">
                这是一个 test alias 页面……
            </div>
        )
    }
}

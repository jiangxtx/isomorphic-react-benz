/**
 * @file appProvider.js
 */

import React from 'react'
import pt from 'prop-types'

export function appProvider(Stores, appConfig = {}) {
    return Component => {
        class App extends React.Component {
            static displayName = `AppProvider(${Component.displayName || Component.name}`

            static appConfig = {
                dealServerError: err => { },
                ...appConfig
            }

            render() {
                return (
                    <Component />
                )
            }
        }

        return App
    }
}

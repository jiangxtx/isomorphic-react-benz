/**
 * @file alia.js
 */

import { serverHandler } from '../../src/iso-frame/serverHandler'
import App from '../../src/biz/alia'

module.exports = serverHandler(App)

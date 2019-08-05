/**
 * @file serverBabel.config.js
 */

const path = require('path')
const process = require('process')
const aliasCommon = require('./alias')

const PROJ_ROOT = path.resolve(__dirname, '../..')
const CWD = process.cwd()

module.exports = {
    presets: [
        ['@babel/env', {
            modules: 'commonjs',
        }],
        '@babel/react'
    ],
    plugins: [
        // 'transform-decorators-legacy',
        '@babel/plugin-proposal-object-rest-spread',
        // Stage 0
        '@babel/plugin-proposal-function-bind',
        // Stage 1
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-logical-assignment-operators',
        ['@babel/plugin-proposal-optional-chaining', { 'loose': false }],
        ['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' }],
        ['@babel/plugin-proposal-nullish-coalescing-operator', { 'loose': false }],
        '@babel/plugin-proposal-do-expressions',
        // Stage 2
        ['@babel/plugin-proposal-decorators', { 'legacy': true }],
        // '@babel/plugin-proposal-function-sent',
        '@babel/plugin-proposal-export-namespace-from',
        // '@babel/plugin-proposal-numeric-separator',
        // '@babel/plugin-proposal-throw-expressions',
        // Stage 3
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-import-meta',
        ['@babel/plugin-proposal-class-properties', { 'loose': true }],
        // '@babel/plugin-proposal-json-strings'
        '@babel/plugin-transform-runtime',
        'styled-jsx/babel', // Full, scoped and component-friendly CSS support for JSX.
    ]
}

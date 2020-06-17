//@ts-check
const path = require('path');
const bundler = require('@egret/egret-webpack-bundler');
const config = bundler.generateConfig(path.resolve(__dirname, '../'), {
    libraryType: 'debug'
}, 'web', false)
module.exports = config;
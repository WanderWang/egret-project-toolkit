//@ts-check
const lib = require('../');
const webpack = require('webpack');
const path = require('path');
const projectRoot = path.join(__dirname, 'simple-project');
const bundler = new lib.EgretWebpackBundler(projectRoot, 'web');
bundler.startDevServer({ libraryType: "debug" })
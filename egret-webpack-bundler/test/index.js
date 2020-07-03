//@ts-check
const lib = require('../');
const webpack = require('webpack');
const path = require('path');
const { rmdir } = require('fs');
const projectRoot = path.join(__dirname, 'simple-project');
const bundler = new lib.EgretWebpackBundler(projectRoot, 'web');

let store = {};

bundler.emitter = (filename, data) => {
    console.log(filename)
    store[filename] = data;
}
bundler.build({ libraryType: "debug", typescript: { mode: "legacy" } }).then(() => {
    const mainJsContent = store['main.js'].toString();

    const code = `
    var window = this;
    ${mainJsContent}
    console.log('helloworld')
    console.log(window.Main)
    `


    const vm = require('vm');
    const script = new vm.Script(code);

    const context = {};
    script.runInNewContext(context);
    console.log(context)
})
//@ts-check
const lib = require('@egret/egret-webpack-bundler');
const fs = require('fs');
function compile(projectRoot) {

    const bundler = new lib.EgretWebpackBundler(projectRoot, 'lib');
    bundler.emitter = (filename, data) => {
        fs.writeFileSync('./dist/' + filename, data, 'utf-8')
        // console.log(data.toString())

    }

    const libraryName = 'xxx'

    return bundler.build({ libraryType: "debug", typescript: { mode: "legacy" } }).then(() => {
        const dtsContent = `
        type a = typeof import("./Main.d.ts")
declare var ${libraryName}: a
`;
        fs.writeFileSync("./dist/index.d.ts", dtsContent, 'utf-8');
    })
}

compile(__dirname)
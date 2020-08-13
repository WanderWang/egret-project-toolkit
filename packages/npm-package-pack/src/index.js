const core = require('@rushstack/node-core-library');
const path = require('path');
const fs = require('fs')
const compressing = require('compressing')
const walk = require('walk');

const target = path.resolve(__dirname, '__bundle');
const root = path.resolve(__dirname, '../../../');


async function run(packageName) {
    await publishPackage(packageName)
    await installDependency(packageName)
    await clear(packageName)
}

run('@egret/egret-webpack-bundler').then(() => {
    run('@egret/eui-compiler')
})

async function clear(packagePath) {
    const sourcePackagePath = path.join(target, packagePath);
    return new Promise((resolve, reject) => {
        const walker = walk.walk(sourcePackagePath);
        walker.on('file', (root, fileStats, next) => {

            const ignoreFiles = [
                'license',
                'authors',
                '.travis.yml',
                '.npmignore',
                '.editorconfig',
                '.eslintrc',
                'thirdPartyNoticeText.txt',
                'CopyrightNotice.txt',
                'package-lock.json',
                //--------typescript-----------
                'tsc.js',
                'tsserver.js',
                'tsserverlibrary.js',
                'typescriptServices.js',
                'typesMap.json',
                'typingsInstaller.js',
                'watchGuard.js',


            ].map((item) => item.toLowerCase());

            const filename = path.join(root, fileStats.name);
            const extname = path.extname(fileStats.name).toLowerCase();
            const ignoreExtname = ['.md', '.log', '.lock'];
            if (ignoreExtname.includes(extname) ||
                ignoreFiles.includes(fileStats.name.toLocaleLowerCase())
                // ignoreFiles.indexOf(fileStats.name.toLowerCase()) >= 0
            ) {
                core.FileSystem.deleteFile(filename);
            }
            next();
        });
        walker.on('end', () => {
            resolve();
        });
    });
}


async function installDependency(packagePath) {
    const sourcePackagePath = path.join(target, packagePath);
    const cp = core.Executable.spawnSync('npm', ['install', '--production',
        '--registry=https://registry.npmjs.org/'
        // '--registry=https://registry.npm.taobao.org/'
    ], { currentWorkingDirectory: sourcePackagePath });
    console.log(cp.stdout);
    console.log(cp.stderr)
    if (cp.error) {
        return Promise.reject(cp.stderr);
    }
    else {
        return Promise.resolve();
    }
}


async function publishPackage(packagePath) {
    const sourcePackagePath = path.join(root, packagePath.replace("@egret/", ''));
    if (!fs.existsSync(path.join(sourcePackagePath, ".npmignore"))) {
        throw new Error("no .npmignore---->" + sourcePackagePath);
    }
    const cp = core.Executable.spawnSync('npm', ['pack'], { currentWorkingDirectory: sourcePackagePath });
    if (!cp.error) {
        const filename = cp.stdout.trim();
        const zipFile = path.join(sourcePackagePath, filename);

        const unzippedPath = path.resolve(target, 'temp', packagePath);

        await compressing.tgz.uncompress(zipFile, unzippedPath);

        core.FileSystem.move({
            sourcePath: path.join(unzippedPath, 'package'),
            destinationPath: path.resolve(target, packagePath)
        });
        core.FileSystem.deleteFolder(path.resolve(target, 'temp'))
        core.FileSystem.deleteFile(zipFile);
    }
    else {
        throw cp.stderr;
    }
}
const core = require('@rushstack/node-core-library');
const path = require('path');
const fs = require('fs')
const compressing = require('compressing')

const target = path.resolve(__dirname, '__bundle');
const root = path.resolve(__dirname, '../../../');

publishPackage('egret-webpack-bundler')



async function installDependency(packagePath) {
    const sourcePackagePath = path.join(target, packagePath);
    const cp = core.Executable.spawnSync('npm', ['install', '--production', '--registry=https://registry.npm.taobao.org/'], { currentWorkingDirectory: sourcePackagePath });
    if (cp.error) {
        console.error(cp.stderr);
        return Promise.reject(cp.stderr);
    }
    else {


        return new Promise((resolve, reject) => {
            const walker = walk.walk(path.join(target, 'toolkit'));
            walker.on('file', (root, fileStats, next) => {
                const ignoreFiles = [
                    'license',
                    'authors',
                    '.travis.yml',
                    '.npmignore',
                    '.editorconfig',
                    '.eslintrc',
                    'thirdPartyNoticeText',
                    'CopyrightNotice',
                    //--------typescript-----------
                    'tsc.js',
                    'tsserver.js',
                    'tsserverlibrary.js',
                    'typescriptServices.js',
                    'typesMap.json',
                    'typingsInstaller.js',
                    'watchGuard.js'


                ].map((item) => item.toLowerCase());

                const addRule = [
                    {
                        folder: 'toolkit/compiler/node_modules/typescript/lib',
                        extend: 'd.ts'
                    }
                ];
                // console.log(root)
                const extname = path.extname(fileStats.name).toLowerCase();
                if (
                    ['.md', '.ts', '.log', '.lock'].indexOf(extname) >= 0 ||
                    ignoreFiles.indexOf(fileStats.name.toLowerCase()) >= 0
                ) {
                    const filename = path.join(root, fileStats.name);
                    let needadd = false;
                    for (const r of addRule) {

                        if (filename.replace(/\\/g, '/').indexOf(r.folder.toLowerCase()) !== -1 && fileStats.name.indexOf(r.extend) !== -1) {
                            needadd = true;
                        }
                    }
                    if (!needadd) {
                        core.FileSystem.deleteFile(filename);
                    } else {
                        //console.log('add:' + filename);
                    }

                }
                // console.log(fileStats.name);
                next();
            });
            walker.on('end', () => {
                resolve();
            });
        });
    }
}


async function publishPackage(packagePath) {
    const sourcePackagePath = path.join(root, packagePath);
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
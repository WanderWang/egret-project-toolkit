/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import * as path from 'path';
import { UglifyPlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin, CleanPlugin } from 'built-in';
import { WxgamePlugin } from './wxgame/wxgame';
import { CustomPlugin } from './myplugin';
import * as defaultConfig from './config';
import { WebpackBundlePlugin } from './plugins/webpack-plugin';
import { EuiCompilerPlugin } from './plugins/eui-compiler-plugin';

//是否使用微信分离插件
const useWxPlugin: boolean = false;
const config: ResourceManagerConfig = {

    buildConfig: (params) => {

        const { target, command, projectName, version } = params;
        const outputDir = `../${projectName}_wxgame`;
        if (command == 'build') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource", "egret-library"] }),
                    new CompilePlugin({ libraryType: "debug", defines: { DEBUG: true, RELEASE: false } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(useWxPlugin),
                    new ManifestPlugin({ output: 'manifest.js' })
                ]
            }
        }
        else if (command == 'publish') {
            return {
                outputDir,
                commands: [
                    new CustomPlugin(),
                    // new CompilePlugin({ libraryType: "release", defines: { DEBUG: false, RELEASE: true } }),
                    new WebpackBundlePlugin({
                        libraryType: "debug", defines: { DEBUG: false, RELEASE: true }, subpackages: [
                            { name: 'loading', matcher: (p) => p.indexOf("LoadingUI") >= 0 }
                        ]
                    }),
                    // new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new EuiCompilerPlugin('commonjs'),
                    new WxgamePlugin(false),
                    // new UglifyPlugin([{
                    //     sources: ["main.js"],
                    //     target: "main.min.js"
                    // }]),
                    // new RenamePlugin({
                    //     verbose: true, hash: 'crc32', matchers: [
                    //         { from: "**/*.js", to: "[path][name]_[hash].[ext]" }
                    //     ]
                    // }),
                    new ManifestPlugin({ output: "manifest.js" })
                ]
            }
        }
        else {
            throw `unknown command : ${params.command}`;
        }
    },

    mergeSelector: defaultConfig.mergeSelector,

    typeSelector: defaultConfig.typeSelector
}



export = config;

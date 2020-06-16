import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import webpack from 'webpack';
import { getLibsFileList } from './egretproject';
import { Target_Type } from './egretproject/data';
import SrcLoaderPlugin from './loaders/src-loader/Plugin';
import ThemePlugin from './loaders/theme';
import { openUrl } from './open';
import { emitClassName } from './ts-transformer';
const middleware = require("webpack-dev-middleware");
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');



export type WebpackBundleOptions = {

    libraryType: "debug" | "release"

    defines?: any,

    exml?: {
        watch: boolean
    }

    typescript?: {
        mode: "legacy" | "modern",

    }

    subpackage?: { name: string, matcher: (filepath: string) => boolean }[]
}


const options: WebpackBundleOptions = {

    libraryType: "debug",
    subpackage: [
        { name: "my-lib", matcher: (p) => p.indexOf("LoadingUI") >= 0 }
    ]
}


export class EgretWebpackBundler {


    emitter: ((filename: string, data: Buffer) => void) | null = null;

    constructor(private projectRoot: string, private target: string) {

    }


    startDevServer(options: WebpackBundleOptions) {
        const libraryType = 'debug';
        const scripts = getLibsFileList('web', this.projectRoot, libraryType)


        const webpackStatsOptions = { colors: true, modules: false };

        const webpackConfig = generateConfig(this.projectRoot, options, this.target, true)
        const compiler = webpack(webpackConfig);
        const compilerApp = express();
        compilerApp.use(allowCrossDomain);

        const middlewareOptions: any = {
            stats: webpackStatsOptions,
            publicPath: undefined,
        };

        compilerApp.use(middleware(compiler, middlewareOptions));
        startExpressServer(compilerApp, 3000);
        compilerApp.use(express.static(this.projectRoot));


        const manifestContent = JSON.stringify(
            { initial: scripts, game: ['main.js'] }, null, '\t'
        )
        fs.writeFileSync(path.join(this.projectRoot, 'manifest.json'), manifestContent, 'utf-8')
        openUrl('http://localhost:3000/index.html');


    }

    build(options: WebpackBundleOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            const webpackStatsOptions = { colors: true, modules: false };
            const scripts = getLibsFileList(this.target as Target_Type, this.projectRoot, options.libraryType);
            const webpackConfig = generateConfig(this.projectRoot, options, this.target, false);

            const handler: webpack.Compiler.Handler = (error, status) => {
                console.log(status.toString(webpackStatsOptions));
                resolve();
            };
            const compiler = webpack(webpackConfig);

            if (this.emitter) {

                for (let script of scripts) {
                    const content = fs.readFileSync(path.join(this.projectRoot, script));
                    this.emitter(script, content);
                }


                compiler.outputFileSystem = {

                    mkdir: (path: string, callback: (err: Error | undefined | null) => void) => {
                        callback(null);
                    },
                    mkdirp: (path: string, callback: (err: Error | undefined | null) => void) => {
                        callback(null);
                    },

                    rmdir: (path: string, callback: (err: Error | undefined | null) => void) => {
                        callback(null)
                    },

                    unlink: (path: string, callback: (err: Error | undefined | null) => void) => {
                        callback(null)
                    },
                    join: path.join,

                    writeFile: (p: string, data: any, callback: (err: Error | undefined | null) => void) => {
                        const relativePath = path.relative(webpackConfig.output?.path!, p).split("\\").join("/");
                        this.emitter!(relativePath, data)
                        callback(null)
                    }
                }
            }
            compiler.run(handler)
        })

    }

}

function generateConfig(
    context: string,
    options: WebpackBundleOptions,
    target: string,
    devServer: boolean

): webpack.Configuration {

    context = context.split("/").join(path.sep);
    const needSourceMap = devServer;
    const mode = 'development'

    const config: webpack.Configuration = {
        stats: "minimal",
        entry: './src/Main.ts',
        target: 'web',
        mode,
        context,
        devtool: needSourceMap ? "source-map" : false,
        output: {
            path: path.resolve(context, 'dist'),
            filename: 'main.js'
        },
        module: {
            rules: []
        },
        resolve: {
            extensions: [".ts", ".js"]
        },
        plugins: [],
        optimization: {
            // minimize: false,
            splitChunks: {
                // 分割文件
                cacheGroups: {
                    default: false,
                    resource: {
                        name: 'resource',
                        chunks: 'initial',
                        test(module) {
                            return module.resource.indexOf('LoadingUI') >= 0;
                            // return module.context.startsWith(path.join(context, 'src'));
                        },
                        minSize: 0,
                    },
                },
            },
        },
    };
    generateWebpackConfig_typescript(config, options, needSourceMap);
    generateWebpackConfig_exml(config, options);
    generateWebpackConfig_html(config, options, target);
    return config;
}

function generateWebpackConfig_typescript(config: webpack.Configuration, options: WebpackBundleOptions, needSourceMap: boolean) {

    const typescriptLoaderRule: webpack.RuleSetRule = {
        test: /\.tsx?$/,
        loader: require.resolve('ts-loader')
    }
    const rules = config.module!.rules!;
    const plugins = config.plugins!;

    const srcLoaderRule: webpack.RuleSetRule = {
        test: /\.tsx?$/,
        include: path.join(config.context!, 'src'),
        loader: require.resolve('./loaders/src-loader'),
    };

    const before = [emitClassName()];

    if (options.typescript?.mode === 'modern') {
        rules.push(typescriptLoaderRule)
        typescriptLoaderRule.options = {
            transpileOnly: true,
            compilerOptions: {
                sourceMap: needSourceMap
            },
            getCustomTransformers: function () {
                return ({
                    before
                });
            }
        }
        plugins.push(new ForkTsCheckerPlugin());
    }
    else {
        plugins.push(new SrcLoaderPlugin())
        rules.push(srcLoaderRule);
        rules.push(typescriptLoaderRule);
        typescriptLoaderRule.options = {
            transpileOnly: false,
            compilerOptions: {
                sourceMap: needSourceMap
            },
        }
    }
}

function generateWebpackConfig_exml(config: webpack.Configuration, options: WebpackBundleOptions) {

    if (options.exml) {
        // before.push(addDependency('../resource/default.thm.js'));
    }

    const exmlLoaderRule: webpack.RuleSetRule = {
        test: /\.exml/,
        use: [
            // {
            //     loader: 'thread-loader',
            //     options: {
            //         workers: 2,
            //     },
            // },
            require.resolve("./loaders/exml"),
        ],
    };

    if (options.exml?.watch) {
        // rules.push(srcLoaderRule);
        config.module!.rules.push(exmlLoaderRule);
        config.plugins!.push(new ThemePlugin({}))
    }
}

function generateWebpackConfig_html(config: webpack.Configuration, options: WebpackBundleOptions, target: string) {
    if (['web', 'ios', 'android'].indexOf(target) >= 0) {
        config.plugins?.push(
            new HtmlWebpackPlugin({
                inject: false,
                template: 'template/web/index.html'
            }))
    }
}



function allowCrossDomain(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
}

function startExpressServer(compilerApp: express.Express, port: number) {
    return new Promise((resolve, reject) => {
        compilerApp
            .listen(port, () => {
                resolve();
            })
            .on("error", () => {
                reject();
            });
    });
}



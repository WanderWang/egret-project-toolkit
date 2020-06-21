import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import webpack from 'webpack';
import { getLibsFileList } from './egretproject';
import { Target_Type } from './egretproject/data';
import SrcLoaderPlugin from './loaders/src-loader/Plugin';
import ThemePlugin from './loaders/theme';
import { emitClassName } from './loaders/ts-loader/ts-transformer';
import { openUrl } from './open';
const middleware = require("webpack-dev-middleware");
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');


export type WebpackBundleOptions = {

    /**
     * 设置发布的库为 library.js 还是 library.min.js
     */
    libraryType: "debug" | "release"

    /**
     * 编译宏常量定义
     */
    defines?: any,

    /**
     * 是否启动 EXML 相关功能
     */
    exml?: {
        /**
         * EXML增量编译
         */
        watch: boolean
    }

    /**
     * TypeScript 相关配置
     */
    typescript?: {
        /**
         * 编译模式
         * modern 模式为完全ES6 Module的方式，底层实现采用 ts-loader
         * legacy 模式为兼容现有代码的方式，底层在执行 ts-loader 之前先进行了其他内部处理
         */
        mode: "legacy" | "modern",

    }

    /**
     * 是否发布子包及子包规则
     */
    subpackages?: { name: string, matcher: (filepath: string) => boolean }[],

    /**
     * 自定义的 webpack 配置
     */
    webpackConfig?: webpack.Configuration | ((bundleWebpackConfig: webpack.Configuration) => webpack.Configuration)
}

export type WebpackDevServerOptions = {
    /**
     * 启动端口，默认值为3000
     */
    port?: number
}


export class EgretWebpackBundler {


    emitter: ((filename: string, data: Buffer) => void) | null = null;

    constructor(private projectRoot: string, private target: string) {

    }


    startDevServer(options: WebpackBundleOptions & WebpackDevServerOptions) {
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
        const port = options.port || 3000;
        startExpressServer(compilerApp, port);
        compilerApp.use(express.static(this.projectRoot));
        const manifestContent = JSON.stringify(
            { initial: scripts, game: ['main.js'] }, null, '\t'
        )
        fs.writeFileSync(path.join(this.projectRoot, 'manifest.json'), manifestContent, 'utf-8');
        openUrl(`http://localhost:${port}/index.html`);
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

export function generateConfig(
    context: string,
    options: WebpackBundleOptions,
    target: string,
    devServer: boolean

): webpack.Configuration {

    context = context.split("/").join(path.sep);
    const needSourceMap = devServer;
    const mode = 'none';

    let config: webpack.Configuration = {
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
        plugins: []
    };
    generateWebpackConfig_typescript(config, options, needSourceMap);
    generateWebpackConfig_exml(config, options);
    generateWebpackConfig_html(config, options, target);
    genrateWebpackConfig_subpackages(config, options);
    if (options.webpackConfig) {
        const customWebpackConfig = typeof options.webpackConfig === 'function' ? options.webpackConfig(config) : options.webpackConfig;
        config = webpackMerge(config, customWebpackConfig);
    }
    return config;
}

function genrateWebpackConfig_subpackages(config: webpack.Configuration, options: WebpackBundleOptions) {
    if (!options.subpackages) {
        return config;
    }
    const items = options.subpackages.map(subpackage => {
        return {
            name: subpackage.name,
            filename: subpackage.name + ".js",
            test: (module: any) => {
                return subpackage.matcher(module.resource)
            },
            chunks: "initial",
            minSize: 0,
        }
    })

    config.optimization = {
        splitChunks: {
            cacheGroups: {
                default: false
            }
        }
    }
    for (let item of items) {
        (config.optimization.splitChunks as any).cacheGroups[item.name] = item;
    }
    return config;
}

function generateWebpackConfig_typescript(config: webpack.Configuration, options: WebpackBundleOptions, needSourceMap: boolean) {


    const compilerOptions: import("typescript").CompilerOptions = {
        sourceMap: needSourceMap,
        importHelpers: true,
        noEmitHelpers: true
    };
    config.resolve!.alias = {
        'tslib': require.resolve("tslib")
    }
    const rules = config.module!.rules!;
    const plugins = config.plugins!;

    const srcLoaderRule: webpack.RuleSetRule = {
        test: /\.tsx?$/,
        include: path.join(config.context!, 'src'),
        loader: require.resolve('./loaders/src-loader'),
    };



    const before = [
        emitClassName(),
    ];

    const typescriptLoaderRule: webpack.RuleSetRule = {
        test: /\.tsx?$/,
        loader: require.resolve('ts-loader'),
        options: {
            transpileOnly: false,
            compilerOptions,
            getCustomTransformers: function () {
                return ({
                    before
                });
            }
        }
    }

    if (options.typescript?.mode === 'modern') {
        plugins.push(new ForkTsCheckerPlugin());
        (typescriptLoaderRule.options as any).transpileOnly = true;
        rules.push(typescriptLoaderRule);
    }
    else {
        plugins.push(new SrcLoaderPlugin())
        rules.push(srcLoaderRule);
        rules.push(typescriptLoaderRule);

    }

    const tslibFunctions = Object.keys(require('tslib'));

    const provide: any = {};
    for (let key of tslibFunctions) {
        provide[key] = ['tslib', key];
    }
    provide['__reflect'] = [path.join(__dirname, 'helper.js'), '__reflect']
    plugins.push(new webpack.ProvidePlugin(provide))


    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    plugins.push(new webpack.NoEmitOnErrorsPlugin())
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



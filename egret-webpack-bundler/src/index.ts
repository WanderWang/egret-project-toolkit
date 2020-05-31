import express from 'express';
import * as path from 'path';
import webpack from 'webpack';
const middleware = require("webpack-dev-middleware");
export class EgretWebpackBundler {


    emitter: ((filename: string, data: Buffer) => void) | null = null;

    constructor() {

    }


    startDevServer(context: string) {



        const webpackStatsOptions = { colors: true, modules: false };

        const webpackConfig = generateConfig(context, { dev: true, release: false })
        const compiler = webpack(webpackConfig);
        const compilerApp = express();
        compilerApp.use(allowCrossDomain);

        const middlewareOptions: any = {
            stats: webpackStatsOptions,
            publicPath: undefined,
        };

        compilerApp.use(middleware(compiler, middlewareOptions));
        startExpressServer(compilerApp, 3000);
        compilerApp.use(express.static(context));


    }

    build(context: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const webpackStatsOptions = { colors: true, modules: false };

            const webpackConfig = generateConfig(context, { dev: false, release: true })

            const handler: webpack.Compiler.Handler = (error, status) => {
                console.log(status.toString(webpackStatsOptions));
                resolve();
            };
            const compiler = webpack(webpackConfig);

            if (this.emitter) {

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

function generateConfig(context: string, env: any): webpack.Configuration {

    context = context.split("/").join(path.sep);
    var ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
    var CopyPlugin = require('copy-webpack-plugin');
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    // var reflectTransformer = require('./ts-transformers/index');
    var needSourceMap = env.dev;
    const mode = env.dev ? 'development' : "production";
    const plugins = [
        new ForkTsCheckerPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            template: 'scripts/plugins/templates/index.ejs',
            libScripts: [
                "libs/modules/egret/egret.js",
                "libs/modules/egret/egret.web.js",
                "libs/modules/eui/eui.js",
                "libs/modules/game/game.js",
                "libs/modules/tween/tween.js",
                "libs/modules/assetsmanager/assetsmanager.js",
                "libs/modules/promise/promise.js",
            ],
            bundleScripts: [
                "bundle.js"
            ]
        })
    ];

    if (mode == 'production') {
        plugins.push(
            new CopyPlugin([
                { from: 'libs', to: './libs' },
            ]),
        )
    }

    return {
        stats: "minimal",
        entry: './src/Main',
        target: 'web',
        mode,
        context: context,
        devtool: needSourceMap ? "source-map" : false,
        output: {
            path: path.resolve(context, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/, loader: require.resolve('ts-loader'), options: {
                        transpileOnly: true,
                        compilerOptions: {
                            sourceMap: needSourceMap
                        },
                        getCustomTransformers: function () {
                            return ({
                                before: [
                                    emitClassName()
                                ]
                            });
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".js", ".json"]
        },
        plugins
    };
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


function emitClassName() {
    var ts = require('typescript');
    return function (ctx: any) {
        function visitClassDeclaration(node: any) {
            // const isExport = node.modifiers ? node.modifiers.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) : false;
            var clzNameNode = node.name;
            var clzName = clzNameNode.getText();
            var binaryExpression = ts.createIdentifier("window[\"" + clzName + "\"] = " + clzName + ";");
            var arrays = [
                node,
                binaryExpression,
            ];
            return ts.createNodeArray(arrays);
        }
        var visitor = function (node: any) {
            if (node.kind === ts.SyntaxKind.ClassDeclaration) {
                return visitClassDeclaration(node);
            }
            else {
                return ts.visitEachChild(node, visitor, ctx);
            }
        };
        return function (sf: any) { return ts.visitNode(sf, visitor); };
    };
}
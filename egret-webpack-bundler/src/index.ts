import express from 'express';
import * as path from 'path';
import webpack from 'webpack';
const middleware = require("webpack-dev-middleware");
export class EgretWebpackBundler {


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

    build() {

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
                                    // reflectTransformer.emitClassName()
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
        plugins: [
            new CopyPlugin([
                { from: 'libs', to: './libs' },
            ]),
            new ForkTsCheckerPlugin(),
            new HtmlWebpackPlugin({
                inject: false,
                template: 'scripts/plugins/templates/index.ejs',
                scripts: [
                    "libs/modules/egret/egret.js",
                    "libs/modules/egret/egret.web.js",
                    "libs/modules/game/game.js",
                    "libs/modules/tween/tween.js",
                    "libs/modules/assetsmanager/assetsmanager.js",
                    "libs/modules/promise/promise.js",
                    "bundle.js"
                ]
            })
        ]
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
require('./npm').installDependencies(["@egret/egret-webpack-bundler"]);

import { EgretWebpackBundler } from '@egret/egret-webpack-bundler'

export class WebpackPlugin implements plugins.Command {

    constructor() {
    }

    async onFile(file: plugins.File) {
        return file;
    }

    onFinish(commandContext: plugins.CommandContext) {
        return new Promise<void>((resolve, reject) => {

            // setInterval(() => {
            //     console.log('helloworld');
            // }, 1000)


            const bundler = new EgretWebpackBundler();
            bundler.startDevServer(commandContext.projectRoot)
        })
    }
}
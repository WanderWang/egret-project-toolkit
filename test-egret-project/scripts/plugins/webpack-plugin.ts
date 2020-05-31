require('./npm').installDependencies(["@egret/egret-webpack-bundler"]);

import { EgretWebpackBundler } from '@egret/egret-webpack-bundler';

export class WebpackDevServerPlugin implements plugins.Command {

    constructor() {
    }

    async onFile(file: plugins.File) {
        return file;
    }

    onFinish(commandContext: plugins.CommandContext) {
        return new Promise<void>((resolve, reject) => {
            const bundler = new EgretWebpackBundler();
            bundler.startDevServer(commandContext.projectRoot)
        })
    }
}

export class WebpackBundlePlugin implements plugins.Command {
    constructor() {
    }

    async onFile(file: plugins.File) {
        return file;
    }

    onFinish(commandContext: plugins.CommandContext) {

        const bundler = new EgretWebpackBundler();
        return bundler.build(commandContext.projectRoot);
    }
}
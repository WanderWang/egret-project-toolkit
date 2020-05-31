require('./npm').installDependencies(["@egret/eui-compiler"]);

import * as eui from '@egret/eui-compiler';

export class EuiCompilerPlugin implements plugins.Command {

    constructor() {
    }

    async onFile(file: plugins.File) {
        return file;
    }

    async onFinish(commandContext: plugins.CommandContext) {
        const compiler = new eui.EuiCompiler(commandContext.projectRoot);
        compiler.setCustomTransformers([
            transformer
        ])
        const emitResult = compiler.emit();
        for (let emitInfo of emitResult) {
            commandContext.createFile(emitInfo.filename, new Buffer(emitInfo.content))
        }
    }
}


const transformer: eui.EuiAstTransformer = (ast) => {
    return {
        namespace: ast.namespace,
        classname: ast.classname,
        states: null,
        attributes: [],
        children: []
    }
}
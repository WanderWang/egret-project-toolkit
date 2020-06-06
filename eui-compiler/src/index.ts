import * as fs from 'fs';
import { JavaScriptEmitter } from './emitter';
import { getFilePathRelativeProjectRoot, getThemes, initilize } from './eui-config';
import { AST_Skin } from './exml-ast';
import { generateAST } from "./util/parser";
import { initTypings } from './util/typings';
import { ThemeData } from './theme';

export const parser = require('./util/parser') as typeof import("./util/parser")
export const emitter = {
    JavaScriptEmitter
}

export type EuiAstTransformer = (ast: AST_Skin) => AST_Skin

export class EuiCompiler {

    private _transformers: EuiAstTransformer[] = [];

    constructor(root: string) {
        initilize(root)
        initTypings();
    }

    setCustomTransformers(transformers: EuiAstTransformer[]) {
        this._transformers = transformers;
    }

    emit(): { filename: string, content: string }[] {
        const themes = getThemes();
        let output = '';
        for (const theme of themes) {
            output += this.compileTheme(theme.data) + "\n";
        }
        return [
            { filename: 'resource/default.thm.js', content: output }
        ]
    }

    getThemes() {
        return getThemes();
    }

    private compileTheme(themeData: ThemeData) {


        const exmlFiles = themeData.exmls;
        // const exmlFiles = theme.exmls.map(item => 'resource/' + item) as string[];
        const emitter = new JavaScriptEmitter();
        emitter.emitHeader(themeData);
        for (let filename of exmlFiles) {
            const fullpath = getFilePathRelativeProjectRoot(filename)
            const content = fs.readFileSync(fullpath, 'utf-8');
            let skinNode = generateAST(content);
            for (let transformer of this._transformers) {
                skinNode = transformer(skinNode);
            }
            emitter.emitSkinNode(filename, skinNode);
        }
        return emitter.getResult();
    }

    private compileExml(filename: string, content: string) {


    }
}










import * as fs from 'fs';
import { getFilePathRelativeProjectRoot, getThemes, initilize } from './eui-config';
import { AST_Skin } from './exml-ast';
import { JavaScriptEmitter } from './util/emitter2';
import { generateAST } from "./util/parser";
import { initTypings } from './util/typings';


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
            output += this.parseThemeJson(theme) + "\n";
        }
        return [
            { filename: 'resource/default.thm.js', content: output }
        ]
    }

    private parseThemeJson(themeData: any) {


        const exmlFiles = themeData.exmls;
        // const exmlFiles = theme.exmls.map(item => 'resource/' + item) as string[];
        const duplicate = exmlFiles.filter((item, index, array) => {
            return array.lastIndexOf(item) !== array.indexOf(item)
        })
        if (duplicate.length > 0) {
            console.log(`存在相同的皮肤文件`, duplicate)
            process.exit(1);
        }
        // window.generateEUI = {};
        // generateEUI.paths = {};
        // generateEUI.styles = undefined;
        // generateEUI.skins = { "eui.Button": "resource/eui_skins/ButtonSkin.exml", "eui.CheckBox": "resource/eui_skins/CheckBoxSkin.exml", "eui.HScrollBar": "resource/eui_skins/HScrollBarSkin.exml", "eui.HSlider": "resource/eui_skins/HSliderSkin.exml", "eui.Panel": "resource/eui_skins/PanelSkin.exml", "eui.TextInput": "resource/eui_skins/TextInputSkin.exml", "eui.ProgressBar": "resource/eui_skins/ProgressBarSkin.exml", "eui.RadioButton": "resource/eui_skins/RadioButtonSkin.exml", "eui.Scroller": "resource/eui_skins/ScrollerSkin.exml", "eui.ToggleSwitch": "resource/eui_skins/ToggleSwitchSkin.exml", "eui.VScrollBar": "resource/eui_skins/VScrollBarSkin.exml", "eui.VSlider": "resource/eui_skins/VSliderSkin.exml", "eui.ItemRenderer": "resource/eui_skins/ItemRendererSkin.exml" };

        let outputText = '';
        outputText += extendsHelper;
        outputText += euiHelper(themeData.skins);
        for (let filename of exmlFiles) {
            const fullpath = getFilePathRelativeProjectRoot(filename)
            const exmlFile: plugins.File = {
                contents: fs.readFileSync(fullpath),
                origin: filename,
                extname: ".exml",
                base: "",
                basename: "",
                dirname: "",
                path: "",
                relative: filename,
                history: [filename]
            }
            const text = this.compileExml(filename, exmlFile.contents.toString());
            outputText += text;
        }
        return outputText;
    }

    private compileExml(filename: string, content: string) {
        let skinNode = generateAST(content);
        const emitter = new JavaScriptEmitter();
        for (let transformer of this._transformers) {
            skinNode = transformer(skinNode);
        }
        let text = emitter.emit(skinNode);
        text += `generateEUI.paths['${filename}'] = ${skinNode.namespace}.${skinNode.classname};`;//TODO
        return text;
    }
}









const extendsHelper = `
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

`

function euiHelper(skins: any) {
    return `
    window.skins=window.skins||{};
    window.generateEUI = {};
    generateEUI.paths = {};
    generateEUI.styles = undefined;
    generateEUI.skins = ${JSON.stringify(skins)};
    `
}
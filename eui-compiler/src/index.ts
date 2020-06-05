import * as fs from 'fs';
import { JavaScriptEmitter } from './emitter';
import { getFilePathRelativeProjectRoot, getThemes, initilize } from './eui-config';
import { AST_Skin } from './exml-ast';
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
            output += this.compileTheme(theme) + "\n";
        }
        return [
            { filename: 'resource/default.thm.js', content: output }
        ]
    }

    private compileTheme(themeData: any) {


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










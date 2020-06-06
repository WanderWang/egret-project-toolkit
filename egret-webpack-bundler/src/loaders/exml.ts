
// const exmlLoader: webpack.loader.Loader = function (content) {
//     const result = parser.parse(content);
//     const className = result.className.replace(/^skins./, 'eui.');
//     const resource = this.resource.replace(this.rootContext || (this as any).options.context, '.');

import * as eui from "@egret/eui-compiler";
import * as webpack from 'webpack';
import * as path from 'path';
//     let code = `${STATIC}
//       module.exports = ${result.code};
//       if (window.generateEUI) {
//         generateEUI.skins['${className.replace(/Skin$/, '')}'] = "${resource}";
//         generateEUI.paths['${resource}'] = window['${className}']= module.exports;
//       }
//       if (window.EXML) {
//         EXML.update('${resource}', module.exports);
//       }`;

//     if (process.env.NODE_ENV === 'production') {
//         // 内部类变量名不稳定eg: AddEntergyPanelSkin$Skin1
//         // 用terser规避一下，保证hash相同
//         code = Terser.minify(code).code;
//     }
//     return code;
// };

const exmlLoader: webpack.loader.Loader = function (content) {

    const { parser, emitter } = eui;
    const skinNode = parser.generateAST(content.toString());
    const jsEmitter = new emitter.JavaScriptEmitter();
    const relativePath = path.relative(this.rootContext, this.resourcePath).split("\\").join("/");
    jsEmitter.emitSkinNode(relativePath, skinNode);
    const result = `module.exports = ${jsEmitter.getResult()};`
    // const result = `module.exports = 1`
    return result;
}

export default exmlLoader;

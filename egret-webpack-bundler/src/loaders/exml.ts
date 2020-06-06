
// const exmlLoader: webpack.loader.Loader = function (content) {
//     const result = parser.parse(content);
//     const className = result.className.replace(/^skins./, 'eui.');
//     const resource = this.resource.replace(this.rootContext || (this as any).options.context, '.');

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

export default function exmlLoader(content: string) {
    return "module.exports = 1111"
}

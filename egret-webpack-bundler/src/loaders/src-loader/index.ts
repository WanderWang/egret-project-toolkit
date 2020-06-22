import * as webpack from 'webpack';
import * as utils from '../utils';
import SrcLoaderPlugn, { NSLoaderContext } from './Plugin';
const { NS } = SrcLoaderPlugn;

const srcLoader: webpack.loader.Loader = function (input) {
  let content: string = input.toString();
  const compiler = this._compiler;
  const ns: NSLoaderContext = (this as any)[NS];

  const info = ns.factory.get(this.resourcePath);
  // 不在扫描目录下
  // TODO loader配置了include=/src/ 但发现文件改动时libs下的文件也会走过来
  if (!info) {
    return input;
  }
  const { defines, isModule } = info;
  const isEntry = utils.isEntry(compiler, this.resourcePath);

  let dependencies: string[] = [];
  // exml依赖
  // getSkinDependencies(defines, ns.skins).forEach(filePath => {
  // dependencies.push(filePath);
  // });
  if (isEntry) { // 入口文件
    // 导入未模块化的全部文件
    dependencies = dependencies.concat(ns.factory.sortUnmodules());
    // res thm等依赖文件
    // dependencies.splice(0, 0, ...ns.deps);
    // runtime
    // dependencies.unshift(require.resolve('../runtime/bootstrap'));
  }

  const dependenciesRequires: string[] = [];
  dependencies.forEach(fileName => {
    if (fileName !== this.resourcePath) {
      const relative = utils.relative(this.resourcePath, fileName);
      dependenciesRequires.push(`require('${relative}');`);
    }
  });

  const namespaceDeclarations: string[] = [];
  const defineAssignments: string[] = [];
  const classNameDefines: string[] = [];
  Object.keys(defines).forEach(name => {
    const info = defines[name];
    // egret强依赖__class__
    if (info.type === 'Class') {
      // classNameDefines.push(`${name}.prototype['__class__'] = '${name}';`);
    }
    // 模块化的不自动导出依赖
    if (!isModule && !name.includes('.')) {
      if (info.type === 'Namespace') {
        namespaceDeclarations.push(`var ${name} = window['${name}'];`);
      }
      // defineAssignments.push(`window['${name}'] = ${name};`);
    }
  });

  /*
  const hots = [];

  // hot update
  if (utils.isHot(compiler)) {
    const exportsClass = [];
    Object.keys(defines).forEach(name => {
      if (defines[name].type === 'Class') {
        exportsClass.push(name);
      }
    });
    // index.ts Main.ts 不支持热更新
    if (!isEntry && !exportsClass.find(name => name === 'Main')) {
      const runtime = utils.relative(this.resourcePath, require.resolve('../runtime/hot'));
      hots.push('if (module.hot && window.Reflect) {'); // must support es6
      hots.push('  module.hot.accept();');
      hots.push(`  var __hot = require('${runtime}');`);

      exportsClass.forEach(name => {
        hots.push(`  if (${name}.prototype instanceof egret.DisplayObject) {`);
        hots.push(`    ${name} = __hot(${name}, '${name}')`);
        hots.push('  }');
      });
      hots.push('}');
    }
  }
  */

  const headerPlaceholder = /(^|\n)\s*\/\/\s*HEADER_INJECTION_PLACEHOLDER[^\n]*/;
  const footerPlaceholder = /\n\s*\/\/\s*FOOTER_INJECTION_PLACEHOLDER[^\n]*/;
  if (!headerPlaceholder.test(content)) {
    content = `// HEADER_INJECTION_PLACEHOLDER\n${content}`;
  }
  if (!footerPlaceholder.test(content)) {
    content = `${content}\n// FOOTER_INJECTION_PLACEHOLDER`;
  }

  return content
    .replace(headerPlaceholder, [
      '',
      ...dependenciesRequires, // require语句
      ...namespaceDeclarations, // 命名空间声名
      '',
    ].join('\n'))
    .replace(footerPlaceholder, [
      '',
      ...classNameDefines, // __class__
      // ...hots,
      ...defineAssignments, // window['Class'] = xxx
      '',
    ].join('\n'));
};

export default srcLoader;
export {
  SrcLoaderPlugn,
};

import * as webpack from 'webpack';
import * as utils from '../utils';
import { SourceMapGenerator } from 'source-map';
import SrcLoaderPlugn, { NSLoaderContext } from './Plugin';
const { NS } = SrcLoaderPlugn;

const srcLoader: webpack.loader.Loader = function (input) {
  const callback = this.async() as webpack.loader.loaderCallback;
  const compiler = this._compiler;
  const ns: NSLoaderContext = (this as any)[NS];

  const info = ns.factory.get(this.resourcePath);
  // 不在扫描目录下
  // TODO loader配置了include=/src/ 但发现文件改动时libs下的文件也会走过来
  if (!info) {
    return callback(null, input);
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

  const { output, sourceMap } = injectLines(
    input.toString(),
    this,
    [
      ...dependenciesRequires, // require语句
      ...namespaceDeclarations, // 命名空间声名
    ],
    [
      ...classNameDefines, // __class__
      // ...hots,
      ...defineAssignments, // window['Class'] = xxx
    ]
  );

  callback(null, output, sourceMap as any);
};

function injectLines(content: string, context: webpack.loader.LoaderContext, headers: string[], footers: string[]) {
  const { resourcePath } = context;
  const lines = content.split(/\n/);
  let headerInjectionIndex = -1;
  let footerInjectionIndex = lines.length;

  lines.forEach((line, index) => {
    if (/^\s*\/\/\s*HEADER_INJECTION_PLACEHOLDER\b/.test(line)) {
      headerInjectionIndex = index;
    }
    if (/^\s*\/\/\s*FOOTER_INJECTION_PLACEHOLDER\b/.test(line)) {
      footerInjectionIndex = index;
    }
  });

  if (headerInjectionIndex > footerInjectionIndex) {
    throw new Error('HEADER_INJECTION_PLACEHOLDER should before FOOTER_INJECTION_PLACEHOLDER');
  }

  const newLines = [
    ...(headerInjectionIndex === -1 ? [] : lines.slice(0, headerInjectionIndex)),
    ...headers,
    ...lines.slice(headerInjectionIndex + 1, footerInjectionIndex),
    ...footers,
    ...lines.slice(footerInjectionIndex + 1),
  ];

  let sourceMap: SourceMapGenerator|null = null;
  if (context.sourceMap) { // 生成sourcemap
    sourceMap = new SourceMapGenerator({
      file: resourcePath,
    });

    for (let i = 0; i < lines.length; i++) {
      if (i !== headerInjectionIndex && i !== footerInjectionIndex) {
        let to ;
        if (i < headerInjectionIndex) {
          to = i;
        } else if (i < footerInjectionIndex) {
          to = i + headers.length + (headerInjectionIndex === -1 ? 0 : -1);
        } else {
          to = i + headers.length + (headerInjectionIndex === -1 ? 0 : -1) + footers.length - 1;
        }
        sourceMap.addMapping({
          generated: {
            line: to + 1, // line从1开始
            column: 0, // column从0开始
          },
          original: {
            line: i + 1,
            column: 0
          },
          source: resourcePath,
        });
      }
    }

    sourceMap.setSourceContent(resourcePath, content);
  }

  return {
    output: newLines.join('\n'),
    sourceMap: sourceMap ? sourceMap.toJSON() : undefined,
  };
}

export default srcLoader;
export {
  SrcLoaderPlugn,
};

import * as ts from 'typescript';

export interface Dependencies {
  [name: string]: string;
}

export interface Defines {
  [name: string]: {
    type: string;
  };
}

export interface ParseResult {
  isModule: boolean;
  defines: Defines;
  dependencies: Dependencies;
}

function hasModifier(node: ts.Node, kind: ts.SyntaxKind) {
  return (node.modifiers || []).some(item => {
    if (item.kind === kind) {
      return true;
    }
    return false;
  });
}

function getExpression(node: any): any {
  if (node.kind === ts.SyntaxKind.Identifier) {
    return node.text;
  }
  if (node.expression) {
    if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
      const pre = getExpression(node.expression);
      if (typeof pre === 'string' && node.name) {
        return `${pre}.${node.name.text}`;
      }
      return pre;

    }
    return node.expression; // 节点

  }
  return null;
}

function isBlockScope(node: any): boolean {
  return (ts as any).isBlockScope(node);
}

function forEachChild(node: any, callback: (node: any) => any) {
  const walk = (child: any) => {
    if (child.kind !== ts.SyntaxKind.TypeReference) { // 忽略类型检查
      const walkChildren = callback(child);
      if (!isBlockScope(child)) {
        if (Array.isArray(walkChildren)) {
          walkChildren.forEach(walk);
        } else if (walkChildren !== false) {
          ts.forEachChild(child, walk);
        }
      }
    }
  };

  ts.forEachChild(node, walk);
}

function collectNodeDeclarations(node: any, declarations: any) {
  let walkChildren = false;
  const addDeclarations = (name: string, type: string) => {
    declarations[name] = {
      type,
      ConstKeyword: hasModifier(node, ts.SyntaxKind.ConstKeyword),
      DeclareKeyword: hasModifier(node, ts.SyntaxKind.DeclareKeyword),
      ExportKeyword: hasModifier(node, ts.SyntaxKind.ExportKeyword),
    };
  };
  switch (node.kind) {
    case ts.SyntaxKind.VariableDeclaration:
      // ObjectBindingPattern ArrayBindingPattern
      if (Array.isArray(node.name.elements)) {
        node.name.elements.forEach((el: any) => {
          addDeclarations(el.name.text, 'Variable');
        });
      } else {
        addDeclarations(node.name.text, 'Variable');
      }
      break;
    case ts.SyntaxKind.VariableStatement:
      node.declarationList.declarations.forEach((declaration: any) => {
        addDeclarations(declaration.name.text, 'Variable');
      });
      break;
    case ts.SyntaxKind.EnumDeclaration:
      addDeclarations(node.name.text, 'Enum');
      break;
    case ts.SyntaxKind.Parameter:
      if (Array.isArray(node.name.elements)) {
        node.name.elements.forEach((el: any) => {
          addDeclarations(el.name.text, 'Parameter');
        });
      } else {
        addDeclarations(node.name.text, 'Parameter');
      }
      break;
    case ts.SyntaxKind.FunctionDeclaration:
      addDeclarations(node.name.text, 'Function');
      break;
    case ts.SyntaxKind.InterfaceDeclaration:
      addDeclarations(node.name.text, 'Interface');
      break;
    case ts.SyntaxKind.ClassDeclaration:
      addDeclarations(node.name.text, 'Class');
      break;
    case ts.SyntaxKind.ModuleDeclaration:
      addDeclarations(node.name.text, 'Namespace');
      break;
    default:
      walkChildren = true;
      break;
  }
  return walkChildren;
}

function collectNodeDepenDencies(node: any, dependencies: any) {
  let walkChildren: any = false;
  const addDependency = (name: string, type: string) => {
    if (!/^(undefined|null)$/i.test(name)) {
      dependencies[name] = {
        type,
      };
    }
  };
  // 只简单的分析一下最外层的依赖
  switch (node.kind) {
    case ts.SyntaxKind.Identifier:
      if (node.parent.name !== node) { // 不能是别人的名字
        addDependency(node.text, 'Identifier');
      }
      break;
    case ts.SyntaxKind.PropertyAccessExpression:
      {
        const identifier = getExpression(node);
        if (typeof identifier === 'string') {
          addDependency(identifier, 'PropertyAccess');
        } else if (identifier && identifier.kind) {
          walkChildren = [ identifier ];
        }
      }
      break;
    case ts.SyntaxKind.ClassDeclaration:
      walkChildren = (node.members || [])
        .filter((item: any) => hasModifier(item, ts.SyntaxKind.StaticKeyword));
      (node.heritageClauses || []).forEach((clause: any) => {
        (clause.types || []).forEach((cl : any) => {
          const { expression } = cl;
          const identifier = getExpression(expression);
          if (typeof identifier === 'string') {
            addDependency(identifier, 'Extend');
          } else if (identifier && identifier.kind) {
            walkChildren.push(identifier);
          }
        });
      });
      break;
    default:
      walkChildren = true;
      break;
  }
  return walkChildren;
}

function collectGlobals(scopes: any, dependencies: any) {
  const globals: any = {};
  Object.keys(dependencies).forEach(name => {
    const rootName = name.split('.')[0];
    const has = scopes.some((locals: any) => {
      return !!locals[rootName];
    });
    if (!has && !globals[name]) {
      globals[name] = dependencies[name];
    }
  });
  return globals;
}

function collectDependencies(node: any, namespace = '', scopes = []): Dependencies {
  const locals = {};
  const dependencies = {};

  forEachChild(node, child => collectNodeDeclarations(child, locals));
  forEachChild(node, child => collectNodeDepenDencies(child, dependencies));

  const thisScopes = [ locals, ...scopes ];

  const tmpGolbals = collectGlobals(thisScopes, dependencies);

  const globals: any = {};

  Object.keys(tmpGolbals).forEach(name => {
    globals[`${name}${namespace ? '@' + namespace.slice(0, -1) : ''}`] = tmpGolbals[name];
  });

  forEachChild(node, child => {
    let ns = namespace;
    if (isBlockScope(child)
      && !ts.isFunctionLike(child) // 函数里的依赖管不了，有很多循环依赖
    ) {
      if (ts.isModuleDeclaration(child)) {
        ns = `${ns}${child.name.text}.`;
      }
      Object.assign(globals, collectDependencies(child, ns, thisScopes as any));
    }
  });

  return globals;
}

function collectDefines(node: any, namespace = ''): Defines {
  const declarations: any = {};
  forEachChild(node, child => collectNodeDeclarations(child, declarations));

  const defines: any = {};
  Object.keys(declarations).forEach(key => {
    const item = declarations[key];
    if ((!namespace || item.ExportKeyword)
      && !item.DeclareKeyword
      && item.type !== 'Interface'
      && (item.type !== 'Enum' || !item.ConstKeyword)
    ) {
      defines[`${namespace}${key}`] = {
        type: item.type,
      };
    }
  });

  // 收集namespace
  forEachChild(node, child => {
    if (ts.isModuleDeclaration(child)) {
      Object.assign(defines, collectDefines(child, `${namespace}${child.name.text}.`));
    }
  });

  return defines;
}

function judgeIsModule(node: any): boolean {
  let ret = false;
  forEachChild(node, child => {
    if (hasModifier(child, ts.SyntaxKind.ExportKeyword)
      || child.kind === ts.SyntaxKind.ImportDeclaration
    ) {
      ret = true;
    }
  });
  return ret;
}

export default function fn(fileName: string, content: string): ParseResult {
  // AST 语法树
  const sourceFile = ts.createSourceFile(
    fileName,
    content,
    ts.ScriptTarget.ES2015,
    true
  );

  const isModule = judgeIsModule(sourceFile);
  const defines = collectDefines(sourceFile);
  const dependencies = collectDependencies(sourceFile);

  return {
    isModule,
    defines,
    dependencies,
  };
}

import * as ts from 'typescript';



function isTypeScriptDeclaration(node: ts.Node) {
    if (node.modifiers) {
        return node.modifiers.some(m => m.kind === ts.SyntaxKind.DeclareKeyword);
    }
    else {
        return false;
    }
}

function hasExport(node: ts.Node) {
    if (node.modifiers) {
        return node.modifiers.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
    }
    else {
        return false;
    }
}


function createGlobalExpression(text: string) {
    return ts.createIdentifier(`window["${text}"] = ${text};`);
}


export function emitClassName() {
    return function (ctx: ts.TransformationContext) {
        function visitClassDeclaration(node: ts.ClassDeclaration) {
            if (isTypeScriptDeclaration(node)) {
                return node;
            }
            const nameNode = node.name;
            if (nameNode) {
                const nameText = nameNode.getText();
                const globalExpression = createGlobalExpression(nameText);
                const reflectExpression = ts.createIdentifier(`__reflect(${nameText}.prototype,"${nameText}");`)
                const arrays = [
                    node,
                    reflectExpression,
                    globalExpression,
                ];
                return ts.createNodeArray(arrays);
            }
            else {
                return node;
            }
        }

        function visitVariableStatement(node: ts.VariableStatement) {
            if (isTypeScriptDeclaration(node) || hasExport(node)) {
                return node;
            }

            const globalExpressions = node.declarationList.declarations.map(d => {
                const nameNode = d.name;
                const nameText = nameNode.getText();
                const globalExpression = createGlobalExpression(nameText);
                return globalExpression;
            })

            return ts.createNodeArray(
                [node as ts.Node].concat(globalExpressions)
            )
        }

        function visitFunctionOrEnumDeclaration(node: ts.NamedDeclaration) {
            if (isTypeScriptDeclaration(node)) {
                return node;
            }
            const nameNode = node.name;
            if (nameNode) {
                const nameText = nameNode!.getText();
                const globalExpression = createGlobalExpression(nameText);
                const arrays = [
                    node,
                    globalExpression,
                ];
                return ts.createNodeArray(arrays);
            }
            else {
                return node;
            }
        }

        // 最外层变量需要挂载到全局对象上
        let nestLevel = 0;

        function visitor(node: ts.Node): any {

            let result: ts.Node | ts.NodeArray<ts.Node>;

            if (node.kind === ts.SyntaxKind.ClassDeclaration) {
                result = visitClassDeclaration(node as ts.ClassDeclaration);
            }
            else if (node.kind === ts.SyntaxKind.EnumDeclaration) {
                result = visitFunctionOrEnumDeclaration(node as ts.EnumDeclaration);
            }
            else if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
                nestLevel++;
                result = ts.visitEachChild(node, visitor, ctx);
                nestLevel--;
                result = visitFunctionOrEnumDeclaration(result as ts.ModuleDeclaration)
            }
            else if ((node.kind === ts.SyntaxKind.FunctionDeclaration) && nestLevel === 1) {

                result = visitFunctionOrEnumDeclaration(node as ts.FunctionDeclaration)
            }
            else if (node.kind === ts.SyntaxKind.VariableStatement && nestLevel === 1) {
                result = visitVariableStatement(node as ts.VariableStatement)
            }
            else {
                nestLevel++;
                result = ts.visitEachChild(node, visitor, ctx);
                nestLevel--;
            }

            return result;
        };
        return function (sf: ts.SourceFile) { return ts.visitNode(sf, visitor); };
    };
}

function addDependency(moduleName: string) {
    return function (ctx: ts.TransformationContext) {

        function visitClassDeclaration(node: ts.ClassDeclaration) {
            // const isExport = node.modifiers ? node.modifiers.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) : false;
            var binaryExpression = ts.createIdentifier(`require("${moduleName}")`);
            var arrays = [
                binaryExpression,
                node,

            ];
            return ts.createNodeArray(arrays);
        }
        function visitor(node: ts.Node): any {
            if (node.kind === ts.SyntaxKind.ClassDeclaration) {
                const clz = node as ts.ClassDeclaration;
                if (clz.name && clz.name.getText() === "Main") {
                    return visitClassDeclaration(node as ts.ClassDeclaration);
                }
                else {
                    return ts.visitEachChild(node, visitor, ctx);
                }

            }
            else {
                return ts.visitEachChild(node, visitor, ctx);
            }
        };

        function visitor2(node: ts.Node): any {
            return ts.visitEachChild(node, visitor, ctx);
        };

        return function (sf: ts.SourceFile) {
            if (sf.fileName.indexOf("Main.ts") >= 0) {
                return ts.visitNode(sf, visitor);
            }
            else {
                return ts.visitNode(sf, visitor2);
            }



        };
    };

}
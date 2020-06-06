import * as ts from 'typescript';

export function emitClassName() {
    return function (ctx: ts.TransformationContext) {
        function visitClassDeclaration(node: ts.ClassDeclaration) {
            // const isExport = node.modifiers ? node.modifiers.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) : false;
            var clzNameNode = node.name;
            var clzName = clzNameNode!.getText();
            var binaryExpression = ts.createIdentifier("window[\"" + clzName + "\"] = " + clzName + ";");
            var arrays = [
                node,
                binaryExpression,
            ];
            return ts.createNodeArray(arrays);
        }
        function visitor(node: ts.Node): any {
            if (node.kind === ts.SyntaxKind.ClassDeclaration) {
                return visitClassDeclaration(node as ts.ClassDeclaration);
            }
            else {
                return ts.visitEachChild(node, visitor, ctx);
            }
        };
        return function (sf: ts.SourceFile) { return ts.visitNode(sf, visitor); };
    };
}

export function addDependency(moduleName: string) {
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
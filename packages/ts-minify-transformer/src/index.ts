import * as ts from "typescript";


type Options = {
    mode: "debug" | "release"
}

export const myTransformer = (program: ts.Program, options: Options) => {

    return function (context: ts.TransformationContext) {

        function visitClassDeclaration(classNode: ts.ClassDeclaration) {

            const renameMappings: {
                originalNameNode: ts.PropertyName
                newName: string
            }[] = [];

            let renameCount = 1;
            for (let child of classNode.members) {
                if (ts.isPropertyDeclaration(child) || ts.isMethodDeclaration(child)) {

                    if (child.modifiers && child.modifiers[0].kind === ts.SyntaxKind.PrivateKeyword) {
                        let name = ''

                        switch (options.mode) {
                            case 'release':
                                name = 'a' + renameCount
                                break
                            case 'debug':
                                name = '$$' + child.name.getText() + '$$'

                        }
                        renameMappings.push({
                            originalNameNode: child.name,
                            newName: name
                        })
                        child.name = ts.createIdentifier(name)
                        renameCount++
                    }
                }

            }

            function visitClassDeclarationChildren(node: ts.Node): any {
                if (ts.isPropertyAccessExpression(node)) {
                    for (const word of renameMappings) {
                        if (word.originalNameNode.getText() === node.name.getText()) {
                            const typeChecker = program.getTypeChecker();
                            const origin = typeChecker.getSymbolAtLocation(word.originalNameNode);
                            const target = typeChecker.getSymbolAtLocation(node.name)
                            if (origin === target) {
                                return ts.updatePropertyAccess(node, node.expression, ts.createIdentifier(word.newName))
                            }
                        }
                    }
                }

                return ts.visitEachChild(node, visitClassDeclarationChildren, context);
            }


            return ts.visitEachChild(classNode, visitClassDeclarationChildren, context);
        }


        function visitor(node: ts.Node): any {
            if (ts.isClassDeclaration(node)) {
                validateField(node)
                return visitClassDeclaration(node);
            }
            return ts.visitEachChild(node, visitor, context);
        };

        function validateField(node: ts.ClassDeclaration): any {
            for (let child of node.members) {
                if (ts.isPropertyDeclaration(child) || ts.isMethodDeclaration(child)) {
                    const replaceWord = (child.name as ts.Identifier).escapedText.toString().replace(/^a\d*$/, '')
                    if (replaceWord !== (child.name as ts.Identifier).escapedText.toString()) {
                        const message = `class ${node.name?.getText()} 中存在名为a{number}的变量名，请重命名该变量`
                        throw new Error(message);
                    }
                }
            }
        }

        return (sf: ts.SourceFile) => {
            return ts.visitNode(sf, visitor);
        };
    }


}
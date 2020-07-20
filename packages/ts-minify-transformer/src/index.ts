import * as ts from "typescript";

export const myTransformer = (program: ts.Program, mode: string) => {
    //export const myTransformer = (context: ts.TransformationContext) => {

    return function (context: ts.TransformationContext) {

        function visitClassDeclaration(classNode: ts.ClassDeclaration) {

            let words: {
                oldName: any,
                oldIdentifier: any,
                newName: any
            }[] = [];

            let f = 1
            for (let child of classNode.members) {
                if (ts.isPropertyDeclaration(child) || ts.isMethodDeclaration(child)) {

                    if (child.modifiers && child.modifiers[0].kind === ts.SyntaxKind.PrivateKeyword) {
                        let name = ''

                        switch (mode) {
                            case 'publish':
                                name = 'a' + f
                                break
                            case 'develop':
                                name = '$$' + (child.name as ts.Identifier).escapedText + '$$'

                        }
                        //console.log(name)
                        words.push({
                            oldName: (child.name as ts.Identifier).escapedText,
                            oldIdentifier: child,
                            newName: name
                        })
                        //console.log(child)
                        child.name = ts.createIdentifier(name)

                        f++
                    }
                }

            }

            function visitClassDeclarationChildren(node: ts.Node): any {
                if (ts.isPropertyAccessExpression(node)) {
                    //console.log(node)
                    for (let word of words) {
                        //const origin = program.getTypeChecker().getSymbolAtLocation(word.oldIdentifier)
                        let origin = null
                        //console.log(111)
                        if (word.oldName === node.name.escapedText) {

                            if (word.oldIdentifier.symbol) {
                                origin = word.oldIdentifier.symbol

                            }

                            //console.log(node.name.getText())

                            const target = program.getTypeChecker().getSymbolAtLocation(node.name)


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

            checker(node)

            if (ts.isClassDeclaration(node)) {
                return visitClassDeclaration(node);
            }

            return ts.visitEachChild(node, visitor, context);
        };

        function checker(node: ts.Node): any {
            if (ts.isClassDeclaration(node)) {
                for (let child of node.members) {
                    if (ts.isPropertyDeclaration(child) || ts.isMethodDeclaration(child)) {
                        const replaceWord = (child.name as ts.Identifier).escapedText.toString().replace(/^a\d*$/, '')
                        if (replaceWord !== (child.name as ts.Identifier).escapedText.toString()) {
                            //console.log(replaceWord, (child.name as ts.Identifier).escapedText.toString())
                            throw ('不可存在变量名为a+数字的组合')
                        }
                    }
                }
            }
            return ts.visitEachChild(node, checker, context)
        }

        return (sf: ts.SourceFile) => {
            return ts.visitNode(sf, visitor);
        };
    }


}
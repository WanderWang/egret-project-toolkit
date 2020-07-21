import * as ts from "typescript";


export type TransformOptions = {
    mode: "debug" | "release"
}


export const minifyTransformer = (program: ts.Program, options: TransformOptions) => {

    return function (context: ts.TransformationContext) {

        return (sf: ts.SourceFile) => {

            function visitClassDeclaration(classNode: ts.ClassDeclaration) {



                function generateDeclarationMappings(classNode: ts.ClassDeclaration) {
                    const declarationMappings: {
                        declarationNode: ts.PropertyDeclaration | ts.MethodDeclaration
                        newName: string
                    }[] = [];
                    let renameCount = 1;
                    for (let child of classNode.members) {
                        if (ts.isPropertyDeclaration(child) || ts.isMethodDeclaration(child)) {

                            if (child.modifiers && child.modifiers[0].kind === ts.SyntaxKind.PrivateKeyword) {
                                let name = ''

                                switch (options.mode) {
                                    case 'release':
                                        name = 'a' + renameCount;
                                        break
                                    case 'debug':
                                        name = '$$' + child.name.getText(sf) + '$$';
                                        break;
                                    default:
                                        name = '$$' + child.name.getText(sf) + '$$';
                                        break;
                                }
                                declarationMappings.push({
                                    declarationNode: child,
                                    newName: name
                                })
                                renameCount++
                            }
                        }
                    }
                    return declarationMappings;
                }

                function generatePropertyAccessMappings(classNode: ts.ClassDeclaration) {

                    const propertyAccessMappings: {
                        propertyAccessNode: ts.PropertyAccessExpression,
                        newName: string
                    }[] = [];
                    ts.visitEachChild(classNode, visitClassDeclarationChildren, context);

                    function visitClassDeclarationChildren(node: ts.Node): any {
                        if (ts.isPropertyAccessExpression(node)) {
                            for (const declaration of mappings1) {
                                if (declaration.declarationNode.name.getText(sf) === node.name.getText(sf)) {
                                    const typeChecker = program.getTypeChecker();
                                    const origin = typeChecker.getSymbolAtLocation(declaration.declarationNode.name);
                                    const target = typeChecker.getSymbolAtLocation(node.name)
                                    if (origin === target) {
                                        propertyAccessMappings.push({ propertyAccessNode: node, newName: declaration.newName })
                                    }
                                }
                            }
                        }
                        return ts.visitEachChild(node, visitClassDeclarationChildren, context);
                    }

                    return propertyAccessMappings;
                }

                const mappings1 = generateDeclarationMappings(classNode);
                const mappings2 = generatePropertyAccessMappings(classNode);
                for (let mapping of mappings1) {
                    mapping.declarationNode.name = ts.createIdentifier(mapping.newName)
                }
                for (let mapping of mappings2) {
                    mapping.propertyAccessNode.name = ts.createIdentifier(mapping.newName)
                }
                return classNode;
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
                            const message = `class ${node.name?.getText(sf)} 中存在名为a{number}的变量名，请重命名该变量`
                            throw new Error(message);
                        }
                    }
                }
            }

            return ts.visitNode(sf, visitor);
        };
    }


}

/**
 * @deprecated
 */
export const myTransformer = minifyTransformer;
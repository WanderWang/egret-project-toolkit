import { BaseEmitter } from ".";
import { Project, NamespaceDeclarationKind } from 'ts-morph';

export class DeclarationEmitter extends BaseEmitter {

    private declaration: string = '';
    private project: Project = null!;

    getResult(): string {
        return this.declaration;
    }
    emitHeader(themeData: any): void {

    }
    emitSkinNode(filename: string, skinNode: import("../exml-ast").AST_Skin): void {
        if (!this.project) {
            this.project = new Project();
        }
        const project = this.project;
        const sourceFile = project.createSourceFile('output.ts');
        if (skinNode.namespace) {
            let a = sourceFile.getNamespace(skinNode.namespace);
            if (!a) {
                a = sourceFile.addNamespace({
                    hasDeclareKeyword: true,
                    declarationKind: NamespaceDeclarationKind.Module,
                    name: skinNode.namespace
                });
            }
            a.addClass({ name: skinNode.classname, extends: 'eui.Skin' });
        }
        else {
            sourceFile.addClass({ name: skinNode.classname, extends: 'eui.Skin' });
        }
        this.declaration = sourceFile.getText();
        project.removeSourceFile(sourceFile);
    }
}

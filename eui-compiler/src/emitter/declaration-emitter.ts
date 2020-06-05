import { BaseEmitter } from ".";

export class DeclarationEmitter extends BaseEmitter {



    getResult(): string {
        throw new Error("Method not implemented.");
    }
    emitHeader(themeData: any): void {

    }
    emitSkinNode(filename: string, skinNode: import("../exml-ast").AST_Skin): void {
    }
}

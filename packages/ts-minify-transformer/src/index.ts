import * as ts from "typescript";

export const myTransformer = (context: ts.TransformationContext) => {
    function visitor(node: ts.Node): any {
        return ts.visitEachChild(node, visitor, context);
    };

    return (sf: ts.SourceFile) => {
        return ts.visitNode(sf, visitor);
    };
}

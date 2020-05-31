// import * as ast from 'ts-simple-ast';
// import { AST_Attribute, AST_Node, AST_Skin } from '../exml-ast';

// export function emit(sourceFile: ast.SourceFile, skinNode: AST_Skin) {
//     const namespace = sourceFile.addNamespace({ name: 'skins' });
//     emitSkinNode(namespace, skinNode);
//     // console.log(sourceFile.print())
// }

// function emitAttributes(attributes: AST_Attribute[], context: string, block: ast.Block) {
//     for (let attribute of attributes) {
//         emitAttribute(attribute, context, block);
//     }
// }


// function emitSkinNode(namespace: ast.NamespaceDeclaration | ast.Block, skinNode: AST_Skin, isExported = true) {

//     const clz = namespace.addClass({ name: skinNode.classname, extends: "eui.Skin", isExported });
//     let block = clz.addConstructor().getBody() as ast.Block;
//     block.addStatements("super();");
//     // block.addStatements(`this.skinParts = ${JSON.stringify(skinNode.ids)}`);
//     emitAttributes(skinNode.attributes, 'this', block);

//     for (let node of skinNode.children) {
//         emitNode(node, block);
//     }

//     if (skinNode.states) {
//         block.addStatements(`this.states = [`)
//         for (let stateName in skinNode.states) {
//             const states = skinNode.states[stateName];
//             block.addStatements(`new eui.State("${stateName}",[`);
//             for (let property of states) {
//                 // block.addStatements(`"ddd"`);
//             }
//             block.addStatements("])")
//         }
//         block.addStatements("]")
//     }

//     block.addStatements((writer) => writer.writeLine(`this.elementsContent = [${skinNode.children.map(e => e.varIndex).join(",")}]`));
// }

// function emitNode(node: AST_Node, block: ast.Block) {
//     block.addStatements(`let ${node.varIndex} = new ${node.type}(); `);
//     if (node.id) {
//         block.addStatements(`this.${node.id} = ${node.varIndex} `);
//     }
//     emitAttributes(node.attributes, node.varIndex, block);
//     for (let child of node.children) {
//         emitNode(child, block);
//     }
//     if (node.type === 'eui.Scroller') {
//         block.addStatements(`${node.varIndex}.viewport = ${node.children[0].varIndex};`);
//     }
//     else {
//         if (node.children.length > 0) {
//             block.addStatements(`${node.varIndex}.elementsContent = [${node.children.map(e => e.varIndex).join(",")}];`);
//         };
//     }

// }



// const simpleEmitter = (attribute: AST_Attribute, context: string, block: ast.Block) => {
//     block.addStatements(`${context}.${attribute.key} = ${attribute.value as string}`);
// };

// const stringEmitter = (attribute: AST_Attribute, context: string, block: ast.Block) => {
//     block.addStatements(`${context}.${attribute.key} = "${attribute.value as string}"`);
// };

// const objEmitter = (attribute: AST_Attribute, context: string, block: ast.Block) => {
//     const value = attribute.value as AST_Node;
//     emitNode(value, block);
//     block.addStatements(`${context}.${attribute.key} = ${value.varIndex}`);
// }

// const rectangleEmitter = (attribute: AST_Attribute, context: string, block: ast.Block) => {
//     const value = attribute.value as string;
//     block.addStatements(`${context}.${attribute.key} = new egret.Rectangle(${value});`);
// }

// const anyEmitter = (attribute: AST_Attribute, context: string, block: ast.Block) => {
//     const value = attribute.value as string;
//     let isNumber = !isNaN(parseFloat(value));
//     if (isNumber) {
//         block.addStatements(`${context}.${attribute.key} = ${attribute.value as string}`);
//     }
//     else {
//         block.addStatements(`${context}.${attribute.key} = "${attribute.value as string}"`);
//     }
// }

// const skinEmitter = (attribute: AST_Attribute, context: string, block: ast.Block) => {
//     const skinValue = attribute.value as AST_Skin;
//     emitSkinNode(block, skinValue, false);
//     block.addStatements(`${context}.${attribute.key} = ${skinValue.classname as string}`);
// }

// const mapping: { [index: string]: (attribute: AST_Attribute, context: string, block: ast.Block) => void } = {
//     number: simpleEmitter,
//     string: stringEmitter,
//     boolean: simpleEmitter,
//     any: anyEmitter,
//     layout: objEmitter,
//     Object: stringEmitter,
//     "egret.Rectangle": rectangleEmitter,
//     itemRendererSkinName: skinEmitter,
//     skinName: skinEmitter //todo:skinName->eui.Skin
// }

// function emitAttribute(attribute: AST_Attribute, context: string, block: ast.Block) {
//     const emitterFunction = mapping[attribute.type];
//     if (!emitterFunction) {
//         console.error("找不到", attribute.type, attribute.value);
//         process.exit(1);
//     }
//     else {
//         emitterFunction(attribute, context, block);
//     }
// }
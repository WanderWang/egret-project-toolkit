import * as codegen from 'escodegen';
import { AST_Attribute, AST_Node, AST_NodeBase, AST_Skin, AST_STATE } from "../exml-ast";

export class JavaScriptEmitter {

    private mapping: { [index: string]: EmitterFunction } = {
        number: createNumberOrBooleanLiteral,
        boolean: createNumberOrBooleanLiteral,
        string: createStringLiteral,
        any: createStringLiteral,
        'egret.Rectangle': createNewRectangle,
        'object': this.createNewObject.bind(this)
    }

    private javascript = '';

    private body: JS_AST.Node[] = [];

    emit(skinNode: AST_Skin) {

        const ids: string[] = [];

        const states: { name: string, items: (AST_STATE & { context: number })[] }[] = [];

        if (skinNode.states) {
            for (const stateName of skinNode.states) {
                states.push({ name: stateName, items: [] })
            }
        }

        function visitChildren(node: AST_Node) {
            if (node.id) {
                ids.push(node.id);
            }

            for (let stateAttribute of node.stateAttributes) {
                let arr = states.find(s => s.name === stateAttribute.name)!;
                arr.items.push(Object.assign({}, stateAttribute, { context: node.varIndex }))
            }

            node.children.forEach(visitChildren);

        }

        visitChildren(skinNode as any as AST_Node)

        const className = createIdentifier(skinNode.classname);
        const namespace = createIdentifier(skinNode.namespace);
        this.writeToBody(emitSkinPart(ids));
        const context = createIdentifier('_this');
        this.emitAttributes(context, skinNode)
        this.emitChildren(context, skinNode);
        if (skinNode.states.length > 0) {
            this.writeToBody(
                createExpressionStatment(
                    createAssignmentExpression(
                        createMemberExpression(context, createIdentifier('states')),
                        createArray(
                            states.map(s => {
                                return createNewExpression(
                                    createMemberExpression(
                                        createIdentifier('eui'),
                                        createIdentifier("State")
                                    ),
                                    [
                                        createStringLiteral(s.name),
                                        createArray(s.items.map((item) => {
                                            return createNewExpression(
                                                createMemberExpression(
                                                    createIdentifier("eui"),
                                                    createIdentifier("SetProperty")
                                                ),
                                                [
                                                    createStringLiteral(`a${item.context}`),
                                                    createStringLiteral(item.attribute.key),
                                                    this.mapping[item.attribute.type](item.attribute.value)
                                                ]
                                            )
                                        }))
                                    ]
                                )
                            })
                        )
                    )


                )
            )
            // block.addStatements(`this.states = [`)
            // for (let stateName in skinNode.states) {
            //     const states = skinNode.states[stateName];
            //     block.addStatements(`new eui.State("${stateName}",[`);
            //     for (let property of states) {
            //         // block.addStatements(`"ddd"`);
            //     }
            //     block.addStatements("])")
            // }
            // block.addStatements("]")
        }
        const code = createExpressionStatment(
            createAssignmentExpression(
                createMemberExpression(namespace, className),
                createClass(className, this.body)
            )
        );
        this.javascript += codegen.generate(
            createProgram([code])
        )
        return this.javascript;
    }

    private emitNode(node: AST_Node) {
        const context = createVarIndexIdentifier(node)
        this.writeToBody(
            emitCreateNode(
                context,
                emitComponentName(node.type)
            )
        );
        if (node.id) {
            this.writeToBody(
                createExpressionStatment(
                    createAssignmentExpression(
                        createMemberExpression(createIdentifier("_this"), createIdentifier(node.id)),
                        context
                    )
                )
            )
        }
        if (node.stateAttributes.length > 0) {
            this.writeToBody(
                createExpressionStatment(
                    createAssignmentExpression(
                        createMemberExpression(createIdentifier("_this"), context),
                        context
                    )
                )
            )
        }
        this.emitAttributes(context, node)
        this.emitChildren(context, node);
    }

    private emitChildren(context: JS_AST.Identifier, node: AST_NodeBase) {
        if (node.children.length == 0) {
            return;
        }
        for (let child of node.children) {
            this.emitNode(child)
        }
        this.writeToBody(emitElementsContent(context.name, node.children.map(createVarIndexIdentifier)))
    }

    private emitAttributes(context: JS_AST.Identifier, node: AST_NodeBase) {
        for (const attribute of node.attributes) {
            this.writeToBody(this.emitAttribute(context, attribute))
        };
    }

    private createNewObject(value: AST_Node): JS_AST.Node {

        const varIndexIdentifer = createIdentifier(`a${value.varIndex}`)
        this.emitNode(value);
        return varIndexIdentifer
    }


    private writeToBody(node: JS_AST.Node) {
        this.body.push(node);
    }

    private emitAttribute(context: JS_AST.Identifier, attribute: AST_Attribute): JS_AST.Node {

        const emitterFunction = this.mapping[attribute.type];
        if (!emitterFunction) {
            console.error("找不到", attribute.key, attribute.type, attribute.value);
            process.exit(1);
            return null as any as JS_AST.Node;
        }
        else {
            return createExpressionStatment(
                createAssignmentExpression(
                    createMemberExpression(
                        context,
                        createIdentifier(attribute.key)
                    ),
                    emitterFunction(attribute.value)
                )
            )
        }
    }
}

function createVarIndexIdentifier(node: AST_Node) {
    return createIdentifier(`a${node.varIndex}`)
}

function emitComponentName(type: string) {
    const arr = type.split('.');
    return createMemberExpression(
        createIdentifier(arr[0]),
        createIdentifier(arr[1])
    )
}

function emitElementsContent(context: string, ids: JS_AST.Identifier[]) {
    return createExpressionStatment(
        createAssignmentExpression(
            createMemberExpression(createIdentifier(context),
                createIdentifier("elementsContent")),
            createArray(
                ids
            )
        )
    )
}


function emitCreateNode(varIndex: JS_AST.Identifier, componentName: JS_AST.Node) {
    return {
        type: "VariableDeclaration",
        declarations: [
            {
                type: "VariableDeclarator",
                id: varIndex,
                init: createNewExpression(
                    componentName, []
                )
            }
        ],
        kind: "var"
    }
}


function emitSkinPart(skins: string[]): JS_AST.Node {
    return createExpressionStatment(
        createAssignmentExpression(
            createMemberExpression(
                createIdentifier("_this"),
                createIdentifier("skinParts"),
            ),
            createArray(skins.map(createStringLiteral))
        )
    )
}

type EmitterFunction = (value: any) => JS_AST.Node







namespace JS_AST {

    export type Node = {
        type: string
    }

    export type Identifier = {
        type: "Identifier",
        name: string
    }

    export type MemberExpression = {

        type: "MemberExpression",
        computed: false,
        object: Node,
        property: Node

    }

    export type Literal = {
        type: "Literal",
        value: any,
        raw: any
    }
}


function createArray(elements: JS_AST.Node[]) {
    return {
        type: "ArrayExpression",
        elements
    }
}

function createStringLiteral(value: string): JS_AST.Literal {
    return {
        type: "Literal",
        value,
        raw: "\"" + value + "\""
    }
}

function createNumberOrBooleanLiteral(value: number | boolean): JS_AST.Literal {

    return {
        type: "Literal",
        value,
        raw: value
    }
}

function createNewRectangle(value: string) {
    const args = value.split(",").map((v) => parseInt(v));
    return createNewExpression(
        createMemberExpression(
            createIdentifier('egret'), createIdentifier('Rectangle')
        ),
        [
            createNumberOrBooleanLiteral(args[0]),
            createNumberOrBooleanLiteral(args[1]),
            createNumberOrBooleanLiteral(args[2]),
            createNumberOrBooleanLiteral(args[3])
        ]
    )
}

function createNewExpression(callee: JS_AST.Node, args: JS_AST.Node[]) {
    return {
        type: "NewExpression",
        callee: callee,
        arguments: args
    }
}



function createExpressionStatment(expression: JS_AST.Node) {
    return {
        "type": "ExpressionStatement",
        "expression": expression
    }
}

function createAssignmentExpression(left: JS_AST.Node, right: JS_AST.Node) {
    return {
        "type": "AssignmentExpression",
        "operator": "=",
        "left": left,
        "right": right
    }
}

function createMemberExpression(object: JS_AST.Identifier, property: JS_AST.Identifier) {
    return {
        "type": "MemberExpression",
        "computed": false,
        "object": object,
        "property": property
    }
}


function createIdentifier(name: string): JS_AST.Identifier {
    return {
        "type": "Identifier",
        name
    }
}

function createProgram(body: JS_AST.Node[]) {
    return {
        "type": "Program",
        body,
        "sourceType": "script"
    }
}


function createClass(className: JS_AST.Identifier, constractorBody: any[]) {

    const superCall = {
        "type": "VariableDeclaration",
        "declarations": [
            {
                "type": "VariableDeclarator",
                "id": {
                    "type": "Identifier",
                    "name": "_this"
                },
                "init": {
                    "type": "LogicalExpression",
                    "operator": "||",
                    "left": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": false,
                            "object": {
                                "type": "Identifier",
                                "name": "_super"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "call"
                            }
                        },
                        "arguments": [
                            {
                                "type": "ThisExpression"
                            }
                        ]
                    },
                    "right": {
                        "type": "ThisExpression"
                    }
                }
            }
        ],
        "kind": "var"
    };

    const returnStatement: any = {
        "type": "ReturnStatement",
        "argument": createIdentifier("_this")
    };

    const fullConstractorBody = [superCall].concat(constractorBody).concat([returnStatement]);

    const functionArguments = [
        createMemberExpression(
            createIdentifier("eui"),
            createIdentifier("Skin")
        )
    ];

    return {
        "type": "CallExpression",
        "callee": {
            "type": "FunctionExpression",
            "id": null,
            "params": [
                {
                    "type": "Identifier",
                    "name": "_super"
                }
            ],
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "__extends"
                            },
                            "arguments": [
                                className,
                                {
                                    "type": "Identifier",
                                    "name": "_super"
                                }
                            ]
                        }
                    },
                    {
                        "type": "FunctionDeclaration",
                        "id": className,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": fullConstractorBody
                        },
                        "generator": false,
                        "expression": false,
                        "async": false
                    },
                    {
                        "type": "ReturnStatement",
                        "argument": className
                    }
                ]
            },
            "generator": false,
            "expression": false,
            "async": false
        },
        "arguments": functionArguments
    }
}


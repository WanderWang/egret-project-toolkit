export interface AST_NodeBase {

    attributes: AST_Attribute[];

    children: AST_Node[];

    stateAttributes: AST_STATE[]

}


export interface AST_Skin extends AST_NodeBase {

    namespace: string;

    classname: string;

    fullname: string

    states: string[]

}

export interface AST_Node extends AST_NodeBase {

    type: string;

    varIndex: number;

    id: string | null;

};

export interface AST_Attribute {

    type: string;

    key: string;

    value: number | boolean | string | AST_Node | AST_Skin
}


export type AST_STATE = AST_STATE_ADD | AST_STATE_MODIFY_PROPERTY


export interface AST_STATE_MODIFY_PROPERTY {

    type: "set",

    attribute: AST_Attribute,

    name: string
}

export interface AST_STATE_ADD {

    type: "add",
    name: string
}

export enum AST_FullName_Type {

    ELEMENT = 0,
    ATTRIBUTE = 1
}

export type AST_Node_Name_And_Type = {
    namespace: string,
    name: string,
    type: AST_FullName_Type
} 
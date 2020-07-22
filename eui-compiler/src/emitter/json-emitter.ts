import { BaseEmitter } from ".";
import { AST_Node, AST_NodeBase, AST_Skin } from "../exml-ast";
import fs = require('fs');

type OutputDataFormat_State = {
    $ssP?: { target: string, name: string, value: any }[],
    $saI?: { target: string, property: string, position: number, relativeTo: string }[]
}


type OutputDataFormat = {

    $path: string

    $sP?: string[]

    $sC: "$eSk"

    $s?: {
        [stateName: string]: OutputDataFormat_State
    }
}

export class JSONEmitter extends BaseEmitter {
    private jsonContent: string = '';

    private euiNormalizeNames = {
        "$eBL": "eui.BitmapLabel",
        "$eB": "eui.Button",
        "$eCB": "eui.CheckBox",
        "$eC": "eui.Component",
        "$eDG": "eui.DataGroup",
        "$eET": "eui.EditableText",
        "$eG": "eui.Group",
        "$eHL": "eui.HorizontalLayout",
        "$eHSB": "eui.HScrollBar",
        "$eHS": "eui.HSlider",
        "$eI": "eui.Image",
        "$eL": "eui.Label",
        "$eLs": "eui.List",
        "$eP": "eui.Panel",
        "$ePB": "eui.ProgressBar",
        "$eRB": "eui.RadioButton",
        "$eRBG": "eui.RadioButtonGroup",
        "$eRa": "eui.Range",
        "$eR": "eui.Rect",
        "$eRAl": "eui.RowAlign",
        "$eS": "eui.Scroller",
        "$eT": "eui.TabBar",
        "$eTI": "eui.TextInput",
        "$eTL": "eui.TileLayout",
        "$eTB": "eui.ToggleButton",
        "$eTS": "eui.ToggleSwitch",
        "$eVL": "eui.VerticalLayout",
        "$eV": "eui.ViewStack",
        "$eVSB": "eui.VScrollBar",
        "$eVS": "eui.VSlider",
        "$eSk": "eui.Skin"
    };

    private elementContents: any = {};
    private elementIds: string[] = [];
    private skinParts: string[] = [];
    private nodeMap: { [id: string]: AST_NodeBase } = {};

    private otherNodeMap: any[] = [];
    private createClassResult: any[] = [];

    getResult(): string {
        return this.jsonContent;
    }
    emitHeader(themeData: any): void {
    }
    emitSkinNode(filename: string, skinNode: AST_Skin): void {
        const json = {};
        this.elementContents = {};
        this.elementIds = [];
        this.skinParts = [];
        this.nodeMap = {};
        const key = skinNode.fullname;
        const item: OutputDataFormat = {
            $sC: "$eSk",
            $path: filename
        };
        json[key] = item;
        this.nodeMap[key] = skinNode;

        //console.log(1000111, this.nodeMap)
        console.log(filename)
        fs.writeFileSync('222.log', JSON.stringify(this.nodeMap, null, ' '), 'utf-8')

        if (this.otherNodeMap.length == 0) {
            //console.log(123, this.nodeMap)
            // if (this.nodeMap.hasOwnProperty('skins.MyComponent1')) {
            //     this.catchClass(this.nodeMap['this.catchClass(this.nodeMap)'])
            // }
            // else {
            //     this.catchClass(this.nodeMap)
            // }
            for (const key of Object.keys(this.nodeMap)) {
                this.catchClass(this.nodeMap[key])
            }

        }
        if (this.otherNodeMap.length > 0) {
            this.createClass()
        }
        this.setBaseState(skinNode, item);

        //console.log(111111, skinNode)

        Object.assign(item, this.elementContents);
        //console.log(11112222, this.elementContents)
        if (this.skinParts.length > 0) {
            item.$sP = this.skinParts;
            console.log('item', item)
        }
        //console.log(2222222, json)
        this.setStates(skinNode, item);

        if (this.nodeMap.hasOwnProperty('skins.MyComponent1')) {
            //console.log(this.createClassResult)
            for (let item of this.createClassResult) {
                const key = Object.keys(item)[0]
                delete item[key].$path
                delete item[key].$s
                //console.log(77777777777, item)
                Object.assign(json, item)
            }
            console.log(55555, json)
        }
        this.jsonContent = JSON.stringify(json, null, 4);
    }


    setBaseState(node: AST_NodeBase, json: any, key: string = '$bs') {
        const base = {};
        json[key] = base;
        for (const attr of node.attributes) {
            base[attr.key] = this.parseValue(attr.value);
        }
        if (node["type"]) {
            base['$t'] = this.convertType(node["type"]);
        }
        const elementContents: string[] = [];
        const sIds: string[] = [];
        // console.log('node', node)

        for (const child of node.children) {

            const id = this.parseNode(child);

            //console.log('child', child)
            this.hasAddType(child) ? sIds.push(id) : elementContents.push(id);
            this.setBaseState(child, this.elementContents, id);
        }
        //console.log('child', this.elementContents)
        elementContents.length > 0 && (base['$eleC'] = elementContents);
        sIds.length > 0 && (base['$sId'] = sIds);
    }

    setStates(skinNode: AST_Skin, json: OutputDataFormat) {
        if (skinNode.states.length === 0) {
            return;
        }
        json.$s = {};
        for (const state of skinNode.states) {
            json.$s[state] = {};
        }
        this.getStatesAttribute(skinNode, json.$s);
    }

    getStatesAttribute(node: AST_NodeBase, json: NonNullable<OutputDataFormat['$s']>) {
        const target = this.getNodeId(node)!;
        for (const attr of node.stateAttributes) {
            switch (attr.type) {
                case 'set': {
                    if (attr.name in json) {
                        if (!json[attr.name].$ssP) {
                            json[attr.name].$ssP = [];
                        }
                        json[attr.name].$ssP!.push({
                            target,
                            name: attr.attribute.key,
                            value: attr.attribute.value
                        });
                    }
                } break;
                case 'add': {
                    if (attr.name in json) {
                        if (!json[attr.name].$saI) {
                            json[attr.name].$saI = [];
                        }
                        json[attr.name].$saI!.push({
                            target,
                            property: "",
                            position: 1,
                            relativeTo: ""
                        });
                    }
                } break;
            }
        }
        for (const child of node.children) {
            this.getStatesAttribute(child, json);
        }
    }

    hasAddType(node: AST_NodeBase) {
        for (const attr of node.stateAttributes) {
            if (attr.type === 'add') {
                return true;
            }
        }
        return false;
    }

    getNodeId(node: AST_NodeBase) {
        const nodeMap = this.nodeMap;
        for (const id in nodeMap) {
            if (nodeMap[id] === node) {
                return id;
            }
        }
        return null;
    }

    parseNode(node: AST_Node) {
        let id = node.id;
        if (id) {
            this.skinParts.push(id);
        }
        else {
            let i = 1;
            const type = node.type.split('.').pop()!;
            do {
                id = `_${type}${i++}`;
            } while (this.elementIds.indexOf(id) !== -1);
        }
        this.elementIds.push(id);
        this.nodeMap[id] = node;
        return id;
    }

    parseValue(value: string | number | boolean | AST_Node | AST_Skin) {
        if (!value["attributes"] && !value["children"]) {
            return value;
        }
        if (value["type"]) {
            const id = this.parseNode(value as AST_Node);
            this.setBaseState(value as AST_Node, this.elementContents, id);
            return id;
        }
        return value;
    }

    convertType(type: string) {
        for (const key in this.euiNormalizeNames) {
            if (this.euiNormalizeNames[key] === type) {
                return key;
            }
        }
        return "$eSk";
    }

    catchClass(nodeMap: any) {
        // if (nodeMap == this.nodeMap) {
        //     nodeMap = nodeMap["skins.MyComponent1"]
        // }
        //console.log(12343, nodeMap)
        if (nodeMap.attributes) {
            for (let child of nodeMap.attributes) {
                // if (child.classname) {
                //console.log(child.type)
                if (child.type == 'skinName') {

                    //this.nodeMap[child.value.fullname] = child
                    this.otherNodeMap.push(child)

                    const value = child.value.fullname
                    nodeMap.attributes = [
                        {
                            'type': 'skinName',
                            'key': 'skinName',
                            'value': value,
                            'attributes': []
                        }
                    ]
                    break;
                }
            }
        }
        if (nodeMap.children) {
            for (let child of nodeMap.children) {
                this.catchClass(child)
            }
        }
    }

    createClass() {
        for (let child of this.otherNodeMap) {
            const emitter = new JSONEmitter()
            //console.log()
            const filename = ''
            console.log(88888, child.value)
            emitter.emitSkinNode(filename, child.value)
            const result = emitter.getResult()
            //console.log('result', result)
            this.createClassResult.push(JSON.parse(result))
        }
    }
}


import { writeFileSync } from 'fs';
import * as convert from 'xml-js';
import { AST_Attribute, AST_FullName_Type, AST_Node, AST_Node_Name_And_Type, AST_Skin, AST_STATE } from '../exml-ast';
import { getTypings } from './typings';


let skinNameIndex = 0;

let currentSkinNode: AST_Skin;

export function generateAST(filecontent: string): AST_Skin {
    skinNameIndex = 0;
    const data = convert.xml2js(filecontent) as convert.Element;

    const rootExmlElement = data.elements!.find(e => e.name === 'e:Skin')!;
    const skinNode = createSkinNode(rootExmlElement);
    writeFileSync('1.log', JSON.stringify(skinNode, null, '\t'), 'utf-8');
    return skinNode;
}

function getClassNameFromEXMLElement(element: convert.Element) {
    return element.name!.replace("e:", "eui.").replace("ns1:", "");
}


function getExmlChildren(element: convert.Element) {
    const childrenElements = element.elements;
    if (!childrenElements) {
        return [];
    }
    else {
        return childrenElements.filter(item => {
            return item.type !== 'comment'
        })
    };
}




function getNodeType(name1: string): AST_Node_Name_And_Type {
    const tempArr = name1.split(":");
    const namespace = tempArr[0];
    const name = tempArr[1];
    // 根据名称的首字母是否是大小写来判断是属性还是子节点
    const type = name.charAt(0).toLowerCase() === name.charAt(0)
        ? AST_FullName_Type.ATTRIBUTE
        : AST_FullName_Type.ELEMENT
    return { namespace, name, type };
}

function parseStateAttribute(className: string, originKey: string, value: string): AST_STATE {
    const [key, stateName] = originKey.split(".");
    const type = getTypings(className, key)!;
    const attribute = createAttribute(key, type, value);
    return {
        type: "set",
        attribute,
        name: stateName
    }
}


/**
 * 将NodeElement的 attribute节点转化为Node的Attribute
 * @param nodeElement 
 */
function createAST_Attributes(node: AST_Node, nodeElement: convert.Element) {
    const attributes: AST_Attribute[] = [];
    const className = getClassNameFromEXMLElement(nodeElement)
    for (let key in nodeElement.attributes) {
        if (key === 'locked') {
            continue;
        }
        let value = nodeElement.attributes[key] as string;
        if (value.indexOf("%") >= 0) {
            if (key === 'width') {
                key = 'percentWidth';
                value = value.replace("%", '')
            }
            else if (key === 'height') {
                key = 'percentHeight';
                value = value.replace("%", '')
            }
        }
        if (key.indexOf(".") >= 0) {
            const stateAttribute = parseStateAttribute(className, key, value);
            node.stateAttributes.push(stateAttribute);
            continue;
        }
        const type = getTypings(className, key);
        if (!type) {
            continue
        }
        const attribute = createAttribute(key, type, value);
        attributes.push(attribute);
    }
    node.attributes = attributes
}

function createAttribute(key: string, type: string, attributeValue: any): AST_Attribute {

    let value: AST_Attribute['value'] = attributeValue;
    if (type == 'number') {
        value = Number(attributeValue)
    }
    else if (type === 'boolean') {
        value = attributeValue === 'true'
    }
    else if (['top', 'bottom', 'left', 'right'].indexOf(key) >= 0) {
        if (!isNaN(parseFloat(attributeValue))) {
            type = 'number';
            value = parseFloat(attributeValue)
        }
    }

    return {
        type,
        key,
        value
    }
}


function createSkinNode(rootExmlElement: convert.Element) {

    let varIndex = 0;
    const childrenExmlElement = getExmlChildren(rootExmlElement);

    const fullclassname = rootExmlElement
        && rootExmlElement.attributes
        && rootExmlElement.attributes.class
        ? rootExmlElement.attributes!.class as string
        : `skins.TestSkin${skinNameIndex++}`;

    const x = fullclassname.split(".");
    const namespace = x[0];
    const classname = x[1];




    currentSkinNode = {
        namespace,
        stateAttributes: [],
        classname,
        children: [],
        attributes: [],
        states: []
    }



    for (let key in rootExmlElement.attributes) {
        if (key === 'class' || key.indexOf("xmlns") >= 0) {
            continue;
        }
        const value = rootExmlElement.attributes[key] as string;
        if (key === 'states') {
            currentSkinNode.states = value.split(',');
            continue;
        }

        const type = getTypings('eui.Skin', key);
        if (!type) {
            continue;
        }

        const attribute = createAttribute(key, type, value);
        currentSkinNode.attributes.push(attribute);
    }

    currentSkinNode.children = childrenExmlElement.map(createAST_Node);

    // writeFileSync("2.log", JSON.stringify(skin, null, '  '));
    return currentSkinNode;


    function createAST_Node(nodeExmlElement: convert.Element): AST_Node {

        const childrenExmlElement = getExmlChildren(nodeExmlElement);

        const type = getClassNameFromEXMLElement(nodeExmlElement)
        varIndex++;
        const node: AST_Node = {
            type,
            children: [],
            attributes: [],
            stateAttributes: [],
            varIndex,
            id: null
        }

        createAST_Attributes(node, nodeExmlElement);
        const attributeIdIndex = node.attributes.findIndex(item => item.key === 'id');
        if (attributeIdIndex >= 0) {
            let attributeId = node.attributes[attributeIdIndex];
            const id = attributeId.value as string
            node.attributes.splice(attributeIdIndex, 1);
            node.id = id;
        }


        for (let element of childrenExmlElement) {
            let nodeType: AST_Node_Name_And_Type;
            if (type === 'eui.Scroller' && element.name === 'e:List') {
                nodeType = {
                    namespace: 'e',
                    name: "viewport",
                    type: AST_FullName_Type.ATTRIBUTE
                }
            }
            else {
                nodeType = getNodeType(element.name!);
            }
            // NodeElement的children中
            // 不一定全是 node.children
            // 也有可能是 attribute
            if (nodeType.type === AST_FullName_Type.ELEMENT) {
                const child = createAST_Node(element)
                node.children.push(child);
            }
            else {
                const key = nodeType.name;
                if (key === 'skinName') {
                    const attribute: AST_Attribute = {
                        type: key,
                        key: key,
                        value: createSkinNode(element.elements![0])
                    }
                    node.attributes.push(attribute)
                }
                else if (key === 'viewport') {
                    const attribute: AST_Attribute = {
                        type: 'object',
                        key: key,
                        value: createAST_Node(element)
                    }
                    node.attributes.push(attribute);
                }
                else if (key === 'layout') {
                    const attribute: AST_Attribute = {
                        type: 'object',
                        key: key,
                        value: createAST_Node(element.elements![0])
                    }
                    node.attributes.push(attribute);

                }
                else {
                    throw new Error(`missing ${key}`)
                }


            }
        }
        return node;
    }
}
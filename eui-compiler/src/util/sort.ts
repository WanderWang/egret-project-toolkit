import { generateAST } from "./parser";
import { AST_Node } from "../exml-ast";


let dependenceMap: { [filename: string]: string[] } = {};
let skins: { [host: string]: string } = {}
let preloads: string[] = [];

// 根据 exml 间的依赖关系进行排序
export function sort(theme: EgretEUIThemeConfig, exmls: EXMLFile[], clear: boolean = false) {
    if (clear) {
        dependenceMap = {};
    }
    if (!theme.exmls || !theme.skins) {
        return;
    }
    preloads = exmls.filter((value) => value.preload).map((value) => value.filename);
    skins = theme.skins;
    getDependence(exmls);
    theme.exmls.sort((a, b) => a.localeCompare(b));
    theme.exmls = sortExmls(theme.exmls);
}

function sortExmls(exmls: string[]) {
    const result: string[] = []
    for (const filename of exmls!) {
        if (preloads.indexOf(filename) > -1) {
            sortFileName(filename, result);
        }
    }
    for (const filename of exmls!) {
        sortFileName(filename, result);
    }
    return result;
}

function sortFileName(filename: string, output: string[]) {
    if (output.indexOf(filename) > -1) {
        return;
    }
    const dependencies = dependenceMap[filename];
    if (!dependencies) {
        return;
    }
    for (const dependence of dependencies) {
        if (!skins[dependence]) {
            continue;
        }
        sortFileName(skins[dependence], output);
    }
    output.push(filename);
}

function getDependence(exmls: EXMLFile[]) {
    for (const exml of exmls) {
        if (exml.filename in dependenceMap) {
            continue;
        }
        const skinNode = generateAST(exml.contents)
        const classes: string[] = ['eui:Skin'];
        for (const child of skinNode.children) {
            classes.push(...getDependenceClasses(child));
        }
        dependenceMap[exml.filename] = classes.filter((value, index, arr) => arr.indexOf(value) === index);
    }
}


function getDependenceClasses(node: AST_Node) {
    const result = [node.type];
    for (const child of node.children) {
        result.push(...getDependenceClasses(child));
    }
    return result;
}

export interface EgretEUIThemeConfig {
    path: string;
    skins?: { [host: string]: string };
    exmls?: Array<any>;
    autoGenerateExmlsList?: boolean;
    styles?: any;
}

export interface EXMLFile {
    filename: string;
    contents: string;
    preload?: boolean;
    theme?: string;
}
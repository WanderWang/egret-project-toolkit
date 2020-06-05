import * as fs from 'fs-extra-promise';
import * as path from 'path';
import { NamespaceDeclarationKind, Project, SourceFile } from "ts-morph";
import { createPackageJson } from './templates/package-json';
import { addImport, count, emitTypeScriptSourceFile } from './utils';
export * from './split';

let egretRootPath: string;
let outputDir: string


export function doctor(root: string) {
    egretRootPath = root;
    const tsConfigFilePath = path.resolve(process.cwd(), egretRootPath, 'tsconfig.json');

    const project = new Project({
        tsConfigFilePath
    });
    const lib = project.compilerOptions.get().lib;
    if (lib && lib.indexOf("lib.es2015.promise.d.ts") >= 0) {
        console.error(`tsconfig.json 中的 lib -> es2015.promise 应修改为 lib -> es2015`)
    }
    const sourceFiles = project.getSourceFiles();
    sourceFiles.filter(s => !s.isDeclarationFile()).map(item => {
        const classes = item.getClasses();
        for (const clz of classes) {
            const extend = clz.getExtends();
            if (extend) {
                const extendString = extend.getText();
                if ([
                    "ArrayCollection",
                    "ItemRenderer"
                ].indexOf(extendString) >= 0) {
                    console.error(`${item.getFilePath()} 中的 ${clz.getName()} 的基类需要添加 eui. 前缀`)
                }
            }
        }
    })
}

export async function convert(root: string, output: string) {
    egretRootPath = root;
    outputDir = output;
    await copyProjectConfig();
    console.log('开始进行代码转换')
    await convertSourceCode();
    console.log('开始添加 import')
    addImport(outputDir);
}

function copy(file: string) {
    return fs.mkdirpAsync(path.dirname(file)).then(() => {
        return fs.copyAsync(
            path.resolve(process.cwd(), egretRootPath, file),
            path.resolve(process.cwd(), outputDir, file)
        )
    })
}

async function copyProjectConfig() {

    const fileList = [
        'egretProperties.json'
    ]
    await Promise.all(fileList.map(copy));
    const pkgJson = createPackageJson();
    await fs.writeFileAsync(path.join(outputDir, 'package.json'), pkgJson, 'utf-8');
    // const files = createWebpackConfig();
    // for (let f in files) {
    //     const content = files[f];
    //     const outputFilePath = path.join(outputDir, f);
    //     await fs.mkdirpAsync(path.dirname(outputFilePath));
    //     await fs.writeFileAsync(outputFilePath, content, 'utf-8');

    // }
    fs.copyAsync(path.join(egretRootPath, 'libs'), path.join(outputDir, 'libs'))
}

async function convertSourceCode() {
    const tsConfigFilePath = path.resolve(process.cwd(), egretRootPath, 'tsconfig.json');
    await copy('tsconfig.json')
    const project = new Project({
        tsConfigFilePath
    });
    const sourceFiles = project.getSourceFiles();
    sourceFiles.filter(filterSourceCode)
        .map(
            count(convertSourceFile)
        )
        .map(
            count(emitToNewProject)
        )
}





function convertSourceFile(sourceFile: SourceFile) {
    if (sourceFile.isDeclarationFile()) {
        return sourceFile;
    }
    sourceFile.getInterfaces().forEach(i => {
        const name = i.getName();
        i.setHasDeclareKeyword(false);
        i.setIsExported(true);
        if (name === 'Window') {

            i.replaceWithText(
                `declare global {
                 ${i.print()}   
                }`
            );
        }
    })
    sourceFile.getVariableStatements().map(v => {
        v.setIsExported(true);
    })
    sourceFile.getClasses().map(c => {
        c.setIsExported(true)
    })
    sourceFile.getEnums().map(e => {
        e.setIsExported(true)
    })
    sourceFile.getFunctions().map(f => {
        f.setIsExported(true);
    })
    sourceFile.getNamespaces().map(n => {
        n.setIsExported(true);
        n.setDeclarationKind(NamespaceDeclarationKind.Namespace)
    })
    return sourceFile
}



function emitToNewProject(sourceFile: SourceFile) {
    const filePath = sourceFile.getFilePath();
    const relativeFilePath = path.relative(egretRootPath, filePath).split("\\").join("/");
    const newPath = path.join(outputDir, relativeFilePath);
    emitTypeScriptSourceFile(newPath, sourceFile);
}



function filterSourceCode(s: SourceFile) {
    return true;
    // return s.isDeclarationFile() || s.getFilePath().indexOf("src/LibCore") >= 0;
}
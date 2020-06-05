import { SourceFile, Project } from "ts-morph";
import fs from 'fs-extra-promise';
import path from 'path';

export function emitTypeScriptSourceFile(filePath: string, sourceFile: SourceFile) {
    const content = sourceFile.print();
    fs.mkdirpSync(path.dirname(filePath));
    fs.writeFileSync(filePath, content, 'utf-8')
}

export function addImport(outputDir: string) {
    const tsConfigFilePath = path.resolve(outputDir, 'tsconfig.json');
    const project = new Project({
        tsConfigFilePath
    });
    const sourceFiles = project.getSourceFiles();
    sourceFiles.map(
        count(fixMissingImport)
    ).map(
        count(emitOverride)
    );

}
function emitOverride(sourceFile: SourceFile) {
    emitTypeScriptSourceFile(sourceFile.getFilePath(), sourceFile);
}


function fixMissingImport(sourceFile: SourceFile) {
    sourceFile.fixMissingImports();
    return sourceFile;
}


export function count(func: (item: any, index: number, arr: any[]) => any) {
    return (item: any, index: number, arr: any[]) => {
        const label = func.name;
        console.log(`${label}:${index + 1}/${arr.length}`);
        return func(item, index, arr);
    }
}

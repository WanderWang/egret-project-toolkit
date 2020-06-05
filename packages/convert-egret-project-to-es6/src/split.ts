import path from "path";
import { Project, SourceFile } from "ts-morph";
import { emitTypeScriptSourceFile, addImport } from "./utils";
import fs from 'fs-extra-promise';

export function split(root: string) {
    const tsConfigFilePath = path.resolve(process.cwd(), root, 'tsconfig.json');
    const project = new Project({
        tsConfigFilePath
    });
    const sourceFiles = project.getSourceFiles().filter(s => !s.isDeclarationFile());
    for (let sourceFile of sourceFiles) {
        sourceFile.getImportDeclarations().forEach(d => {
            d.remove();
        })
        splitSourceFile(sourceFile, project);

    }
    const output = path.join(process.cwd(), 'temp')
    fs.copyAsync(tsConfigFilePath, path.join(output, 'tsconfig.json'))

    project.getSourceFiles().forEach(s => {
        const filePath = s.getFilePath();
        const relativeFilePath = path.relative(root, filePath).split("\\").join("/");
        emitTypeScriptSourceFile(path.join(output, relativeFilePath), s);
    })
    addImport(output)
}

function splitSourceFile(sourceFile: SourceFile, project: Project) {

    const filePath = sourceFile.getFilePath();

    const classes = sourceFile.getClasses();

    for (let clz of classes) {
        if (clz.getName() !== path.basename(filePath, '.ts')) {
            const newFilename = path.join(path.dirname(filePath), clz.getName() + ".ts");

            try {
                const newSourceFile = project.createSourceFile(newFilename);
                newSourceFile.replaceWithText(clz.getFullText());
                clz.remove();
            }
            catch (e) {
                const message = [
                    '发现异常:',
                    `源路径:${filePath}`,
                    `源代码块:${clz.getName()}`,
                    `目标路径:${newFilename}`
                ].join("\n");
                console.log(message)
                process.exit();

            }

        }
    }

    const enums = sourceFile.getEnums();
    for (let e of enums) {
        if (e.getName() !== path.basename(filePath, '.ts')) {
            const newFilename = path.join(path.dirname(filePath), e.getName() + ".ts");

            try {
                const newSourceFile = project.createSourceFile(newFilename);
                newSourceFile.replaceWithText(e.getFullText());
                e.remove();
            }
            catch (error) {
                const message = [
                    '发现异常:',
                    `源路径:${filePath}`,
                    `源代码块:${e.getName()}`,
                    `目标路径:${newFilename}`
                ].join("\n");
                console.log(message)
                process.exit();
            }
        }
    }

}
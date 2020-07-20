//@ts-check
const myTransformer = require('../').myTransformer;
const ts = require('typescript');

function compile(fileNames) {

    const compileOptions = {
        noEmitOnError: true,
        noImplicitAny: true,
        target: ts.ScriptTarget.ES2015,
        module: ts.ModuleKind.CommonJS
    }

    let program = ts.createProgram(fileNames, compileOptions);

    const customTransformer = {
        before: [
            myTransformer(program,'develop')
        ]
    }


    let emitResult = program.emit(undefined, undefined, undefined, undefined, customTransformer);

    let allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);

    allDiagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });
    let exitCode = emitResult.emitSkipped ? 1 : 0;
    console.log(`Process exiting with code '${exitCode}'.`);

}

compile(['test/a.ts']);
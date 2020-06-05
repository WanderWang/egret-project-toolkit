//@ts-check
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { describe, it, afterEach } = require('mocha');
const codegen = require('escodegen');
const parser = require('../../lib/util/parser')
const JavaScriptEmitter = require('../../lib/emitter').JavaScriptEmitter;
const typings = require('../../lib/util/typings');

const esprima = require('esprima');


describe('emitter', () => {


    const baselineDir = path.join(__dirname, 'baselines')
    const dirs = fs.readdirSync(baselineDir)
    const cwd = process.cwd();
    afterEach(function () {
        process.chdir(cwd);
    });
    for (const dir of dirs) {
        it(`emitter-simple-${dir}`, () => {

            process.chdir(path.join(baselineDir, dir));
            const content = fs.readFileSync('input.exml', 'utf-8');
            typings.initTypings();
            const skinNode = parser.generateAST(content)
            const emitter = new JavaScriptEmitter();
            const result = emitter.generateJavaScriptAST(skinNode);
            const text = codegen.generate(result);
            fs.writeFileSync('1.log', JSON.stringify(skinNode, null, '\t'), 'utf-8');
            fs.writeFileSync('2.log', text, 'utf-8');
            const output = fs.readFileSync('expected-output.js', 'utf-8')
            const outputAst = esprima.parseScript(output);
            assert.deepEqual(result, outputAst)

        })
    }

})



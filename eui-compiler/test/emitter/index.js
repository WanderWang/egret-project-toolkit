//@ts-check
const assert = require('assert');
const fs = require('fs');
const path = require('path');


const parser = require('../../lib/util/parser')
const JavaScriptEmitter = require('../../lib/util/emitter2').JavaScriptEmitter;
const typings = require('../../lib/util/typings');

const esprima = require('esprima');


const todos = []

// const dirs = ['scroller'];


describe('emitter', () => {


    const baselineDir = path.join(__dirname, 'baselines')
    const dirs = fs.readdirSync(baselineDir)
    const cwd = process.cwd();
    afterEach(function () {
        //本块代码会在每个测试用例执行之后执行
        process.chdir(cwd);
    });
    for (let dir of dirs) {
        it(`emitter-simple-${dir}`, () => {


            if (todos.indexOf(dir)) {
                process.chdir(path.join(baselineDir, dir));
                const content = fs.readFileSync('input.exml', 'utf-8');
                typings.initTypings();
                const skinNode = parser.generateAST(content)
                const emitter = new JavaScriptEmitter();
                const result = emitter.emit(skinNode);
                fs.writeFileSync('2.log', result, 'utf-8');
                const output = fs.readFileSync('expected-output.js', 'utf-8')
                const resultAst = esprima.parseScript(result);
                const outputAst = esprima.parseScript(output);
                assert.deepEqual(resultAst, outputAst)

            }
            else {
                // console.log(result)
            }


        })
    }

})



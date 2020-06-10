// @ts-check
const { describe, it, afterEach } = require('mocha');
const path = require('path');
const fs = require('fs');
const sort = require('../../lib/util/sort').sort;
const assert = require('assert');

describe('sort-exml', () => {
    const caseDir = path.join(__dirname, 'case')
    const cwd = process.cwd();
    afterEach(function () {
        process.chdir(cwd);
    });
    it('sort-exml', () => {
        process.chdir(caseDir);
        const exmls = JSON.parse(fs.readFileSync('exmls.txt', 'utf-8'));
        const themeData = JSON.parse(fs.readFileSync('exmls.thm.json', 'utf-8'));
        sort(themeData, exmls);
        const targetThemeData = JSON.parse(fs.readFileSync('exmls-sort.thm.json', 'utf-8'));
        assert.doesNotThrow(() => {
            for (let i = 0; i < themeData.exmls.length; i++) {
                if (themeData.exmls[i] !== targetThemeData.exmls[i]) {
                    throw new Error();
                }
            }
        })
    })
})
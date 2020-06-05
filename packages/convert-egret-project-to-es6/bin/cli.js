#!/usr/bin/env node
const args = require('args');
const lib = require('../');
args
    .command('doctor', 'check-your-project', function (name, sub) {
        const root = sub[0];
        lib.doctor(root);
    })
    .command('convert', 'convert-to-es6', function (name, sub, options) {
        const root = sub[0];
        const outputDir = sub[1];
        lib.convert(root, outputDir);
    })
    .command('split', 'split-es6-project-classes', function (name, sub, options) {
        const root = sub[0];
        lib.split(root);
    })

const flags = args.parse(process.argv)
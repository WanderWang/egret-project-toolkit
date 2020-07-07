#!/usr/bin/env node
const lib = require('../lib/index');
const projectRoot = process.argv[3] || ".";
console.log(projectRoot)
lib.runCommand(projectRoot);

#!/usr/bin/env node
const lib = require('../lib/index');
const engineVersion = process.argv[2];
console.log('开始下载', engineVersion);
lib.downloadAndInstall(engineVersion);

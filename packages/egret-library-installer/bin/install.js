#!/usr/bin/env node
const lib = require('../lib/index');
const args = require('args');
const axios = require('axios');


const osLocale = require('os-locale');



async function run() {

    const language = await osLocale();
    var installInfo = '';
    var listInfo = '';
    var remoteInfo = '';
    if (language.indexOf("zh") !== -1) {
        installInfo = "安装指定版本引擎";
        listInfo = "检查本地引擎已安装版本";
        remoteInfo = "检查服务器端引擎列表";
    } else {
        installInfo = "Install the specified version of the engine";
        listInfo = "Check local installed engine version";
        remoteInfo = "Check the list of engines on server-side";
    }

    args.command("install", installInfo, () => {
        const engineVersion = args.sub[2];
        console.log('开始下载', engineVersion);
        lib.downloadAndInstall(engineVersion);
    }, ["i"]);
    args.command("list", listInfo, () => {
        const data = lib.launcherapi.getAllEngineVersions();
        for (let version in data) {
            console.log('Egret Engine ' + version, data[version].root)
        }
    }, ["l"]);
    args.command("remote", remoteInfo, async () => {
        const response = await axios.get('http://tool.egret-labs.org/EgretCore/enginelist.json', { responseType: "json" });
        const data = response.data.engine;
        const versions = data.map(item => item.version);
        console.log(versions.join("\n"));
    }, ["r"]);

    const flags = args.parse(process.argv);
}

run();
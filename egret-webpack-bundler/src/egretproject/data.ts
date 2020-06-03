import os = require('os');
import crypto = require('crypto');
import _path = require("path");
import cp = require('child_process');
import * as fs from 'fs';


export type Target_Type = "web" | "native" | "mygame" | "wxgame" | "baidugame" | "qgame" | "oppogame" | "vivogame" | 'bricks' | 'ios' | 'android' | "any" | "none"

export type EgretProperty = {
    "engineVersion": string,
    "compilerVersion"?: string,
    "modules": EgretPropertyModule[],
    "target"?: {
        "current": string
    }
    "template"?: {

    },
    "wasm"?: {

    },
    "native"?: {
        "path_ignore"?: string[];
    },
    "publish"?: {
        "web": number,
        "native": number,
        "path": string;
    },
    "egret_version"?: string;
}

export type EgretPropertyModule = {
    name: string,
    version?: string,
    path?: string;
}


export type Package_JSON = {

    /**
     * 废弃属性
     */
    modules?: PACKAGE_JSON_MODULE[];

    typings: string | null;

}

export type PACKAGE_JSON_MODULE = {

    files: string[],

    name: string;

    root: string

}

type SourceCode = {

    debug: string,
    release: string,
    platform: Target_Type
}


class EgretProjectData {
    private egretProperties: EgretProperty = {
        modules: [],
        target: { current: "web" },
        engineVersion: "1"

    };

    projectRoot = "";
    init(projectRoot: string) {
        this.projectRoot = projectRoot;
        this.reload();
    }

    hasEUI() {
        return this.egretProperties.modules.some(m => m.name == "eui");
    }

    reload() {
        let egretPropertiesPath = this.getFilePath("egretProperties.json");
        if (fs.existsSync(egretPropertiesPath)) {
            const content = fs.readFileSync(egretPropertiesPath, 'utf-8')
            this.egretProperties = JSON.parse(content);
            let useGUIorEUI = 0;
            for (let m of this.egretProperties.modules) {
                //兼容小写
                if (m.name == "dragonbones") {
                    m.name = "dragonBones";
                }
                if (m.name == "gui" || m.name == "eui") {
                    useGUIorEUI++;
                }
            }
            if (useGUIorEUI >= 2) {
                process.exit(1);
            }
        }
    }

    /**
     * 获取项目的根路径
     */
    getProjectRoot() {
        return this.projectRoot;
    }

    getFilePath(fileName: string) {
        return _path.resolve(this.getProjectRoot(), fileName);
    }

    getReleaseRoot() {
        var p = "bin-release";
        return p;
        //return file.joinPath(egret.args.projectDir, p);
    }

    getVersionCode() {
        return 1;
    }

    getVersion() {
        return this.egretProperties.egret_version || this.egretProperties.compilerVersion;
    }

    getIgnorePath(): Array<any> {

        return [];
    }

    getCurrentTarget() {
        return "web"
        // if (globals.hasKeys(this.egretProperties, ["target", "current"])) {
        //     return this.egretProperties.target.current;
        // }
        // else {

        // }
    }

    getCopyExmlList(): Array<string> {

        return [];
    }

    private getModulePath2(m: EgretPropertyModule) {
        let p = m.path;
        if (!p) {

            const engineVersion = m.version || this.egretProperties.engineVersion
            const versions = launcher.getEgretToolsInstalledByVersion(engineVersion);
            return _path.join(versions, 'build', m.name);
        }
        let egretLibs;
        if (process.platform === 'linux') {
            egretLibs = _path.resolve(__dirname, '../../');
        } else {
            egretLibs = getAppDataEnginesRootPath();
        }
        let keyword = '${EGRET_APP_DATA}';
        if (p.indexOf(keyword) >= 0) {
            p = p.replace(keyword, egretLibs);
        }
        return p;

    }

    private getAbsolutePath(p: string) {
        // getAbsolutePath
        if (_path.isAbsolute(p)) {
            return p.split("\\").join("/")
        }
        return _path.join(this.projectRoot, p).split("\\").join("/");
    }

    private getModulePath(m: EgretPropertyModule) {
        let modulePath = this.getModulePath2(m)
        modulePath = this.getAbsolutePath(modulePath);
        let name = m.name;
        if (this.isWasmProject()) {
            if (name == "egret" || name == "eui" || name == "dragonBones" || name == "game") {
                name += "-wasm";
            }
        }
        let searchPaths = [
            _path.join(modulePath, "bin", name),
            _path.join(modulePath, "bin"),
            _path.join(modulePath, "build", name),
            _path.join(modulePath)
        ];
        // if (m.path) {
        //     searchPaths.push(modulePath)
        // }
        if (this.isWasmProject()) {
            searchPaths.unshift(_path.join(modulePath, "bin-wasm"));
            searchPaths.unshift(_path.join(modulePath, "bin-wasm", name));
        }
        let dir = searchPath(searchPaths)!;
        return dir;
    }

    getLibraryFolder() {
        return this.getFilePath('libs/modules');
    }

    getModulesConfig(platform: Target_Type) {
        if (platform == 'ios' || platform == 'android') {
            platform = 'web';
        }
        let result = this.egretProperties.modules.map(m => {
            let name = m.name;
            let sourceDir = this.getModulePath(m);
            let targetDir = _path.join(this.getLibraryFolder(), name);
            let relative = _path.relative(this.getProjectRoot(), sourceDir);
            if (relative.indexOf("..") == -1 && !_path.isAbsolute(relative)) { // source 在项目中
                targetDir = sourceDir;
            }
            targetDir = ((_path.relative(this.getProjectRoot(), targetDir)) + _path.sep).split("\\").join("/");
            let source = [
                _path.join(sourceDir, name + ".js").split("\\").join("/"),
                _path.join(sourceDir, name + "." + platform + ".js").split("\\").join("/")
            ].filter(fs.existsSync);

            let target: SourceCode[] = source.map(s => {
                let debug = _path.join(targetDir, _path.basename(s)).split("\\").join("/");
                let release = _path.join(targetDir, _path.basename(s, '.js') + '.min.js').split("\\").join("/");
                return {
                    debug,
                    release,
                    platform
                }
            });
            return { name, target, sourceDir, targetDir };
        })
        return result;
    }

    isWasmProject(): boolean {
        return false;
    }

    getResources(): string[] {
        return ["resource"];
    }

    get useTemplate(): boolean {
        return this.egretProperties.template != undefined;
    }

    hasModule(name: string): boolean {
        let result = false;
        this.egretProperties.modules.forEach(function (module: EgretPropertyModule) {
            if (module.name == name || module.name == name) {
                result = true;
            }
        });
        return result;
    }
}



export var projectData = new EgretProjectData();



type LauncherAPI = {


    getAllEngineVersions(): any

    getInstalledTools(): { name: string, version: string, path: string }[];

    getTarget(targetName: string): string

    getUserID(): string;

    sign(templatePath: string, uid: string): void;


}

type LauncherAPI_MinVersion = { [P in keyof LauncherAPI]: string }

class EgretLauncherProxy {

    getMinVersion(): LauncherAPI_MinVersion {

        return {
            getAllEngineVersions: '1.0.24',
            getInstalledTools: '1.0.24',
            getTarget: "1.0.45",
            getUserID: "1.0.46",
            sign: "1.0.46"
        }
    }

    private proxy!: LauncherAPI;

    getEgretToolsInstalledByVersion(checkVersion: string) {
        if (process.platform === 'linux') {
            return _path.resolve(__dirname, '../../');
        }
        const egretjs = this.getLauncherLibrary();
        const data = egretjs.getAllEngineVersions() as any[];
        const versions: { version: string, path: string }[] = [];
        for (let key in data) {
            const item = data[key];
            versions.push({ version: item.version, path: item.root })
        }
        for (let versionInfo of versions) {
            if (versionInfo.version == checkVersion) {
                return versionInfo.path;
            }
        }
        throw `找不到指定的 egret 版本: ${checkVersion}`;
    }

    getLauncherLibrary(): LauncherAPI {
        const egretjspath = _path.join(getEgretLauncherPath(), "egret.js");
        const minVersions = this.getMinVersion() as any;
        const m = require(egretjspath);
        const selector: LauncherAPI = m.selector;
        if (!this.proxy) {
            this.proxy = new Proxy(selector, {
                get: (target: any, p: string, receiver) => {
                    const result = target[p];
                    if (!result) {
                        const minVersion = minVersions[p];
                        throw `找不到 LauncherAPI:${p},请安装最新的白鹭引擎启动器客户端解决此问题,最低版本要求:${minVersion},下载地址:https://egret.com/products/engine.html`//i18n
                    }
                    return result.bind(target)
                }
            });
        }
        return this.proxy;
    }
}

function getAppDataPath(): string {
    var result: string = ""
    switch (process.platform) {
        case 'darwin':
            var home = process.env.HOME || ("/Users/" + (process.env.NAME || process.env.LOGNAME));
            if (!home)
                return '';
            result = `${home}/Library/Application Support/`;//Egret/engine/`;
            break;
        case 'win32':
            var appdata = process.env.AppData || `${process.env.USERPROFILE}/AppData/Roaming/`;
            result = appdata.split("\\").join("/")
            break;
        default:
            ;
    }

    if (!fs.existsSync(result)) {
        throw 'missing appdata path'
    }
    return result;
}


function getAppDataEnginesRootPath() {
    const result = _path.join(getAppDataPath(), "Egret/engine/");
    if (!fs.existsSync(result)) {
        throw `找不到 ${result}，请在 Egret Launcher 中执行修复引擎`;//todo i18n
    }
    return result;
}

function getEgretLauncherPath() {
    let npmEgretPath;
    if (process.platform === 'darwin') {
        let basicPath = '/usr/local';
        if (!fs.existsSync(basicPath)) {//some mac doesn't have path '/usr/local'
            basicPath = '/usr';
        }
        npmEgretPath = _path.join(basicPath, 'lib/node_modules/egret/EgretEngine');
    }
    else {
        npmEgretPath = _path.join(getAppDataPath(), 'npm/node_modules/egret/EgretEngine');

    }
    if (!fs.existsSync(npmEgretPath)) {
        throw `找不到  ${npmEgretPath}，请在 Egret Launcher 中执行修复引擎`;//todo i18n
    }
    const launcherPath = _path.join(fs.readFileSync(npmEgretPath, 'utf-8'), "../");
    return launcherPath;

}

export var launcher = new EgretLauncherProxy();
function searchPath(searchPaths: string[]): string | null {
    for (let s of searchPaths) {
        if (fs.existsSync(s)) {
            return s;
        }
    }
    return null;
}

function getEgretRoot() {
    var path = require("path");
    var egretRoot: string;
    var globalpath = module['paths'].concat();
    var existsFlag = false;
    for (var i = 0; i < globalpath.length; i++) {
        var prefix = globalpath[i];
        var url = path.join(prefix, '../');
        if (fs.existsSync(_path.join(url, 'tools/bin/egret'))) {
            existsFlag = true;
            break;
        }
        url = prefix;
        if (fs.existsSync(_path.join(url, 'tools/bin/egret'))) {
            existsFlag = true;
            break;
        }
    }
    if (!existsFlag) {
        throw new Error("can't find Egret");
    }


    egretRoot = url;
    return _path.join(egretRoot, '/').split("\\").join("/")
}
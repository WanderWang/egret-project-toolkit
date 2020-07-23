import * as cp from 'child_process';
import * as fs from 'fs';
import * as path from 'path';



export function installDependencies(dependencies: string[]) {

    install("./scripts/plugins", dependencies)
}

export function installFromLauncher(packageName: string) {
    const launcherRoot = getLauncherRoot();
    // installFromCustomPath(launcherRoot,packageName)
}

export function installFromCustomPath(root: string, packageName: string) {
    const orgName = packageName.indexOf('@') == 0 ? packageName.split("/")[0] : '';
    const packageShortName = orgName ? packageName.split("/")[1] : packageName;
    const node_modules_dir = path.join(__dirname, 'node_modules')
    if (!fs.existsSync(node_modules_dir)) {
        fs.mkdirSync(node_modules_dir)
    }
    let target_root = node_modules_dir;
    if (orgName) {
        const node_modules_orgs_dir = path.join(node_modules_dir, orgName);
        if (!fs.existsSync(node_modules_orgs_dir)) {
            fs.mkdirSync(node_modules_orgs_dir);
        }
        target_root = node_modules_orgs_dir;
    }
    const target_forder = path.join(target_root, packageShortName)
    if (fs.existsSync(target_forder)) {
        return;
    }
    fs.symlinkSync(path.join(root, packageName), target_forder, 'junction')
}


function install(cwd: string, dependencies: string[]) {

    if (fs.existsSync(path.join(cwd, 'node_modules', dependencies[0]))) {
        return;
    }

    const cmd = process.platform === "win32" ? "npm.cmd" : "npm";
    const args = [
        'install',
    ].concat(dependencies).concat([
        '--registry',
        'https://registry.npm.taobao.org'
    ]);
    console.log(`正在安装依赖'${cwd}`)
    console.log(`您也可以在${cwd}目录下手动执行 npm ${args.join(" ")}`)

    const result = cp.spawnSync(cmd, args, { cwd });
    if (result.error) {
        console.error('未找到 npm , 请安装最新版 NodeJS')
        process.exit();
    }
    if (result.stderr) {
        console.log(result.stderr.toString())
    }
    else {
        console.log(result.stdout.toString())
    }
}


function getLauncherRoot() {
    let egretEngine;
    if (process.platform === "win32") {
        egretEngine = path.join(process.env.APPDATA!, "npm/node_modules/egret/EgretEngine");
    } else {
        egretEngine = "/usr/local/lib/node_modules/egret/egretEngine";
        if (!fs.existsSync(egretEngine)) {
            egretEngine = "/usr/lib/node_modules/egret/egretEngine";
        }
    }

    let LauncherExe;

    try {
        // egretEngine文件中保存了launcher内置node所在的文件夹路径
        // mac: /xxx/EgretLauncher.app/Contents/Resources/app/engine/mac
        // windows: xxx\EgretLauncher\resources\app\engine\win
        const launcher = fs.readFileSync(egretEngine, { encoding: 'utf8' });
        if (process.platform === "win32") {
            LauncherExe = path.join(launcher, "../../../../EgretLauncher.exe");
        } else {
            LauncherExe = path.join(launcher, "../../../../MacOS/EgretLauncher");
        }
    } catch (error) {
        // launcher 未安装
        console.log("Launcher 未安装");
    }

    // exe路径, 可以直接启动Launcher
    // mac: /xxx/EgretLauncher.app/Contents/MacOS/EgretLauncher
    // windows: xxx\EgretLauncher\EgretLauncher.exe
    if (LauncherExe) {
        if (fs.existsSync(LauncherExe)) {
            console.log(LauncherExe);
        } else {
            console.log("Launcher 未安装");
        }
    }
    return LauncherExe;
}
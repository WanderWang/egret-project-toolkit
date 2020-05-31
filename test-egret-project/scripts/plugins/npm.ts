import * as cp from 'child_process';
import * as fs from 'fs';
import * as path from 'path';



export function installDependencies() {

    install("./scripts/plugins")
}


function install(cwd: string) {
    if (fs.existsSync(path.join(cwd, 'node_modules'))) {
        return;
    }
    const cmd = process.platform === "win32" ? "npm.cmd" : "npm";
    const args = [
        'install',
        '--registry',
        'http://registry.npmjs.org'
    ]
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
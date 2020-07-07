import * as fs from 'fs-extra-promise';
import * as path from 'path';
import { getAppDataPath } from './utils';

type Egret_Property_JSON = {
    compilerVersion: string
}


export async function runCommand(projectRoot: string) {
    const comamand = process.argv[2];
    const supportCommands = [
        'build', 'publish'
    ];
    if (!supportCommands.includes(comamand)) {
        console.log(`仅支持 ${supportCommands.join(",")} 命令`);
        process.exit(1);
    }
    const pkgFilePath = path.join(projectRoot, 'egretProperties.json');
    const json = await fs.readJsonAsync(pkgFilePath) as Egret_Property_JSON;
    const compileVersion = json.compilerVersion;
    const root = getAppDataPath();
    const targetPath = path.join(root, 'engine', compileVersion);
    process.env.EGRET_PATH = targetPath;
    require(`${targetPath}/tools/Entry.js`).executeCommandLine(process.argv.slice(2))

}
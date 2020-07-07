import axios from 'axios';
import * as fs from 'fs-extra-promise';
import * as os from 'os';
import * as path from 'path';
import { Unzip } from 'zip-lib';
const progress = require('request-progress');
const request = require('request');

type EngineList = { version: string, date: string, url: string, type: number }[];

export async function downloadAndInstall(version: string) {
    await downloadEngine(version);
    await extractEngine(version);
}

export async function downloadEngine(version: string) {
    const data = await fetch();
    const engineData = data.find(item => item.version === version);
    if (engineData) {
        const root = getAppDataPath();
        const zipFilePath = path.join(root, 'lib', `egret-core-${version}.zip`)
        await downloadFile(engineData.url, zipFilePath);
    }
    else {
        throw new Error(version);
    }
}

export async function extractEngine(version: string) {
    const root = getAppDataPath();
    const zipFilePath = path.join(root, 'lib/', `egret-core-${version}.zip`)
    const extractTempFilePath = path.join(root, 'temp');
    const targetPath = path.join(root, 'engine', version);

    await clearDirectory(extractTempFilePath)
    await clearDirectory(targetPath);
    await extractZipFile(zipFilePath, extractTempFilePath);
    await fs.mkdirpAsync(targetPath);
    await fs.copyAsync(path.join(extractTempFilePath, `egret-core-${version}`), targetPath);
    await clearDirectory(extractTempFilePath)
}

async function clearDirectory(directory: string) {
    const existed = await fs.existsAsync(directory)
    if (existed) {
        // await fs.removeAsync(directory); ??
    }
}

async function downloadFile(url: string, dist: string) {
    return new Promise((resolve, reject) => {
        progress(request(url))
            .on('progress', (state: any) => {
                console.log('progress', state.size.transferred);
            })
            .on('error', (err: any) => {
                reject(err);
            })
            .pipe(fs.createWriteStream(dist))
            .on('finish', () => resolve());
    });
}


async function fetch() {
    const response = await axios.get('http://tool.egret-labs.org/EgretCore/enginelist.json', { responseType: "json" });
    const data = response.data.engine as EngineList;
    return data;
}

async function extractZipFile(zipPath: string, target: string): Promise<void> {
    const unzip = new Unzip();
    unzip.extract(zipPath, target);
}

function getAppDataPath() {
    var result;
    switch (process.platform) {
        case 'darwin':
            var home = process.env.HOME || ("/Users/" + (process.env.NAME || process.env.LOGNAME));
            result = home + "/Library/Application Support/";
            break;
        case 'win32':
            result = process.env.AppData || process.env.USERPROFILE + "/AppData/Roaming/";
            break;
        case 'linux':
            result = os.homedir() + "/" + '.egret';
            break;
        default:
            throw new Error();
            ;
    }
    return result + "Egret"
}
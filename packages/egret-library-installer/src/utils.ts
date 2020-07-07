import * as os from 'os';

export function getAppDataPath() {
    var result;
    switch (process.platform) {
        case 'darwin':
            var home = process.env.HOME || ("/Users/" + (process.env.NAME || process.env.LOGNAME));
            result = home + "/Library/Application Support/Egret";
            break;
        case 'win32':
            result = process.env.AppData + "/Egret" || process.env.USERPROFILE + "/AppData/Roaming/Egret";
            break;
        case 'linux':
            result = os.homedir() + "/" + '.egret';
            break;
        default:
            throw new Error();
            ;
    }
    return result;
}
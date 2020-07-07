import { getAppDataPath } from "./utils";
import * as path from 'path';
import * as fs from 'fs';

class LauncherAPI {

    getAllEngineVersions() {
        const root = getAppDataPath();
        const engineRoot = path.join(root, 'engine');
        const dirs = fs.readdirSync(engineRoot);
        const result: any = {};
        for (let version of dirs) {
            const pkg = path.join(engineRoot, version, 'package.json');
            if (fs.existsSync(pkg)) {
                const content = fs.readFileSync(pkg, 'utf-8');
                const json = JSON.parse(content);
                if (json.version === version) {
                    const root = path.join(engineRoot, version).split("\\").join("/")
                    result[version] = { version, root };
                }
            }
        }
        return result;
    }
}

export const launcherapi = new LauncherAPI();
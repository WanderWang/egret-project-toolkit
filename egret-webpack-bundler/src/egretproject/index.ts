import { manager } from "./manager";
import { Target_Type, projectData } from "./data";

export function run(target: Target_Type, projectRoot: string) {
    projectData.init(projectRoot)
    const scripts = manager.copyLibsForPublish(target, 'release');
    console.log(scripts)

    // scripts.forEach((script) => {
    //     pluginContext.createFile(script, fs.readFileSync(FileUtil.joinPath(pluginContext.projectRoot, script)));
    // })
}
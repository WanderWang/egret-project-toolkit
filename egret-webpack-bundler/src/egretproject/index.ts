import { projectData, Target_Type } from "./data";
import { manager } from "./manager";

export function getLibsFileList(target: Target_Type, projectRoot: string, mode: "debug" | "release") {
    projectData.init(projectRoot)
    const scripts = manager.copyLibsForPublish(target, mode);
    return scripts;
} 
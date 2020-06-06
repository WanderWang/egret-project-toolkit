const path = require("path");
const fs = require("fs");
const childProcess = require("child_process");
const findRushJsonFolder = require("./install-run").findRushJsonFolder;
const getNpmPath = require("./install-run").getNpmPath;
const runWithErrorAndStatusCode = require("./install-run").runWithErrorAndStatusCode;

const deployCommand = 'deploy';

function run() {
    const rushJsonFolder = findRushJsonFolder();
    const npmPath = getNpmPath();
    const rushJsonPath = path.resolve(rushJsonFolder, 'rush.json');
    const rushJsonContent = fs.readFileSync(rushJsonPath, 'utf-8');
    const comment = /\/\/\s.*/g
    const comment2 = /\/\*{1,2}[\s\S]*?\*\//g
    let newContent = rushJsonContent.replace(comment, '');
    newContent = newContent.replace(comment2, '');
    const rushJson = JSON.parse(newContent);
    const shouldPublishProjects = rushJson.projects.filter(item => item.shouldPublish);
    const projectRelativeFolders = shouldPublishProjects.map((item) => item.projectFolder);
    for (const relativeFolder of projectRelativeFolders) {
        const projectFolder = path.resolve(rushJsonFolder, relativeFolder);
        const packageJsonPath = path.resolve(projectFolder, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            console.warn(`${packageJsonPath} does not exist!`);
            continue;
        }
        const scripts = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')).scripts;
        if (!(deployCommand in scripts)) {
            console.warn(`${deployCommand} command does not in ${packageJsonPath}!`);
            continue;
        }
        const npmSpawnResult = childProcess.spawnSync(npmPath, ["run", deployCommand], {
            cwd: projectFolder
        });
        if (npmSpawnResult.status !== 0) {
            throw new Error(`"npm view" returned error code ${npmSpawnResult.status}`);
        }
    }
    return 0;
}
runWithErrorAndStatusCode(run);
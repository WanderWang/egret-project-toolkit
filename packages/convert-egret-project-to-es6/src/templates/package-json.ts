export function createPackageJson() {
    const json = {
        "name": "egret-project",
        "version": "1.0.0",
        "description": "egret-project",
        "scripts": {
            "build": "tsc --noEmit"
        },
        "author": "",
        "devDependencies": {
            "typescript": "^3.8.3"
        }
    };
    return JSON.stringify(json, null, '\t')
}
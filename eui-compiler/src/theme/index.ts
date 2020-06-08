import * as fs from 'fs';
import * as path from 'path';

export interface ThemeData {

    skins: { [componentName: string]: string },

    autoGenerateExmlsList: boolean,

    exmls: string[]

}


export class ThemeFile {

    data: ThemeData;

    constructor(private projectRoot: string, public filePath: string) {
        const jsonContent = fs.readFileSync(path.join(projectRoot, filePath), 'utf-8');
        const json = JSON.parse(jsonContent) as ThemeData;
        this.data = json;
        const duplicate = json.exmls.filter((item, index, array) => {
            return array.lastIndexOf(item) !== array.indexOf(item)
        })
        if (duplicate.length > 0) {
            console.log(`存在相同的皮肤文件`, duplicate)
            process.exit(1);
        }
    }
}
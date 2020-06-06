
import * as fs from 'fs';
import * as crypto from 'crypto';

export class CachedFile {

    public filePath: string;
    private hash: string;

    constructor(filePath: string) {
        this.filePath = filePath;

        this.hash = !fs.existsSync(filePath) ? '' : crypto.createHash('md5')
            .update(fs.readFileSync(filePath).toString())
            .digest('hex');
    }

    update(content: string | Buffer) {
        const newHash = crypto.createHash('md5')
            .update(content)
            .digest('hex');

        if (this.hash !== newHash) {
            this.hash = newHash;
            fs.writeFileSync(this.filePath, content);
        }
    }
}
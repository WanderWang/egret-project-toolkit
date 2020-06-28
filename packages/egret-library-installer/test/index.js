const lib = require('../lib/index');
const engineVersion = '5.3.7';

async function test() {
    await lib.downloadAndInstall(engineVersion);
}

test();


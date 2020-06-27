import download from 'download';

// 

// download()

async function run() {
    const url = 'https://github.com/egret-labs/egret-core/archive/v5.3.7.tar.gz';
    await download('http://unicorn.com/foo.jpg', 'dist');
}


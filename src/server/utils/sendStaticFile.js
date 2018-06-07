// @flow
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import isLegalAsset from './isLegalAsset';

const serverRootPath = __DEV__ ? './dist' : '/';

function sendStaticFile(req: Object, res: Object): void {
    const { url } = req;
    const filePath = path.resolve(path.join(serverRootPath, url));

    if (!isLegalAsset(url)) {
        console.log('>> Illegal static file:', url);

        return;
    }

    console.log('>> Static file:', req.url);

    res.writeHead(200, { 'content-type': mime.lookup(url) });
    fs.createReadStream(filePath).pipe(res);
}

export default sendStaticFile;

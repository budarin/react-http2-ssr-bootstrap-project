// @flow
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

import serverRoot from './serverRoot';
import isLegalAsset from './isLegalAsset';

function sendStaticFile(req: Object, res: Object): void {
    const { url } = req;
    const filePath = path.resolve(path.join(serverRoot, url));

    if (!isLegalAsset(url)) {
        console.log('>> Illegal static file:', url); // eslint-disable-line no-console

        return;
    }

    console.log('>> Static file:', req.url); // eslint-disable-line no-console

    res.writeHead(200, { 'content-type': mime.lookup(url) });
    fs.createReadStream(filePath).pipe(res);
}

export default sendStaticFile;

import fs from 'fs';
import path from 'path';
import * as mime from 'mime-types';

import serverRoot from './serverRoot';
import isLegalAsset from './isLegalAsset';
import { Http2ServerResponse, Http2ServerRequest } from 'http2'; // tslint:disable-line

function sendStaticFile(req: Http2ServerRequest, res: Http2ServerResponse): void {
    const { url } = req;
    const filePath = path.resolve(path.join(serverRoot, url));

    if (!isLegalAsset(url)) {
        console.log('>> Illegal static file:', url); // tslint:disable-line

        return;
    }

    console.log('>> Static file:', req.url); // tslint:disable-line

    res.writeHead(200, {
        'content-type': mime.lookup(url) || '',
    });
    // @ts-ignore
    fs.createReadStream(filePath).pipe(res);
}

export default sendStaticFile;

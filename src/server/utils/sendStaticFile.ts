import fs from 'fs';
import path from 'path';
import debug from 'debug';
import * as mime from 'mime-types';

import serverRootPath from './serverRootPath';
import isLegalAsset from './isLegalAsset';
import { Http2ServerResponse, Http2ServerRequest } from 'http2'; // tslint:disable-line

const log = debug('app:server');

function sendStaticFile(req: Http2ServerRequest, res: Http2ServerResponse): void {
    const { url } = req;
    const filePath = path.resolve(path.join(serverRootPath, url));

    if (!isLegalAsset(url)) {
        log('>> Illegal static file:', url);

        return;
    }

    log('>> Static file:', req.url);

    res.writeHead(200, {
        'content-type': mime.lookup(url) || '',
    });
    // @ts-ignore
    fs.createReadStream(filePath).pipe(res);
}

export default sendStaticFile;

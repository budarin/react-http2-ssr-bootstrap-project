// @flow
import path from 'path';
import http2 from 'http2';
import mime from 'mime-types';

import isLegalAsset from './isLegalAsset';
import respondToStreamError from './respondToStreamError';

const serverRootPath = './dist';
const { HTTP2_HEADER_PATH } = http2.constants;

function sendStaticFile(stream: Object, headers: Object) {
    const fullPath = headers[HTTP2_HEADER_PATH];
    const responseMimeType = mime.lookup(fullPath);

    if (!isLegalAsset(fullPath)) {
        console.log('>> Illegal static file:', fullPath);

        return;
    }

    console.log('>> Static file:', fullPath);

    stream.respondWithFile(
        path.resolve(path.join(serverRootPath, fullPath)),
        { 'content-type': responseMimeType },
        { onError: err => respondToStreamError(err, stream) },
    );
}

export default sendStaticFile;

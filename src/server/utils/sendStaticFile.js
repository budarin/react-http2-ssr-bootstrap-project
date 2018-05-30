// @flow
import path from 'path';
import http2 from 'http2';
import mime from 'mime-types';

import serverRoot from './serverRoot';
import respondToStreamError from './respondToStreamError';

const { HTTP2_HEADER_PATH } = http2.constants;

function sendStaticFile(stream: Object) {
    const fullPath = headers[HTTP2_HEADER_PATH];

    if (fullPath !== '/bundle.js') {
        return;
    }

    // only for development mode
    const responseMimeType = mime.lookup(fullPath);

    // handle static file for non pushed assets
    console.log('>> Static file:', fullPath);

    stream.respondWithFile(
        path.resolve(path.join(serverRoot, fullPath)),
        { 'content-type': responseMimeType },
        { onError: err => respondToStreamError(err, stream) },
    );
}

export default sendStaticFile;

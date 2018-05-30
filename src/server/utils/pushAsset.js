// @flow
import path from 'path';
import http2 from 'http2';

import respondToStreamError from './respondToStreamError';
import serverRoot from './serverRoot';

const { HTTP2_HEADER_PATH } = http2.constants;

const pushAsset = (stream: Object, file: Object) => {
    //const filePath = path.resolve(path.join(serverRoot, file.filePath));

    stream.pushStream({ [HTTP2_HEADER_PATH]: file.path }, { parent: stream.id }, (err, pushStream) => {
        if (err) {
            console.log('>> Pushing error:', err);
            return;
        }

        console.log('>> Pushing:', file.path);

        pushStream.on('error', err => respondToStreamError(err, pushStream));
        pushStream.respondWithFile(file.fullPath, file.headers);
    });
};

export default pushAsset;

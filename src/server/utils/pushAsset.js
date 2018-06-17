// @flow
import path from 'path';
// $FlowIgnore
import http2 from 'http2'; // eslint-disable-line

import serverRoot from './serverRoot';
import respondToStreamError from './respondToStreamError';

const { HTTP2_HEADER_PATH } = http2.constants;

const pushAsset = (stream: Object, file: Object): void => {
    stream.pushStream({ [HTTP2_HEADER_PATH]: file.path }, { parent: stream.id }, (err, pushStream) => {
        if (err) {
            console.log('>> Pushing error:', err); // eslint-disable-line no-console
            return;
        }

        console.log('>> Pushing:', file.path); // eslint-disable-line no-console

        pushStream.on('error', err => respondToStreamError(err, pushStream));

        const absFilePath = path.resolve(path.join(serverRoot, file.filePath));

        try {
            pushStream.respondWithFile(absFilePath, file.headers);
        } catch (err) {
            console.log('pushing error', err); // eslint-disable-line no-console
        }
    });
};

export default pushAsset;

import path from 'path';
import http2, { ServerHttp2Stream } from 'http2'; // tslint:disable-line

import serverRoot from './serverRoot';
import respondToStreamError from './respondToStreamError';
import { IFile } from './getFileDescription';

const { HTTP2_HEADER_PATH } = http2.constants;

const pushAsset = (stream: ServerHttp2Stream, file: IFile): void => {
    stream.pushStream(
        { [HTTP2_HEADER_PATH]: file.path },
        // @ts-ignore
        { parent: stream.id },
        (err: Error | null, pushStream: ServerHttp2Stream) => {
            if (err) {
                console.log('>> Pushing error:', err); // tslint:disable-line

                return;
            }

            console.log('>> Pushing:', file.path); // tslint:disable-line

            pushStream.on('error', (err1: Error) => respondToStreamError(err1, pushStream));

            const absFilePath = path.resolve(path.join(serverRoot, file.filePath));

            try {
                pushStream.respondWithFile(absFilePath, file.headers);
            } catch (err) {
                console.log('pushing error', err); // tslint:disable-line
            }
        },
    );
};

export default pushAsset;

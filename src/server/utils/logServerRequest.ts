import debug from 'debug';
import { Http2ServerRequest } from 'http2'; // tslint:disable-line

const log = debug('app:server');

function logServerRequest(req: Http2ServerRequest): void {
    const { url, method } = req;

    log('>> Path:', url, '>> Method:', method);
}

export default logServerRequest;

import { Http2ServerRequest } from 'http2'; // tslint:disable-line

function logServerRequest(req: Http2ServerRequest): void {
    const { url, method } = req;

    console.log('>> Path:', url, '>> Method:', method); // tslint:disable-line
}

export default logServerRequest;

import { Http2ServerRequest } from 'http2'; // tslint:disable-line

const legalRoutes = ['/'];

function isLegalRoute(req: Http2ServerRequest): boolean {
    return legalRoutes.indexOf(req.url) > -1;
}

export default isLegalRoute;

import { Http2ServerRequest } from 'http2'; // tslint:disable-line

import { legalRoutes } from './legalRoutes';

function isLegalRoute(req: Http2ServerRequest): boolean {
    const route = req.url.split('?')[0];

    return legalRoutes.indexOf(route) > -1;
}

export default isLegalRoute;

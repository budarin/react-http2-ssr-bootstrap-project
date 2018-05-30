// @flow
import http2 from 'http2';

const { HTTP2_HEADER_PATH } = http2.constants;

function isLegalRoute(headers: Object) {
    const fullPath = headers[HTTP2_HEADER_PATH];
    const legalRoutes = ['/'];

    return legalRoutes.indexOf(fullPath) > -1;
}

export default isLegalRoute;

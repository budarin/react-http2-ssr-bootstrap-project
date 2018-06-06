// @flow
import http2 from 'http2';

const { HTTP2_HEADER_PATH, HTTP2_HEADER_METHOD } = http2.constants;

function logServerRequest(headers) {
    const fullPath = headers[HTTP2_HEADER_PATH];
    const method = headers[HTTP2_HEADER_METHOD];

    console.log('>> Path:', fullPath, '>> Method:', method);
}

export default logServerRequest;

import http2 from 'http2'; // eslint-disable-line

const { HTTP_STATUS_NOT_FOUND, NGHTTP2_REFUSED_STREAM, HTTP_STATUS_INTERNAL_SERVER_ERROR } = http2.constants;

export default function respondToStreamError(err, stream) {
    console.log('respondToStreamError', err); // eslint-disable-line no-console

    const isRefusedStream = err.code === 'ERR_HTTP2_STREAM_ERROR' && stream.rstCode === NGHTTP2_REFUSED_STREAM;

    if (isRefusedStream || stream.closed) {
        return;
    }

    if (err.code === 'ENOENT') {
        stream.respond({ ':status': HTTP_STATUS_NOT_FOUND });
    } else {
        stream.respond({ ':status': HTTP_STATUS_INTERNAL_SERVER_ERROR });
    }

    stream.end();
}

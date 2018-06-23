import debug from 'debug';
import * as React from 'react';
import { renderToNodeStream } from 'react-dom/server'; // tslint:disable-line

import App from '../../common/App';
import renderHTMLHeader from './renderHTMLHeader';
import renderHTMLBottom from './renderHTMLBottom';
import addPreLoadsToHeaders from './addPreLoadsToHeaders';
import { Http2ServerRequest, Http2ServerResponse } from 'http2'; // tslint:disable-line

const headers = { 'content-type': 'text/html; charset=utf-8' };
const preventClosingStream = { end: false };
const log = debug('app:server');

function renderApp(req: Http2ServerRequest, res: Http2ServerResponse): void {
    const isHttp2 = req.httpVersion.startsWith('2.');

    log('>> Render app');

    if (!isHttp2) {
        addPreLoadsToHeaders(headers); // preload should not be used with push
    }

    res.writeHead(200, headers);
    res.write(renderHTMLHeader());

    const appStream = renderToNodeStream(<App />);

    appStream.pipe(
        // @ts-ignore
        res,
        preventClosingStream,
    );
    appStream.on('end', () => res.end(renderHTMLBottom()));
}

export default renderApp;

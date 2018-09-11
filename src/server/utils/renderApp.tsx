import debug from 'debug';
import * as React from 'react';
import { renderToString } from 'react-dom/server'; // tslint:disable-line
import { Http2ServerRequest, Http2ServerResponse } from 'http2'; // tslint:disable-line

import App from '../../common/App';
import renderHTMLHeader from './renderHTMLHeader';
import renderHTMLBottom from './renderHTMLBottom';
import addPreLoadsToHeaders from './addPreLoadsToHeaders';
import renderRemoveSplashScript from './renderRemoveSplashSript';

const log = debug('app:server');
const headers = { 'content-type': 'text/html; charset=utf-8' };

function isHttp2(req: Http2ServerRequest): boolean {
    return req.httpVersion.startsWith('2.');
}

function renderApp(req: Http2ServerRequest, res: Http2ServerResponse): void {
    log('>> Render app');

    if (!isHttp2(req)) {
        addPreLoadsToHeaders(headers); // preload should not be used with push
    }

    res.writeHead(200, headers);
    res.write(renderHTMLHeader());

    const appString = renderToString(<App />);

    // emulate long ssr
    setTimeout(() => {
        res.write(renderRemoveSplashScript());
        res.write(appString);
        res.end(renderHTMLBottom());
    }, 0);
}

export default renderApp;

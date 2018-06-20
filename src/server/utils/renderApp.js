import * as React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import App from '../../common/App';
import renderHTMLHeader from './renderHTMLHeader';
import renderHTMLBottom from './renderHTMLBottom';
import addPreLoadsToHeaders from './addPreLoadsToHeaders';

const headers = { 'content-type': 'text/html; charset=utf-8' };
const preventClosingStream = { end: false };

function renderApp(req, res) {
    const isHttp2 = req.httpVersion.startsWith('2.');

    console.log('>> Render app');

    if (!isHttp2) {
        addPreLoadsToHeaders(headers); // preload should not be used with push
    }

    res.writeHead(200, headers);
    res.write(renderHTMLHeader());

    const appStream = renderToNodeStream(<App />);

    appStream.pipe(
        res,
        preventClosingStream,
    );
    appStream.on('end', () => res.end(renderHTMLBottom()));
}

export default renderApp;

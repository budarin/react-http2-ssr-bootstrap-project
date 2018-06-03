// @flow
import * as React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import App from '../../common/App';
import env from '../../utils/env';

function renderApp(stream: Object) {
    const appStream = renderToNodeStream(<App />);

    stream.respond({
        'content-type': 'text/html; charset=utf-8',
        ':status': 200,
    });

    stream.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
                <meta name="Description" content="Simple SSR React project.">
                <link rel="manifest" href="/manifest.json">
                <title>React SSR project</title>
            </head>
            <body>
                <div id="app">`);

    appStream.on('end', () => {
        stream.end(`</div>
                <script src="${env.STATIC_URL}client.js"></script>
            </body>
            <html>`);
    });

    appStream.pipe(
        stream,
        { end: false },
    );
}

export default renderApp;

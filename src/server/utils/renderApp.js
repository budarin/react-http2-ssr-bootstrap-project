// @flow
import * as React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import env from '../../utils/env';
import App from '../../common/App';

function renderApp(stream: Object) {
    console.log('>> Render app');

    stream.respond({
        'content-type': 'text/html; charset=utf-8',
        ':status': 200,
    });

    // it's unnecessary to push app.css - css applies at runtime in App.js
    // it's only for demonstration of push technology
    stream.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="theme-color" content="#E6492F">
                <link rel="manifest" href="/manifest.json">
                <title>React SSR project</title>
                <meta name="Description" content="Simple SSR React project.">
                <meta http-equiv="Accept-CH" content="DPR, Viewport-Width, Width, Downlink">
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
                <link rel="preload" type="text/css" href="/app.css" as="style" />
                <link rel="stylesheet" type="text/css" href="/app.css" />
            </head>
            <body>
                <div id="app">`);

    const appStream = renderToNodeStream(<App />);

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

import env from '../../utils/getEnv';
import { version } from '../../../package.json';

function renderHTMLHeader(): string {
    // TODO: fixme <link rel="preload" href="/manifest.json" as="fetch">

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="app-version" content="${version}">
            <meta name="theme-color" content="#E6492F">
            <title>React SSR project</title>
            <meta name="Description" content="Simple SSR React project.">
            <meta http-equiv="Accept-CH" content="DPR, Viewport-Width, Width, Downlink">
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes,shrink-to-fit=no">
            <link rel="manifest" href="/manifest.json">
            
            <script src="${env.STATIC_URL}client.js" defer></script>
            <link rel="stylesheet" type="text/css" href="/default.css" />
        </head>
        <body>
            <div id="root">`;
}

export default renderHTMLHeader;

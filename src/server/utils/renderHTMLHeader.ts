import env from '../../utils/getEnv';

function renderHTMLHeader(): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="theme-color" content="#E6492F">
            <link rel="manifest" href="/manifest.json">
            <title>React SSR project</title>
            <meta name="Description" content="Simple SSR React project.">
            <meta http-equiv="Accept-CH" content="DPR, Viewport-Width, Width, Downlink">
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes,shrink-to-fit=no">
            
            <script src="${env.STATIC_URL}client.js" defer></script>
            <link rel="stylesheet" type="text/css" href="/default.css" />
        </head>
        <body>
            <div id="app">`;
}

export default renderHTMLHeader;

import fs from 'fs';
import branch from 'git-branch';
import env from '../../utils/getEnv';
import * as packageJson from '../../../package.json';

const ress = fs.readFileSync('./node_modules/ress/dist/ress.min.css', { encoding: 'utf-8' });
const branchName = branch.sync();
const version = (packageJson as any).version;

function renderHTMLHeader(): string {
    // TODO: fixme <link rel="preload" href="/manifest.json" as="fetch">

    return `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="version" content="${version}">
            <meta name="branch" content="${branchName}">
            <meta name="theme-color" content="#E6492F">
            <title>React SSR project</title>
            <meta name="Description" content="Simple SSR React project.">
            <meta http-equiv="Accept-CH" content="DPR, Viewport-Width, Width, Downlink">
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes,shrink-to-fit=no">
            <link rel="manifest" href="/manifest.json">
            
            <style id="ress">${ress}</style>
            
            <!-- for dev mode only -->
            <script src="/react.development.js" defer></script>
            <script src="/react-dom.development.js" defer></script>
            <!-- for dev mode only -->    

            <script src="${env.STATIC_URL}client.js" defer></script>
            <link rel="stylesheet" type="text/css" href="/default.css" />
        </head>
        <body>
            <main id="root">
            <script>
                window.splashTimer = setTimeout(() => {
                    const rootEl = document.getElementById('root');

                    const splash = document.createElement('div');
                    splash.id = 'splash';
                    splash.style = 'height: 100%; display: flex; align-items: center; justify-content: center';
                    splash.textContent = 'Spash Screen!';

                    rootEl.append(splash);

                    window.showingSpash = true;

                    setTimeout(() => {
                        window.showingSpash = false;
                        if (window.onEndOfShowingSplash) {
                            window.onEndOfShowingSplash();
                        }
                    }, 300);
                }, 150);
            </script>
            `;
}

export default renderHTMLHeader;

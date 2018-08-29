import branch from 'git-branch';
import env from '../../utils/getEnv';
import * as packageJson from '../../../package.json';

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
            
            <!-- for dev mode only -->
            <script src="/react.development.js" defer></script>
            <script src="/react-dom.development.js" defer></script>
            <!-- for dev mode only -->    

            <script src="${env.STATIC_URL}client.js" defer></script>
            <link rel="stylesheet" type="text/css" href="/default.css" />
        </head>
        <body>
            <main id="root">`;
}

export default renderHTMLHeader;

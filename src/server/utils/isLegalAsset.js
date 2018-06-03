// @flow
const legalAssets: Array<string> = [
    '/app.css',
    '/bundle.js',
    '/favicon.ico',
    '/manifest.json',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
];

function isLegalAsset(asset: string): boolean {
    return legalAssets.indexOf(asset) > -1;
}

export default isLegalAsset;

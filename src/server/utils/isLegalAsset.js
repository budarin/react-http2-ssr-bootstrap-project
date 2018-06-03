// @flow

function isLegalAsset(asset: string): boolean {
    const legalAssets = [
        '/bundle.js',
        '/favicon.ico',
        '/manifest.json',
        '/android-chrome-192x192.png',
        '/android-chrome-512x512.png',
    ];

    return legalAssets.indexOf(asset) > -1;
}

export default isLegalAsset;

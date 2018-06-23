const legalAssets = [
    '/default.css',
    '/bundle.js',
    '/favicon.ico',
    '/manifest.json',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
];

function isLegalAsset(assetName: string): boolean {
    return legalAssets.indexOf(assetName) > -1;
}

export default isLegalAsset;

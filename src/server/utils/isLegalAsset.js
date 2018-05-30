// @flow

function isLegalAsset(asset: string): boolean {
    const legalAssets = ['icon.ico', '/bundle.js'];

    return legalAssets.indexOf(asset) > -1;
}

export default isLegalAsset;

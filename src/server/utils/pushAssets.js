// @flow
import pushAsset from './pushAsset';
import getFileDescription from './getFileDescription';

function pushAssets(stream: Object) {
    pushAsset(stream, getFileDescription('app.css'));
    pushAsset(stream, getFileDescription('manifest.json'));

    if (process.env.NODE_ENV === 'production') {
        pushAsset(stream, getFileDescription('client.js'));
    }
}

export default pushAssets;

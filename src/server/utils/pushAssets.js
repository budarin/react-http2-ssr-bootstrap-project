// @flow
import pushAsset from './pushAsset';
import getFileDescription from './getFileDescription';

function pushAssets(stream: Object) {
    // it's unnecessary to push app.css - css applies at runtime in App.js
    // it's only for demonstration of push technology
    pushAsset(stream, getFileDescription('app.css'));
    // pushAsset(stream, getFileDescription('manifest.json'));

    if (process.env.NODE_ENV === 'production') {
        pushAsset(stream, getFileDescription('client.js'));
    }
}

export default pushAssets;

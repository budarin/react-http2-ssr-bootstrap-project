// @flow
import pushAsset from './pushAsset';

function pushAssets(stream: Object) {
    if (process.env.NODE_ENV === 'production') {
        pushAsset(stream, {
            path: '/client.js',
            fullPath: './client.js',
            headers: { 'content-type': 'application/javascript' },
        });
    }
}

export default pushAssets;

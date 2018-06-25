import { Http2ServerRequest, Http2ServerResponse } from 'http2'; // tslint:disable-line

import pushAsset from './pushAsset';
import getFileDescription from './getFileDescription';

async function pushAssets(req: Http2ServerRequest, res: Http2ServerResponse) {
    const isHttp2 = req.httpVersion.startsWith('2.');

    if (!isHttp2) {
        return;
    }

    const { stream } = res;

    // it's unnecessary to push app.css - css applies at runtime in App.js
    // it's only for demonstration of push technology
    pushAsset(stream, getFileDescription('default.css'));
    // pushAsset(stream, getFileDescription('manifest.json'));

    if (process.env.NODE_ENV === 'production') {
        pushAsset(stream, getFileDescription('client.js'));
    }
}

export default pushAssets;

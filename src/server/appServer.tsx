import { Http2ServerRequest, Http2ServerResponse } from 'http2'; // tslint:disable-line

import renderApp from './utils/renderApp';
import pushAssets from './utils/pushAssets';
import isLegalRoute from './utils/isLegalRoute';
import sendStaticFile from './utils/sendStaticFile';
import logServerRequest from './utils/logServerRequest';

const app = async (req: Http2ServerRequest, res: Http2ServerResponse) => {
    logServerRequest(req);

    if (req.url === '/ping') {
        res.writeHead(200, { 'content-type': 'text' });
        res.end(Date.now().toString());
        return;
    }

    if (isLegalRoute(req)) {
        await pushAssets(req, res);
        return renderApp(req, res);
    }

    // if (process.env.__DEV__) {
    // handle static files for non pushed assets
    // nginx will do it in production
    sendStaticFile(req, res);
    // }
};

export default app;

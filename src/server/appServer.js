// @flow
import renderApp from './utils/renderApp';
import pushAssets from './utils/pushAssets';
import sendStaticFile from './utils/sendStaticFile';
import logServerRequest from './utils/logServerRequest';
import isLegalRoute from './utils/isLegalRoute';

const app = async (req, res) => {
    const isHttp2 = req.httpVersion.startsWith('2.');

    logServerRequest(req);

    if (isLegalRoute(req.url)) {
        await pushAssets(res, isHttp2);

        renderApp(req, res, isHttp2);
    } else {
        // only for development mode
        // handle static files for non pushed assets
        // nginx will do it in production
        sendStaticFile(req, res);
    }
};

export default app;

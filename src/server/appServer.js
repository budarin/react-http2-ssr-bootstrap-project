import renderApp from './utils/renderApp';
import pushAssets from './utils/pushAssets';
import sendStaticFile from './utils/sendStaticFile';
import logServerRequest from './utils/logServerRequest';
import isLegalRoute from './utils/isLegalRoute';

const app = async (req, res) => {
    logServerRequest(req);

    if (isLegalRoute(req)) {
        await pushAssets(req, res);

        return renderApp(req, res);
    }

    if (__DEV__) {
        // handle static files for non pushed assets
        // nginx will do it in production
        sendStaticFile(req, res);
    }
};

export default app;

// @flow
import renderApp from './utils/renderApp';
import pushAssets from './utils/pushAssets';
import sendStaticFile from './utils/sendStaticFile';
import logServerRequest from './utils/logServerRequest';
import isLegalRoute from './utils/isLegalRoute';

const app = async (stream: Object, headers: Object) => {
    logServerRequest(headers);

    if (isLegalRoute(headers)) {
        await pushAssets(stream);

        renderApp(stream);
    } else {
        // only for development mode
        // handle static files for non pushed assets
        // nginx will do it in production
        sendStaticFile(stream, headers);
    }
};

export default app;

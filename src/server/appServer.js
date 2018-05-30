// @flow
import renderApp from './utils/renderApp';
import pushAssets from './utils/pushAssets';
import sendStaticFile from './utils/sendStaticFile';
import logServerRequest from './utils/logServerRequest';
import isLegalRoute from './utils/isLegalRoute';

const app = (stream: Object, headers: Object) => {
    logServerRequest(headers);

    if (isLegalRoute(headers)) {
        pushAssets(stream);
        renderApp(stream);
    } else {
        // handle static file for non pushed assets
        // only for development mode
        // nginx will do it in production
        sendStaticFile(stream, headers);
    }
};

export default app;

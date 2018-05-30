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
        sendStaticFile(stream);
    }
};

export default app;

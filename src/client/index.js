// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import App from '../common/App';

function renderApp() {
    const app = document.getElementById('app');

    app && ReactDOM.hydrate(<App />, app);
}

renderApp();

if (process.env.NODE_ENV === 'development') {
    // $FlowIgnore
    module.hot.accept('../common/App', () => {
        renderApp();
    });
}

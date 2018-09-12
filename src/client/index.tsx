import React from 'react';
import ReactDOM from 'react-dom';
import App from '../common/App';

function renderApp() {
    const APP_ROOT_ID = 'root';
    let appRoot = document.getElementById(APP_ROOT_ID);

    if (!appRoot) {
        appRoot = document.body.appendChild(document.createElement('div'));
        appRoot.id = APP_ROOT_ID;
    }

    ReactDOM.hydrate(<App />, appRoot, () => {
        const body = document.querySelector('body');

        if (body) {
            body.classList.add('interactive');
        }
    });
}

if ((window as any).showingSpash) {
    (window as any).renderClient = renderApp;
} else {
    renderApp();
}

if (process.env.__DEV__) {
    require('webpack-serve-overlay'); // tslint:disable-line

    if (module.hot) {
        module.hot.accept('../common/App', () => {
            renderApp();
        });
    }
}

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../common/App';

function renderApp() {
    const app = document.getElementById('app');

    if (app) {
        ReactDOM.hydrate(<App />, app, () => {
            const body = document.querySelector('body');

            if (body) {
                body.classList.add('interactive');
            }
        });
    }
}

renderApp();

if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept('../common/App', () => {
            renderApp();
        });
    }
}

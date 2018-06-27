import React from 'react';
import { hot } from 'react-hot-loader';

import appStyles from './app.css';

const css = __BROWSER__ ? appStyles.locals : appStyles;

function App() {
    if (__BROWSER__) {
        appStyles.use();
    }

    return <p className={css.hello}>Hello World!</p>;
}

export default hot(module)(App);

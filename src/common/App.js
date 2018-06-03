// @flow
import React from 'react';
import appStyles from './app.css';

const css = __BROWSER__ ? appStyles.locals : appStyles;

function App() {
    if (!__SERVER__) {
        appStyles.use();
    }

    return <p className={css.hello}>Hello World!</p>;
}

// Demo of working flow
function a(b: string): number {
    return b;
}

a('Hello');

export default App;

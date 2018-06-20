import React from 'react';
import appStyles from './app.css';

const css = __BROWSER__ ? appStyles.locals : appStyles;

function App() {
    if (__BROWSER__) {
        appStyles.use();
    }

    return <p className={css.hello}>Hello World!</p>;
}

function a(b) {
    return b;
}

a('Hello!');

export default App;

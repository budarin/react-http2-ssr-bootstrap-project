// @flow
import React from 'react';
import appStyles from './app.css';

type CSS = {|
    +hello: string,
|};

const css: CSS = __BROWSER__ ? appStyles.locals : appStyles;

function App() {
    if (__BROWSER__) {
        appStyles.use();
    }

    return <p className={css.hello}>Hello World!</p>;
}

// Demo of working flow
function a(b: string): number {
    return b.length;
}

a('Hello !');

export default App;

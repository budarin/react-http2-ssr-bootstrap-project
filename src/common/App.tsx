import * as React from 'react';

import appStyles from './app.css';
import MouseCoordinates from './components/MouseCoordinates';
import renderCoordinates from './components/renderCoordinates';

const css = __BROWSER__ ? appStyles.locals : appStyles;

class App extends React.Component {
    render() {
        if (__BROWSER__) {
            appStyles.use();
        }

        return (
            <>
                <span className={css.hello}>Hello World!</span>
                <MouseCoordinates>{renderCoordinates}</MouseCoordinates>
            </>
        );
    }
}

export default App;

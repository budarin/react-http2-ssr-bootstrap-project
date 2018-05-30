// @flow
import React from 'react';

function App() {
    return <p>Hello World!</p>;
}

// Demo of working flow
function a(b: string): number {
    return b;
}

a('Hello');

export default App;

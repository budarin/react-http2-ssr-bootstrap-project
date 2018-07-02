import React from 'react';
import { hot } from 'react-hot-loader';

const withHMR = <P extends object>(Component: React.ComponentType<P>): React.ComponentType<P> =>
    __DEV__ ? hot(module)(Component) : Component;

export default withHMR;

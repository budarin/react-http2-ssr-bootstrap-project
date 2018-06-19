// @flow

type CSSModule =
    | {
          locals: { [key: string]: string },
          use: Function,
          unuse: Function,
      }
    | { [key: string]: string };

const emptyCSSModule: CSSModule = __BROWSER__
    ? {
          locals: {},
          use: () => {},
          unuse: () => {},
      }
    : {};

export default emptyCSSModule;

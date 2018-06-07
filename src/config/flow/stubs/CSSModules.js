// @flow

type CSSModule =
    | {
          use: Function,
          unuse: Function,
          locals: {
              [key: string]: string,
          },
      }
    | { [key: string]: string };

const emptyCSSModule: CSSModule = __BROWSER__
    ? {
          use: () => {},
          unuse: () => {},
          locals: {},
      }
    : {};

export default emptyCSSModule;

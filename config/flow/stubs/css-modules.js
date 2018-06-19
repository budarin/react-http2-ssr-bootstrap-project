// @flow

type CSSModuleType =
    | {
          locals: { [key: string]: string },
          use: Function,
          unuse: Function,
      }
    | { [key: string]: string };

const CSSModule: CSSModuleType = __BROWSER__
    ? {
          locals: {},
          use: () => {},
          unuse: () => {},
      }
    : {};

export default CSSModule;

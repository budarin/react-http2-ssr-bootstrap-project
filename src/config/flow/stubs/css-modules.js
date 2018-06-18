// @flow

export default (__BROWSER__
    ? {
          use: () => {},
          unuse: () => {},
          locals: {},
      }
    : {});

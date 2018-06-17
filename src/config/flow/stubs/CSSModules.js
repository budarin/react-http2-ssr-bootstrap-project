// @flow

export type CSSModule =
    | {
          use: Function,
          unuse: Function,
          locals: {
              [key: string]: string,
          },
      }
    | { [key: string]: string };

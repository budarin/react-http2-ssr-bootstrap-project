// @flow

declare module CSSModule {
    declare var exports:
        | {
              locals: { [key: string]: string },
              use: Function,
              unuse: Function,
          }
        | { [key: string]: string };
}

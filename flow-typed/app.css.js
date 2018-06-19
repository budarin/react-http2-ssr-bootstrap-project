// @flow

declare module 'app.css' {
    declare export function use(): void;
    declare export function unuse(): void;
    declare export var locals: { [string]: any };
}

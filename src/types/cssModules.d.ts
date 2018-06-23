/* 
* декларируем .css модуль
*/

interface ClassHash {
    [name: string]: string;
}

interface CssModule {
    use: Function;
    unuse: Function;
    ref: Function;
    unref: Function;
    locals: ClassHash;
}

interface Stringifyable {
    toString(): string;
}
interface SelectorNode {
    [key: string]: string;
}

declare module '*.css' {
    const styles: SelectorNode & Stringifyable & CssModule;
    export default styles;
}

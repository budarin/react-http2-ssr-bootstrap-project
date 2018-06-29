/* 
* декларируем .css модуль
*/

export interface IClassHash {
    [name: string]: string;
}

export interface ICssModule {
    use: Function;
    unuse: Function;
    ref: Function;
    unref: Function;
    locals: IClassHash;
}

export interface IStringifyable {
    toString(): string;
}
export interface ISelectorNode {
    [key: string]: string;
}

declare module '*.css' {
    const styles: ISelectorNode & IStringifyable & ICssModule;
    export default styles;
}

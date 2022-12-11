import { Dependency } from '../sgvizler';
/**
 * Todo
 *
 * @class sgvizler.visualization.Loader
 * @memberof sgvizler.visualization
 */
export declare class Loader {
    private static _load;
    private static _loaded;
    private static _dependenciesToLoad;
    private static _pathScripts;
    private static _listCallEvent;
    static on(event: string, fn: any): void;
    static detectRoot(): void;
    static isLoad(dep: Dependency): boolean;
    static isLoaded(dep: Dependency): boolean;
    static load(dep: Dependency): void;
    private static fireEvent;
    private static checkDependenciesToLoad;
    private static getAbsoluteURL;
    private static loadScript;
    private static loadCss;
}

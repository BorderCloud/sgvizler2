/**
 * Todo comment
 * @class sgvizler.Tools
 * @memberof sgvizler
 */
export declare class Tools {
    /**
     * Gets the object located at `path` from `object`. `path`
     * is given in dot notation.
     * Search in first in the library and after in window object
     * @param {string} path
     * @param object
     * @returns { any }  or undefined
     */
    static getObjectByPath(path: string, object?: any): any;
    static assignProperty(obj: any, path: string, value: any): any;
    static encodeHtml(str: string): string;
    static decodeHtml(str: string): string;
    private static getJSONByPath;
    private static assignJSON;
    private static convertToBoolean;
    private static assign;
    private static mergeInObject;
    private static isPlainObject;
    static sizeConvertInteger(x: any): number | null;
}

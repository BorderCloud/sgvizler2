/**
 *
 * @class sgvizler.Core
 * @memberof sgvizler
 */
export declare class Core {
    /**
     * todo
     * @returns {string}
     */
    static get path(): string;
    /**
     * todo
     * @param {string} value
     */
    static set path(value: string);
    /**
     * The version number of this sgvizler2.
     * @static
     * @readonly
     * @type {string} VERSION
     */
    static readonly VERSION: string;
    /**
     * sgvizler2's homepage.
     * @static
     * @readonly
     * @type {string} HOMEPAGE
     */
    static readonly HOMEPAGE: string;
    /**
     * sgvizler2's docs path
     * @static
     * @readonly
     * @type {string} DOCPATH
     */
    static readonly DOCPATH: string;
    private static _path;
}

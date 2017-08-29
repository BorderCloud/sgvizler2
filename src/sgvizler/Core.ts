/**
 *
 * @class sgvizler.Core
 * @memberof sgvizler
 */
export class Core {

    /**
     * todo
     * @returns {string}
     */
    static get path (): string {
        return this._path
    }

    /**
     * todo
     * @param {string} value
     */
    static set path (value: string) {
        this._path = value
    }

    /**
     * The version number of this sgvizler2.
     * @static
     * @readonly
     * @type {string} VERSION
     */
    public static readonly VERSION: string = '0.0'

    /**
     * sgvizler2's homepage.
     * @static
     * @readonly
     * @type {string} HOMEPAGE
     */
    public static readonly HOMEPAGE: string = 'https://bordercloud.github.io/sgvizler2/index.html'

    /**
     * sgvizler2's docs path
     * @static
     * @readonly
     * @type {string} DOCPATH
     */
    public static readonly DOCPATH: string = 'https://bordercloud.github.io/sgvizler2/'

    private static _path: string = ''

}

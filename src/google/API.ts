/**
 * Todo API
 * @class google.API
 * @memberof google
 */
export class API {
    /**
     * todo
     * @returns {string}
     */
    static get key(): string {
        return this._key;
    }

    /**
     * todo
     * @param {string} value
     */
    static set key(value: string) {
        this._key = value;
    }

    /**
     * todo
     * @type {string}
     * @private
     */
    private static _key:string = ""
}

/**
 * Todo API
 * @class leaflet.API
 * @memberof google
 */
export class API {
    static get osmAccessToken (): string {
        return this._osmAccessToken
    }

    static set osmAccessToken (value: string) {
        this._osmAccessToken = value
    }

    /**
     * todo
     * @type {string}
     * @private
     */
    private static _osmAccessToken: string = ''
}

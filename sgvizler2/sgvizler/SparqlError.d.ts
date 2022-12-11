/**
 * todo
 * @class sgvizler.SparqlError
 * @memberof sgvizler
 */
export declare class SparqlError {
    static getErrorMessageWithStatus200(xhr: XMLHttpRequest): any;
    static getErrorWithOtherStatus(xhr: XMLHttpRequest, url: string): string;
}

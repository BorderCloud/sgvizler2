/**
 *
 * @class sgvizler.SPARQL_RESULT
 * @memberof sgvizler
 */
export declare enum SPARQL_RESULT {
    xml = 0,
    json = 1,
    jsonp = 2
}
/**
 *
 * @class sgvizler.SparqlTools
 * @memberof gvizler
 */
export declare class SparqlTools {
    static getOutputLabel(id: SPARQL_RESULT): string;
    static getXMLHttpRequestResponseType(id: SPARQL_RESULT): XMLHttpRequestResponseType;
    static getHeaderAccept(id: SPARQL_RESULT): string;
    static convertString(label: string): SPARQL_RESULT;
}

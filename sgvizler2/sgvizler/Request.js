import { SPARQL_RESULT, SparqlTools } from '../sgvizler';
import { SparqlError } from './SparqlError';
/**
 * Important class. Runs SPARQL query against SPARQL
 * endpoints.
 *
 * Dependencies:
 *
 *   - sgvizler.util
 *   - sgvizler.namespace
 *   - sgvizler.registry
 *   - sgvizler.parser
 *   - sgvizler.loader
 *   - sgvizler.logger
 *   - sgvizler.defaults
 *   - jQuery
 *   - google.visualization
 *
 *
 * Example of how to use the Query class:
 *
 *     var sparqlQueryString = "SELECT * {?s ?p ?o} LIMIT 10",
 *         containerID = "myElementID",
 *         Q = new sgvizler.Query();
 *
 *     // Note that default values may be set in the sgvizler object.
 *     Q.query(sparqlQueryString)
 *         .endpointURL("http://dbpedia.org/sparql")
 *         .endpointOutputFormat("json")                    // Possible values 'xml', 'json', 'jsonp'.
 *         .chartFunction("google.visualization.BarChart")  // The name of the function to draw the chart.
 *         .draw(containerID);                              // Draw the chart in the designated HTML element.
 *
 * @class sgvizler.Request
 * @memberof sgvizler
 */
export class Request {
    // private _endpointResultsUrlPart: string
    // // private _chartPathFunction: string
    // private _endpointURL: string
    /**
     *
     * @returns {string}
     */
    get method() {
        return this._method;
    }
    /**
     *
     * @param {string} value
     */
    set method(value) {
        this._method = value;
    }
    /**
     *
     * @returns {Container}
     */
    get container() {
        return this._container;
    }
    /**
     *
     * @param {Container} value
     */
    set container(value) {
        this._container = value;
    }
    /**
     * Get query string.
     * @method query
     * @public
     * @return {string}
     */
    get query() {
        return this._query;
    }
    /**
     * Set query string.
     * @method query
     * @public
     * @chainable
     * @param value
     */
    set query(value) {
        this._query = value;
    }
    /**
     * Get endpoint URL.
     * @method endpointURL
     * @public
     * @return {string}
     */
    get endpoint() {
        return this._endpoint;
    }
    /**
     * Set endpoint URL.
     * @method endpointURL
     * @public
     * @chainable
     * @example
     *     sgvizler.endpointURL('http://sparql.dbpedia.org');
     *   sets this Query object's endpoint to DBpedia.
     * @param value
     */
    set endpoint(value) {
        this._endpoint = value;
    }
    /**
     * Get endpoint output format.
     * @method endpointOutputFormat
     * @public
     * @return {string}
     */
    get endpointOutputFormat() {
        return this._endpointOutputFormat;
    }
    /**
     * Set endpoint output format. Legal values are `'xml'`,
     * `'json'`, `'jsonp'`.
     * @method endpointOutputFormat
     * @public
     * @chainable
     * @param value
     */
    set endpointOutputFormat(value) {
        this._endpointOutputFormat = value;
    }
    /**
     * todo
     * @returns {string}
     */
    get queryParameter() {
        return this._queryParameter;
    }
    /**
     * todo
     * @param {string} value
     */
    set queryParameter(value) {
        this._queryParameter = value;
    }
    constructor() {
        this._query = '';
        this._endpoint = '';
        this._endpointOutputFormat = SPARQL_RESULT.json;
        this._method = 'GET';
        this._queryParameter = 'query';
        this.listeners = {};
    }
    sendRequest() {
        let myRequest = this;
        // Create new promise with the Promise() constructor;
        // This has as its argument a function
        // with two parameters, resolve and reject
        return new Promise(function (resolve, reject) {
            // Standard XHR to load an image
            let xhr = new XMLHttpRequest();
            let data;
            let url = myRequest.endpoint;
            if (myRequest.method.toLowerCase() === 'get') {
                url += '?' + myRequest.queryParameter + '=' + encodeURIComponent(myRequest.query) +
                    '&output=' + SparqlTools.getOutputLabel(myRequest.endpointOutputFormat);
            }
            else {
                data = myRequest.queryParameter + '=' + encodeURIComponent(myRequest.query);
            }
            xhr.open(myRequest.method, url, true);
            xhr.setRequestHeader('Accept', SparqlTools.getHeaderAccept(myRequest.endpointOutputFormat));
            // hide errors xhr.responseType = SparqlTools.getXMLHttpRequestResponseType(myRequest.endpointOutputFormat)
            // TODO check progress
            xhr.onprogress = function (oEvent) {
                if (oEvent.lengthComputable) {
                    let percentComplete = (oEvent.loaded / oEvent.total) * 100;
                    console.log('onprogress' + percentComplete);
                }
                else {
                    // Impossible de calculer la progression puisque la taille totale est inconnue
                }
            };
            // When the request loads, check whether it was successful
            xhr.onload = function (options) {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        // If successful, resolve the promise by passing back the request response
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        // If it fails, reject the promise with a error message
                        reject(SparqlError.getErrorMessageWithStatus200(xhr));
                    }
                }
            };
            xhr.onerror = () => reject(SparqlError.getErrorWithOtherStatus(xhr, url));
            // Send the request
            if (data) {
                xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                xhr.send(data);
            }
            else {
                xhr.send();
            }
            // console.log(myRequest.query)
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZ3Zpemxlci9SZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFSCxhQUFhLEVBQ2IsV0FBVyxFQUNkLE1BQU0sYUFBYSxDQUFBO0FBQ3BCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFFM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NHO0FBQ0gsTUFBTSxPQUFPLE9BQU87SUFVaEIsMENBQTBDO0lBQzFDLHdDQUF3QztJQUN4QywrQkFBK0I7SUFFL0I7OztPQUdHO0lBQ0gsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLE1BQU0sQ0FBRSxLQUFhO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO0lBQ3hCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUE7SUFDMUIsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUksU0FBUyxDQUFFLEtBQWdCO1FBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFBO0lBQzNCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUN0QixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsSUFBSSxLQUFLLENBQUUsS0FBYTtRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtJQUN2QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUE7SUFDekIsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksUUFBUSxDQUFFLEtBQWE7UUFDdkIsSUFBSSxD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
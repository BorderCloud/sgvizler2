import { Container, SPARQL_RESULT } from '../sgvizler';
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
export declare class Request {
    listeners: any;
    sparqlResult: any;
    private _query;
    private _endpoint;
    private _endpointOutputFormat;
    private _method;
    private _container;
    private _queryParameter;
    /**
     *
     * @returns {string}
     */
    get method(): string;
    /**
     *
     * @param {string} value
     */
    set method(value: string);
    /**
     *
     * @returns {Container}
     */
    get container(): Container;
    /**
     *
     * @param {Container} value
     */
    set container(value: Container);
    /**
     * Get query string.
     * @method query
     * @public
     * @return {string}
     */
    get query(): string;
    /**
     * Set query string.
     * @method query
     * @public
     * @chainable
     * @param value
     */
    set query(value: string);
    /**
     * Get endpoint URL.
     * @method endpointURL
     * @public
     * @return {string}
     */
    get endpoint(): string;
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
    set endpoint(value: string);
    /**
     * Get endpoint output format.
     * @method endpointOutputFormat
     * @public
     * @return {string}
     */
    get endpointOutputFormat(): SPARQL_RESULT;
    /**
     * Set endpoint output format. Legal values are `'xml'`,
     * `'json'`, `'jsonp'`.
     * @method endpointOutputFormat
     * @public
     * @chainable
     * @param value
     */
    set endpointOutputFormat(value: SPARQL_RESULT);
    /**
     * todo
     * @returns {string}
     */
    get queryParameter(): string;
    /**
     * todo
     * @param {string} value
     */
    set queryParameter(value: string);
    constructor();
    sendRequest(): Promise<unknown>;
}

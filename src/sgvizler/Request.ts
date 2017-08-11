import {
    Container,
    SPARQL_RESULT,
    SparqlTools
} from '../sgvizler'

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
    public listeners: any
    public sparqlResult: any

    private _query: string = ''
    private _endpoint: string = ''
    private _endpointOutputFormat: SPARQL_RESULT = SPARQL_RESULT.json
    private _method = 'GET'
    private _container: Container
    // private _endpointResultsUrlPart: string

    // private _chartPathFunction: string
    private _endpointURL: string

    /**
     *
     * @returns {string}
     */
    get method (): string {
        return this._method
    }

    /**
     *
     * @param {string} value
     */
    set method (value: string) {
        this._method = value
    }

    /**
     *
     * @returns {Container}
     */
    get container (): Container {
        return this._container
    }

    /**
     *
     * @param {Container} value
     */
    set container (value: Container) {
        this._container = value
    }

    /**
     * Get query string.
     * @method query
     * @public
     * @return {string}
     */
    get query (): string {
        return this._query
    }

    /**
     * Set query string.
     * @method query
     * @public
     * @chainable
     * @param value
     */
    set query (value: string) {
        this._query = value
    }

    /**
     * Get endpoint URL.
     * @method endpointURL
     * @public
     * @return {string}
     */
    get endpoint (): string {
        return this._endpoint
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
    set endpoint (value: string) {
        this._endpoint = value
    }

    /**
     * Get endpoint output format.
     * @method endpointOutputFormat
     * @public
     * @return {string}
     */
    get endpointOutputFormat (): SPARQL_RESULT {
        return this._endpointOutputFormat
    }

    /**
     * Set endpoint output format. Legal values are `'xml'`,
     * `'json'`, `'jsonp'`.
     * @method endpointOutputFormat
     * @public
     * @chainable
     * @param value
     */
    set endpointOutputFormat (value: SPARQL_RESULT) {
        this._endpointOutputFormat = value
    }

    public constructor () {
        this.listeners = {}
    }

    public sendRequest () {
        let myRequest = this
        // Create new promise with the Promise() constructor;
        // This has as its argument a function
        // with two parameters, resolve and reject
        return new Promise(function (resolve, reject) {
            // Standard XHR to load an image
            let xhr = new XMLHttpRequest()
            let data
            let url = myRequest.endpoint

            if (myRequest.method.toLowerCase() === 'get') {
                url += '?query=' + encodeURIComponent(myRequest.query) +
                        '&output=' + SparqlTools.getOutputLabel(myRequest.endpointOutputFormat)
            }else {
                data = {
                    query: myRequest.query ,
                    output: SparqlTools.getOutputLabel(myRequest.endpointOutputFormat)
                }
            }

            xhr.open(myRequest.method,url,true)
            xhr.setRequestHeader('Accept', SparqlTools.getHeaderAccept(myRequest.endpointOutputFormat))
            xhr.responseType = SparqlTools.getXMLHttpRequestResponseType(myRequest.endpointOutputFormat)

            // TODO check progress
            xhr.onprogress = function (oEvent) {
                if (oEvent.lengthComputable) {
                    let percentComplete = (oEvent.loaded / oEvent.total) * 100
                    console.log('onprogress' + percentComplete)
                } else {
                    // Impossible de calculer la progression puisque la taille totale est inconnue
                }
            }

            // When the request loads, check whether it was successful
            xhr.onload = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        // If successful, resolve the promise by passing back the request response
                        resolve(xhr.response)
                    } else {
                        // If it fails, reject the promise with a error message
                        reject(Error(xhr.statusText))
                    }
                }
            }

            xhr.onerror = function () {
                // Also deal with the case when the entire request fails to begin with
                // This is probably a network error, so reject the promise with an appropriate message
                reject(Error(xhr.statusText))
            }
            xhr.onabort = function () {
                reject(Error(xhr.statusText))
            }

            // Send the request
            if (data) {
                xhr.send(data)
            } else {
                xhr.send()
            }
            // console.log(myRequest.query)
        })
    }

}

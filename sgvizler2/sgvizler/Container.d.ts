import { Chart, Request, LoadingIcon } from '../sgvizler';
/**
 *
 * @class sgvizler.
 * @memberof sgvizler
 */
export declare enum CONTAINER_STATE {
    FAILED = 0,
    LOADED = 1,
    LOADING = 2
}
/**
 * Draws charts specified in HTML containers, here we call them
 * "sgvizler-containers".
 *
 * Example of use: The following sgvizler-container will be
 * selected by sgvizler due to the use of designated
 * attributes. The result is a pie chart (draw with
 * `google.visualization.PieChart`) showing the number of instance
 * per class in the endpoint at
 * `http://sws.ifi.uio.no/sparql/ndp`.
 *
 *     <div id="ex1"
 *          data-sgvizler-endpoint="http://sws.ifi.uio.no/sparql/npd"
 *          data-sgvizler-query="SELECT ?class (count(?instance) AS ?noOfInstances)
 *                               WHERE{ ?instance a ?class }
 *                               GROUP BY ?class
 *                               ORDER BY ?class"
 *          data-sgvizler-chart="google.visualization.PieChart"
 *          style="width:800px; height:400px;"></div>
 *
 * These container must have an id attribute (or else sgvizler
 * will not know where to put the chart) and a query attribute (or
 * else the container will be ignored by sgvizler).
 *
 * Dependencies:
 *
 *  - sgvizler.util
 *  - sgvizler.loader
 *  - sgvizler.logger
 *  - sgvizler.Query
 *  - jQuery
 * @class sgvizler.Container
 * @memberof sgvizler
 */
export declare class Container {
    static list: Array<Container>;
    private static readonly LANG;
    private static readonly PREFIX;
    private static readonly QUERY_ATTRIBUTE_NAME;
    private static readonly ENDPOINT_ATTRIBUTE_NAME;
    private static readonly OUTPUT_FORMAT_ATTRIBUTE_NAME;
    private static readonly QUERY_PARAMETER_ATTRIBUTE_NAME;
    private static readonly OUTPUT_METHOD_ATTRIBUTE_NAME;
    private static readonly CHART_ATTRIBUTE_NAME;
    private static readonly CHART_OPTION_ATTRIBUTE_NAME;
    private static readonly LOG_LEVEL_ATTRIBUTE_NAME;
    private _lang;
    private _chart;
    private _chartOptions;
    private _chartName;
    private _loglevel;
    private _id;
    private _request;
    private _state;
    private _loadingIcon;
    /**
     * Collects values designated for sgvizler in the given.
     * See also property PREFIX.
     * @param {string} elementID The ID for which the attributes should be collected.
     */
    constructor(elementID: string);
    /**
     * Save the reference of container
     */
    private saveRefOfContainer;
    /**
     * Draws the sgvizler-containers with the given element id.
     * @method containerDraw
     * @param {string} elementID
     * @param options
     * @returns {Promise<void>}
     */
    static drawWithElementId(elementID: string, options?: any): Promise<void>;
    /**
     * Draws all sgvizler-containers on page.
     * @returns {Promise<any>}
     */
    static drawAll(): Promise<any>;
    static loadDependenciesId(elementID: string, options?: any): Promise<void>;
    static loadAllDependencies(): Promise<any>;
    /**
     *
     * @param {string} elementID
     * @param {string} endpoint
     * @param {string} query
     * @param {string} chartName
     * @param {string} options
     * @param {string} loglevel
     * @returns {string}
     */
    static create(elementID: string, endpoint: string, query: string, chartName: string, options?: string, loglevel?: string, output?: string, method?: string, parameter?: string, lang?: string): string;
    /**
     *
     * @returns {string}
     */
    get id(): string;
    /**
     *
     * @returns {string}
     */
    get lang(): string;
    /**
     * Get the name of chart object.
     * @returns {string}
     */
    get chartName(): string;
    /**
     * Get the loading icon of container.
     * @returns {string}
     */
    get loadingIcon(): LoadingIcon;
    /**
     *
     * @returns {string}
     */
    get chartOptions(): string;
    /**
     *
     * @returns {Chart}
     */
    get chart(): Chart;
    /**
     *
     * @returns {Request}
     */
    get request(): Request;
    /**
     *
     * @returns {number}
     */
    get loglevel(): number;
    /**
     *
     * @returns {Promise<void>}
     */
    draw(): Promise<void>;
    loadDependencies(): Promise<void>;
}

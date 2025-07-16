import { __awaiter } from "tslib";
import { Request, Tools, Logger, MESSAGES, SparqlTools, LoadingIcon } from '../sgvizler';
/**
 *
 * @class sgvizler.
 * @memberof sgvizler
 */
export var CONTAINER_STATE;
(function (CONTAINER_STATE) {
    CONTAINER_STATE[CONTAINER_STATE["FAILED"] = 0] = "FAILED";
    CONTAINER_STATE[CONTAINER_STATE["LOADED"] = 1] = "LOADED";
    CONTAINER_STATE[CONTAINER_STATE["LOADING"] = 2] = "LOADING";
})(CONTAINER_STATE || (CONTAINER_STATE = {}));
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
export class Container {
    /**
     * Collects values designated for sgvizler in the given.
     * See also property PREFIX.
     * @param {string} elementID The ID for which the attributes should be collected.
     */
    constructor(elementID) {
        this._lang = 'en';
        this._chartOptions = '';
        this._chartName = '';
        this._loglevel = 0;
        this._id = '';
        // step 1 : read parameters and create the object Query
        // pre-condition
        let element = document.getElementById(elementID);
        if (element === null) {
            throw new Error('elementID unknown : ' + elementID);
        }
        let self = Container;
        this._state = CONTAINER_STATE.LOADING;
        let elmAttrs = element.attributes;
        // read basic parameters
        if (elmAttrs[self.LANG]) {
            this._lang = elmAttrs[self.LANG].value;
        }
        if (elmAttrs[self.LOG_LEVEL_ATTRIBUTE_NAME]) {
            this._loglevel = parseInt(elmAttrs[self.LOG_LEVEL_ATTRIBUTE_NAME].value, 10);
        }
        if (elmAttrs[self.CHART_ATTRIBUTE_NAME]) {
            this._chartName = elmAttrs[self.CHART_ATTRIBUTE_NAME].value;
            // This code will disappear but it's necessary for the migration with the old Sgvizler
            switch (this._chartName) {
                case 'google.visualization.AnnotatedTimeLine':
                case 'google.visualization.Gauge':
                case 'google.visualization.ImageSparkLine':
                case 'google.visualization.MotionChart':
                case 'sgvizler.visualization.D3ForceGraph':
                case 'sgvizler.visualization.DefList"':
                case 'sgvizler.visualization.DraculaGraph':
                case 'sgvizler.visualization.List':
                case 'sgvizler.visualization.Text':
                case 'sgvizler.visualization.MapWKT':
                    {
                        console.warn('Sgvizler2 : ' + this._chartName + ' is deprecated. Please choose another chart.');
                        this._chartName = 'bordercloud.visualization.DataTable';
                        break;
                    }
                case 'sgvizler.visualization.Map':
                    {
                        console.warn('Sgvizler2 : ' + this._chartName + ' is obsolete. Please choose leaflet.visualization.Map or another chart.');
                        this._chartName = 'leaflet.visualization.Map';
                        break;
                    }
                case 'google.visualization.GeoMap':
                    {
                        console.warn('Sgvizler2 : ' + this._chartName + ' is obsolete. Please choose google.visualization.Map or another chart.');
                        this._chartName = 'google.visualization.Map';
                        break;
                    }
                case 'google.visualization.PieChart':
                    {
                        console.warn('Sgvizler2 : ' + this._chartName + ' is obsolete. Please choose google.visualization.Pie or another chart.');
                        this._chartName = 'google.visualization.Pie';
                        break;
                    }
            }
        }
        if (elmAttrs[self.CHART_OPTION_ATTRIBUTE_NAME]) {
            this._chartOptions =
                Tools.decodeHtml(elmAttrs[self.CHART_OPTION_ATTRIBUTE_NAME].value);
        }
        // build request object
        let request = new Request();
        request.container = this;
        this._id = elementID;
        if (elmAttrs[self.QUERY_ATTRIBUTE_NAME]) {
            request.query = Tools.decodeHtml(elmAttrs[self.QUERY_ATTRIBUTE_NAME].value);
        }
        if (elmAttrs[self.ENDPOINT_ATTRIBUTE_NAME]) {
            request.endpoint = Tools.decodeHtml(elmAttrs[self.ENDPOINT_ATTRIBUTE_NAME].value);
        }
        else {
            this._state = CONTAINER_STATE.FAILED;
            Logger.displayFeedback(this, MESSAGES.ERROR_ENDPOINT_FORGOT);
            return;
        }
        if (elmAttrs[self.OUTPUT_FORMAT_ATTRIBUTE_NAME]) {
            request.endpointOutputFormat = SparqlTools.convertString(elmAttrs[self.OUTPUT_FORMAT_ATTRIBUTE_NAME].value);
        }
        if (elmAttrs[self.OUTPUT_METHOD_ATTRIBUTE_NAME]) {
            request.method = elmAttrs[self.OUTPUT_METHOD_ATTRIBUTE_NAME].value;
        }
        if (elmAttrs[self.QUERY_PARAMETER_ATTRIBUTE_NAME]) {
            request.queryParameter = elmAttrs[self.QUERY_PARAMETER_ATTRIBUTE_NAME].value;
        }
        this._request = request;
        // build the chart object
        let chart = Tools.getObjectByPath(this.chartName);
        if (chart === undefined) {
            this._state = CONTAINER_STATE.FAILED;
            Logger.displayFeedback(this, MESSAGES.ERROR_CHART_UNKNOWN, [this.chartName]);
        }
        else {
            chart.container = this;
            // read with and height of container before chart options
            try {
                let element = $('#' + elementID);
                let widthCss = element.css('width');
                let heightCss = element.css('height');
                if (widthCss !== null) {
                    chart.width = widthCss;
                }
                if (heightCss !== null && heightCss !== '0px') {
                    chart.height = heightCss;
                }
            }
            catch (e) {
                // do nothing, unit test not support jquery
            }
            // read options (and replace may be with and height)
            chart.optionsRaw = this._chartOptions;
            this._chart = chart;
        }
        this.saveRefOfContainer();
    }
    /**
     * Save the reference of container
     */
    saveRefOfContainer() {
        let index = -1;
        let len = Container.list.length;
        for (let i = 0; i < len; i++) {
            let dep = Container.list[i];
            if (this.id === Container.list[i].id) {
                //this._dependenciesToLoad.splice(i)
                index = i;
            }
        }
        if (index != -1) {
            Container.list[index] = this;
        }
        else {
            Container.list.push(this);
        }
    }
    /**
     * Draws the sgvizler-containers with the given element id.
     * @method containerDraw
     * @param {string} elementID
     * @param options
     * @returns {Promise<void>}
     */
    static drawWithElementId(elementID, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let container = new Container(elementID);
            // console.log(container)
            container._loadingIcon = new LoadingIcon(container);
            container.loadingIcon.show();
            Logger.log(container, 'drawing id: ' + elementID);
            yield container.draw();
        });
    }
    // noinspection JSValidateJSDoc
    /**
     * Draws all sgvizler-containers on page.
     * @returns {Promise<any>}
     */
    static drawAll() {
        let promisesArray = [];
        let ids = [];
        let iterator = document.evaluate('//div[@' + Container.PREFIX + 'query]/@id', document, null, XPathResult.ANY_TYPE, null);
        let thisNode = iterator.iterateNext();
        while (thisNode) {
            ids.push(thisNode.value);
            thisNode = iterator.iterateNext();
        }
        for (let id of ids) {
            promisesArray.push(Container.drawWithElementId(id));
        }
        return Promise.all(promisesArray);
    }
    static loadDependenciesId(elementID, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let container = new Container(elementID);
            // console.log(container)
            Logger.log(container, 'Load dependencies id: ' + elementID);
            yield container.loadDependencies();
        });
    }
    static loadAllDependencies() {
        let promisesArray = [];
        let ids = [];
        let iterator = document.evaluate('//div[@' + Container.PREFIX + 'query]/@id', document, null, XPathResult.ANY_TYPE, null);
        let thisNode = iterator.iterateNext();
        while (thisNode) {
            ids.push(thisNode.value);
            thisNode = iterator.iterateNext();
        }
        for (let id of ids) {
            promisesArray.push(Container.loadDependenciesId(id));
        }
        return Promise.all(promisesArray);
    }
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
    static create(elementID, endpoint, query, chartName, options, loglevel, output, method, parameter, lang) {
        let element = document.getElementById(elementID);
        if (element === null) {
            throw new Error('elementID unknown : ' + elementID);
        }
        let self = Container;
        let attrQuery = document.createAttribute(self.QUERY_ATTRIBUTE_NAME);
        let attrEndpoint = document.createAttribute(self.ENDPOINT_ATTRIBUTE_NAME);
        let attrChart = document.createAttribute(self.CHART_ATTRIBUTE_NAME);
        // attrQuery.value = Tools.escapeHtml(query)
        attrQuery.value = query;
        attrEndpoint.value = endpoint;
        attrChart.value = chartName;
        element.setAttributeNode(attrQuery);
        element.setAttributeNode(attrEndpoint);
        element.setAttributeNode(attrChart);
        if (options) {
            let attrOptions = document.createAttribute(self.CHART_OPTION_ATTRIBUTE_NAME);
            attrOptions.value = options;
            element.setAttributeNode(attrOptions);
        }
        if (loglevel) {
            let attrLevel = document.createAttribute(self.LOG_LEVEL_ATTRIBUTE_NAME);
            attrLevel.value = loglevel;
            element.setAttributeNode(attrLevel);
        }
        if (output) {
            let attrOutput = document.createAttribute(self.OUTPUT_FORMAT_ATTRIBUTE_NAME);
            attrOutput.value = output;
            element.setAttributeNode(attrOutput);
        }
        if (method) {
            let attrMethod = document.createAttribute(self.OUTPUT_METHOD_ATTRIBUTE_NAME);
            attrMethod.value = method;
            element.setAttributeNode(attrMethod);
        }
        if (parameter) {
            let attrQueryAttribut = document.createAttribute(self.QUERY_PARAMETER_ATTRIBUTE_NAME);
            attrQueryAttribut.value = parameter;
            element.setAttributeNode(attrQueryAttribut);
        }
        if (lang) {
            let attrQueryAttribut = document.createAttribute(self.LANG);
            attrQueryAttribut.value = lang;
            element.setAttributeNode(attrQueryAttribut);
        }
        return element.innerHTML;
    }
    /**
     *
     * @returns {string}
     */
    get id() {
        return this._id;
    }
    /**
     *
     * @returns {string}
     */
    get lang() {
        return this._lang;
    }
    /**
     * Get the name of chart object.
     * @returns {string}
     */
    get chartName() {
        return this._chartName;
    }
    /**
     * Get the loading icon of container.
     * @returns {string}
     */
    get loadingIcon() {
        return this._loadingIcon;
    }
    ///////////////////////////////////// OPTIONS
    /**
     *
     * @returns {string}
     */
    get chartOptions() {
        return this._chartOptions;
    }
    /**
     *
     * @returns {Chart}
     */
    get chart() {
        return this._chart;
    }
    /**
     *
     * @returns {Request}
     */
    get request() {
        return this._request;
    }
    /**
     *
     * @returns {number}
     */
    get loglevel() {
        return this._loglevel;
    }
    /**
     *
     * @returns {Promise<void>}
     */
    draw() {
        return __awaiter(this, void 0, void 0, function* () {
            let sparqlResult;
            if (this._state === CONTAINER_STATE.FAILED) {
                return;
            }
            try {
                sparqlResult = yield this.request.sendRequest();
                // console.log(queryResult)
            }
            catch (error) {
                console.log(error);
                Logger.displayFeedback(this, MESSAGES.ERROR_REQUEST, [error]);
                this._state = CONTAINER_STATE.FAILED;
            }
            if (this._state === CONTAINER_STATE.FAILED) {
                return;
            }
            let sparqlResultI = sparqlResult;
            if (sparqlResultI.head === undefined) {
                console.log(sparqlResultI);
                Logger.displayFeedback(this, MESSAGES.ERROR_CHART, ['ERROR_head_undefined']);
                this._state = CONTAINER_STATE.FAILED;
            }
            try {
                this._chart.loadDependenciesAndDraw(sparqlResultI);
            }
            catch (error) {
                console.log(error);
                Logger.displayFeedback(this, MESSAGES.ERROR_CHART, [error]);
                this._state = CONTAINER_STATE.FAILED;
            }
        });
    }
    loadDependencies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._chart.loadDependencies();
            }
            catch (error) {
                console.log(error);
                Logger.displayFeedback(this, MESSAGES.ERROR_DEPENDENCIES, [error]);
                this._state = CONTAINER_STATE.FAILED;
            }
        });
    }
}
Container.list = [];
Container.LANG = 'lang';
Container.PREFIX = 'data-sgvizler-';
Container.QUERY_ATTRIBUTE_NAME = Container.PREFIX + 'query';
Container.ENDPOINT_ATTRIBUTE_NAME = Container.PREFIX + 'endpoint';
Container.OUTPUT_FORMAT_ATTRIBUTE_NAME = Container.PREFIX + 'endpoint-output-format';
Container.QUERY_PARAMETER_ATTRIBUTE_NAME = Container.PREFIX + 'endpoint-query-parameter';
Container.OUTPUT_METHOD_ATTRIBUTE_NAME = Container.PREFIX + 'endpoint-method';
Container.CHART_ATTRIBUTE_NAME = Container.PREFIX + 'chart';
Container.CHART_OPTION_ATTRIBUTE_NAME = Container.PREFIX + 'chart-options';
Container.LOG_LEVEL_ATTRIBUTE_NAME = Container.PREFIX + 'log';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Nndml6bGVyL0NvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUVILE9BQU8sRUFDUCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFFBQVEsRUFDUixXQUFXLEVBRVgsV0FBVyxFQUNkLE1BQU0sYUFBYSxDQUFBO0FBSXBCOzs7O0dBSUc7QUFDSCxNQUFNLENBQU4sSUFBWSxlQUlYO0FBSkQsV0FBWSxlQUFlO0lBQ3ZCLHlEQUFNLENBQUE7SUFDTix5REFBTSxDQUFBO0lBQ04sMkRBQU8sQ0FBQTtBQUNYLENBQUMsRUFKVyxlQUFlLEtBQWYsZUFBZSxRQUkxQjtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFDSCxNQUFNLE9BQU8sU0FBUztJQXlCbEI7Ozs7T0FJRztJQUNILFlBQWEsU0FBaUI7UUFmdEIsVUFBSyxHQUFXLElBQUksQ0FBQTtRQUVwQixrQkFBYSxHQUFXLEVBQUUsQ0FBQTtRQUMxQixlQUFVLEdBQVcsRUFBRSxDQUFBO1FBQ3ZCLGNBQVMsR0FBVyxDQUFDLENBQUE7UUFDckIsUUFBRyxHQUFXLEVBQUUsQ0FBQTtRQVdwQix1REFBdUQ7UUFDdkQsZ0JBQWdCO1FBQ2hCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDaEQsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsR0FBRyxTQUFTLENBQUMsQ0FBQTtRQUN2RCxDQUFDO1FBRUQsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFBO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQTtRQUVyQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFBO1FBRWpDLHdCQUF3QjtRQUN4QixJQUFJ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
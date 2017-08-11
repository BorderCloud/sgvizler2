import $ from 'jquery'
import {
    Chart,
    Request,
    Tools,
    Logger,
    MESSAGES,
    SparqlTools,
    SparqlResultInterface
} from '../sgvizler'

/**
 *
 * @class sgvizler.
 * @memberof sgvizler
 */
export enum CONTAINER_STATE {
    FAILED,
    LOADED,
    LOADING
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
export class Container {

    private static readonly PREFIX: string = 'data-sgvizler-'
    private static readonly QUERY_ATTRIBUTE_NAME: string = Container.PREFIX + 'query'
    private static readonly ENDPOINT_ATTRIBUTE_NAME: string = Container.PREFIX + 'endpoint'
    private static readonly OUTPUT_FORMAT_ATTRIBUTE_NAME: string = Container.PREFIX + 'endpoint-output-format'
    private static readonly OUTPUT_METHOD_ATTRIBUTE_NAME: string = Container.PREFIX + 'endpoint-method'
    private static readonly CHART_ATTRIBUTE_NAME: string = Container.PREFIX + 'chart'
    private static readonly CHART_OPTION_ATTRIBUTE_NAME: string = Container.PREFIX + 'chart-options'
    private static readonly LOG_LEVEL_ATTRIBUTE_NAME: string = Container.PREFIX + 'log'

    private _chart: Chart
    private _chartOptions: string = ''
    private _chartName: string = ''
    private _loglevel: number = 0
    private _id: string = ''
    private _request: Request
    private _state: CONTAINER_STATE

    /**
     * Collects values designated for sgvizler in the given.
     * See also property PREFIX.
     * @param {string} elementID The ID for which the attributes should be collected.
     */
    constructor (elementID: string) {
        // step 1 : read parameters and create the object Query
        // pre-condition
        let element = document.getElementById(elementID)
        if (element === null) {
            throw new Error('elementID unknown : ' + elementID)
        }

        let self = Container
        this._state = CONTAINER_STATE.LOADING

        let elmAttrs = element.attributes

        // read basic parameters
        if (elmAttrs[self.LOG_LEVEL_ATTRIBUTE_NAME as any]) {
            this._loglevel = parseInt(elmAttrs[self.LOG_LEVEL_ATTRIBUTE_NAME as any].value,10)
        }

        if (elmAttrs[self.CHART_ATTRIBUTE_NAME as any]) {
            this._chartName = elmAttrs[self.CHART_ATTRIBUTE_NAME as any].value
        }

        if (elmAttrs[self.CHART_OPTION_ATTRIBUTE_NAME as any]) {
            this._chartOptions = elmAttrs[self.CHART_OPTION_ATTRIBUTE_NAME as any].value
        }

        // build request object
        let request = new Request()
        request.container = this

        this._id = elementID

        if (elmAttrs[self.QUERY_ATTRIBUTE_NAME as any]) {
            request.query = elmAttrs[self.QUERY_ATTRIBUTE_NAME as any].value
        }

        if (elmAttrs[self.ENDPOINT_ATTRIBUTE_NAME as any]) {
            request.endpoint = elmAttrs[self.ENDPOINT_ATTRIBUTE_NAME as any].value
        }

        // TODO : IMPORTANT FORMAT
        if (elmAttrs[self.OUTPUT_FORMAT_ATTRIBUTE_NAME as any]) {
            request.endpointOutputFormat = SparqlTools.convertString(elmAttrs[self.OUTPUT_FORMAT_ATTRIBUTE_NAME as any].value)
        }

        if (elmAttrs[self.OUTPUT_METHOD_ATTRIBUTE_NAME as any]) {
            request.method = elmAttrs[self.OUTPUT_METHOD_ATTRIBUTE_NAME as any].value
        }

        this._request = request

        // build the chart object
        let chart = Tools.getObjectByPath(this.chartName)
        if (chart === undefined) {
            this._state = CONTAINER_STATE.FAILED
            Logger.displayFeedback(this, MESSAGES.ERROR_CHART_UNKNOWN, [this.chartName])
        } else {
            chart.container = this
            // read with and height of container before chart options
            try {
                let widthCss = $('#' + elementID).css('width')
                let heightCss = $('#' + elementID).css('height')
                // if (widthCss !== null) {
                    chart.width = widthCss[1]
                // }
                // if (heightCss !== null) {
                    chart.height = heightCss[1]
                // }
            }catch (e) {
                // do nothing, unit test not support jquery
            }
            // read options (and replace may be with and height)
            chart.optionsRaw = this._chartOptions

            this._chart = chart
            // console.log(chart)
        }
    }

    /**
     * Draws the sgvizler-containers with the given element id.
     * @method containerDraw
     * @param {string} elementID
     * @param options
     * @returns {Promise<void>}
     */
    public static async drawWithElementId (elementID: string,options?: any) {
        let container = new Container(elementID)
        // console.log(container)
        Logger.log('drawing id: ' + elementID)
        await container.draw()
    }

    // noinspection JSValidateJSDoc
    /**
     * Draws all sgvizler-containers on page.
     * @returns {Promise<any>}
     */
    public static drawAll (): Promise<any> {
        let promisesArray: Array<any> = []
        let ids: Array<string> = []

        let iterator = document.evaluate('//div[@' + Container.PREFIX + 'query]/@id',
            document, null, XPathResult.ANY_TYPE, null )
        let thisNode = iterator.iterateNext() as Attr

        while (thisNode) {
            ids.push(thisNode.value)
            thisNode = iterator.iterateNext() as Attr
        }

        for (let id of ids) {
            promisesArray.push(Container.drawWithElementId(id))
        }
        return Promise.all(promisesArray)
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
    public static create (
        elementID: string,
        endpoint: string,
        query: string,
        chartName: string,
        options?: string,
        loglevel?: string
        // ,  output:string="json"
    ) {
        let element = document.getElementById(elementID)
        if (element === null) {
            throw new Error('elementID unknown : ' + elementID)
        }

        let self = Container
        let attrQuery = document.createAttribute(self.QUERY_ATTRIBUTE_NAME)
        let attrEndpoint = document.createAttribute(self.ENDPOINT_ATTRIBUTE_NAME)
        // let attrOutput = document.createAttribute(self.OUTPUT_FORMAT_ATTRIBUTE_NAME)
        // let attrMethod = document.createAttribute(self.OUTPUT_METHOD_ATTRIBUTE_NAME)
        let attrChart = document.createAttribute(self.CHART_ATTRIBUTE_NAME)

        // attrQuery.value = Tools.escapeHtml(query)
        attrQuery.value = query
        attrEndpoint.value = endpoint
        attrChart.value = chartName
        // attrOutput.value = output

        element.setAttributeNode(attrQuery)
        element.setAttributeNode(attrEndpoint)
        // element.setAttributeNode(attrOutput)
        // element.setAttributeNode(attrMethod)
        element.setAttributeNode(attrChart)

        if (options) {
            let attrOptions = document.createAttribute(self.CHART_OPTION_ATTRIBUTE_NAME)
            attrOptions.value = options
            element.setAttributeNode(attrOptions)
        }
        if (loglevel) {
            let attrLevel = document.createAttribute(self.LOG_LEVEL_ATTRIBUTE_NAME)
            attrLevel.value = loglevel
            element.setAttributeNode(attrLevel)
        }
        return element.innerHTML
    }

    /**
     *
     * @returns {string}
     */
    get id (): string {
        return this._id
    }

    /**
     * Get the name of chart object.
     * @returns {string}
     */
    get chartName (): string {
        return this._chartName
    }

    ///////////////////////////////////// OPTIONS

    /**
     *
     * @returns {string}
     */
    get chartOptions (): string {
        return this._chartOptions
    }

    /**
     *
     * @returns {Chart}
     */
    get chart (): Chart {
        return this._chart
    }

    /**
     *
     * @returns {Request}
     */
    get request (): Request {
        return this._request
    }

    /**
     *
     * @returns {number}
     */
    get loglevel (): number {
        return this._loglevel
    }

    /**
     *
     * @returns {Promise<void>}
     */
    public async draw () {
        let sparqlResult

        if (this._state === CONTAINER_STATE.FAILED) {
            return
        }

        try {
            sparqlResult = await this.request.sendRequest()
            // console.log(queryResult)
        } catch (error) {
            console.log(error)
            Logger.displayFeedback(this, MESSAGES.ERROR_REQUEST, [error])
            this._state = CONTAINER_STATE.FAILED
        }

        if (this._state === CONTAINER_STATE.FAILED) {
            return
        }

        try {
            await this._chart.draw(sparqlResult as SparqlResultInterface)
        } catch (error) {
            console.log(error)
            Logger.displayFeedback(this, MESSAGES.ERROR_CHART, [error])
            this._state = CONTAINER_STATE.FAILED
        }
    }

}

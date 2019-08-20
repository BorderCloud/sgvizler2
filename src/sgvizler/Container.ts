import {
    Chart,
    Request,
    Tools,
    Logger,
    MESSAGES,
    SparqlTools,
    SparqlResultInterface,
    LoadingIcon, Dependency, ScriptDependency
} from '../sgvizler'

declare let $: any

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

    public static list:Array<Container> = []

    private static readonly LANG: string = 'lang'
    private static readonly PREFIX: string = 'data-sgvizler-'
    private static readonly QUERY_ATTRIBUTE_NAME: string = Container.PREFIX + 'query'
    private static readonly ENDPOINT_ATTRIBUTE_NAME: string = Container.PREFIX + 'endpoint'
    private static readonly OUTPUT_FORMAT_ATTRIBUTE_NAME: string = Container.PREFIX + 'endpoint-output-format'
    private static readonly QUERY_PARAMETER_ATTRIBUTE_NAME: string = Container.PREFIX + 'endpoint-query-parameter'
    private static readonly OUTPUT_METHOD_ATTRIBUTE_NAME: string = Container.PREFIX + 'endpoint-method'
    private static readonly CHART_ATTRIBUTE_NAME: string = Container.PREFIX + 'chart'
    private static readonly CHART_OPTION_ATTRIBUTE_NAME: string = Container.PREFIX + 'chart-options'
    private static readonly LOG_LEVEL_ATTRIBUTE_NAME: string = Container.PREFIX + 'log'

    private _lang: string = 'en'
    private _chart: Chart
    private _chartOptions: string = ''
    private _chartName: string = ''
    private _loglevel: number = 0
    private _id: string = ''
    private _request: Request
    private _state: CONTAINER_STATE
    private _loadingIcon:LoadingIcon

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
        if (elmAttrs[self.LANG as any]) {
            this._lang = elmAttrs[self.LANG as any].value
        }

        if (elmAttrs[self.LOG_LEVEL_ATTRIBUTE_NAME as any]) {
            this._loglevel = parseInt(elmAttrs[self.LOG_LEVEL_ATTRIBUTE_NAME as any].value,10)
        }

        if (elmAttrs[self.CHART_ATTRIBUTE_NAME as any]) {
            this._chartName = elmAttrs[self.CHART_ATTRIBUTE_NAME as any].value

            // This code will disappear but it's necessary for the migration with the old Sgvizler
            switch (this._chartName) {
                case 'google.visualization.AnnotatedTimeLine' :
                case 'google.visualization.Gauge' :
                case 'google.visualization.ImageSparkLine' :
                case 'google.visualization.MotionChart' :
                case 'sgvizler.visualization.D3ForceGraph' :
                case 'sgvizler.visualization.DefList"' :
                case 'sgvizler.visualization.DraculaGraph' :
                case 'sgvizler.visualization.List' :
                case 'sgvizler.visualization.Text' :
                case 'sgvizler.visualization.MapWKT' :
                {
                    console.warn('Sgvizler2 : ' + this._chartName + ' is deprecated. Please choose another chart.')
                    this._chartName = 'bordercloud.visualization.DataTable'
                    break
                }
                case 'sgvizler.visualization.Map' :
                {
                    console.warn('Sgvizler2 : ' + this._chartName + ' is obsolete. Please choose leaflet.visualization.Map or another chart.')
                    this._chartName = 'leaflet.visualization.Map'
                    break
                }
                case 'google.visualization.GeoMap' :
                {
                    console.warn('Sgvizler2 : ' + this._chartName + ' is obsolete. Please choose google.visualization.Map or another chart.')
                    this._chartName = 'google.visualization.Map'
                    break
                }
                case 'google.visualization.PieChart' :
                {
                    console.warn('Sgvizler2 : ' + this._chartName + ' is obsolete. Please choose google.visualization.Pie or another chart.')
                    this._chartName = 'google.visualization.Pie'
                    break
                }
            }
        }

        if (elmAttrs[self.CHART_OPTION_ATTRIBUTE_NAME as any]) {
            this._chartOptions =
                Tools.decodeHtml(elmAttrs[self.CHART_OPTION_ATTRIBUTE_NAME as any].value)
        }

        // build request object
        let request = new Request()
        request.container = this

        this._id = elementID

        if (elmAttrs[self.QUERY_ATTRIBUTE_NAME as any]) {
            request.query = Tools.decodeHtml(elmAttrs[self.QUERY_ATTRIBUTE_NAME as any].value)
        }

        if (elmAttrs[self.ENDPOINT_ATTRIBUTE_NAME as any]) {
            request.endpoint = Tools.decodeHtml(elmAttrs[self.ENDPOINT_ATTRIBUTE_NAME as any].value)
        } else {
            this._state = CONTAINER_STATE.FAILED
            Logger.displayFeedback(this, MESSAGES.ERROR_ENDPOINT_FORGOT)
            return
        }

        if (elmAttrs[self.OUTPUT_FORMAT_ATTRIBUTE_NAME as any]) {
            request.endpointOutputFormat = SparqlTools.convertString(elmAttrs[self.OUTPUT_FORMAT_ATTRIBUTE_NAME as any].value)
        }

        if (elmAttrs[self.OUTPUT_METHOD_ATTRIBUTE_NAME as any]) {
            request.method = elmAttrs[self.OUTPUT_METHOD_ATTRIBUTE_NAME as any].value
        }

        if (elmAttrs[self.QUERY_PARAMETER_ATTRIBUTE_NAME as any]) {
            request.queryParameter = elmAttrs[self.QUERY_PARAMETER_ATTRIBUTE_NAME as any].value
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
                let element = $('#' + elementID)
                let widthCss = element.css('width')
                let heightCss = element.css('height')
                if (widthCss !== null) {
                    chart.width = widthCss
                }
                if (heightCss !== null && heightCss !== '0px') {
                    chart.height = heightCss
                }
            } catch (e) {
                // do nothing, unit test not support jquery
            }
            // read options (and replace may be with and height)
            chart.optionsRaw = this._chartOptions

            this._chart = chart
        }
        this.saveRefOfContainer();
    }

    /**
     * Save the reference of container
     */
    private saveRefOfContainer () {
        let index = -1
        let len = Container.list.length
        for(let i = 0; i < len; i++){
            let dep = Container.list[i]
            if (this.id === Container.list[i].id) {
                //this._dependenciesToLoad.splice(i)
                index = i
            }
        }
        if(index != -1){
            Container.list[index] = this
        }else{
            Container.list.push(this)
        }
    }

    /**
     * Draws the sgvizler-containers with the given element id.
     * @method containerDraw
     * @param {string} elementID
     * @param options
     * @returns {Promise<void>}
     */
    public static async drawWithElementId (elementID: string, options?: any) {
        let container = new Container(elementID)
        // console.log(container)
        container._loadingIcon = new LoadingIcon(container)
        container.loadingIcon.show()
        Logger.log(container,'drawing id: ' + elementID)
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
            document, null, XPathResult.ANY_TYPE, null)
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

    public static async loadDependenciesId (elementID: string, options?: any) {
        let container = new Container(elementID)
        // console.log(container)
        Logger.log(container,'Load dependencies id: ' + elementID)
        await container.loadDependencies()
    }

    public static loadAllDependencies (): Promise<any> {
        let promisesArray: Array<any> = []
        let ids: Array<string> = []

        let iterator = document.evaluate('//div[@' + Container.PREFIX + 'query]/@id',
            document, null, XPathResult.ANY_TYPE, null)
        let thisNode = iterator.iterateNext() as Attr

        while (thisNode) {
            ids.push(thisNode.value)
            thisNode = iterator.iterateNext() as Attr
        }

        for (let id of ids) {
            promisesArray.push(Container.loadDependenciesId(id))
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
        loglevel?: string,
        output?: string,
        method?: string,
        parameter?: string,
        lang?: string
    ) {
        let element = document.getElementById(elementID)
        if (element === null) {
            throw new Error('elementID unknown : ' + elementID)
        }

        let self = Container
        let attrQuery = document.createAttribute(self.QUERY_ATTRIBUTE_NAME)
        let attrEndpoint = document.createAttribute(self.ENDPOINT_ATTRIBUTE_NAME)
        let attrChart = document.createAttribute(self.CHART_ATTRIBUTE_NAME)

        // attrQuery.value = Tools.escapeHtml(query)
        attrQuery.value = query
        attrEndpoint.value = endpoint
        attrChart.value = chartName

        element.setAttributeNode(attrQuery)
        element.setAttributeNode(attrEndpoint)
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
        if (output) {
            let attrOutput = document.createAttribute(self.OUTPUT_FORMAT_ATTRIBUTE_NAME)
            attrOutput.value = output
            element.setAttributeNode(attrOutput)
        }
        if (method) {
            let attrMethod = document.createAttribute(self.OUTPUT_METHOD_ATTRIBUTE_NAME)
            attrMethod.value = method
            element.setAttributeNode(attrMethod)
        }
        if (parameter) {
            let attrQueryAttribut = document.createAttribute(self.QUERY_PARAMETER_ATTRIBUTE_NAME)
            attrQueryAttribut.value = parameter
            element.setAttributeNode(attrQueryAttribut)
        }
        if (lang) {
            let attrQueryAttribut = document.createAttribute(self.LANG)
            attrQueryAttribut.value = lang
            element.setAttributeNode(attrQueryAttribut)
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
     *
     * @returns {string}
     */
    get lang (): string {
        return this._lang
    }

    /**
     * Get the name of chart object.
     * @returns {string}
     */
    get chartName (): string {
        return this._chartName
    }


    /**
     * Get the loading icon of container.
     * @returns {string}
     */
    get loadingIcon (): LoadingIcon {
        return this._loadingIcon
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

        let sparqlResultI = sparqlResult as SparqlResultInterface
        if (sparqlResultI.head === undefined) {
            console.log(sparqlResultI)
            Logger.displayFeedback(this, MESSAGES.ERROR_CHART, ['ERROR_head_undefined'])
            this._state = CONTAINER_STATE.FAILED
        }

        try {
            this._chart.loadDependenciesAndDraw(sparqlResultI)
        } catch (error) {
            console.log(error)
            Logger.displayFeedback(this, MESSAGES.ERROR_CHART, [error])
            this._state = CONTAINER_STATE.FAILED
        }
    }

    public async loadDependencies () {
        try {
            await this._chart.loadDependencies()
        } catch (error) {
            console.log(error)
            Logger.displayFeedback(this, MESSAGES.ERROR_DEPENDENCIES, [error])
            this._state = CONTAINER_STATE.FAILED
        }
    }
}

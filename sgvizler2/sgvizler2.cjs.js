'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sgvizler2 = /*#__PURE__*/Object.freeze({
    get sgvizler () { return sgvizler; },
    get bordercloud () { return bordercloud; },
    get google () { return google$1; },
    get d3 () { return d3$1; },
    get leaflet () { return leaflet; },
    get VERSION () { return VERSION; },
    get HOMEPAGE () { return HOMEPAGE; },
    get containerLoadAll () { return containerLoadAll; },
    get containerDraw () { return containerDraw; },
    get containerDrawAll () { return containerDrawAll; },
    get selectDraw () { return selectDraw; },
    get selectDrawAll () { return selectDrawAll; },
    get getChartDoc () { return getChartDoc; },
    get create () { return create; }
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 * Define the type of patterns for the options
 *
 * @class sgvizler.CHART_PATTERN_OPTIONS
 * @memberof sgvizler
 */
var CHART_PATTERN_OPTIONS;
(function (CHART_PATTERN_OPTIONS) {
    CHART_PATTERN_OPTIONS[CHART_PATTERN_OPTIONS["EMPTY"] = 0] = "EMPTY";
    CHART_PATTERN_OPTIONS[CHART_PATTERN_OPTIONS["UNKNOWN"] = 1] = "UNKNOWN";
    CHART_PATTERN_OPTIONS[CHART_PATTERN_OPTIONS["VARIABLE"] = 2] = "VARIABLE";
    CHART_PATTERN_OPTIONS[CHART_PATTERN_OPTIONS["STYLE"] = 3] = "STYLE";
    CHART_PATTERN_OPTIONS[CHART_PATTERN_OPTIONS["CLASS"] = 4] = "CLASS";
    CHART_PATTERN_OPTIONS[CHART_PATTERN_OPTIONS["WIKI"] = 5] = "WIKI";
})(CHART_PATTERN_OPTIONS || (CHART_PATTERN_OPTIONS = {}));
/**
 * Abstract class for all the charts. Ensures that chart types
 * correctly inherit methods from this class.
 * @class sgvizler.Chart
 * @abstract
 * @export
 * @memberof sgvizler
 */
class Chart {
    /**
     * Constructor of all chart types created by
     * sgvizler.charts inherit from.
     * @memberof sgvizler.Chart
     * @constructor sgvizler.Chart
     */
    constructor() {
        /**
         * Give the options of chart
         * @property options
         * @memberof sgvizler.Chart
         * @public
         * @type {{}}
         */
        this.options = {};
        this._tabDependences = [];
        this._patternOptions = CHART_PATTERN_OPTIONS.EMPTY;
        this._width = '';
        this._height = '';
        this._optionsRaw = '';
        this._class = '';
        this._style = '';
        this._width = '100%';
        this._isDone = false;
        let currentThis = this;
        Loader.on('loaded', () => {
            if (currentThis.container != null &&
                !currentThis._isDone &&
                currentThis.isLoadedAllDependencies() &&
                currentThis._resultSparql !== null &&
                currentThis._resultSparql !== undefined) {
                currentThis.doDraw();
            }
        });
    }
    loadDependenciesAndDraw(result) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger.log(this.container, 'Chart loaded dependencies : ' + this.container.id);
            // let promisesArray: Array<any> = []
            this._resultSparql = result;
            if (this.isLoadedAllDependencies()) {
                yield this.doDraw();
            }
            else {
                yield this.loadDependencies();
            }
        });
    }
    loadDependencies() {
        return __awaiter(this, void 0, void 0, function* () {
            let promisesArray = [];
            for (let dep of this._tabDependences) {
                promisesArray.push(dep.load());
            }
            return Promise.all(promisesArray);
        });
    }
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {CHART_PATTERN_OPTIONS}
     */
    get patternOptions() {
        return this._patternOptions;
    }
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    get classHtml() {
        return this._class;
    }
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {string} value
     */
    set classHtml(value) {
        this._class = value;
    }
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    get style() {
        return this._style;
    }
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {string} value
     */
    set style(value) {
        this._style = value;
    }
    /**
     *
     * @memberof sgvizler.Chart
     * @returns {Container}
     */
    get container() {
        return this._container;
    }
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {Container} value
     */
    set container(value) {
        this._container = value;
    }
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    get optionsRaw() {
        return this._optionsRaw;
    }
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {string} value
     */
    set optionsRaw(value) {
        this._optionsRaw = value;
        this.doParseOptionsRaw();
    }
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    get height() {
        return this._height;
    }
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {string} value
     */
    set height(value) {
        this._height = value;
    }
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    get width() {
        return this._width;
    }
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {string} value
     */
    set width(value) {
        this._width = value;
    }
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    getHTMLStyleOrClass() {
        let html = '';
        let opts = this.options;
        if (this._patternOptions === CHART_PATTERN_OPTIONS.CLASS) {
            html = Object.keys(opts).map((property) => '${opts[property]}').join(' ');
            html = 'class="' + html + '"';
        }
        if (this._patternOptions === CHART_PATTERN_OPTIONS.STYLE) {
            html = Object.keys(opts).map((property) => '${property}:${opts[property]}').join(';');
            html = 'style="' + html + '"';
        }
        return html;
    }
    addScript(url, loadBefore) {
        let dep = new ScriptDependency(url, loadBefore);
        this._tabDependences.push(dep);
        return dep;
    }
    addCss(url, loadBefore) {
        let dep = new CssDependency(url, loadBefore);
        this._tabDependences.push(dep);
        return dep;
    }
    isLoadedAllDependencies() {
        for (let dep of this._tabDependences) {
            if (!Loader.isLoaded(dep)) {
                return false;
            }
        }
        return true;
    }
    doDraw() {
        Logger.log(this.container, 'Chart started : ' + this._container.id);
        let currentThis = this;
        let isEmpty = false;
        if (currentThis._resultSparql === null
            || currentThis._resultSparql === undefined) {
            isEmpty = true;
        }
        else {
            let cols = currentThis._resultSparql.head.vars;
            let rows = currentThis._resultSparql.results.bindings;
            let noCols = cols.length;
            let noRows = rows.length;
            if (noCols === 0) {
                isEmpty = true;
            }
        }
        if (isEmpty) {
            Logger.displayFeedback(currentThis._container, MESSAGES.ERROR_DATA_EMPTY);
            Logger.log(currentThis.container, 'Chart finished with error : ' + currentThis._container.id);
        }
        else {
            currentThis.draw(currentThis._resultSparql).then(function (valeur) {
                currentThis._isDone = true;
                Logger.log(currentThis.container, 'Chart finished : ' + currentThis._container.id);
            }, function (error) {
                console.log(error);
                Logger.displayFeedback(currentThis._container, MESSAGES.ERROR_CHART, [error]);
                Logger.log(currentThis.container, 'Chart finished with error : ' + currentThis._container.id);
            });
        }
    }
    // noinspection JSValidateJSDoc
    // noinspection tslint
    /**
     * todo
     * @memberof sgvizler.Chart
     * @param {RegExp} patternOption
     * @param {CHART_PATTERN_OPTIONS} typePattern
     */
    execPattern(patternOption, typePattern) {
        let matchArray;
        let raw = this._optionsRaw;
        while ((matchArray = patternOption.exec(raw)) !== null) { // tslint:disable-line
            // this.options[matchArray[1].toLowerCase()] = matchArray[2].trim()
            // this.options[matchArray[1]] = matchArray[2].trim()
            Tools.assignProperty(this.options, matchArray[1], matchArray[2].trim());
            this._patternOptions = typePattern;
        }
    }
    /**
     * todo
     * @memberof sgvizler.Chart
     */
    doParseOptionsRaw() {
        // 3 possibilities
        // pattern option : separate by optionA=a|optionB=b
        // pattern style : any options, only style separate by ;
        // pattern class : words separate by space
        // noinspection TsLint
        let patternOption = /\|? *([^=]*) *= *([^=|]*)/iy; // tslint:disable-line
        let patternStyle = /([^:]+):([^:;]+) *;?/iy; // tslint:disable-line
        let patternClass = /([^ |;]+) ?/iy; // tslint:disable-line
        let patternWiki = /\!? *([^=]*) *= *([^=!]*)/iy; // tslint:disable-line
        let raw = this._optionsRaw;
        if (raw === '') {
            this._patternOptions = CHART_PATTERN_OPTIONS.EMPTY;
        }
        else {
            this._patternOptions = CHART_PATTERN_OPTIONS.UNKNOWN;
        }
        if (this._optionsRaw.indexOf('|') === -1 && this.patternOptions === CHART_PATTERN_OPTIONS.UNKNOWN) {
            this.execPattern(patternWiki, CHART_PATTERN_OPTIONS.WIKI);
        }
        if (this.patternOptions === CHART_PATTERN_OPTIONS.UNKNOWN) {
            this.execPattern(patternOption, CHART_PATTERN_OPTIONS.VARIABLE);
        }
        if (this.patternOptions === CHART_PATTERN_OPTIONS.UNKNOWN) {
            this.execPattern(patternStyle, CHART_PATTERN_OPTIONS.STYLE);
        }
        if (this.patternOptions === CHART_PATTERN_OPTIONS.UNKNOWN) {
            let matchArray;
            let raw = this._optionsRaw;
            let i = 0;
            while ((matchArray = patternClass.exec(raw)) !== null) { // tslint:disable-line
                this.options['class' + i] = matchArray[2];
                this._patternOptions = CHART_PATTERN_OPTIONS.UNKNOWN;
                i++;
            }
        }
        if (this.patternOptions === CHART_PATTERN_OPTIONS.UNKNOWN) {
            Logger.displayFeedback(this.container, MESSAGES.ERROR_CHART_PATTERN_OPTION_UNKNOWN, [this._optionsRaw]);
        }
        else if (this.patternOptions === CHART_PATTERN_OPTIONS.WIKI ||
            this.patternOptions === CHART_PATTERN_OPTIONS.VARIABLE ||
            this.patternOptions === CHART_PATTERN_OPTIONS.STYLE) {
            if (this.options['width'] !== undefined) {
                this.width = this.options['width'];
            }
            if (this.options['height'] !== undefined) {
                this.height = this.options['height'];
            }
        }
    }
}

/**
 * Todo Table
 * @class sgvizler.visualization.Table
 * @tutorial sgvizler_visualization_Table
 * @memberof sgvizler.visualization
 */
class Table extends Chart {
    get icon() {
        return 'fa fa-table';
    }
    get label() {
        return 'Table';
    }
    get subtext() {
        return 'simple table';
    }
    get classFullName() {
        return 'sgvizler.visualization.Table';
    }
    get tutorialFilename() {
        return 'tutorial-sgvizler_visualization_Table.html';
    }
    constructor() {
        super();
        //  addDependence(SparqlResult)
    }
    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Table
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let opt = Object.assign({ headings: 'true' }, currentChart.options);
            let cols = result.head.vars;
            let rows = result.results.bindings;
            let noCols = cols.length;
            let noRows = rows.length;
            // console.log(opt)
            let html = '<table ' + currentChart.getHTMLStyleOrClass() + ' >';
            if (opt.headings === 'true') {
                html += '<tr>';
                for (let col of cols) {
                    html += '<th>' + col + '</th>';
                }
                html += '</tr>';
            }
            for (let row of rows) {
                html += '<tr>';
                for (let col of cols) {
                    html += '<td>' + row[col].value + '</td>';
                }
                html += '</tr>';
            }
            html += '</table>';
            let obj = document.getElementById(currentChart.container.id);
            if (obj) {
                obj.innerHTML = html;
            }
            // finish
            resolve();
        });
    }
}

/**
 * @namespace sgvizler.visualization
 */

var visualizationNS = /*#__PURE__*/Object.freeze({
    Table: Table
});

/**
 * Todo
 *
 * @class sgvizler.visualization.Loader
 * @memberof sgvizler.visualization
 */
class Loader {
    static on(event, fn) {
        if (event === 'loaded') {
            Loader._listCallEvent.push(fn);
        }
    }
    static detectRoot() {
        let resultXpath = document.evaluate('//script[contains(@src,"sgvizler2.js")]/@src', document, null, XPathResult.STRING_TYPE, null);
        let srcScript = resultXpath.stringValue;
        let match = /^(.*)sgvizler2\.js$/.exec(srcScript);
        if (match) {
            Loader._pathScripts = match[1];
        }
    }
    static isLoad(dep) {
        return Loader._load.indexOf(dep.url) !== -1;
    }
    static isLoaded(dep) {
        return Loader._loaded.indexOf(dep.url) !== -1;
    }
    static load(dep) {
        if (dep instanceof ScriptDependency) {
            Loader.loadScript(dep);
        }
        else if (dep instanceof CssDependency) {
            Loader.loadCss(dep);
        }
    }
    static fireEvent(event) {
        for (let call of Loader._listCallEvent) {
            call(event);
        }
    }
    static checkDependenciesToLoad() {
        let len = Loader._dependenciesToLoad.length;
        for (let i = 0; i < len; i++) {
            let dep = Loader._dependenciesToLoad[i];
            if (dep === undefined || Loader.isLoaded(dep)) {
                this._dependenciesToLoad.splice(i);
            }
            else {
                if (dep instanceof ScriptDependency) {
                    Loader.loadScript(dep);
                }
                else if (dep instanceof ScriptDependency) {
                    Loader.loadCss(dep);
                }
            }
        }
    }
    static getAbsoluteURL(url) {
        if (url.match(/^(\/\/|https?)/)) {
            return url;
        }
        else {
            return Loader._pathScripts + url;
        }
    }
    static loadScript(dep) {
        let url = dep.url;
        return new Promise(function (resolve, reject) {
            if (dep.loadBefore && !dep.loadBefore.endDownload) {
                // Logger.logSimple('Waiting : ' + dep.loadBefore.url + ' before ' + dep.url)
                Loader._dependenciesToLoad.push(dep);
                Loader.load(dep.loadBefore);
                return resolve();
            }
            // include script only once
            if (Loader.isLoad(dep)) {
                return resolve(); // false;
            }
            else {
                Loader._load.push(url);
            }
            Logger.logSimple('Loading : ' + dep.url);
            // Adding the script tag to the head as suggested before
            let head = document.getElementsByTagName('head')[0];
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = Loader.getAbsoluteURL(url);
            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            script.onload = function () {
                Loader._loaded.push(url); // in first
                dep.callBack();
                Loader.checkDependenciesToLoad();
                // remember included script
                Loader.fireEvent('loaded');
            };
            // Fire the loading
            head.appendChild(script);
        });
    }
    static loadCss(dep) {
        let url = dep.url;
        return new Promise(function (resolve, reject) {
            if (dep.loadBefore && !dep.loadBefore.endDownload) {
                Loader._dependenciesToLoad.push(dep);
                return Loader.load(dep.loadBefore);
            }
            // include script only once
            if (Loader.isLoad(dep)) {
                return; // false;
            }
            else {
                Loader._load.push(url);
            }
            // <link rel="stylesheet" type="text/css" href="../dist/datatables.min.css"/>
            let head = document.getElementsByTagName('head')[0];
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = Loader.getAbsoluteURL(url);
            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            link.onload = function () {
                Loader._loaded.push(url);
                Logger.logSimple('Loaded : ' + url);
                dep.callBack();
                Loader.checkDependenciesToLoad();
                // remember included script
                Loader.fireEvent('loaded');
            };
            // Fire the loading
            head.appendChild(link);
        });
    }
}
Loader._load = [];
Loader._loaded = [];
Loader._dependenciesToLoad = [];
Loader._pathScripts = '';
Loader._listCallEvent = [];

class Dependency {
    constructor(url, loadBefore) {
        this.url = url;
        this.loadBefore = loadBefore ? loadBefore : null;
        this.endDownload = false;
        this.startDownload = false;
    }
    load() {
        if (!this.isLoaded()) {
            this.startDownload = true;
            Logger.logSimple('Load started :' + this.url);
            Loader.load(this);
        }
    }
    isLoaded() {
        if (Loader.isLoaded(this)) {
            this.startDownload = true;
            this.endDownload = true;
        }
        return this.endDownload;
    }
    callBack() {
        this.endDownload = true;
        Logger.logSimple('Load ended :' + this.url);
    }
}
class ScriptDependency extends Dependency {
}
class CssDependency extends Dependency {
}

/**
 * todo
 * @class sgvizler.SparqlError
 * @memberof sgvizler
 */
class SparqlError {
    static getErrorMessageWithStatus200(xhr) {
        let patternWikidata = /MalformedQueryException: *(.*)/m; // tslint:disable-line
        let errorWikidata = patternWikidata.exec(xhr.response);
        if (errorWikidata !== null) {
            return errorWikidata[1];
        }
        return xhr.response;
    }
    static getErrorWithOtherStatus(xhr, url) {
        let linkError = '<a href="' + url + '" target="_blank">See this error</a>';
        let message = '';
        if (xhr.status === 0) {
            if (xhr.statusText !== '') {
                message = xhr.statusText + '(' + xhr.status + ')';
            }
            else {
                message = 'You need to allow running insecure content in your navigator or this SPARQL service doesn\'t exist or timed out or CORS violation or no Access-Control-Allow-Origin header set. (see console log)';
            }
        }
        else {
            message = xhr.statusText + '(' + xhr.status + ')';
        }
        return message + '<br/>\n' + linkError;
    }
}

/**
 *
 * @memberof gvizler
 */
class Select {
    /**
     *
     * @param {string} elementID
     * @returns {Promise<void>}
     */
    static drawWithElementId(elementID) {
        return __awaiter(this, void 0, void 0, function* () {
            let element = document.getElementById(elementID);
            if (element) {
                yield Select.draw(element);
            }
        });
    }
    /**
     *
     * @param {Element} element
     * @param options
     * @returns {Promise<void>}
     */
    static draw(element, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let nodesOption = Select.getSelectOptions(options);
            for (let node of nodesOption) {
                element.appendChild(node.cloneNode(true));
            }
        });
    }
    /**
     * todo
     */
    static drawAll() {
        let nodesOption = Select.getSelectOptions();
        let nodesSnapshot = document.evaluate("//select[contains(@class, '" + Select.CLASS_NAME + "')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0; i < nodesSnapshot.snapshotLength; i++) {
            for (let node of nodesOption) {
                // @ts-ignore
                nodesSnapshot.snapshotItem(i).appendChild(node.cloneNode(true));
            }
        }
    }
    /**
     * Build url of chart's doc
     * @param {string} classFullName
     * @param {string} pathDoc
     * @returns {string} absolute or relative URL
     */
    static getChartDoc(classFullName, pathDoc) {
        let chartClass = Tools.getObjectByPath(classFullName);
        let path = '';
        if (pathDoc !== undefined) {
            path = pathDoc;
        }
        else {
            path = Core.DOCPATH;
        }
        return path + chartClass.tutorialFilename;
    }
    static getSelectOptions(options) {
        let chartClass;
        let nodeOption;
        let nodeOptgroup;
        let attrLabel;
        let attrValue;
        let attrIcon;
        let attrSub;
        let attrSelected;
        let nodes = [];
        // todo: write the option selected in the doc
        let classSelected = options && options.selected ? options.selected : this.classOfChartSelectedByDefault;
        for (let optgroup of this.charts) {
            nodeOptgroup = document.createElement('optgroup');
            attrLabel = document.createAttribute('label');
            attrLabel.value = optgroup.label;
            nodeOptgroup.setAttributeNode(attrLabel);
            for (let chart of optgroup.charts) {
                chartClass = Tools.getObjectByPath(chart);
                nodeOption = document.createElement('option');
                attrIcon = document.createAttribute('data-icon');
                attrIcon.value = chartClass.icon;
                attrSub = document.createAttribute('data-subtext');
                // todo: write the option subtext in the doc
                if (options.subtext === 'classFullName') {
                    attrSub.value = chartClass.classFullName;
                }
                else {
                    attrSub.value = chartClass.subtext;
                }
                attrValue = document.createAttribute('value');
                attrValue.value = chartClass.classFullName;
                if (classSelected === chart) {
                    attrSelected = document.createAttribute('selected');
                    nodeOption.setAttributeNode(attrSelected);
                }
                nodeOption.text = chartClass.label;
                nodeOption.setAttributeNode(attrIcon);
                nodeOption.setAttributeNode(attrSub);
                nodeOption.setAttributeNode(attrValue);
                nodeOptgroup.appendChild(nodeOption);
            }
            nodes.push(nodeOptgroup);
        }
        return nodes;
    }
}
Select.CLASS_NAME = 'sgvizler-select';
Select.classOfChartSelectedByDefault = 'bordercloud.visualization.DataTable';
/**
 * Stores the charts
 */
Select.charts = [
    {
        // optgroup
        label: 'bordercloud.visualization',
        charts: [
            'bordercloud.visualization.DataTable'
        ]
    },
    {
        // optgroup
        label: 'd3.visualization',
        charts: [
            /*'d3.visualization.AreaChart',
            'd3.visualization.BarChart',
            'd3.visualization.BubbleChart',
            'd3.visualization.ColumnChart',*/
            'd3.visualization.Line',
            'd3.visualization.Pie'
            /*,
            'd3.visualization.ScatterChart'
            */
        ]
    },
    {
        // optgroup
        label: 'leaflet.visualization',
        charts: [
            'leaflet.visualization.Map'
        ]
    },
    {
        // optgroup
        label: 'google.visualization',
        charts: [
            'google.visualization.AnnotationChart',
            'google.visualization.AreaChart',
            'google.visualization.BarChart',
            'google.visualization.BubbleChart',
            'google.visualization.Calendar',
            'google.visualization.CandlestickChart',
            'google.visualization.ColumnChart',
            'google.visualization.ComboChart',
            'google.visualization.GeoChart',
            'google.visualization.Histogram',
            'google.visualization.IntervalChart',
            'google.visualization.LineChart',
            'google.visualization.Map',
            // 'google.visualization.OrgChart',
            'google.visualization.Pie',
            'google.visualization.ScatterChart',
            'google.visualization.SteppedAreaChart',
            'google.visualization.Table',
            'google.visualization.Trendline',
            'google.visualization.Timeline',
            'google.visualization.TreeMap'
        ]
    },
    {
        // optgroup
        label: 'sgvizler.visualization',
        charts: [
            'sgvizler.visualization.Table'
        ]
    }
];

/**
 * todo
 * @class sgvizler.MESSAGES
 * @memberof sgvizler
 */
var MESSAGES;
(function (MESSAGES) {
    MESSAGES[MESSAGES["ERROR_CHART_UNKNOWN"] = 0] = "ERROR_CHART_UNKNOWN";
    MESSAGES[MESSAGES["ERROR_CHART_PATTERN_OPTION_UNKNOWN"] = 1] = "ERROR_CHART_PATTERN_OPTION_UNKNOWN";
    MESSAGES[MESSAGES["ERROR_REQUEST"] = 2] = "ERROR_REQUEST";
    MESSAGES[MESSAGES["ERROR_CHART"] = 3] = "ERROR_CHART";
    MESSAGES[MESSAGES["ERROR_DEPENDENCIES"] = 4] = "ERROR_DEPENDENCIES";
    MESSAGES[MESSAGES["ERROR_ENDPOINT_FORGOT"] = 5] = "ERROR_ENDPOINT_FORGOT";
    MESSAGES[MESSAGES["ERROR_DATA_EMPTY"] = 6] = "ERROR_DATA_EMPTY";
    MESSAGES[MESSAGES["ERROR_DATA_NOROW"] = 7] = "ERROR_DATA_NOROW";
})(MESSAGES || (MESSAGES = {}));
/**
 *
 * @class sgvizler.Messages
 * @memberof sgvizler
 */
class Messages {
    static get(id, args) {
        let message = '';
        switch (id) {
            case MESSAGES.ERROR_CHART_UNKNOWN:
                message = 'The chart $0 does not exist.';
                break;
            case MESSAGES.ERROR_CHART_PATTERN_OPTION_UNKNOWN:
                message = "The pattern of chart options is unknown : '$0'" +
                    "Use 'variable1=value1|variable1=value1' or for style 'width:100%;font:red;' or 'class1 class2'";
                break;
            case MESSAGES.ERROR_REQUEST:
                message = 'Sorry, the sparql server sent an error. </br> $0';
                break;
            case MESSAGES.ERROR_CHART:
                message = 'Sorry, the chart sent an error. </br> $0';
                break;
            case MESSAGES.ERROR_DEPENDENCIES:
                message = 'The chart dependencies sent an error. </br> $0';
                break;
            case MESSAGES.ERROR_ENDPOINT_FORGOT:
                message = 'The endpoint of Sparql service is forgotten (data-sgvizler-endpoint).';
                break;
            case MESSAGES.ERROR_DATA_EMPTY:
                message = 'The resquest sent null.';
                break;
            case MESSAGES.ERROR_DATA_NOROW:
                message = 'The resquest sent no row.';
                break;
        }
        if (args) {
            for (let i = 0, len = args.length; i < len; i++) { // tslint:disable-line
                message = message.replace('$' + i, args[i]);
            }
        }
        return message;
    }
}

/**
 * Todo comment
 * @class sgvizler.Tools
 * @memberof sgvizler
 */
class Tools {
    // noinspection JSValidateJSDoc
    /**
     * Gets the object located at `path` from `object`. `path`
     * is given in dot notation.
     * Search in first in the library and after in window object
     * @param {string} path
     * @param object
     * @returns { any }  or undefined
     */
    static getObjectByPath(path, object) {
        let i;
        let len;
        let segments = path.split('.');
        let cursor = object || sgvizler2; // search in the lib if object is empty
        for (i = 0, len = segments.length; i < len; i += 1) {
            if (cursor === undefined) { // create new child element.
                break;
            }
            if (i < len - 1) {
                cursor = cursor[segments[i]]; // if cursor is undefined, it remains undefined.
            }
            else {
                try {
                    cursor = new cursor[segments[i]](); // create an instance
                }
                catch (e) {
                    // do nothing
                    // cursor[segments[i]]() is not a constructor]
                    cursor = undefined;
                }
            }
        }
        if (cursor === undefined && !object) { // window is the global scope.
            cursor = this.getObjectByPath(path, window);
        }
        return cursor;
    }
    static assignProperty(obj, path, value) {
        return Tools.assignJSON(obj, Tools.getJSONByPath(path, value));
    }
    // public static escapeHtml (str: string): string {
    //     let text = document.createTextNode(str)
    //     let div = document.createElement('div')
    //     div.appendChild(text)
    //     return div.innerHTML
    // }
    // public static decodeHtml (html: string): any {
    // //     let element = document.createElement('div')
    // //     element.innerHTML = html
    // //     return element.textContent
    // // }
    // // function decodeHTMLEntities(text) {
    // }
    static encodeHtml(str) {
        let buf = [];
        for (let i = str.length - 1; i >= 0; i--) {
            buf.unshift(['&#', str.charCodeAt(i), ';'].join(''));
        }
        return buf.join('');
    }
    static decodeHtml(str) {
        let text = str.replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        });
        // remove \u00a0 of &nbsp;
        text = text.replace(/(?:[^\S\r\n]|\u00a0)/g, function (match, dec) {
            return ' ';
        });
        return text;
    }
    static getJSONByPath(path, value) {
        let json = '';
        let propertyName = '';
        let nextPath = '';
        if (path.length === 0 || !value) {
            return json;
        }
        let positionDot = path.search(/\./);
        if (positionDot === -1) {
            propertyName = path.trim();
            if (Number.isNaN(Number(value))) {
                let valueBoolean = Tools.convertToBoolean(value);
                if (valueBoolean === undefined) {
                    let str = JSON.stringify(String(value));
                    str = str.substring(1, str.length - 1);
                    json = '{"' + propertyName + '":"' + str + '"}';
                }
                else {
                    json = '{"' + propertyName + '":' + value + '}';
                }
            }
            else {
                json = '{"' + propertyName + '":' + value + '}';
            }
        }
        else {
            propertyName = path.substring(0, positionDot);
            nextPath = path.substring(positionDot + 1, path.length);
            json = '{"' + propertyName.trim() + '": ' + Tools.getJSONByPath(nextPath, value) + ' }';
        }
        return json;
    }
    static assignJSON(obj, json) {
        Tools.mergeInObject(obj, JSON.parse(json));
        return obj;
    }
    static convertToBoolean(input) {
        if (input.length <= 5) {
            try {
                return JSON.parse(input);
            }
            catch (e) {
                return undefined;
            }
        }
        return undefined;
    }
    // Convert to typescript : https://github.com/gmasmejean/recursiveAssign/blob/master/index.js
    static assign(ref, key, value) {
        if (Tools.isPlainObject(value)) {
            if (!Tools.isPlainObject(ref[key])) {
                ref[key] = {};
            }
            Tools.mergeInObject(ref[key], value);
        }
        else {
            ref[key] = value;
        }
    }
    static mergeInObject(dest, data) {
        Object.keys(data).forEach(key => {
            Tools.assign(dest, key, data[key]);
        });
    }
    static isPlainObject(o) {
        return o !== undefined && o.constructor !== undefined && o.constructor.prototype === Object.prototype;
    }
}

/**
 * Handles all logging, either to console or designated HTML
 * container.
 *
 * @class sgvizler.Logger
 * @memberof sgvizler
 */
class Logger {
    /**
     * Logs a message.
     * @method log
     * @protected
     * @param {string} message The message to log.
     */
    static log(container, message) {
        if (container.loglevel === 2) {
            console.log(this.elapsedTime() + 's: ' + message);
        }
    }
    static logSimple(message) {
        console.log(this.elapsedTime() + 's: ' + message);
    }
    /**
     * Todo
     * @param {Container} container
     * @param {MESSAGES} messageName
     * @param {Array<string>} args
     */
    static displayFeedback(container, messageName, args) {
        let message = Messages.get(messageName, args);
        if (container.loglevel === 2) {
            if (message) {
                let obj = document.getElementById(container.id);
                if (obj) {
                    obj.innerHTML = "<p style='color:red'>" + message + '</p>';
                }
            }
        }
    }
    /**
     * @method timeElapsed
     * @private
     * @return {number} The number of seconds elapsed since
     * this sgvizler got loaded.
     */
    static elapsedTime() {
        return (Date.now() - this._startTime) / 1000;
    }
}
/**
 * The timestamp for the load start of the current running
 * version of sgvizler. Used to calculate time elapse of
 * future events.
 */
Logger._startTime = Date.now();

/**
 *
 * @class sgvizler.Core
 * @memberof sgvizler
 */
class Core {
    /**
     * todo
     * @returns {string}
     */
    static get path() {
        return this._path;
    }
    /**
     * todo
     * @param {string} value
     */
    static set path(value) {
        this._path = value;
    }
}
/**
 * The version number of this sgvizler2.
 * @static
 * @readonly
 * @type {string} VERSION
 */
Core.VERSION = '0.0';
/**
 * sgvizler2's homepage.
 * @static
 * @readonly
 * @type {string} HOMEPAGE
 */
Core.HOMEPAGE = 'https://bordercloud.github.io/sgvizler2/index.html';
/**
 * sgvizler2's docs path
 * @static
 * @readonly
 * @type {string} DOCPATH
 */
Core.DOCPATH = 'https://bordercloud.github.io/sgvizler2/';
Core._path = '';

/**
 *
 * @class sgvizler.SPARQL_RESULT
 * @memberof sgvizler
 */
var SPARQL_RESULT;
(function (SPARQL_RESULT) {
    SPARQL_RESULT[SPARQL_RESULT["xml"] = 0] = "xml";
    SPARQL_RESULT[SPARQL_RESULT["json"] = 1] = "json";
    SPARQL_RESULT[SPARQL_RESULT["jsonp"] = 2] = "jsonp";
})(SPARQL_RESULT || (SPARQL_RESULT = {}));
/**
 *
 * @class sgvizler.SparqlTools
 * @memberof gvizler
 */
class SparqlTools {
    static getOutputLabel(id) {
        let str = '';
        switch (id) {
            case SPARQL_RESULT.xml:
                str = 'xml';
                break;
            case SPARQL_RESULT.json:
                str = 'json';
                break;
            case SPARQL_RESULT.jsonp:
                str = 'jsonp';
                break;
        }
        return str;
    }
    static getXMLHttpRequestResponseType(id) {
        let type = '';
        switch (id) {
            case SPARQL_RESULT.xml:
                type = ''; // 	DOMString (this is the default value for xhr)
                break;
            case SPARQL_RESULT.json:
            case SPARQL_RESULT.jsonp:
                type = 'json';
                break;
        }
        return type;
    }
    static getHeaderAccept(id) {
        let str = '';
        switch (id) {
            case SPARQL_RESULT.xml:
                str = 'application/sparql-results+xml';
                break;
            case SPARQL_RESULT.json:
            case SPARQL_RESULT.jsonp:
                str = 'application/sparql-results+json';
                break;
        }
        return str;
    }
    static convertString(label) {
        let result = SPARQL_RESULT.json;
        switch (label) {
            case 'xml':
                result = SPARQL_RESULT.xml;
                break;
            case 'json':
                result = SPARQL_RESULT.json;
                break;
            case 'jsonp':
                result = SPARQL_RESULT.jsonp;
                break;
        }
        return result;
    }
}

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
class Request {
    constructor() {
        this._query = '';
        this._endpoint = '';
        this._endpointOutputFormat = SPARQL_RESULT.json;
        this._method = 'GET';
        this._queryParameter = 'query';
        this.listeners = {};
    }
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

/**
 *
 * @class sgvizler.
 * @memberof sgvizler
 */
var CONTAINER_STATE;
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
class Container {
    /**
     * Collects values designated for sgvizler in the given.
     * See also property PREFIX.
     * @param {string} elementID The ID for which the attributes should be collected.
     */
    constructor(elementID) {
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
    static create(elementID, endpoint, query, chartName, options, loglevel, output, method, parameter) {
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
     * Get the name of chart object.
     * @returns {string}
     */
    get chartName() {
        return this._chartName;
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
Container.PREFIX = 'data-sgvizler-';
Container.QUERY_ATTRIBUTE_NAME = Container.PREFIX + 'query';
Container.ENDPOINT_ATTRIBUTE_NAME = Container.PREFIX + 'endpoint';
Container.OUTPUT_FORMAT_ATTRIBUTE_NAME = Container.PREFIX + 'endpoint-output-format';
Container.QUERY_PARAMETER_ATTRIBUTE_NAME = Container.PREFIX + 'endpoint-query-parameter';
Container.OUTPUT_METHOD_ATTRIBUTE_NAME = Container.PREFIX + 'endpoint-method';
Container.CHART_ATTRIBUTE_NAME = Container.PREFIX + 'chart';
Container.CHART_OPTION_ATTRIBUTE_NAME = Container.PREFIX + 'chart-options';
Container.LOG_LEVEL_ATTRIBUTE_NAME = Container.PREFIX + 'log';

/**
 * @namespace sgvizler
 */
const visualization = visualizationNS;

var S = /*#__PURE__*/Object.freeze({
    visualization: visualization,
    Logger: Logger,
    Loader: Loader,
    SparqlError: SparqlError,
    Select: Select,
    get MESSAGES () { return MESSAGES; },
    Messages: Messages,
    Tools: Tools,
    Dependency: Dependency,
    ScriptDependency: ScriptDependency,
    CssDependency: CssDependency,
    Core: Core,
    get CHART_PATTERN_OPTIONS () { return CHART_PATTERN_OPTIONS; },
    Chart: Chart,
    get SPARQL_RESULT () { return SPARQL_RESULT; },
    SparqlTools: SparqlTools,
    Request: Request,
    get CONTAINER_STATE () { return CONTAINER_STATE; },
    Container: Container
});

/**
 * Enum for tri-state values.
 * @readonly
 * @enum {number}
 */
var DATATABLE_COL_OPTIONS;
(function (DATATABLE_COL_OPTIONS) {
    DATATABLE_COL_OPTIONS[DATATABLE_COL_OPTIONS["TAG"] = 0] = "TAG";
    DATATABLE_COL_OPTIONS[DATATABLE_COL_OPTIONS["STYLE"] = 1] = "STYLE";
})(DATATABLE_COL_OPTIONS || (DATATABLE_COL_OPTIONS = {}));
/**
 * This table uses <a href="https://datatables.net/">DataTables.net</a>.
 * You can adapt each column with the option colstyle.
 *
 * @class bordercloud.visualization.DataTable
 * @memberof bordercloud.visualization
 */
class DataTable extends Chart {
    constructor() {
        super();
        this.addCss(Core.path + '/lib/DataTables/datatables.min.css');
        // this.addCss(Core.path + '/lib/DataTables/DataTables-1.10.15/css/dataTables.bootstrap4.min.css')
        let depDatatables = this.addScript(Core.path + '/lib/DataTables/datatables.min.js');
        // this.addScript(Core.path + '/lib/DataTables/Buttons-1.4.0/js/dataTables.buttons.js',depDatatables)
        // this.addScript(Core.path + '/lib/DataTables/DataTables-1.10.15/js/dataTables.bootstrap4.js',depDatatables)
    }
    /**
     * This function parses colStyle option and build the parameter ColumnDef of DataTable
     * Example :
     * "colStyle=col2_img_max-width:250px;col2_img_border-radius:50%;col2_img_display:block;col2_img_margin:auto;col3_img_max-width:300px;col3_img_max-height:300px;col2_img_opacity:0.5"
     *
     * @param {string} codeStyle
     * @param {number} noCols
     * @returns {Array<any>}
     */
    static buildColumnDefs(codeStyle, noCols) {
        // noinspection Annotator
        let regex = / *col([0-9]+)\_([a-zA-Z]+)\_([^=;\n]*) */ig;
        let m;
        let datasetColumnsDefs = [];
        let datasetColumnsFunc;
        let colOptions = [];
        let optionCol;
        // init
        for (let c = 0; c < noCols; c++) {
            colOptions[c] = [];
            colOptions[c][DATATABLE_COL_OPTIONS.TAG] = '';
            colOptions[c][DATATABLE_COL_OPTIONS.STYLE] = '';
        }
        // noinspection TsLint
        while ((m = regex.exec(codeStyle)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            optionCol = parseInt(m[1], 10);
            colOptions[optionCol][DATATABLE_COL_OPTIONS.TAG] = m[2];
            colOptions[optionCol][DATATABLE_COL_OPTIONS.STYLE] += m[3] + ';';
        }
        for (let c = 0; c < noCols; c++) {
            switch (colOptions[c][DATATABLE_COL_OPTIONS.TAG]) {
                case 'img':
                    datasetColumnsFunc = this.getFunctionColumnDefImg(colOptions[c][DATATABLE_COL_OPTIONS.STYLE]);
                    break;
                case 'span':
                    datasetColumnsFunc = this.getFunctionColumnDefSpan(colOptions[c][DATATABLE_COL_OPTIONS.STYLE]);
                    break;
                /**/
                case 'video':
                    datasetColumnsFunc = this.getFunctionColumnDefVideo(colOptions[c][DATATABLE_COL_OPTIONS.STYLE]);
                    break;
                default:
                    datasetColumnsFunc = this.getFunctionColumnDefDefault();
            }
            // noinspection TsLint
            datasetColumnsDefs[c] = {
                'targets': c,
                // "data": "description",
                'render': datasetColumnsFunc
            };
        }
        return datasetColumnsDefs;
    }
    static getFunctionColumnDefDefault() {
        return (function (data, type, full, meta) {
            return data;
        });
    }
    static getFunctionColumnDefImg(style) {
        return (function (data, type, full, meta) {
            return '<img src="' + data + '"  style="' + style + '"\>';
        });
    }
    static getFunctionColumnDefVideo(style) {
        return (function (data, type, full, meta) {
            let youtubePattern = new RegExp('youtu');
            let facebookPattern = new RegExp('facebook');
            let mediawikiPattern = new RegExp('commons\.wikimedia\.org');
            if (youtubePattern.test(data)) {
                let url = data.replace('watch?v=', 'embed/');
                return '<iframe  style="' + style + '" src="' + url + '" meta http-equiv="X-Frame-Options" content="allow" frameborder="0" allowfullscreen></iframe>';
            }
            else if (facebookPattern.test(data)) {
                //data = 'https://www.facebook.com/XXXX/videos/XXXXX/' // example
                //doc https://developers.facebook.com/docs/plugins/embedded-video-player
                return '<iframe src="https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(data) + '&show_text=0&width=560" style="border:none;overflow:hidden;' + style + '" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>';
            }
            else if (mediawikiPattern.test(data)) {
                //data = 'https://commons.wikimedia.org/wiki/File%3AAuguste_%26_Louis_Lumi%C3%A8re-_L'Arroseur_arros%C3%A9_(1895).webm' // example
                //return '<iframe src="' + data + '?embedplayer=false" style="' + style + '" frameborder="0" allowfullscreen></iframe>'
                //doc http://html5video.org/wiki/Rewriting_HTML5_Media_Elements
                return '<video controls style="' + style + '"><source src="' + data + '"></video>';
            }
            else {
                return '<iframe  style="' + style + '" src="' + data + '" meta http-equiv="X-Frame-Options" content="allow" frameborder="0" allowfullscreen></iframe>';
            }
        });
    }
    static getFunctionColumnDefSpan(style) {
        return (function (data, type, full, meta) {
            return '<span style="' + style + '"\>' + data + '</span>';
        });
    }
    get icon() {
        return 'fa fa-table';
    }
    get label() {
        return 'DataTable';
    }
    get subtext() {
        return 'DataTable';
    }
    get classFullName() {
        return 'bordercloud.visualization.DataTable';
    }
    get tutorialFilename() {
        return 'tutorial-bordercloud_visualization_DataTable.html';
    }
    /**
     * Draw a chart
     * Available options:
     * - 'class' :  css class (default: "table table-striped table-bordered")
     * - 'cellspacing'   : cellspacing of table  (default: "0")
     * - 'width'   :  width (default: "100%")
     * - 'colStyle'   :   (default: "")
     *
     * Example :
     * "colStyle=col2_img_max-width:250px;col2_img_border-radius:50%;col2_img_display:block;col2_img_margin:auto;col3_img_max-width:300px;col3_img_max-height:300px;col2_img_opacity:0.5"
     *
     * @param {SparqlResultInterface} result
     * @returns {Promise< any >}
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // precondition
            let obj = document.getElementById(currentChart.container.id);
            if (!obj) {
                Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART_UNKNOWN, [currentChart.container.id]);
                return resolve();
            }
            try {
                let cols = result.head.vars;
                let rows = result.results.bindings;
                let row;
                let datasetRow;
                let noCols = cols.length;
                let noRows = rows.length;
                let idChart = currentChart.container.id + '-datatable';
                let datasetColumns = [];
                let datasetColumnsDefs;
                let dataset = [];
                let tableElement = document.createElement('table');
                let tableId = document.createAttribute('id');
                let tableClass = document.createAttribute('class');
                let tableCellSpacing = document.createAttribute('cellspacing');
                let tableWidth = document.createAttribute('width');
                let opt = Object.assign({
                    'class': 'table table-striped table-bordered',
                    'cellspacing': '0',
                    'width': '100%',
                    'colstyle': undefined
                }, currentChart.options);
                for (let c = 0; c < noCols; c++) {
                    datasetColumns[c] = { title: cols[c] };
                }
                if (opt.colstyle !== undefined) {
                    datasetColumnsDefs = DataTable.buildColumnDefs(opt.colstyle, noCols);
                }
                for (let r = 0; r < noRows; r++) {
                    row = rows[r];
                    datasetRow = [];
                    // loop cells
                    for (let c = 0; c < noCols; c += 1) {
                        datasetRow[c] = row[cols[c]] !== undefined ? row[cols[c]].value : '';
                    }
                    dataset[r] = datasetRow;
                }
                tableId.value = idChart;
                tableClass.value = opt.class;
                tableCellSpacing.value = opt.cellspacing;
                tableWidth.value = opt.width;
                tableElement.setAttributeNode(tableId);
                tableElement.setAttributeNode(tableClass);
                tableElement.setAttributeNode(tableCellSpacing);
                tableElement.setAttributeNode(tableWidth);
                obj.appendChild(tableElement);
                $('#' + idChart).DataTable({
                    bSort: false,
                    data: dataset,
                    columns: datasetColumns,
                    columnDefs: datasetColumnsDefs,
                    dom: 'Bfrtip',
                    buttons: [
                        'csv',
                        'pdf',
                        'print'
                    ]
                });
            }
            catch (e) {
                return reject(e);
            }
            // finish
            return resolve();
        });
    }
}

/**
 * @namespace bordercloud.visualization
 */

var visualizationNS$1 = /*#__PURE__*/Object.freeze({
    DataTable: DataTable
});

/**
 * @namespace bordercloud
 */
const visualization$1 = visualizationNS$1;

var bordercloudNS = /*#__PURE__*/Object.freeze({
    visualization: visualization$1
});

/**
 * Tools
 * @class google.Tools
 * @memberof google
 */
class Tools$1 {
    static decodeFormatSize(value) {
        let result = value;
        if (Number.isNaN(Number(value))) {
            let patternPercent = /%/gi;
            let patternPixel = /px/gi;
            if (result.search(patternPixel) >= 0) {
                result = result.replace('px', '');
                if (!Number.isNaN(Number(result))) {
                    result = Number(result);
                }
            }
            else if (result.search(patternPercent) >= 0) ;
        }
        return result;
    }
}

/**
 * Data
 * @class google.Data
 * @memberof google.Data
 */
class Data {
    constructor(result, raw = false) {
        if (raw) {
            this.convertResultRaw(result);
        }
        else {
            this.convertResult(result);
        }
    }
    setRole(col, role) {
        this._dataTable.setColumnProperty(col, 'role', role);
    }
    getDataTable() {
        return this._dataTable;
    }
    convertResult(result) {
        let data = new google.visualization.DataTable();
        let cols = result.head.vars;
        let rows = result.results.bindings;
        let noCols = cols.length;
        let noRows = rows.length;
        for (let col of cols) {
            // RDF Term	JSON form
            // IRI I	{"type": "uri", "value": "I"}
            // Literal S	{"type": "literal","value": "S"}
            // Literal S with language tag L	{ "type": "literal", "value": "S", "xml:lang": "L"}
            // Literal S with datatype IRI D	{ "type": "literal", "value": "S", "datatype": "D"}
            // Blank node, label B	{"type": "bnode", "value": "B"}
            let colName = col.replace('_', ' ');
            if (noRows > 0) {
                let type = rows[0][col] !== undefined ? rows[0][col].datatype : '';
                if (type === 'http://www.w3.org/2001/XMLSchema#decimal' ||
                    type === 'http://www.w3.org/2001/XMLSchema#integer') {
                    data.addColumn('number', colName);
                }
                else if (type === 'http://www.w3.org/2001/XMLSchema#boolean') {
                    data.addColumn('boolean', colName);
                }
                else if (type === 'http://www.w3.org/2001/XMLSchema#date') {
                    data.addColumn('date', colName);
                }
                else if (type === 'http://www.w3.org/2001/XMLSchema#dateTime') {
                    data.addColumn('datetime', colName);
                }
                else if (type === 'http://www.w3.org/2001/XMLSchema#time') {
                    data.addColumn('timeofday', colName);
                }
                else {
                    data.addColumn('string', colName);
                }
            }
            else {
                data.addColumn('string', colName);
            }
        }
        if (noRows > 0) {
            data.addRows(noRows);
            for (let x = 0; x < noRows; x++) {
                for (let y = 0; y < noCols; y++) {
                    // data.setCell(x,y,rows[x][cols[y]].value)
                    let type = rows[x][cols[y]] !== undefined && rows[x][cols[y]].hasOwnProperty('datatype') ? rows[x][cols[y]].datatype : '';
                    if (type === 'http://www.w3.org/2001/XMLSchema#integer') {
                        data.setCell(x, y, parseInt(rows[x][cols[y]].value, 10));
                    }
                    else if (type === 'http://www.w3.org/2001/XMLSchema#decimal' || type === 'http://www.w3.org/2001/XMLSchema#float') {
                        data.setCell(x, y, parseFloat(rows[x][cols[y]].value));
                    }
                    else if (type === 'http://www.w3.org/2001/XMLSchema#boolean') {
                        // todo test
                        // 'boolean' - JavaScript boolean value ('true' or 'false'). Example value: v:'true'
                        data.setCell(x, y, rows[x][cols[y]].value === 'true' ? true : false);
                    }
                    else if (type === 'http://www.w3.org/2001/XMLSchema#date') {
                        // todo test
                        // 'date' - JavaScript Date object (zero-based month), with the time truncated. Example value: v:new Date(2008, 0, 15)
                        data.setCell(x, y, new Date(rows[x][cols[y]].value));
                    }
                    else if (type === 'http://www.w3.org/2001/XMLSchema#dateTime') {
                        // todo test
                        // 'datetime' - JavaScript Date object including the time. Example value: v:new Date(2008, 0, 15, 14, 30, 45)
                        data.setCell(x, y, new Date(rows[x][cols[y]].value));
                    }
                    else if (type === 'http://www.w3.org/2001/XMLSchema#time') {
                        // todo test
                        // 'timeofday' - Array of three numbers and an optional fourth, representing hour (0 indicates midnight), minute, second, and optional millisecond. Example values: v:[8, 15, 0], v: [6, 12, 1, 144]
                        let time = new Date(rows[x][cols[y]].value);
                        data.setCell(x, y, [time.getHours(), time.getHours(), time.getSeconds(), time.getMilliseconds()]);
                    }
                    else {
                        if (rows[x][cols[y]] === undefined) {
                            data.setCell(x, y, null);
                        }
                        else {
                            // 'string' - JavaScript string value. Example value: v:'hello'
                            //let value = rows[x][cols[y]] !== undefined ? rows[x][cols[y]].value : ''
                            data.setCell(x, y, rows[x][cols[y]].value);
                        }
                    }
                    // console.log('rows['+x+'][cols['+y+']].value = ' + rows[x][cols[y]].value + ' ' +
                    // rows[x][cols[y]].datatype)
                }
            }
        }
        this._dataTable = data;
    }
    convertResultRaw(result) {
        let data = new google.visualization.DataTable();
        let cols = result.head.vars;
        let rows = result.results.bindings;
        let noCols = cols.length;
        let noRows = rows.length;
        for (let col of cols) {
            data.addColumn('string', col);
        }
        if (noRows > 0) {
            data.addRows(noRows);
            for (let x = 0; x < noRows; x++) {
                for (let y = 0; y < noCols; y++) {
                    if (rows[x][cols[y]] === undefined) {
                        data.setCell(x, y, '');
                    }
                    else {
                        data.setCell(x, y, rows[x][cols[y]].value.toString());
                    }
                }
            }
        }
        this._dataTable = data;
    }
}

/**
 * Todo AnnotationChart
 * @class google.visualization.AnnotationChart
 * @tutorial google_visualization_AnnotationChart
 * @memberof google.visualization
 */
class AnnotationChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['annotationchart'] });
        AnnotationChart._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-line';
    }
    get label() {
        return 'AnnotationChart';
    }
    get subtext() {
        return 'AnnotationChart';
    }
    get classFullName() {
        return 'google.visualization.AnnotationChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_AnnotationChart.html';
    }
    /**
     * Make a standard simple html AnnotationChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf AnnotationChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!AnnotationChart._isInit) {
                AnnotationChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let AnnotationChart = new google.visualization.AnnotationChart(document.getElementById(currentChart.container.id));
                    AnnotationChart.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
AnnotationChart._isInit = false;

/**
 * Todo AreaChart
 * @class google.visualization.AreaChart
 * @tutorial google_visualization_AreaChart
 * @memberof google.visualization
 */
class AreaChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        AreaChart._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-area';
    }
    get label() {
        return 'AreaChart';
    }
    get subtext() {
        return 'AreaChart';
    }
    get classFullName() {
        return 'google.visualization.AreaChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_AreaChart.html';
    }
    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Table
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!AreaChart._isInit) {
                AreaChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let areaChart = new google.visualization.AreaChart(document.getElementById(currentChart.container.id));
                    areaChart.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
AreaChart._isInit = false;

/**
 * Todo BarChart
 * @class google.visualization.BarChart
 * @tutorial google_visualization_BarChart
 * @memberof google.visualization
 */
class BarChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart', 'bar'] });
        BarChart._isInit = true;
    }
    get icon() {
        return 'fa fa-align-left';
    }
    get label() {
        return 'BarChart';
    }
    get subtext() {
        return 'BarChart';
    }
    get classFullName() {
        return 'google.visualization.BarChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_BarChart.html';
    }
    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf BarChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!BarChart._isInit) {
                BarChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let chart = new google.visualization.BarChart(document.getElementById(currentChart.container.id));
                    chart.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
BarChart._isInit = false;

/**
 * Todo BubbleChart
 * @class google.visualization.BubbleChart
 * @tutorial google_visualization_BubbleChart
 * @memberof google.visualization
 */
class BubbleChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        BubbleChart._isInit = true;
    }
    get icon() {
        return 'fa fa-circle';
    }
    get label() {
        return 'BubbleChart';
    }
    get subtext() {
        return 'BubbleChart';
    }
    get classFullName() {
        return 'google.visualization.BubbleChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_BubbleChart.html';
    }
    /**
     * Make a standard simple html bubbleChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf BubbleChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!BubbleChart._isInit) {
                BubbleChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let chart = new google.visualization.BubbleChart(document.getElementById(currentChart.container.id));
                    chart.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
BubbleChart._isInit = false;

/**
 * Todo Calendar
 * @class google.visualization.Calendar
 * @tutorial google_visualization_Calendar
 * @memberof google.visualization
 */
class Calendar extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['calendar'] });
        Calendar._isInit = true;
    }
    get icon() {
        return 'fa fa-calendar';
    }
    get label() {
        return 'Calendar';
    }
    get subtext() {
        return 'Calendar';
    }
    get classFullName() {
        return 'google.visualization.Calendar';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_Calendar.html';
    }
    /**
     * Make a standard simple html Calendar.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Calendar
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!Calendar._isInit) {
                Calendar.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let calendar = new google.visualization.Calendar(document.getElementById(currentChart.container.id));
                    calendar.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
Calendar._isInit = false;

/**
 * Todo CandlestickChart
 * @class google.visualization.CandlestickChart
 * @tutorial google_visualization_CandlestickChart
 * @memberof google.visualization
 */
class CandlestickChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        CandlestickChart._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-line';
    }
    get label() {
        return 'CandlestickChart';
    }
    get subtext() {
        return 'CandlestickChart';
    }
    get classFullName() {
        return 'google.visualization.CandlestickChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_CandlestickChart.html';
    }
    /**
     * Make a standard simple html CandlestickChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf CandlestickChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // console.log(noCols + " x " + noRows)
            if (result.results.bindings.length === 0) {
                return reject(Messages.get(MESSAGES.ERROR_DATA_NOROW));
            }
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!CandlestickChart._isInit) {
                CandlestickChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let candlestickChart = new google.visualization.CandlestickChart(document.getElementById(currentChart.container.id));
                    candlestickChart.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
CandlestickChart._isInit = false;

/**
 * Todo ColumnChart
 * @class google.visualization.ColumnChart
 * @tutorial google_visualization_ColumnChart
 * @memberof google.visualization
 */
class ColumnChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart', 'bar'] });
        ColumnChart._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-bar';
    }
    get label() {
        return 'ColumnChart';
    }
    get subtext() {
        return 'ColumnChart';
    }
    get classFullName() {
        return 'google.visualization.ColumnChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_ColumnChart.html';
    }
    /**
     * Make a standard simple html ColumnChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf ColumnChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
                reverseCategories: false
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!ColumnChart._isInit) {
                ColumnChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let ColumnChart = new google.visualization.ColumnChart(document.getElementById(currentChart.container.id));
                    ColumnChart.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
ColumnChart._isInit = false;

/**
 * Todo ComboChart
 * @class google.visualization.ComboChart
 * @tutorial google_visualization_ComboChart
 * @memberof google.visualization
 */
class ComboChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        ComboChart._isInit = true;
    }
    get icon() {
        return 'fa fa-signal';
    }
    get label() {
        return 'ComboChart';
    }
    get subtext() {
        return 'ComboChart';
    }
    get classFullName() {
        return 'google.visualization.ComboChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_ComboChart.html';
    }
    /**
     * Make a standard simple html ComboChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf ComboChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!ComboChart._isInit) {
                ComboChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let comboChart = new google.visualization.ComboChart(document.getElementById(currentChart.container.id));
                    comboChart.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
ComboChart._isInit = false;

/**
 * Todo API
 * @class google.API
 * @memberof google
 */
class API {
    /**
     * todo
     * @returns {string}
     */
    static get key() {
        return this._key;
    }
    /**
     * todo
     * @param {string} value
     */
    static set key(value) {
        this._key = value;
    }
}
/**
 * todo
 * @type {string}
 * @private
 */
API._key = '';

/**
 * Todo GeoChart
 * @class google.visualization.GeoChart
 * @tutorial google_visualization_GeoChart
 * @memberof google.visualization
 */
class GeoChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['geochart'], mapsApiKey: API.key });
        GeoChart._isInit = true;
    }
    get icon() {
        return 'fa fa-globe';
    }
    get label() {
        return 'GeoChart';
    }
    get subtext() {
        return 'GeoChart';
    }
    get classFullName() {
        return 'google.visualization.GeoChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_GeoChart.html';
    }
    /**
     * Make a standard simple html geochart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf GeoChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!GeoChart._isInit) {
                GeoChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let geochart = new google.visualization.GeoChart(document.getElementById(currentChart.container.id));
                    geochart.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
GeoChart._isInit = false;

/**
 * Todo Histogram
 * @class google.visualization.Histogram
 * @tutorial google_visualization_Histogram
 * @memberof google.visualization
 */
class Histogram extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        Histogram._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-area';
    }
    get label() {
        return 'Histogram';
    }
    get subtext() {
        return 'Histogram';
    }
    get classFullName() {
        return 'google.visualization.Histogram';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_Histogram.html';
    }
    /**
     * Make a standard simple html Histogram.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Histogram
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!Histogram._isInit) {
                Histogram.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let histogram = new google.visualization.Histogram(document.getElementById(currentChart.container.id));
                    histogram.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
Histogram._isInit = false;

/**
 * Todo IntervalChart
 * @class google.visualization.IntervalChart
 * @tutorial google_visualization_IntervalChart
 * @memberof google.visualization
 */
class IntervalChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart', 'line'] });
        IntervalChart._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-line';
    }
    get label() {
        return 'Interval';
    }
    get subtext() {
        return 'Interval';
    }
    get classFullName() {
        return 'google.visualization.IntervalChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_IntervalChart.html';
    }
    /**
     * Draw a IntervalChart
     * @memberOf IntervalChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!IntervalChart._isInit) {
                IntervalChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let cols = result.head.vars;
                    let noCols = cols.length;
                    for (let y = 2; y < noCols; y++) {
                        data.setRole(y, 'interval');
                    }
                    let line = new google.visualization.LineChart(document.getElementById(currentChart.container.id));
                    line.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
IntervalChart._isInit = false;

/**
 * Todo LineChart
 * @class google.visualization.LineChart
 * @tutorial google_visualization_LineChart
 * @memberof google.visualization
 */
class LineChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart', 'line'] });
        LineChart._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-line';
    }
    get label() {
        return 'Line';
    }
    get subtext() {
        return 'Line';
    }
    get classFullName() {
        return 'google.visualization.LineChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_LineChart.html';
    }
    /**
     * Draw a LineChart
     * @memberOf LineChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            let height = '500';
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!LineChart._isInit) {
                LineChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let line = new google.visualization.LineChart(document.getElementById(currentChart.container.id));
                    line.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
LineChart._isInit = false;

/**
 * Todo Table
 * @class google.visualization.Map
 * @tutorial google_visualization_Map
 * @memberof google.visualization
 */
class Map extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['map'], mapsApiKey: API.key });
        Map._isInit = true;
    }
    get icon() {
        return 'fa fa-map';
    }
    get label() {
        return 'Map';
    }
    get subtext() {
        return 'Map';
    }
    get classFullName() {
        return 'google.visualization.Map';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_Map.html';
    }
    /**
     * Make a Google map
     * todo
     * @memberOf Map
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
                showTooltip: false,
                showInfoWindow: true,
                enableScrollWheel: true
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            // fix bug in local
            if (location.origin.startsWith('file:')) {
                opt = Object.assign({
                    icons: {
                        default: {
                            normal: 'https://maps.google.com/mapfiles/ms/micons/red-dot.png',
                            selected: 'https://maps.google.com/mapfiles/ms/micons/blue-dot.png'
                        }
                    }
                }, opt);
            }
            // init only one time
            if (!Map._isInit) {
                Map.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let messageError = '';
                    let cols = result.head.vars;
                    let rows = result.results.bindings;
                    let noCols = cols.length;
                    let noRows = rows.length;
                    let lat;
                    let long;
                    let description;
                    let data = new google.visualization.DataTable();
                    if (noCols <= 2) {
                        messageError = 'Parameters : latitude(xsd:Decimal) longitude(xsd:Decimal) title(xsd:string' +
                            ' optional) introduction(xsd:string optional) link(IRI optional)';
                    }
                    else {
                        let latitudeCol = 0;
                        let longitudeCol = 1;
                        let descriptionCol = 2;
                        data.addColumn('number', latitudeCol);
                        data.addColumn('number', longitudeCol);
                        if (noCols > 2) {
                            data.addColumn('string', descriptionCol);
                        }
                        data.addRows(noRows);
                        for (let x = 0; x < noRows; x++) {
                            lat = parseFloat(rows[x][cols[latitudeCol]].value);
                            long = parseFloat(rows[x][cols[longitudeCol]].value);
                            description = '';
                            if (isNaN(lat) || isNaN(long)) {
                                messageError = 'Latitude or longitude is not a decimal. Parameters of chart :' +
                                    ' latitude(xsd:Decimal)' +
                                    ' longitude(xsd:Decimal) title(xsd:string' +
                                    ' optional) introduction(xsd:string optional) link(IRI optional). ';
                                break;
                            }
                            if (noCols >= 6) {
                                // latitude longitude title text link
                                let title = rows[x][cols[2]] !== undefined ? rows[x][cols[2]].value : '';
                                let text = rows[x][cols[3]] !== undefined ? "<p style='margin: 0px'>" + rows[x][cols[3]].value + '</p>' : '';
                                let link = rows[x][cols[4]] !== undefined ? "<a style='font-size: large;font-style: medium;' href='" + rows[x][cols[4]].value + "' target='_blank'>" + title + '</a>' : title;
                                let img = rows[x][cols[5]] !== undefined ? "<img src='" + rows[x][cols[5]].value + "' style='margin-left:5px;margin-bottom:5px;width:150px;float:right;'/>" : '';
                                if (rows[x][cols[3]] === undefined || rows[x][cols[3]].value.length === 0) {
                                    description = '<div style="display: flow-root;min-width: 150px;min-height:150px;">' + link + '<div>' + img + '</div></div>';
                                }
                                else {
                                    description = '<div style="display: flow-root;width: 350px;min-height:150px;">' + link + '<div>' + img + text + '</div></div>';
                                }
                                data.setCell(x, latitudeCol, lat);
                                data.setCell(x, longitudeCol, long);
                                data.setCell(x, descriptionCol, description);
                            }
                            else if (noCols === 5) {
                                // latitude longitude title introduction link
                                let title = rows[x][cols[2]] !== undefined ? rows[x][cols[2]].value : '';
                                let text = rows[x][cols[3]] !== undefined ? rows[x][cols[3]].value : '';
                                let link = rows[x][cols[4]] !== undefined ? "<a href='" + rows[x][cols[4]].value + "'>" + title + '</a>' : title;
                                description = '<b>' + link + '</b><br/>' + text;
                                data.setCell(x, latitudeCol, lat);
                                data.setCell(x, longitudeCol, long);
                                data.setCell(x, descriptionCol, description);
                            }
                            else if (noCols === 4) {
                                // latitude longitude title introduction
                                let title = rows[x][cols[2]] !== undefined ? rows[x][cols[2]].value : '';
                                let text = rows[x][cols[3]] !== undefined ? rows[x][cols[3]].value : '';
                                description = '<b>' + title + '</b><br/>' + text;
                                data.setCell(x, latitudeCol, lat);
                                data.setCell(x, longitudeCol, long);
                                data.setCell(x, descriptionCol, description);
                            }
                            else if (noCols === 3) {
                                // latitude longitude title
                                let title = rows[x][cols[2]] !== undefined ? rows[x][cols[2]].value : '';
                                description = '<b>' + title + '</br>';
                                data.setCell(x, latitudeCol, lat);
                                data.setCell(x, longitudeCol, long);
                                data.setCell(x, descriptionCol, description);
                            }
                            else if (noCols === 2) {
                                // latitude longitude
                                data.setCell(x, latitudeCol, lat);
                                data.setCell(x, longitudeCol, long);
                            }
                        }
                    }
                    if (messageError !== '') {
                        return reject(Error(messageError));
                    }
                    let table = new google.visualization.Map(document.getElementById(currentChart.container.id));
                    table.draw(data, opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
Map._isInit = false;

/**
 * Todo OrgChart
 * @class google.visualization.OrgChart
 * @tutorial google_visualization_OrgChart
 * @memberof google.visualization
 */
class OrgChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['orgchart'] });
        OrgChart._isInit = true;
    }
    get icon() {
        return 'fa fa-sitemap';
    }
    get label() {
        return 'OrgChart';
    }
    get subtext() {
        return 'OrgChart';
    }
    get classFullName() {
        return 'google.visualization.OrgChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_OrgChart.html';
    }
    /**
     * Make a standard simple html OrgChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf OrgChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
                allowHtml: true
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!OrgChart._isInit) {
                OrgChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let orgChart = new google.visualization.OrgChart(document.getElementById(currentChart.container.id));
                    orgChart.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
OrgChart._isInit = false;

/**
 * Todo Pie
 * @class google.visualization.Pie
 * @tutorial google_visualization_Pie
 * @memberof google.visualization
 */
class Pie extends Chart {
    constructor() {
        super();
        this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    get icon() {
        return 'fas fa-chart-pie';
    }
    get label() {
        return 'Pie';
    }
    get subtext() {
        return 'Pie';
    }
    get classFullName() {
        return 'google.visualization.Pie';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_Pie.html';
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        Pie._isInit = true;
    }
    /**
     * Make a standard simple html pie.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Pie
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!Pie._isInit) {
                Pie.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let Pie = new google.visualization.PieChart(document.getElementById(currentChart.container.id));
                    Pie.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
Pie._isInit = false;

/**
 * Todo ScatterChart
 * @class google.visualization.ScatterChart
 * @tutorial google_visualization_ScatterChart
 * @memberof google.visualization
 */
class ScatterChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        ScatterChart._isInit = true;
    }
    get icon() {
        return 'fa fa-circle';
    }
    get label() {
        return 'ScatterChart';
    }
    get subtext() {
        return 'ScatterChart';
    }
    get classFullName() {
        return 'google.visualization.ScatterChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_ScatterChart.html';
    }
    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf ScatterChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!ScatterChart._isInit) {
                ScatterChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let chart = new google.visualization.ScatterChart(document.getElementById(currentChart.container.id));
                    chart.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
ScatterChart._isInit = false;

/**
 * Todo SteppedAreaChart
 * @class google.visualization.SteppedAreaChart
 * @tutorial google_visualization_SteppedAreaChart
 * @memberof google.visualization
 */
class SteppedAreaChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        SteppedAreaChart._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-area';
    }
    get label() {
        return 'SteppedAreaChart';
    }
    get subtext() {
        return 'SteppedAreaChart';
    }
    get classFullName() {
        return 'google.visualization.SteppedAreaChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_SteppedAreaChart.html';
    }
    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Table
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!SteppedAreaChart._isInit) {
                SteppedAreaChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let steppedAreaChart = new google.visualization.SteppedAreaChart(document.getElementById(currentChart.container.id));
                    steppedAreaChart.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
SteppedAreaChart._isInit = false;

/**
 * Todo Table
 * @class google.visualization.Table
 * @tutorial google_visualization_Table
 * @memberof google.visualization
 */
class Table$1 extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['table'] });
        Table$1._isInit = true;
    }
    get icon() {
        return 'fa fa-table';
    }
    get label() {
        return 'Table';
    }
    get subtext() {
        return 'Table';
    }
    get classFullName() {
        return 'google.visualization.Table';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_Table.html';
    }
    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Table
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = '100%';
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
                raw: true,
                showRowNumber: false
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!Table$1._isInit) {
                Table$1.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result, opt.raw);
                    let table = new google.visualization.Table(document.getElementById(currentChart.container.id));
                    table.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
Table$1._isInit = false;

/**
 * Todo Timeline
 * @class google.visualization.Timeline
 * @tutorial google_visualization_Timeline
 * @memberof google.visualization
 */
class Timeline extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['timeline'] });
        Timeline._isInit = true;
    }
    get icon() {
        return 'fa fa-tasks';
    }
    get label() {
        return 'Timeline';
    }
    get subtext() {
        return 'Timeline';
    }
    get classFullName() {
        return 'google.visualization.Timeline';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_Timeline.html';
    }
    /**
     * Make a standard simple html Timeline.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Timeline
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!Timeline._isInit) {
                Timeline.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let timeline = new google.visualization.Timeline(document.getElementById(currentChart.container.id));
                    timeline.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
Timeline._isInit = false;

/**
 * Todo TreeMap
 * @class google.visualization.TreeMap
 * @tutorial google_visualization_TreeMap
 * @memberof google.visualization
 */
class TreeMap extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['treemap'] });
        TreeMap._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-area';
    }
    get label() {
        return 'TreeMap';
    }
    get subtext() {
        return 'TreeMap';
    }
    get classFullName() {
        return 'google.visualization.TreeMap';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_TreeMap.html';
    }
    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Table
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!TreeMap._isInit) {
                TreeMap.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let treeMap = new google.visualization.TreeMap(document.getElementById(currentChart.container.id));
                    treeMap.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
TreeMap._isInit = false;

/**
 * Todo Trendline
 * @class google.visualization.Trendline
 * @tutorial google_visualization_Trendline
 * @memberof google.visualization
 */
class Trendline extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        Trendline._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-line';
    }
    get label() {
        return 'Trendline';
    }
    get subtext() {
        return 'Trendline';
    }
    get classFullName() {
        return 'google.visualization.Trendline';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_Trendline.html';
    }
    /**
     * Make a standard simple html Trendline.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Trendline
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools$1.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
                trendlines: { 0: {} }
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools$1.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!Trendline._isInit) {
                Trendline.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let chart = new google.visualization.ScatterChart(document.getElementById(currentChart.container.id));
                    chart.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
Trendline._isInit = false;

/**
 * @namespace google.visualization
 */
// Word Trees
// https://developers.google.com/chart/interactive/docs/gallery/wordtree
// todo

var visualizationNS$2 = /*#__PURE__*/Object.freeze({
    IntervalChart: IntervalChart,
    AnnotationChart: AnnotationChart,
    BarChart: BarChart,
    BubbleChart: BubbleChart,
    Calendar: Calendar,
    CandlestickChart: CandlestickChart,
    ColumnChart: ColumnChart,
    ComboChart: ComboChart,
    GeoChart: GeoChart,
    Histogram: Histogram,
    AreaChart: AreaChart,
    LineChart: LineChart,
    Map: Map,
    OrgChart: OrgChart,
    Pie: Pie,
    ScatterChart: ScatterChart,
    SteppedAreaChart: SteppedAreaChart,
    Table: Table$1,
    Timeline: Timeline,
    TreeMap: TreeMap,
    Trendline: Trendline
});

/**
 * @namespace google
 */
const visualization$2 = visualizationNS$2;

var googleNS = /*#__PURE__*/Object.freeze({
    visualization: visualization$2,
    Data: Data,
    Tools: Tools$1,
    API: API
});

/**
 * Todo AreaChart
 * @class d3.visualization.AreaChart
 * @tutorial d3_visualization_AreaChart
 * @memberof d3.visualization
 */
class AreaChart$1 extends Chart {
    get icon() {
        return 'fas fa-chart-area';
    }
    get label() {
        return 'AreaChart';
    }
    get subtext() {
        return 'AreaChart';
    }
    get classFullName() {
        return 'd3.visualization.AreaChart';
    }
    get tutorialFilename() {
        return 'tutorial-d3_visualization_AreaChart.html';
    }
    constructor() {
        super();
        //this.addCss(Core.path + '/lib/d3/d3.css')
        let dep = this.addScript(Core.path + '/lib/d3/d3.min.js');
    }
    /**
     * Make a simple line.
     * Available options:
     * -
     * @memberOf AreaChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            console.log('test');
            let heightOpt = '100%';
            if (currentChart.height !== '') {
                heightOpt = currentChart.height;
            }
            let opt = Object.assign({
                showRowNumber: false,
                width: currentChart.width,
                height: heightOpt
            }, currentChart.options);
            // build the datatable
            /*let cols = result.head.vars
            let rows = result.results.bindings
            let noCols = cols.length
            let noRows = rows.length
            let dataset: Array<any> = []
            let label
            let count
            let data = [{
                date: '1-May-12',
                close: 58.1
            }]
            for (let row of rows) {
                label = row[cols[0]].value
                count = Number(row[cols[1]].value)
                if ( label === undefined || count === undefined) {
                    Logger.logSimple('Erreur ? D3JS:pie label ' + label + ' count ' + count)
                } else {
                    dataset.push({ label: label , count: count })
                }
            }

            console.log(data)
            let margin = {
                top: 30,
                right: 20 * 3,
                bottom: 30,
                left: 50
            }
            let width = 800 - margin.left - margin.right
            let height = 570 - margin.top - margin.bottom
            let parseDate = d3.time.format('%d-%b-%y').parse
            // x axis
            let x = d3.scalePoint().range([0, width])
            let xAxis = d3.axisBottom().scale(x).ticks(15)
            // y axis
            let y = d3.scaleLinear().range([height, 0])
            let yAxis = d3.axisRight().scale(y).ticks(17)

            let valueline = d3.line()
                .x(function (d: any) {
                  return x(d.date)
                })
                .y(function (d: any) {
                  return y(d.close)
                })
            let svg = d3.select( '#' + currentChart.container.id)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
// get data

data.forEach(function (d: any) {
    d.date = parseDate(d.date)
    d.close = +d.close
})
            svg.append('path') // Add the valueline path.
            // .attr('fill', 'none')
           // .attr('stroke', 'steelblue')
           // .attr('stroke-linejoin', 'round')
           // .attr('stroke-linecap', 'round')
           // .attr('stroke-width', 1.5)
          //  .attr('d', valueline(dataset))
           .attr('d', valueline(data))
            svg.append('g') // Add the X Axis
            .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis)
            svg.append('g') // Add the Y Axis
                .attr('class', 'y axis')
                .call(yAxis)*/
            // finish
            // Example
            let containerElement = d3.select('#' + currentChart.container.id);
            let containerElementNode = containerElement.node();
            if (containerElementNode) {
                let width = containerElementNode.clientWidth !== 0 ? containerElementNode.clientWidth : 300;
                let height = containerElementNode.clientHeight !== 0 ? containerElementNode.clientHeight : 150;
                let svg = containerElement.append('svg') // associate our data with the document
                    .attr('width', width)
                    .attr('height', height)
                    .attr('id', 'idtest');
                let margin = { top: 20, right: 20, bottom: 30, left: 40 };
                let widthChart = width - (margin.left + margin.right);
                let heightChart = height - (margin.top + margin.bottom);
                let xScale = d3.scaleLinear();
                let yScale = d3.scaleLinear();
                let xAxisCall = d3.axisBottom();
                let yAxisCall = d3.axisLeft();
                xScale.domain([0, 100]).range([0, widthChart]);
                yScale.domain([0, 100]).range([heightChart, 0]);
                xAxisCall.scale(xScale);
                yAxisCall.scale(yScale);
                let newX = svg.append('g')
                    // .attr('class', 'x axis')
                    .attr('transform', 'translate(' + [margin.left, heightChart + margin.top] + ')')
                    .call(xAxisCall);
                let newY = svg.append('g')
                    // .attr('class', 'y axis')
                    .attr('transform', 'translate(' + [margin.left, margin.top] + ')')
                    .call(yAxisCall);
            }
            return resolve();
        });
    }
}

/** Work in progress, help us ! */
/**
 * Todo BarChart
 * @class d3.visualization.BarChart
 * @tutorial d3_visualization_BarChart
 * @memberof d3.visualization
 */
class BarChart$1 extends Chart {
    get icon() {
        return 'far fa-chart-bar';
    }
    get label() {
        return 'BarChart';
    }
    get subtext() {
        return 'BarChart';
    }
    get classFullName() {
        return 'd3.visualization.BarChart';
    }
    get tutorialFilename() {
        return 'tutorial-d3_visualization_BarChart.html';
    }
    constructor() {
        super();
        //this.addCss(Core.path + '/lib/d3/d3.css')
        let dep = this.addScript(Core.path + '/lib/d3/d3.min.js');
    }
    /**
     * Make a simple pie.
     * Available options:
     * -
     * @memberOf BarChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let heightOpt = '100%';
            if (currentChart.height !== '') {
                heightOpt = currentChart.height;
            }
            let opt = Object.assign({
                showRowNumber: false,
                width: currentChart.width,
                height: heightOpt
            }, currentChart.options);
            // build the datatable
            let cols = result.head.vars;
            let rows = result.results.bindings;
            let noCols = cols.length;
            let noRows = rows.length;
            let dataset = [];
            let label;
            let counter;
            for (let row of rows) {
                label = row[cols[0]].value;
                counter = Number(row[cols[1]].value);
                if (label === undefined || counter === undefined) {
                    Logger.logSimple('Erreur ? D3JS:pie label ' + label + ' count ' + counter);
                }
                else {
                    dataset.push({ label: label, count: counter });
                }
            }
            // console.log(data)
            let containerElement = d3.select('#' + currentChart.container.id);
            let containerElementNode = containerElement.node();
            if (containerElementNode) {
                let width = containerElementNode.clientWidth !== 0 ? containerElementNode.clientWidth : 300;
                let height = containerElementNode.clientHeight !== 0 ? containerElementNode.clientHeight : 150;
                let svg = containerElement.append('svg') // associate our data with the document
                    .attr('width', width)
                    .attr('height', height)
                    .attr('id', 'idtest');
                svg = svg.append('g') // make a group to hold our pie chart
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
                // var donutWidth = 75;
                /*let legendRectSize = 18
                let legendSpacing = 4
                let color = d3.scaleOrdinal(d3.schemeCategory10)*/
                /*let arc = d3.arc()
                   // .innerRadius(radius - donutWidth)
                    .innerRadius(0)
                    .outerRadius(radius)
                let pie = d3.pie()
                    .value(function (d: any) { return d.count })
                    .sort(null)*/
                /*let path = svg.selectAll('path')
                    .data(pie(dataset)
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function (d: any, i: any) {
                        return color(d.data.label)
                    })*/
                let bars = svg.selectAll('rect')
                    .data(dataset)
                    .enter()
                    .append('rect')
                    .attr('width', function (i) { return i.count / 10000; })
                    .attr('height', 50)
                    .attr('y', function (i, j) { return j * 50; })
                    .attr('fill', '#3399FF');
                console.log('dataset : ' + dataset);
                // Todo limit nb (look pie chart of Google)
                /*let legend = svg.selectAll('.legend')
                    .data(color.domain())
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function (d: any, i: any) {
                        let height = legendRectSize + legendSpacing
                        let offset = height * color.domain().length / 2
                        let horz = -2 * legendRectSize
                        let vert = i * height - offset
                        return 'translate(' + (horz + radius * 2 + 20 ) + ',' + vert + ')'
                    })
                legend.append('rect')
                    .attr('width', legendRectSize)
                    .attr('height', legendRectSize)
                    .style('fill', color)
                    .style('stroke', color)
                legend.append('text')
                    .attr('x', legendRectSize + legendSpacing)
                    .attr('y', legendRectSize - legendSpacing)
                    .text(function (d: any) { return d })*/
            }
            // finish
            return resolve();
        });
    }
}

/**
 * Todo BubbleChart
 * @class d3.visualization.BubbleChart
 * @tutorial d3_visualization_BubbleChart
 * @memberof d3.visualization
 */
class BubbleChart$1 extends Chart {
    get icon() {
        return 'fas fa-chart-pie';
    }
    get label() {
        return 'BubbleChart';
    }
    get subtext() {
        return 'BubbleChart';
    }
    get classFullName() {
        return 'd3.visualization.BubbleChart';
    }
    get tutorialFilename() {
        return 'tutorial-d3_visualization_BubbleChart.html';
    }
    constructor() {
        super();
        //this.addCss(Core.path + '/lib/d3/d3.css')
        let dep = this.addScript(Core.path + '/lib/d3/d3.min.js');
    }
    /**
     * Make a simple pie.
     * Available options:
     * -
     * @memberOf Pie
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            let heightOpt = '100%';
            if (currentChart.height !== '') {
                heightOpt = currentChart.height;
            }
            let opt = Object.assign({
                showRowNumber: false,
                width: currentChart.width,
                height: heightOpt
            }, currentChart.options);
            // build the datatable
            let cols = result.head.vars;
            let rows = result.results.bindings;
            let noCols = cols.length;
            let noRows = rows.length;
            /*let dataset: Array<any> = []
            let label
            let counter
            for (let row of rows) {
                label = row[cols[0]].value
                counter = Number(row[cols[1]].value)
                if ( label === undefined || counter === undefined) {
                    Logger.logSimple('Erreur ? D3JS:pie label ' + label + ' count ' + counter)
                } else {
                    dataset.push({ label: label , count: counter })
                }
            }*/
            // console.log(data)
            // Example
            let containerElement = d3.select('#' + currentChart.container.id);
            let containerElementNode = containerElement.node();
            if (containerElementNode) {
                let width = containerElementNode.clientWidth !== 0 ? containerElementNode.clientWidth : 300;
                let height = containerElementNode.clientHeight !== 0 ? containerElementNode.clientHeight : 150;
                let svg = containerElement.append('svg') // associate our data with the document
                    .attr('width', width)
                    .attr('height', height)
                    .attr('id', 'idtest');
                let margin = { top: 20, right: 20, bottom: 30, left: 40 };
                let widthChart = width - (margin.left + margin.right);
                let heightChart = height - (margin.top + margin.bottom);
                let xScale = d3.scaleLinear();
                let yScale = d3.scaleLinear();
                let xAxisCall = d3.axisBottom();
                let yAxisCall = d3.axisLeft();
                xScale.domain([0, 100]).range([0, widthChart]);
                yScale.domain([0, 100]).range([heightChart, 0]);
                xAxisCall.scale(xScale);
                yAxisCall.scale(yScale);
                let newX = svg.append('g')
                    // .attr('class', 'x axis')
                    .attr('transform', 'translate(' + [margin.left, heightChart + margin.top] + ')')
                    .call(xAxisCall);
                let newY = svg.append('g')
                    // .attr('class', 'y axis')
                    .attr('transform', 'translate(' + [margin.left, margin.top] + ')')
                    .call(yAxisCall);
            }
            // finish
            return resolve();
        });
    }
}

/**
 * Todo ColumnChart
 * @class d3.visualization.ColumnChart
 * @tutorial d3_visualization_ColumnChart
 * @memberof d3.visualization
 */
class ColumnChart$1 extends Chart {
    get icon() {
        return 'far fa-chart-bar';
    }
    get label() {
        return 'ColumnChart';
    }
    get subtext() {
        return 'ColumnChart';
    }
    get classFullName() {
        return 'd3.visualization.ColumnChart';
    }
    get tutorialFilename() {
        return 'tutorial-d3_visualization_ColumnChart.html';
    }
    constructor() {
        super();
        //this.addCss(Core.path + '/lib/d3/d3.css')
        let dep = this.addScript(Core.path + '/lib/d3/d3.min.js');
    }
    /**
     * Make a simple ColumnChart.
     * Available options:
     * -
     * @memberOf ColumnChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let heightOpt = '100%';
            if (currentChart.height !== '') {
                heightOpt = currentChart.height;
            }
            let opt = Object.assign({
                showRowNumber: false,
                width: currentChart.width,
                height: heightOpt
            }, currentChart.options);
            /*
                        // build the datatable
                        let cols = result.head.vars
                        let rows = result.results.bindings
                        let noCols = cols.length
                        let noRows = rows.length
                        let dataset: Array<any> = []
                        let label
                        let counter
                        for (let row of rows) {
                            label = row[cols[0]].value
                            counter = Number(row[cols[1]].value)
                            if ( label === undefined || counter === undefined) {
                                Logger.logSimple('Erreur ? D3JS:ColumnChart label ' + label + ' count ' + counter)
                            }else {
                                dataset.push({ label: label , count: counter })
                            }
                        }
            
                        // console.log(data)
                        let containerElement = d3.select('#' + currentChart.container.id)
                        let containerElementNode = containerElement.node() as any
                        if (containerElementNode) {
                            let width = containerElementNode.clientWidth !== 0 ? containerElementNode.clientWidth : 300
                            let height = containerElementNode.clientHeight !== 0 ? containerElementNode.clientHeight : 150
                            let svg = containerElement.append('svg') // associate our data with the document
                                .attr('width', width)
                                .attr('height', height)
                                .attr('id', 'idtest')
            
                            let radius = Math.min(width, height) / 2
            
                            svg = svg.append('g') // make a group to hold our ColumnChart chart
                                .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
            
                            // var donutWidth = 75;
                            let legendRectSize = 18
                            let legendSpacing = 4
                            let color = d3.scaleOrdinal(d3.schemeCategory10)
            
                            let arc = d3.arc()
                               // .innerRadius(radius - donutWidth)
                                .innerRadius(0)
                                .outerRadius(radius)
                            let ColumnChart = d3.ColumnChart()
                                .value(function (d: any) { return d.count })
                                .sort(null)
                            let path = svg.selectAll('path')
                                .data(ColumnChart(dataset))
                                .enter()
                                .append('path')
                                .attr('d', arc)
                                .attr('fill', function (d: any, i: any) {
                                    return color(d.data.label)
                                })
            
                            // Todo limit nb (look ColumnChart chart of Google)
                            let legend = svg.selectAll('.legend')
                                .data(color.domain())
                                .enter()
                                .append('g')
                                .attr('class', 'legend')
                                .attr('transform', function (d: any, i: any) {
                                    let height = legendRectSize + legendSpacing
                                    let offset = height * color.domain().length / 2
                                    let horz = -2 * legendRectSize
                                    let vert = i * height - offset
                                    return 'translate(' + (horz + radius * 2 + 20 ) + ',' + vert + ')'
                                })
                            legend.append('rect')
                                .attr('width', legendRectSize)
                                .attr('height', legendRectSize)
                                .style('fill', color)
                                .style('stroke', color)
                            legend.append('text')
                                .attr('x', legendRectSize + legendSpacing)
                                .attr('y', legendRectSize - legendSpacing)
                                .text(function (d: any) { return d })
                        }
                        */
            // finish
            return resolve();
        });
    }
}

/**
 * Todo Line
 * @class d3.visualization.Line
 * @tutorial d3_visualization_Line
 * @memberof d3.visualization
 */
class Line extends Chart {
    get icon() {
        return 'fas fa-chart-line';
    }
    get label() {
        return 'Line';
    }
    get subtext() {
        return 'Line';
    }
    get classFullName() {
        return 'd3.visualization.Line';
    }
    get tutorialFilename() {
        return 'tutorial-d3_visualization_Line.html';
    }
    constructor() {
        super();
        //this.addCss(Core.path + '/lib/d3/d3.css')
        let dep = this.addScript(Core.path + '/lib/d3/d3.min.js');
    }
    /**
     * Make a simple line.
     * Available options:
     * -
     * @memberOf Line
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            //console.log('test')
            let heightOpt = '100%';
            if (currentChart.height !== '') {
                heightOpt = currentChart.height;
            }
            let opt = Object.assign({
                showRowNumber: true,
                width: currentChart.width,
                height: heightOpt
                // hAxisscaleType: true
            }, currentChart.options);
            // build the datatable
            let cols = result.head.vars;
            let rows = result.results.bindings;
            let noCols = cols.length;
            let noRows = rows.length;
            let dataset = [];
            let label;
            let count;
            for (let row of rows) {
                label = row[cols[0]].value;
                count = Number(row[cols[1]].value);
                if (label === undefined || count === undefined) {
                    Logger.logSimple('Erreur ? D3JS:pie label ' + label + ' count ' + count);
                }
                else {
                    dataset.push({ label: label, count: count });
                }
            }
            console.log(dataset);
            let margin = {
                top: 30,
                right: 20 * 3,
                bottom: 30,
                left: 70
            };
            let width = 800 - margin.left - margin.right;
            let height = 570 - margin.top - margin.bottom;
            // x axis
            let x = d3.scalePoint()
                .domain(dataset.map(function (entry) {
                return entry.label;
            }))
                .rangeRound([0, 800])
                .padding(0.5);
            let xAxis = d3.axisBottom().scale(x).ticks(15);
            // y axis
            let y = d3.scaleLinear().range([height, 0]);
            y.domain([0, d3.max(dataset, function (d) {
                    return d.count;
                })]);
            let yAxis = d3.axisLeft().scale(y).ticks(17);
            let valueline = d3.line()
                .x(function (d) {
                return x(d.label);
            })
                .y(function (d) {
                return y(d.count);
            });
            let svg = d3.select('#' + currentChart.container.id)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            svg.append('path') // Add the valueline path.
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke-linejoin', 'round')
                .attr('stroke-linecap', 'round')
                .attr('stroke-width', 1.5)
                .attr('d', valueline(dataset));
            svg.append('g') // Add the X Axis
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis);
            svg.append('g') // Add the Y Axis
                .attr('class', 'y axis')
                .call(yAxis);
            // finish
            return resolve();
        });
    }
}

/**
 * Todo Pie
 * @class d3.visualization.Pie
 * @tutorial d3_visualization_Pie
 * @memberof d3.visualization
 */
class Pie$1 extends Chart {
    get icon() {
        return 'fas fa-chart-pie';
    }
    get label() {
        return 'Pie';
    }
    get subtext() {
        return 'Pie';
    }
    get classFullName() {
        return 'd3.visualization.Pie';
    }
    get tutorialFilename() {
        return 'tutorial-d3_visualization_Pie.html';
    }
    constructor() {
        super();
        //this.addCss(Core.path + '/lib/d3/d3.css')
        let dep = this.addScript(Core.path + '/lib/d3/d3.min.js');
    }
    /**
     * Make a simple pie.
     * Available options:
     * -
     * @memberOf Pie
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let heightOpt = '100%';
            if (currentChart.height !== '') {
                heightOpt = currentChart.height;
            }
            let opt = Object.assign({
                showRowNumber: false,
                width: currentChart.width,
                height: heightOpt
            }, currentChart.options);
            // build the datatable
            let cols = result.head.vars;
            let rows = result.results.bindings;
            let noCols = cols.length;
            let noRows = rows.length;
            let dataset = [];
            let label;
            let counter;
            for (let row of rows) {
                label = row[cols[0]].value;
                counter = Number(row[cols[1]].value);
                if (label === undefined || counter === undefined) {
                    Logger.logSimple('Erreur ? D3JS:pie label ' + label + ' count ' + counter);
                }
                else {
                    dataset.push({ label: label, count: counter });
                }
            }
            // console.log(data)
            let containerElement = d3.select('#' + currentChart.container.id);
            let containerElementNode = containerElement.node();
            if (containerElementNode) {
                let width = containerElementNode.clientWidth !== 0 ? containerElementNode.clientWidth : 300;
                let height = containerElementNode.clientHeight !== 0 ? containerElementNode.clientHeight : 150;
                let svg = containerElement.append('svg') // associate our data with the document
                    .attr('width', width)
                    .attr('height', height)
                    .attr('id', 'idtest');
                let radius = Math.min(width, height) / 2;
                svg = svg.append('g') // make a group to hold our pie chart
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
                // var donutWidth = 75;
                let legendRectSize = 18;
                let legendSpacing = 4;
                let color = d3.scaleOrdinal(d3.schemeCategory10);
                let arc = d3.arc()
                    // .innerRadius(radius - donutWidth)
                    .innerRadius(0)
                    .outerRadius(radius);
                let pie = d3.pie()
                    .value(function (d) { return d.count; })
                    .sort(null);
                let path = svg.selectAll('path')
                    .data(pie(dataset))
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function (d, i) {
                    return color(d.data.label);
                });
                // Todo limit nb (look pie chart of Google)
                let legend = svg.selectAll('.legend')
                    .data(color.domain())
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function (d, i) {
                    let height = legendRectSize + legendSpacing;
                    let offset = height * color.domain().length / 2;
                    let horz = -2 * legendRectSize;
                    let vert = i * height - offset;
                    return 'translate(' + (horz + radius * 2 + 20) + ',' + vert + ')';
                });
                legend.append('rect')
                    .attr('width', legendRectSize)
                    .attr('height', legendRectSize)
                    .style('fill', color)
                    .style('stroke', color);
                legend.append('text')
                    .attr('x', legendRectSize + legendSpacing)
                    .attr('y', legendRectSize - legendSpacing)
                    .text(function (d) { return d; });
            }
            // finish
            return resolve();
        });
    }
}

/**
 * Todo ScatterChart
 * @class d3.visualization.ScatterChart
 * @tutorial d3_visualization_ScatterChart
 * @memberof d3.visualization
 */
class ScatterChart$1 extends Chart {
    get icon() {
        return 'fa fa-ScatterChart-chart';
    }
    get label() {
        return 'ScatterChart';
    }
    get subtext() {
        return 'ScatterChart';
    }
    get classFullName() {
        return 'd3.visualization.ScatterChart';
    }
    get tutorialFilename() {
        return 'tutorial-d3_visualization_ScatterChart.html';
    }
    constructor() {
        super();
        //this.addCss(Core.path + '/lib/d3/d3.css')
        let dep = this.addScript(Core.path + '/lib/d3/d3.min.js');
    }
    /**
     * Make a simple ScatterChart.
     * Available options:
     * -
     * @memberOf ScatterChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let heightOpt = '500';
            if (currentChart.height !== '') {
                heightOpt = currentChart.height;
            }
            let opt = Object.assign({
                showRowNumber: false,
                width: currentChart.width,
                height: heightOpt
            }, currentChart.options);
            // build the datatable
            let cols = result.head.lets;
            let rows = result.results.bindings;
            let noCols = cols.length;
            let noRows = rows.length;
            let dataset = [];
            let label;
            let counter;
            for (let row of rows) {
                label = row[cols[0]].value;
                counter = Number(row[cols[1]].value);
                if (label === undefined || counter === undefined) {
                    Logger.logSimple('Erreur ? D3JS:ScatterChart label ' + label + ' count ' + counter);
                }
                else {
                    dataset.push({ label: label, count: counter });
                }
            }
            console.log(dataset);
            // let containerElement = d3.select('#' + currentChart.container.id)
            //  let containerElementNode = containerElement.node() as any
            /*if (containerElementNode) {
                let width = containerElementNode.clientWidth !== 0 ? containerElementNode.clientWidth : 300
                let height = containerElementNode.clientHeight !== 0 ? containerElementNode.clientHeight : 150
                let svg = containerElement.append('svg') // associate our data with the document
                    .attr('width', width)
                    .attr('height', height)
                    .attr('id', 'idtest')

                let radius = Math.min(width, height) / 2

                svg = svg.append('g') // make a group to hold our ScatterChart chart
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')

                // let donutWidth = 75;
                let legendRectSize = 18
                let legendSpacing = 4
                let color = d3.scaleOrdinal(d3.schemeCategory10)

                let arc = d3.arc()
                   // .innerRadius(radius - donutWidth)
                    .innerRadius(0)
                    .outerRadius(radius)
                let ScatterChart = d3.ScatterChart()
                    .value(function (d: any) { return d.count })
                    .sort(null)
                let path = svg.selectAll('path')
                    .data(ScatterChart(dataset))
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function (d: any, i: any) {
                        return color(d.data.label)
                    })

                // Todo limit nb (look ScatterChart chart of Google)
                let legend = svg.selectAll('.legend')
                    .data(color.domain())
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function (d: any, i: any) {
                        let height = legendRectSize + legendSpacing
                        let offset = height * color.domain().length / 2
                        let horz = -2 * legendRectSize
                        let vert = i * height - offset
                        return 'translate(' + (horz + radius * 2 + 20 ) + ',' + vert + ')'
                    })
                legend.append('rect')
                    .attr('width', legendRectSize)
                    .attr('height', legendRectSize)
                    .style('fill', color)
                    .style('stroke', color)
                legend.append('text')
                    .attr('x', legendRectSize + legendSpacing)
                    .attr('y', legendRectSize - legendSpacing)
                    .text(function (d: any) { return d })*/
            /*
                                let width = 500
                                let height = 300
                                let padding = 30
                                let numDataPoints = 50
                                let xRange = Math.random() * 1000
                                let yRange = Math.random() * 1000
                            for (let i = 0; i < numDataPoints; i++) {
                              let newNumber1 = Math.floor(Math.random() * xRange)
                              let newNumber2 = Math.floor(Math.random() * yRange)
                               dataset.push([newNumber1, newNumber2])
                            }
                            // Create scale functions
                            let xScale = d3.scale.linear()
                                           .domain([0, d3.max(dataset, function (d: any) {
                                             return d[0]
                                           }) ])
                                           .range([padding, width - padding * 2])
                            let yScale = d3.scale.linear()
                                           .domain([0, d3.max(dataset, function (d: any) {
                                             return d[1]
                                           })])
                                           .range([height - padding, padding])
                            let rScale = d3.scale.linear()
                                           .domain([0, d3.max(dataset, function (d: any) {
                                             return d[1]
                                           })])
                                                        .range([2, 5])
                            let formatAsPercentage = d3.tickFormat('.1%')
                           // Define X axis
                            let xAxis = d3.svg.axis()
                                          .scale(xScale)
                                          .orient('bottom')
                                          .ticks(5)
                                          .tickFormat(formatAsPercentage)
                            // Define Y axis
                            let yAxis = d3.svg.axis()
                                          .scale(yScale)
                                            .orient('left')
                                            .ticks(5)
                                            .tickFormat(formatAsPercentage)
                            // Create SVG element
                            let svg = d3.select('#' + currentChart.container.id)
                                                    .append('svg')
                                                    .attr('width', width)
                                                    .attr('height', height)
                                                    .append('g')
                            // Create circles
                            svg.selectAll('circle')
                                 .data(dataset)
                               .enter()
                                 .append('circle')
                                 .attr('cx', function (d: any) {
                                   return xScale(d[0])
                                 })
                                 .attr('cy', function (d: any) {
                                   return yScale(d[1])
                                 })
                                 .attr('r', function (d: any) {
                                   return rScale(d[1])
                                 })
                            // Create labels
                            svg.selectAll('text')
                               .data(dataset)
                               .enter()
                               .append('text')
                               .text(function (d: any) {
                                       return d[0] + ',' + d[1]
                               })
                               .attr('x', function (d: any) {
                                       return xScale(d[0])
                               })
                               .attr('y', function (d: any) {
                                       return yScale(d[1])
                               })
                               .attr('font-family', 'sans-serif')
                               .attr('font-size', '11px')
                               .attr('fill', 'red')
                            // Create X axis
                            svg.append('g')
                               .attr('class', 'axis')
                               .attr('transform', 'translate(0,' + (height - padding) + ')')
                               .call(xAxis)
                            // Create Y axis
                            svg.append('g')
                               .attr('class', 'axis')
                               .attr('transform', 'translate(' + padding + ',0)')
                               .call(yAxis)
                               */
            // finish
            return resolve();
        });
    }
}

/**
 * @namespace bordercloud.visualization
 */

var visualizationNS$3 = /*#__PURE__*/Object.freeze({
    AreaChart: AreaChart$1,
    BarChart: BarChart$1,
    BubbleChart: BubbleChart$1,
    ColumnChart: ColumnChart$1,
    Line: Line,
    Pie: Pie$1,
    ScatterChart: ScatterChart$1
});

/**
 * @namespace d3
 */
const visualization$3 = visualizationNS$3;

var d3NS = /*#__PURE__*/Object.freeze({
    visualization: visualization$3
});

/**
 * Todo API
 * @class leaflet.API
 * @memberof google
 */
class API$1 {
    static get osmAccessToken() {
        return this._osmAccessToken;
    }
    static set osmAccessToken(value) {
        this._osmAccessToken = value;
    }
}
/**
 * todo
 * @type {string}
 * @private
 */
API$1._osmAccessToken = '';

/**
 * Todo Table
 * @class leaflet.visualization.Map
 * @tutorial leaflet_visualization_Map
 * @memberof leaflet.visualization
 */
class Map$1 extends Chart {
    get icon() {
        return 'fa fa-map';
    }
    get label() {
        return 'Map';
    }
    get subtext() {
        return 'Map';
    }
    get classFullName() {
        return 'leaflet.visualization.Map';
    }
    get tutorialFilename() {
        return 'tutorial-leaflet_visualization_Map.html';
    }
    constructor() {
        super();
        this.addCss(Core.path + '/lib/leaflet/leaflet.css');
        this.addCss(Core.path + '/lib/leaflet/MarkerCluster.Default.css');
        let dep = this.addScript(Core.path + '/lib/leaflet/leaflet.js');
        this.addScript(Core.path + '/lib/leaflet/leaflet.markercluster.js', dep);
    }
    /**
     * Make a Google map
     * todo
     * @memberOf Map
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            let messageError = '';
            let cols = result.head.vars;
            let rows = result.results.bindings;
            let noCols = cols.length;
            let noRows = rows.length;
            let map;
            let height = '180px';
            let idChart = currentChart.container.id + '-leaflet';
            let element = document.getElementById(currentChart.container.id);
            let markerArray = []; // create new markers array
            let group;
            let markers;
            let marker;
            let lat;
            let long;
            if (currentChart.height !== '') {
                height = currentChart.height;
            }
            let opt = Object.assign({
                width: currentChart.width,
                height: height,
                showTooltip: true,
                showInfoWindow: true
            }, currentChart.options);
            if (element) {
                element.innerHTML = "<div id='" + idChart + "' style='width: " + opt.width + '; height: ' + opt.height + ";'></div>";
                let osmLayer = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox.streets',
                    accessToken: API$1.osmAccessToken
                });
                map = L.map(idChart, { zoom: 13, layers: [osmLayer] });
                // todo insert option
                markers = L.markerClusterGroup({
                    chunkedLoading: true,
                    spiderfyOnMaxZoom: true,
                    showCoverageOnHover: true,
                    zoomToBoundsOnClick: true
                });
                if (noCols <= 2) {
                    messageError = 'Parameters : latitude(xsd:Decimal) longitude(xsd:Decimal) title(xsd:string' +
                        ' optional) introduction(xsd:string optional) link(IRI optional)';
                }
                else {
                    for (let row of rows) {
                        lat = parseFloat(row[cols[0]].value);
                        long = parseFloat(row[cols[1]].value);
                        if (isNaN(lat) || isNaN(long)) {
                            messageError = 'Latitude or longitude is not a decimal. Parameters of chart :' +
                                ' latitude(xsd:Decimal)' +
                                ' longitude(xsd:Decimal) title(xsd:string' +
                                ' optional) introduction(xsd:string optional) link(IRI optional). ';
                            break;
                        }
                        if (noCols >= 6) {
                            // latitude longitude title text link
                            let title = row[cols[2]] !== undefined ? row[cols[2]].value : '';
                            let text = row[cols[3]] !== undefined ? "<p style='margin: 0px'>" + row[cols[3]].value + '</p>' : '';
                            let link = row[cols[4]] !== undefined ? "<a style='font-size: large;font-style: medium;' href='" + row[cols[4]].value + "' target='_blank'>" + title + '</a>' : title;
                            let img = row[cols[5]] !== undefined ? "<img src='" + row[cols[5]].value + "' style='margin-left:5px;margin-bottom:5px;width:150px;float:right;'/>" : '';
                            marker = L.marker([parseFloat(row[cols[0]].value), parseFloat(row[cols[1]].value)]);
                            if (row[cols[3]] === undefined || row[cols[3]].value.length === 0) {
                                marker.bindPopup('<div style="display: flow-root;min-width: 150px;min-height:150px;">' + link + '<div>' + img + '</div></div>');
                            }
                            else {
                                marker.bindPopup('<div style="display: flow-root;min-height:150px;">' + link + '<div>' + img + text + '</div></div>');
                            }
                        }
                        else if (noCols === 5) {
                            // latitude longitude title introduction link
                            let title = row[cols[2]] !== undefined ? row[cols[2]].value : '';
                            let text = row[cols[3]] !== undefined ? row[cols[3]].value : '';
                            let link = row[cols[4]] !== undefined ? "<a href='" + row[cols[4]].value + "'>" + title + '</a>' : title;
                            marker = L.marker([parseFloat(row[cols[0]].value), parseFloat(row[cols[1]].value)]);
                            marker.bindPopup('<b>' + link + '</b><br/>' + text);
                        }
                        else if (noCols === 4) {
                            // latitude longitude title introduction
                            let title = row[cols[2]] !== undefined ? row[cols[2]].value : '';
                            let text = row[cols[3]] !== undefined ? row[cols[3]].value : '';
                            marker = L.marker([parseFloat(row[cols[0]].value), parseFloat(row[cols[1]].value)]);
                            marker.bindPopup('<b>' + title + '</b><br/>' + text);
                        }
                        else if (noCols === 3) {
                            // latitude longitude title
                            let title = row[cols[2]] !== undefined ? row[cols[2]].value : '';
                            marker = L.marker([parseFloat(row[cols[0]].value), parseFloat(row[cols[1]].value)]);
                            marker.bindPopup('<b>' + title + '</br>');
                        }
                        else if (noCols === 2) {
                            // latitude longitude
                            marker = L.marker([parseFloat(row[cols[0]].value), parseFloat(row[cols[1]].value)]);
                            marker.addTo(map);
                        }
                        markers.addLayer(marker);
                        markerArray.push(marker);
                    }
                }
                if (messageError !== '') {
                    return reject(Error(messageError));
                }
                if (noRows > 0) {
                    map.addLayer(markers);
                    // zoom on the markers
                    group = L.featureGroup(markerArray);
                    map.fitBounds(group.getBounds());
                }
                else {
                    map.fitWorld({ reset: true }).zoomIn();
                }
                // finish
                return resolve();
            }
        });
    }
}

/**
 * @namespace leaflet.visualization
 */

var visualizationNS$4 = /*#__PURE__*/Object.freeze({
    Map: Map$1
});

/**
 * @namespace leaflet
 */
const visualization$4 = visualizationNS$4;

var leafletNS = /*#__PURE__*/Object.freeze({
    visualization: visualization$4,
    API: API$1
});

const sgvizler = S;
const bordercloud = bordercloudNS;
const google$1 = googleNS;
const d3$1 = d3NS;
const leaflet = leafletNS;
/**
 * Todo
 * @const
 *
 */
const VERSION = Core.VERSION;
/**
 * Todo
 * @const
 */
const HOMEPAGE = Core.HOMEPAGE;
/**
 * Draws the sgvizler-containers with the given element id.
 *
 */
function containerLoadAll() {
    Container.loadAllDependencies();
}
function readOptions(options) {
    if (options) {
        if (typeof options === 'object') {
            google$1.API.key = options.googleApiKey ? options.googleApiKey : '';
            leaflet.API.osmAccessToken = options.osmAccessToken ? options.osmAccessToken : '';
            Core.path = options.path ? options.path : '';
        }
    }
}
/**
 * Draws the sgvizler-containers with the given element id.
 * @param {string} elementID
 */
function containerDraw(elementID, options) {
    // S.Container.loadDependenciesId(elementID)
    readOptions(options);
    Container.drawWithElementId(elementID);
}
/**
 * Todo.
 */
function containerDrawAll(options) {
    // S.Container.loadAllDependencies()
    readOptions(options);
    Container.drawAll();
}
/**
 * Todo.
 */
function selectDraw(elementID) {
    // S.Select.loadDependencies()
    Select.drawWithElementId(elementID);
}
/**
 * Todo.
 */
function selectDrawAll() {
    // S.Select.loadDependencies()
    Select.drawAll();
}
/**
 * Todo.
 * @param {string} className
 * @param {string} pathDoc
 * @returns {string}
 */
function getChartDoc(className, pathDoc) {
    return Select.getChartDoc(className, pathDoc);
}
/**
 * Todo
 * @param {string} elementID
 * @param {string} endpoint
 * @param {string} query
 * @param {string} chartName
 * @param {string} options
 * @param {string} loglevel
 * @returns {string}
 */
function create(elementID, endpoint, query, chartName, options, loglevel, output, method, parameter) {
    return Container.create(elementID, endpoint, query, chartName, options, loglevel, output, method, parameter);
}
// noinspection JSPotentiallyInvalidConstructorUsage
jQuery.fn.extend({
    selectchart: function (param, option) {
        let $this = this;
        let action = 'render';
        if (param) {
            if (typeof param === 'string') {
                action = param;
            }
            else if (typeof param === 'object') {
                action = param.action ? param.action : action;
            }
        }
        // Return the jQuery object for chaining.
        return $this.each(function (index, obj) {
            if (index >= 0 && action === 'render') {
                if (param && typeof param === 'object') {
                    Select.draw(obj, param);
                }
                else {
                    Select.draw(obj);
                }
            }
        });
    },
    containerchart: function (param, option) {
        let $this = this;
        let action = 'render';
        if (param) {
            if (typeof param === 'string') {
                action = param;
            }
            else if (typeof param === 'object') {
                action = param.action ? param.action : action;
            }
        }
        // Return the jQuery object for chaining.
        return $this.each(function (index, obj) {
            if (index >= 0 && action === 'render') {
                if (param && typeof param === 'object') {
                    Container.drawWithElementId($(obj).attr('id'), param);
                }
                else {
                    Container.drawWithElementId($(obj).attr('id'));
                }
            }
        });
    }
});
Loader.detectRoot();

exports.HOMEPAGE = HOMEPAGE;
exports.VERSION = VERSION;
exports.bordercloud = bordercloud;
exports.containerDraw = containerDraw;
exports.containerDrawAll = containerDrawAll;
exports.containerLoadAll = containerLoadAll;
exports.create = create;
exports.d3 = d3$1;
exports.getChartDoc = getChartDoc;
exports.google = google$1;
exports.leaflet = leaflet;
exports.selectDraw = selectDraw;
exports.selectDrawAll = selectDrawAll;
exports.sgvizler = sgvizler;

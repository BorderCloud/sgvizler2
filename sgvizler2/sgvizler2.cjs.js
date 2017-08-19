'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jqueryProxy = require('jquery');
var jqueryProxy__default = jqueryProxy['default'];

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
/* global Reflect, Promise */













function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
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
                currentThis._resultSparql !== null) {
                currentThis.doDraw();
            }
        });
    }
    loadDependenciesAndDraw(result) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger.log('Chart loaded dependencies : ' + this.container.id);
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
        Logger.log('Chart started : ' + this._container.id);
        if (this._resultSparql !== null) {
            this.draw(this._resultSparql);
            this._isDone = true;
        }
        Logger.log('Chart finished : ' + this._container.id);
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
        while ((matchArray = patternOption.exec(raw)) !== null) {
            //this.options[matchArray[1].toLowerCase()] = matchArray[2].trim()
            this.options[matchArray[1]] = matchArray[2].trim();
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
        let raw = this._optionsRaw;
        if (raw === '') {
            this._patternOptions = CHART_PATTERN_OPTIONS.EMPTY;
        }
        else {
            this._patternOptions = CHART_PATTERN_OPTIONS.UNKNOWN;
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
            while ((matchArray = patternClass.exec(raw)) !== null) {
                this.options['class' + i] = matchArray[2];
                this._patternOptions = CHART_PATTERN_OPTIONS.UNKNOWN;
                i++;
            }
        }
        if (this.patternOptions === CHART_PATTERN_OPTIONS.UNKNOWN) {
            Logger.displayFeedback(this.container, MESSAGES.ERROR_CHART_PATTERN_OPTION_UNKNOWN, [this._optionsRaw]);
        }
        else if (this.patternOptions === CHART_PATTERN_OPTIONS.VARIABLE ||
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
        return 'fa-table';
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
        });
    }
    loadDependencies() {
        return new Promise(function (resolve, reject) { });
    }
}

/**
 * @namespace sgvizler.visualization
 */



var visualizationNS = Object.freeze({
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
                Logger.log('Waiting : ' + dep.loadBefore.url + ' before ' + dep.url);
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
            Logger.log('Loading : ' + dep.url);
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
                Logger.log('Loaded : ' + url);
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
            Logger.log('Load started :' + this.url);
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
        Logger.log('Load ended :' + this.url);
    }
}
class ScriptDependency extends Dependency {
}
class CssDependency extends Dependency {
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
                if (classSelected) {
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
Select.classOfChartSelectedByDefault = 'sgvizler.visualization.Table';
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
            'd3.visualization.Pie'
        ]
    },
    {
        // optgroup
        label: 'google.visualization',
        charts: [
            'google.visualization.Table'
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
        }
        if (args) {
            for (let i = 0, len = args.length; i < len; i++) {
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
            if (cursor === undefined) {
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
        if (cursor === undefined && !object) {
            cursor = this.getObjectByPath(path, window);
        }
        return cursor;
    }
    static escapeHtml(str) {
        let text = document.createTextNode(str);
        let div = document.createElement('div');
        div.appendChild(text);
        return div.innerHTML;
    }
    static decodeHtml(html) {
        let element = document.createElement('div');
        element.innerHTML = html;
        return element.textContent;
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
    static log(message) {
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
                url += '?query=' + encodeURIComponent(myRequest.query) +
                    '&output=' + SparqlTools.getOutputLabel(myRequest.endpointOutputFormat);
            }
            else {
                data = {
                    query: myRequest.query,
                    output: SparqlTools.getOutputLabel(myRequest.endpointOutputFormat)
                };
            }
            xhr.open(myRequest.method, url, true);
            xhr.setRequestHeader('Accept', SparqlTools.getHeaderAccept(myRequest.endpointOutputFormat));
            xhr.responseType = SparqlTools.getXMLHttpRequestResponseType(myRequest.endpointOutputFormat);
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
            xhr.onload = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        // If successful, resolve the promise by passing back the request response
                        resolve(xhr.response);
                    }
                    else {
                        // If it fails, reject the promise with a error message
                        reject(Error(xhr.statusText));
                    }
                }
            };
            xhr.onerror = function () {
                // Also deal with the case when the entire request fails to begin with
                // This is probably a network error, so reject the promise with an appropriate message
                reject(Error(xhr.statusText));
            };
            xhr.onabort = function () {
                reject(Error(xhr.statusText));
            };
            // Send the request
            if (data) {
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
        }
        if (elmAttrs[self.CHART_OPTION_ATTRIBUTE_NAME]) {
            this._chartOptions = elmAttrs[self.CHART_OPTION_ATTRIBUTE_NAME].value;
        }
        // build request object
        let request = new Request();
        request.container = this;
        this._id = elementID;
        if (elmAttrs[self.QUERY_ATTRIBUTE_NAME]) {
            request.query = elmAttrs[self.QUERY_ATTRIBUTE_NAME].value;
        }
        if (elmAttrs[self.ENDPOINT_ATTRIBUTE_NAME]) {
            request.endpoint = elmAttrs[self.ENDPOINT_ATTRIBUTE_NAME].value;
        }
        else {
            this._state = CONTAINER_STATE.FAILED;
            Logger.displayFeedback(this, MESSAGES.ERROR_ENDPOINT_FORGOT);
            return;
        }
        // TODO : IMPORTANT FORMAT
        if (elmAttrs[self.OUTPUT_FORMAT_ATTRIBUTE_NAME]) {
            request.endpointOutputFormat = SparqlTools.convertString(elmAttrs[self.OUTPUT_FORMAT_ATTRIBUTE_NAME].value);
        }
        if (elmAttrs[self.OUTPUT_METHOD_ATTRIBUTE_NAME]) {
            request.method = elmAttrs[self.OUTPUT_METHOD_ATTRIBUTE_NAME].value;
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
                let element = jqueryProxy__default('#' + elementID);
                let widthCss = element.css('width');
                let heightCss = element.css('height');
                if (widthCss !== null) {
                    chart.width = widthCss[1];
                }
                if (heightCss !== null) {
                    chart.height = heightCss[1];
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
            Logger.log('drawing id: ' + elementID);
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
            Logger.log('Load dependencies id: ' + elementID);
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
    static create(elementID, endpoint, query, chartName, options, loglevel
        // ,  output:string="json"
    ) {
        let element = document.getElementById(elementID);
        if (element === null) {
            throw new Error('elementID unknown : ' + elementID);
        }
        let self = Container;
        let attrQuery = document.createAttribute(self.QUERY_ATTRIBUTE_NAME);
        let attrEndpoint = document.createAttribute(self.ENDPOINT_ATTRIBUTE_NAME);
        // let attrOutput = document.createAttribute(self.OUTPUT_FORMAT_ATTRIBUTE_NAME)
        // let attrMethod = document.createAttribute(self.OUTPUT_METHOD_ATTRIBUTE_NAME)
        let attrChart = document.createAttribute(self.CHART_ATTRIBUTE_NAME);
        // attrQuery.value = Tools.escapeHtml(query)
        attrQuery.value = query;
        attrEndpoint.value = endpoint;
        attrChart.value = chartName;
        // attrOutput.value = output
        element.setAttributeNode(attrQuery);
        element.setAttributeNode(attrEndpoint);
        // element.setAttributeNode(attrOutput)
        // element.setAttributeNode(attrMethod)
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
            try {
                this._chart.loadDependenciesAndDraw(sparqlResult);
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
Container.OUTPUT_METHOD_ATTRIBUTE_NAME = Container.PREFIX + 'endpoint-method';
Container.CHART_ATTRIBUTE_NAME = Container.PREFIX + 'chart';
Container.CHART_OPTION_ATTRIBUTE_NAME = Container.PREFIX + 'chart-options';
Container.LOG_LEVEL_ATTRIBUTE_NAME = Container.PREFIX + 'log';

/**
 * @namespace sgvizler
 */
const visualization = visualizationNS;



var S = Object.freeze({
	visualization: visualization,
	Loader: Loader,
	Dependency: Dependency,
	ScriptDependency: ScriptDependency,
	CssDependency: CssDependency,
	Select: Select,
	get MESSAGES () { return MESSAGES; },
	Messages: Messages,
	Tools: Tools,
	Logger: Logger,
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
        this.addCss('lib/DataTables/datatables.min.css');
        this.addCss('lib/DataTables/DataTables-1.10.15/css/dataTables.bootstrap4.min.css');
        let depDatatables = this.addScript('lib/DataTables/datatables.min.js');
        this.addScript('lib/DataTables/DataTables-1.10.15/js/dataTables.bootstrap4.js', depDatatables);
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
        let regex = / *col([1-9]+)\_([a-zA-Z]+)\_([^=;\n]*) */ig;
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
            optionCol = parseInt(m[1], 10) - 1;
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
    static getFunctionColumnDefSpan(style) {
        return (function (data, type, full, meta) {
            return '<span style="' + style + '"\>' + data + '</span>';
        });
    }
    get icon() {
        return 'fa-table';
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
                return;
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
                        datasetRow[c] = row[cols[c]].value;
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
                    data: dataset,
                    columns: datasetColumns,
                    columnDefs: datasetColumnsDefs
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
}

/**
 * @namespace bordercloud.visualization
 */

//export * from './visualization/DataTable.d'


var visualizationNS$1 = Object.freeze({
	DataTable: DataTable
});

/**
 * @namespace bordercloud
 */
const visualization$1 = visualizationNS$1;


var bordercloudNS = Object.freeze({
	visualization: visualization$1
});

/**
 * Todo Table
 * @class google.visualization.Table
 * @tutorial google_visualization_Table
 * @memberof google.visualization
 */
class Data {
    constructor(result) {
        let data = new google.visualization.DataTable();
        let cols = result.head.vars;
        let rows = result.results.bindings;
        //let noCols = cols.length
        //let noRows = rows.length
        // console.log(opt)
        for (let col of cols) {
            data.addColumn('string', col);
            //data.addColumn('number', 'Salary');
            //data.addColumn('boolean', 'Full Time Employee');
        }
        let arrayData = [];
        let i = 0;
        for (let row of rows) {
            arrayData[i] = [];
            for (let col of cols) {
                arrayData[i].push(row[col].value);
            }
            i++;
        }
        data.addRows(arrayData);
        this._dataTable = data;
    }
    getDataTable() {
        return this._dataTable;
    }
}

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
        return 'fa-table';
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
                height = currentChart.height;
            }
            let opt = Object.assign({
                showRowNumber: false,
                width: currentChart.width,
                height: height
            }, currentChart.options);
            if (!Table$1._isInit) {
                Table$1.init();
            }
            google.charts.setOnLoadCallback(() => {
                let data = new Data(result);
                var table = new google.visualization.Table(document.getElementById(currentChart.container.id));
                table.draw(data.getDataTable(), currentChart.options);
            });
        });
    }
}
Table$1._isInit = false;

/**
 * @namespace google.visualization
 */



var visualizationNS$2 = Object.freeze({
	Data: Data,
	Table: Table$1
});

/**
 * @namespace google
 */
const visualization$2 = visualizationNS$2;


var googleNS = Object.freeze({
	visualization: visualization$2
});

/**
 * Todo Pie
 * @class d3.visualization.Pie
 * @tutorial d3_visualization_Pie
 * @memberof d3.visualization
 */
class Pie extends Chart {
    get icon() {
        return 'fa-table';
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
        this.addCss('lib/d3/d3.css');
        let dep = this.addScript('lib/d3/d3.js');
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
                    Logger.log("Erreur ? D3JS:pie label " + label + " count " + counter);
                }
                else {
                    dataset.push({ label: label, count: counter });
                }
            }
            // console.log(data)
            let containerElement = d3.select("#" + currentChart.container.id);
            let containerElementNode = containerElement.node();
            if (containerElementNode) {
                let width = containerElementNode.clientWidth !== 0 ? containerElementNode.clientWidth : 300;
                let height = containerElementNode.clientHeight !== 0 ? containerElementNode.clientHeight : 150;
                let svg = containerElement.append("svg") //associate our data with the document
                    .attr("width", width)
                    .attr("height", height)
                    .attr("id", "idtest");
                let radius = Math.min(width, height) / 2;
                svg = svg.append("g") //make a group to hold our pie chart
                    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")"); //move the
                //var donutWidth = 75;
                var legendRectSize = 18;
                var legendSpacing = 4;
                var color = d3.scaleOrdinal(d3.schemeCategory10);
                var arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius);
                var pie = d3.pie()
                    .value(function (d) { return d.count; })
                    .sort(null);
                var path = svg.selectAll('path')
                    .data(pie(dataset))
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function (d, i) {
                    return color(d.data.label);
                });
                // Todo limit nb (look pie chart of Google)
                var legend = svg.selectAll('.legend')
                    .data(color.domain())
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function (d, i) {
                    var height = legendRectSize + legendSpacing;
                    var offset = height * color.domain().length / 2;
                    var horz = -2 * legendRectSize;
                    var vert = i * height - offset;
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
        });
    }
}

/**
 * @namespace bordercloud.visualization
 */



var visualizationNS$3 = Object.freeze({
	Pie: Pie
});

/**
 * @namespace d3
 */
const visualization$3 = visualizationNS$3;


var d3NS = Object.freeze({
	visualization: visualization$3
});

/** @module example */
//Namespace
const sgvizler = S;
const bordercloud = bordercloudNS;
const google$1 = googleNS;
const d3$1 = d3NS;
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
/**
 * Draws the sgvizler-containers with the given element id.
 * @param {string} elementID
 */
function containerDraw(elementID) {
    // S.Container.loadDependenciesId(elementID)
    Container.drawWithElementId(elementID);
}
/**
 * Todo.
 */
function containerDrawAll() {
    // S.Container.loadAllDependencies()
    Container.drawAll();
}
/**
 * Todo.
 */
function selectDraw(elementID) {
    //S.Select.loadDependencies()
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
function create(elementID, endpoint, query, chartName, options, loglevel) {
    return Container.create(elementID, endpoint, query, chartName, options, loglevel);
}
// noinspection JSPotentiallyInvalidConstructorUsage
jqueryProxy.prototype.extend({
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
            if (index > 0 && action === 'render') {
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
            if (index > 0 && action === 'render') {
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


var sgvizler2 = Object.freeze({
	sgvizler: sgvizler,
	bordercloud: bordercloud,
	google: google$1,
	d3: d3$1,
	VERSION: VERSION,
	HOMEPAGE: HOMEPAGE,
	containerLoadAll: containerLoadAll,
	containerDraw: containerDraw,
	containerDrawAll: containerDrawAll,
	selectDraw: selectDraw,
	selectDrawAll: selectDrawAll,
	getChartDoc: getChartDoc,
	create: create
});

exports.sgvizler = sgvizler;
exports.bordercloud = bordercloud;
exports.google = google$1;
exports.d3 = d3$1;
exports.VERSION = VERSION;
exports.HOMEPAGE = HOMEPAGE;
exports.containerLoadAll = containerLoadAll;
exports.containerDraw = containerDraw;
exports.containerDrawAll = containerDrawAll;
exports.selectDraw = selectDraw;
exports.selectDrawAll = selectDrawAll;
exports.getChartDoc = getChartDoc;
exports.create = create;
//# sourceMappingURL=sgvizler2.cjs.js.map

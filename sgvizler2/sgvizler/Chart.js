import { __awaiter } from "tslib";
import { Logger, MESSAGES, CssDependency, ScriptDependency, Loader, Tools } from '../sgvizler';
/**
 * Define the type of patterns for the options
 *
 * @class sgvizler.CHART_PATTERN_OPTIONS
 * @memberof sgvizler
 */
export var CHART_PATTERN_OPTIONS;
(function (CHART_PATTERN_OPTIONS) {
    CHART_PATTERN_OPTIONS[CHART_PATTERN_OPTIONS["EMPTY"] = 0] = "EMPTY";
    CHART_PATTERN_OPTIONS[CHART_PATTERN_OPTIONS["UNKNOWN"] = 1] = "UNKNOWN";
    CHART_PATTERN_OPTIONS[CHART_PATTERN_OPTIONS["VARIABLE"] = 2] = "VARIABLE";
    CHART_PATTERN_OPTIONS[CHART_PATTERN_OPTIONS["STYLE"] = 3] = "STYLE";
    CHART_PATTERN_OPTIONS[CHART_PATTERN_OPTIONS["CLASS"] = 4] = "CLASS";
    CHART_PATTERN_OPTIONS[CHART_PATTERN_OPTIONS["WIKI"] = 5] = "WIKI";
    CHART_PATTERN_OPTIONS[CHART_PATTERN_OPTIONS["OBJECT"] = 6] = "OBJECT";
})(CHART_PATTERN_OPTIONS || (CHART_PATTERN_OPTIONS = {}));
/**
 * Abstract class for all the charts. Ensures that chart types
 * correctly inherit methods from this class.
 * @class sgvizler.Chart
 * @abstract
 * @export
 * @memberof sgvizler
 */
export class Chart {
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
     * To read new options for interactive chart
     */
    get newOptionsRaw() {
        return this.optionsRaw;
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
                Logger.fireDoneEvent(currentThis._container);
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
        let patternObject = /([^:{]+):([^:,}]+) *,?/iy; // tslint:disable-line // for PivotTable
        let raw = this._optionsRaw;
        if (raw === '') {
            this._patternOptions = CHART_PATTERN_OPTIONS.EMPTY;
        }
        else {
            this._patternOptions = CHART_PATTERN_OPTIONS.UNKNOWN;
        }
        if (this._optionsRaw.indexOf('{') === 0 && this.patternOptions === CHART_PATTERN_OPTIONS.UNKNOWN) {
            //this.execPattern(patternObject,CHART_PATTERN_OPTIONS.OBJECT) // todo ?
            this._patternOptions = CHART_PATTERN_OPTIONS.OBJECT;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2d2aXpsZXIvQ2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFHSCxNQUFNLEVBQ04sUUFBUSxFQUVSLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsTUFBTSxFQUNOLEtBQUssRUFDUixNQUFNLGFBQWEsQ0FBQTtBQUVwQjs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBTixJQUFZLHFCQVFYO0FBUkQsV0FBWSxxQkFBcUI7SUFDN0IsbUVBQUssQ0FBQTtJQUNMLHVFQUFPLENBQUE7SUFDUCx5RUFBUSxDQUFBO0lBQ1IsbUVBQUssQ0FBQTtJQUNMLG1FQUFLLENBQUE7SUFDTCxpRUFBSSxDQUFBO0lBQ0oscUVBQU0sQ0FBQTtBQUNWLENBQUMsRUFSVyxxQkFBcUIsS0FBckIscUJBQXFCLFFBUWhDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sT0FBZ0IsS0FBSztJQXFCdkI7Ozs7O09BS0c7SUFDSDtRQTFCQTs7Ozs7O1dBTUc7UUFDSSxZQUFPLEdBQVEsRUFBRSxDQUFBO1FBR2hCLG9CQUFlLEdBQXNCLEVBQUUsQ0FBQTtRQUV2QyxvQkFBZSxHQUEwQixxQkFBcUIsQ0FBQyxLQUFLLENBQUE7UUFFcEUsV0FBTSxHQUFXLEVBQUUsQ0FBQTtRQUNuQixZQUFPLEdBQVcsRUFBRSxDQUFBO1FBQ3BCLGdCQUFXLEdBQVcsRUFBRSxDQUFBO1FBQ3hCLFdBQU0sR0FBVyxFQUFFLENBQUE7UUFDbkIsV0FBTSxHQUFXLEVBQUUsQ0FBQTtRQVN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtRQUVwQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUE7UUFDdEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUMsR0FBRyxFQUFFO1lBQ3BCLElBQUksV0FBVyxDQUFDLFNBQVMsSUFBSSxJ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
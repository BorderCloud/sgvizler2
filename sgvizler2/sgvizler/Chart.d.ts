import { SparqlResultInterface, Container, Dependency, CssDependency, ScriptDependency } from '../sgvizler';
/**
 * Define the type of patterns for the options
 *
 * @class sgvizler.CHART_PATTERN_OPTIONS
 * @memberof sgvizler
 */
export declare enum CHART_PATTERN_OPTIONS {
    EMPTY = 0,
    UNKNOWN = 1,
    VARIABLE = 2,
    STYLE = 3,
    CLASS = 4,
    WIKI = 5,
    OBJECT = 6
}
/**
 * Abstract class for all the charts. Ensures that chart types
 * correctly inherit methods from this class.
 * @class sgvizler.Chart
 * @abstract
 * @export
 * @memberof sgvizler
 */
export declare abstract class Chart {
    /**
     * Give the options of chart
     * @property options
     * @memberof sgvizler.Chart
     * @public
     * @type {{}}
     */
    options: any;
    protected _resultSparql: SparqlResultInterface;
    private _tabDependences;
    private _isDone;
    private _patternOptions;
    private _container;
    private _width;
    private _height;
    private _optionsRaw;
    private _class;
    private _style;
    /**
     * Constructor of all chart types created by
     * sgvizler.charts inherit from.
     * @memberof sgvizler.Chart
     * @constructor sgvizler.Chart
     */
    constructor();
    loadDependenciesAndDraw(result: SparqlResultInterface): Promise<void>;
    loadDependencies(): Promise<any>;
    /**
     * Todo
     * @member draw
     * @memberof sgvizler.Chart
     * @public
     * @param {SparqlResultInterface} result
     * @returns {Promise<void>}
     */
    abstract draw(result: SparqlResultInterface): Promise<any>;
    /**
     * Icon of chart.
     * http://fontawesome.io/icons/
     * https://silviomoreto.github.io/bootstrap-select/examples/
     * @memberof sgvizler.Chart
     * @abstract
     * @public
     * @returns {string}
     */
    abstract get icon(): string;
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @abstract
     * @public
     * @returns {string}
     */
    abstract get label(): string;
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @abstract
     * @public
     * @returns {string}
     */
    abstract get subtext(): string;
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @abstract
     * @public
     * @returns {string}
     */
    abstract get classFullName(): string;
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @abstract
     * @public
     * @returns {string}
     */
    abstract get tutorialFilename(): string;
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {CHART_PATTERN_OPTIONS}
     */
    get patternOptions(): CHART_PATTERN_OPTIONS;
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    get classHtml(): string;
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {string} value
     */
    set classHtml(value: string);
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    get style(): string;
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {string} value
     */
    set style(value: string);
    /**
     *
     * @memberof sgvizler.Chart
     * @returns {Container}
     */
    get container(): Container;
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {Container} value
     */
    set container(value: Container);
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    get optionsRaw(): string;
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {string} value
     */
    set optionsRaw(value: string);
    /**
     * To read new options for interactive chart
     */
    get newOptionsRaw(): string;
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    get height(): string;
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {string} value
     */
    set height(value: string);
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    get width(): string;
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {string} value
     */
    set width(value: string);
    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    protected getHTMLStyleOrClass(): string;
    protected addScript(url: string, loadBefore?: Dependency): ScriptDependency;
    protected addCss(url: string, loadBefore?: Dependency): CssDependency;
    private isLoadedAllDependencies;
    private doDraw;
    /**
     * todo
     * @memberof sgvizler.Chart
     * @param {RegExp} patternOption
     * @param {CHART_PATTERN_OPTIONS} typePattern
     */
    private execPattern;
    /**
     * todo
     * @memberof sgvizler.Chart
     */
    private doParseOptionsRaw;
}

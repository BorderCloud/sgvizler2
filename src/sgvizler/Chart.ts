import {
    SparqlResultInterface,
    Container,
    Logger,
    MESSAGES,
    Dependency,
    CssDependency,
    ScriptDependency,
    Loader
} from '../sgvizler'

/**
 * Define the type of patterns for the options
 *
 * @class sgvizler.CHART_PATTERN_OPTIONS
 * @memberof sgvizler
 */
export enum CHART_PATTERN_OPTIONS {
    EMPTY,
    UNKNOWN,
    VARIABLE,
    STYLE,
    CLASS
}

/**
 * Abstract class for all the charts. Ensures that chart types
 * correctly inherit methods from this class.
 * @class sgvizler.Chart
 * @abstract
 * @export
 * @memberof sgvizler
 */
export abstract class Chart {
    /**
     * Give the options of chart
     * @property options
     * @memberof sgvizler.Chart
     * @public
     * @type {{}}
     */
    public options: any = {}

    private _tabDependences: Array<Dependency> = []
    private _resultSparql: SparqlResultInterface
    private _isDone: boolean
    private _patternOptions: CHART_PATTERN_OPTIONS = CHART_PATTERN_OPTIONS.EMPTY
    private _container: Container
    private _width: string = ''
    private _height: string = ''
    private _optionsRaw: string = ''
    private _class: string = ''
    private _style: string = ''

    /**
     * Constructor of all chart types created by
     * sgvizler.charts inherit from.
     * @memberof sgvizler.Chart
     * @constructor sgvizler.Chart
     */
    constructor () {
        this._width = '100%'
        this._isDone = false

        let currentThis = this
        Loader.on('loaded',() => {
            if (currentThis.container != null &&
                ! currentThis._isDone &&
                currentThis.isLoadedAllDependencies() &&
                currentThis._resultSparql !== null ) {
                currentThis.doDraw()
            }
        })
    }

    public async loadDependenciesAndDraw (result: SparqlResultInterface) {
        Logger.log('Chart loaded dependencies : ' + this.container.id)
        // let promisesArray: Array<any> = []
        this._resultSparql = result

        if (this.isLoadedAllDependencies()) {
            await this.doDraw()
        }else {
            await this.loadDependencies()
        }
    }

    public async loadDependencies (): Promise<any> {
        let promisesArray: Array<any> = []
        for (let dep of this._tabDependences) {
            promisesArray.push(dep.load())
        }
        return Promise.all(promisesArray)
    }
    /**
     * Todo
     * @member draw
     * @memberof sgvizler.Chart
     * @public
     * @param {SparqlResultInterface} result
     * @returns {Promise<void>}
     */
    public abstract draw (result: SparqlResultInterface): Promise<any>

    /**
     * Icon of chart.
     * http://fontawesome.io/icons/
     * https://silviomoreto.github.io/bootstrap-select/examples/
     * @memberof sgvizler.Chart
     * @abstract
     * @public
     * @returns {string}
     */
    public abstract get icon (): string

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @abstract
     * @public
     * @returns {string}
     */
    public abstract get label (): string

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @abstract
     * @public
     * @returns {string}
     */
    public abstract get subtext (): string

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @abstract
     * @public
     * @returns {string}
     */
    public abstract get classFullName (): string

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @abstract
     * @public
     * @returns {string}
     */
    public abstract get tutorialFilename (): string

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {CHART_PATTERN_OPTIONS}
     */
    public get patternOptions (): CHART_PATTERN_OPTIONS {
        return this._patternOptions
    }

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    public get classHtml (): string {
        return this._class
    }

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {string} value
     */
    public set classHtml (value: string) {
        this._class = value
    }

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    public get style (): string {
        return this._style
    }

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {string} value
     */
    public set style (value: string) {
        this._style = value
    }

    /**
     *
     * @memberof sgvizler.Chart
     * @returns {Container}
     */
    public get container (): Container {
        return this._container
    }

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {Container} value
     */
    public set container (value: Container) {
        this._container = value
    }

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    public get optionsRaw (): string {
        return this._optionsRaw
    }

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {string} value
     */
    public set optionsRaw (value: string) {
        this._optionsRaw = value
        this.doParseOptionsRaw()
    }

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    public get height (): string {
        return this._height
    }

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {string} value
     */
    public set height (value: string) {
        this._height = value
    }

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    public get width (): string {
        return this._width
    }

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @param {string} value
     */
    public set width (value: string) {
        this._width = value
    }

    /**
     * Todo
     * @memberof sgvizler.Chart
     * @returns {string}
     */
    protected getHTMLStyleOrClass () {
        let html = ''
        let opts = this.options
        if (this._patternOptions === CHART_PATTERN_OPTIONS.CLASS) {
            html = Object.keys(opts).map((property) => '${opts[property]}').join(' ')
            html = 'class="' + html + '"'
        }
        if (this._patternOptions === CHART_PATTERN_OPTIONS.STYLE) {
            html = Object.keys(opts).map((property) => '${property}:${opts[property]}').join(';')
            html = 'style="' + html + '"'
        }
        return html
    }

    protected addScript (url: string,loadBefore?: Dependency) {
        let dep = new ScriptDependency(url,loadBefore)
        this._tabDependences.push(dep)
        return dep
    }

    protected addCss (url: string,loadBefore?: Dependency) {
        let dep = new CssDependency(url,loadBefore)
        this._tabDependences.push(dep)
        return dep
    }

    private isLoadedAllDependencies (): boolean {
        for (let dep of this._tabDependences) {
            if (! Loader.isLoaded(dep)) {
                return false
            }
        }
        return true
    }

    private doDraw () {
        Logger.log('Chart started : ' + this._container.id)
        if ( this._resultSparql !== null) {
            this.draw(this._resultSparql)
            this._isDone = true
        }
        Logger.log('Chart finished : ' + this._container.id)
    }

    // noinspection JSValidateJSDoc
    // noinspection tslint
    /**
     * todo
     * @memberof sgvizler.Chart
     * @param {RegExp} patternOption
     * @param {CHART_PATTERN_OPTIONS} typePattern
     */
    private execPattern (patternOption: RegExp,typePattern: CHART_PATTERN_OPTIONS) {
        let matchArray
        let raw = this._optionsRaw
        while ((matchArray = patternOption.exec(raw)) !== null) { // tslint:disable-line
            this.options[matchArray[1].toLowerCase()] = matchArray[2].trim()
            this._patternOptions = typePattern
        }
    }

    /**
     * todo
     * @memberof sgvizler.Chart
     */
    private doParseOptionsRaw () {
        // 3 possibilities
        // pattern option : separate by optionA=a|optionB=b
        // pattern style : any options, only style separate by ;
        // pattern class : words separate by space

        // noinspection TsLint
        let patternOption = /\|? *([^=]*) *= *([^=|]*)/iy // tslint:disable-line
        let patternStyle = /([^:]+):([^:;]+) *;?/iy // tslint:disable-line
        let patternClass = /([^ |;]+) ?/iy // tslint:disable-line

        let raw = this._optionsRaw

        if (raw === '') {
            this._patternOptions = CHART_PATTERN_OPTIONS.EMPTY
        }else {
            this._patternOptions = CHART_PATTERN_OPTIONS.UNKNOWN
        }

        if ( this.patternOptions === CHART_PATTERN_OPTIONS.UNKNOWN) {
            this.execPattern(patternOption,CHART_PATTERN_OPTIONS.VARIABLE)
        }

        if ( this.patternOptions === CHART_PATTERN_OPTIONS.UNKNOWN) {
            this.execPattern(patternStyle,CHART_PATTERN_OPTIONS.STYLE)
        }

        if ( this.patternOptions === CHART_PATTERN_OPTIONS.UNKNOWN) {
            let matchArray
            let raw = this._optionsRaw
            let i = 0
            while ((matchArray = patternClass.exec(raw)) !== null) { // tslint:disable-line
                this.options['class' + i] = matchArray[2]
                this._patternOptions = CHART_PATTERN_OPTIONS.UNKNOWN
                i++
            }
        }

        if ( this.patternOptions === CHART_PATTERN_OPTIONS.UNKNOWN ) {
            Logger.displayFeedback(this.container, MESSAGES.ERROR_CHART_PATTERN_OPTION_UNKNOWN,[this._optionsRaw])
        }else if (
            this.patternOptions === CHART_PATTERN_OPTIONS.VARIABLE ||
            this.patternOptions === CHART_PATTERN_OPTIONS.STYLE
        ) {
            if (this.options['width'] !== undefined ) {
                this.width = this.options['width']
            }
            if (this.options['height'] !== undefined ) {
                this.height = this.options['height'] as string
            }
        }
    }
}

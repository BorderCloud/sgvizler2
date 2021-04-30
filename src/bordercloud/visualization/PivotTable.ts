import {
    Core,
    Chart,
    SparqlResultInterface,
    MESSAGES,
    Logger,
    Tools
} from '../../sgvizler'

declare let $: any
declare let google: any
/**
 * This table uses <a href="https://pivottable.js.org/examples/">PivotTable.js</a>.
 *
 * @class bordercloud.visualization.PivotTable
 * @memberof bordercloud.visualization
 */
export class PivotTable extends Chart {
    private static _isInit: boolean = false

    //private _pivotUIOptions:any = null;

    public constructor () {
        super()

        // let lang = this.container.lang

        this.addCss(Core.path + 'lib/pivottable/dist/pivot.min.css')
        this.addCss(Core.path + 'lib/jquery-ui/jquery-ui.min.css')
        this.addCss(Core.path + 'lib/c3/c3.min.css')

        let dep = this.addScript(Core.path + 'lib/jquery-ui/jquery-ui.min.js')
        let touch = this.addScript(Core.path + 'lib/jquery-ui.touch-punch/jquery.ui.touch-punch.min.js',dep)
        let pivot = this.addScript(Core.path + 'lib/pivottable/dist/pivot.min.js',touch)

        let plotly = this.addScript(Core.path +  'lib/plotly/plotly-latest.min.js',pivot)
        this.addScript(Core.path + 'lib/pivottable/dist/plotly_renderers.js',plotly)


        let d3 = this.addScript(Core.path + 'lib/d3/d3.min.js',pivot)
        let c3 = this.addScript(Core.path + 'lib/c3/c3.min.js',d3)
        this.addScript(Core.path + 'lib/pivottable/dist/d3_renderers.js',d3)
        this.addScript(Core.path + 'lib/pivottable/dist/c3_renderers.js',c3)

        this.addScript(Core.path + 'lib/pivottable/dist/export_renderers.js',pivot)

        let gchart = this.addScript('https://www.gstatic.com/charts/loader.js',pivot)
        this.addScript(Core.path + 'lib/pivottable/dist/gchart_renderers.js',gchart)
        this.addScript(Core.path + 'lib/pivottable/dist/pivot.fr.min.js',pivot)
    }

    private static init () {
        google.load("visualization", "1", {packages:["corechart", "charteditor"]});
        PivotTable._isInit = true
    }

    public get icon (): string {
        return 'fa fa-table'
    }

    public get label (): string {
        return 'PivotTable'
    }

    public get subtext (): string {
        return 'PivotTable'
    }

    public get classFullName (): string {
        return 'bordercloud.visualization.PivotTable'
    }

    public get tutorialFilename (): string {
        return 'tutorial-bordercloud_visualization_PivotTable.html'
    }

    /**
     * Draw a chart
     * Options are interactives
     *
     * @param {SparqlResultInterface} result
     * @returns {Promise< any >}
     */
     public draw (result: SparqlResultInterface): Promise<void> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            try {
                let obj = document.getElementById(currentChart.container.id)
                if (! obj) {
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART_UNKNOWN, [currentChart.container.id])
                    return resolve()
                }
                let lang = currentChart.container.lang
                let cols = result.head.vars
                let rows = result.results.bindings
                let row
                let datasetRow
                let noCols = cols.length
                let noRows = rows.length
                let idContainer = currentChart.container.id
                let idChart = currentChart.container.id + '-pivot'
                let dataset:any = []
                let idSwith = currentChart.container.id + '-showUI'
                let divElement = document.createElement('div')
                let divId = document.createAttribute('id')
                let defaultOptions =  {
                    renderers: $.extend(
                        $.pivotUtilities.renderers,
                        $.pivotUtilities.plotly_renderers,
                        $.pivotUtilities.d3_renderers,
                        $.pivotUtilities.c3_renderers,
                        $.pivotUtilities.gchart_renderers,
                        $.pivotUtilities.export_renderers
                    ),
                    rendererOptions: {
                        width: Tools.sizeConvertInteger(currentChart.width),
                        height: Tools.sizeConvertInteger(currentChart.height)
                    }
                }
                let pivotUIOptions:any = null;

                divId.value = idChart
                divElement.setAttributeNode(divId)
                obj.appendChild(divElement)

                for (let r = 0; r < noRows; r++) {
                    row = rows[r]
                    datasetRow = {}
                    // loop cells
                    for (let c = 0; c < noCols; c += 1) {
                        (datasetRow as any)[cols[c]] = row[cols[c]] !== undefined ? row[cols[c]].value : null
                    }
                    dataset[r] = datasetRow
                }


                try{
                    pivotUIOptions = JSON.parse(currentChart.optionsRaw)
                }catch (e) {
                    pivotUIOptions = {}
                }
                let config =  Object.assign(pivotUIOptions, defaultOptions)

                $( '#' + idChart).pivotUI(
                    dataset,
                    config,
                    true,
                    lang
                    );

                let txtchecked = (config.showUI === true || config.showUI === undefined) ? "checked" : ""
                $( '#' + idContainer).prepend("<div class=\"custom-control custom-switch float-right\"" +
                    "style='z-index: 2; right: 0;'>\n" + //position: absolute;
                    "  <input type=\"checkbox\" class=\"custom-control-input\" id=\""+idSwith+"\" "+txtchecked+">\n" +
                    "  <label class=\"custom-control-label\" for=\""+idSwith+"\"> </label>\n" +
                    "</div>");

                $('#' + idSwith).on("change", function() {
                    let config = $( '#' + idChart).data("pivotUIOptions");
                    config.showUI = this.checked
                    $( '#' + idChart).pivotUI(
                        dataset,
                        config,
                        true,
                        lang
                    );
                });
            }catch (e) {
                return reject(e)
            }
            // finish
            return resolve()
        })
     }

    public get newOptionsRaw (): string {
        let idChart = this.container.id + '-pivot'
        var config = $( '#' + idChart).data("pivotUIOptions");
        return JSON.stringify(
                config,
                ['rowOrder', 'rows', 'cols', 'aggregatorName', 'vals', 'rendererName','showUI']
                )
    }

}

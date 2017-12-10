import {
    Core,
    Chart,
    SparqlResultInterface,
    MESSAGES,
    Logger
} from '../../sgvizler'

declare let $: any

/**
 * Enum for tri-state values.
 * @readonly
 * @enum {number}
 */
enum DATATABLE_COL_OPTIONS {
    TAG,
    STYLE
}

/**
 * This table uses <a href="https://datatables.net/">DataTables.net</a>.
 * You can adapt each column with the option colstyle.
 *
 * @class bordercloud.visualization.AreaChart
 * @memberof bordercloud.visualization
 */
export class AreaChart extends Chart {

    public constructor () {
        super()

        this.addCss(Core.path + '/lib/DataTables/datatables.min.css')
        this.addCss(Core.path + '/lib/DataTables/DataTables-1.10.15/css/dataTables.bootstrap4.min.css')
        let depDatatables = this.addScript(Core.path + '/lib/DataTables/datatables.min.js')
        this.addScript(Core.path + '/lib/DataTables/DataTables-1.10.15/js/dataTables.bootstrap4.js',depDatatables)

        this.addScript(Core.path + '/lib/DataTables/Buttons-1.4.0/js/dataTables.buttons.js',depDatatables)

    }

    /**
     * This function parses colStyle option and build the parameter ColumnDef of AreaChart
     * Example :
     * "colStyle=col2_img_max-width:250px;col2_img_border-radius:50%;col2_img_display:block;col2_img_margin:auto;col3_img_max-width:300px;col3_img_max-height:300px;col2_img_opacity:0.5"
     *
     * @param {string} codeStyle
     * @param {number} noCols
     * @returns {Array<any>}
     */
    private static buildColumnDefs (codeStyle: string,noCols: number): Array<any> {
        // noinspection Annotator
        let regex = / *col([1-9]+)\_([a-zA-Z]+)\_([^=;\n]*) */ig
        let m
        let datasetColumnsDefs = [] as Array<any>
        let datasetColumnsFunc
        let colOptions: string[][] = []
        let optionCol

        // init
        for (let c = 0; c < noCols; c++) {
            colOptions[c] = []
            colOptions[c][DATATABLE_COL_OPTIONS.TAG] = ''
            colOptions[c][DATATABLE_COL_OPTIONS.STYLE] = ''
        }

        // noinspection TsLint
        while ((m = regex.exec(codeStyle)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++
            }

            optionCol = parseInt(m[1],10) - 1
            colOptions[optionCol][DATATABLE_COL_OPTIONS.TAG] = m[2]
            colOptions[optionCol][DATATABLE_COL_OPTIONS.STYLE] += m[3] + ';'
        }

        for (let c = 0; c < noCols; c++) {
            switch (colOptions[c][DATATABLE_COL_OPTIONS.TAG]) {
                case 'img':
                    datasetColumnsFunc = this.getFunctionColumnDefImg(colOptions[c][DATATABLE_COL_OPTIONS.STYLE])
                    break
                case 'span':
                    datasetColumnsFunc = this.getFunctionColumnDefSpan(colOptions[c][DATATABLE_COL_OPTIONS.STYLE])
                    break
                default:
                    datasetColumnsFunc = this.getFunctionColumnDefDefault()
            }

            // noinspection TsLint
            datasetColumnsDefs[c] = {
                'targets': c,
                // "data": "description",
                'render': datasetColumnsFunc
            }
        }
        return datasetColumnsDefs
    }

    private static getFunctionColumnDefDefault (): any {
        return (function (data: any, type: any, full: any, meta: any) {
            return data
        })
    }
    private static getFunctionColumnDefImg (style: string): any {
        return (function (data: any, type: any, full: any, meta: any) {
            return '<img src="' + data + '"  style="' + style + '"\>'
        })
    }
    private static getFunctionColumnDefSpan (style: string): any {
        return (function (data: any, type: any, full: any, meta: any) {
            return '<span style="' + style + '"\>' + data + '</span>'
        })
    }

    public get icon (): string {
        return 'fa-table'
    }

    public get label (): string {
        return 'AreaChart'
    }

    public get subtext (): string {
        return 'AreaChart'
    }

    public get classFullName (): string {
        return 'bordercloud.visualization.AreaChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-bordercloud_visualization_AreaChart.html'
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
     public draw (result: SparqlResultInterface): Promise<any> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            // precondition
            let obj = document.getElementById(currentChart.container.id)
            if (! obj) {
                Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART_UNKNOWN, [currentChart.container.id])
                return resolve()
            }

            try {

                let cols = result.head.vars
                let rows = result.results.bindings
                let row
                let datasetRow
                let noCols = cols.length
                let noRows = rows.length
                let idChart = currentChart.container.id + '-datatable'
                let datasetColumns = []
                let datasetColumnsDefs
                let dataset = []
                let tableElement = document.createElement('table')
                let tableId = document.createAttribute('id')
                let tableClass = document.createAttribute('class')
                let tableCellSpacing = document.createAttribute('cellspacing')
                let tableWidth = document.createAttribute('width')
                let opt = Object.assign({
                    'class'         : 'table table-striped table-bordered' ,
                    'cellspacing'   : '0' ,
                    'width'         : '100%' ,
                    'colstyle'      : undefined
                }, currentChart.options )

                for (let c = 0; c < noCols; c++) {
                    datasetColumns[c] = { title: cols[c] }
                }

                if (opt.colstyle !== undefined ) {
                    datasetColumnsDefs = AreaChart.buildColumnDefs(opt.colstyle,noCols)
                }

                for (let r = 0; r < noRows; r++) {
                    row = rows[r]
                    datasetRow = []
                    // loop cells
                    for (let c = 0; c < noCols; c += 1) {
                        datasetRow[c] = row[cols[c]] !== undefined ? row[cols[c]].value : ''
                    }
                    dataset[r] = datasetRow
                }
                tableId.value = idChart
                tableClass.value = opt.class
                tableCellSpacing.value = opt.cellspacing
                tableWidth.value = opt.width
                tableElement.setAttributeNode(tableId)
                tableElement.setAttributeNode(tableClass)
                tableElement.setAttributeNode(tableCellSpacing)
                tableElement.setAttributeNode(tableWidth)

                obj.appendChild(tableElement)

                $( '#' + idChart).AreaChart( {
                    data: dataset ,
                    columns: datasetColumns,
                    columnDefs: datasetColumnsDefs,
                    dom: 'Bfrtip',
                    buttons: [
                        'csv',
                        'pdf',
                        'print'
                    ]

                } )
            }catch (e) {
                return reject(e)
            }
            // finish
            return resolve()
        })
     }
}

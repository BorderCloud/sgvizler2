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
 * @class bordercloud.visualization.DataTable
 * @memberof bordercloud.visualization
 */
export class DataTable extends Chart {

    public constructor () {
        super()

        this.addCss(Core.path + '/lib/DataTables/datatables.min.css')
        // this.addCss(Core.path + '/lib/DataTables/DataTables-1.10.15/css/dataTables.bootstrap4.min.css')
        let depDatatables = this.addScript(Core.path + '/lib/DataTables/datatables.min.js')
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
    private static buildColumnDefs (codeStyle: string,noCols: number): Array<any> {
        // noinspection Annotator
        let regex = / *col([0-9]+)\_([a-zA-Z]+)\_([^=;\n]*) */ig
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

            optionCol = parseInt(m[1],10)
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
                    /**/
                case 'video':
                    datasetColumnsFunc = this.getFunctionColumnDefVideo(colOptions[c][DATATABLE_COL_OPTIONS.STYLE])
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

    private static getFunctionColumnDefVideo (style: string): any {
        return (function (data: any, type: any, full: any, meta: any) {
            let youtubePattern = new RegExp('youtu')
            let facebookPattern = new RegExp('facebook')
            let mediawikiPattern = new RegExp('commons\.wikimedia\.org')

            if (youtubePattern.test(data)) {
                let url = data.replace('watch?v=', 'embed/')
                return '<iframe  style="' + style + '" src="' + url + '" meta http-equiv="X-Frame-Options" content="allow" frameborder="0" allowfullscreen></iframe>'
            } else if (facebookPattern.test(data)) {
                //data = 'https://www.facebook.com/XXXX/videos/XXXXX/' // example
                //doc https://developers.facebook.com/docs/plugins/embedded-video-player
                return '<iframe src="https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(data) + '&show_text=0&width=560" style="border:none;overflow:hidden;' + style + '" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>'
            } else if (mediawikiPattern.test(data)) {
                //data = 'https://commons.wikimedia.org/wiki/File%3AAuguste_%26_Louis_Lumi%C3%A8re-_L'Arroseur_arros%C3%A9_(1895).webm' // example
                //return '<iframe src="' + data + '?embedplayer=false" style="' + style + '" frameborder="0" allowfullscreen></iframe>'
                //doc http://html5video.org/wiki/Rewriting_HTML5_Media_Elements
                return '<video controls style="' + style + '"><source src="' + data + '"></video>'
            } else {
                return '<iframe  style="' + style + '" src="' + data + '" meta http-equiv="X-Frame-Options" content="allow" frameborder="0" allowfullscreen></iframe>'
            }
        })
    }

    private static getFunctionColumnDefSpan (style: string): any {
        return (function (data: any, type: any, full: any, meta: any) {
            return '<span style="' + style + '"\>' + data + '</span>'
        })
    }

    public get icon (): string {
        return 'fa fa-table'
    }

    public get label (): string {
        return 'DataTable'
    }

    public get subtext (): string {
        return 'DataTable'
    }

    public get classFullName (): string {
        return 'bordercloud.visualization.DataTable'
    }

    public get tutorialFilename (): string {
        return 'tutorial-bordercloud_visualization_DataTable.html'
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

                let lang = currentChart.container.lang
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
                    datasetColumnsDefs = DataTable.buildColumnDefs(opt.colstyle,noCols)
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

                $.fn.dataTable.Buttons.defaults.dom.button.className = "btn btn-outline-dark btn-sm"
                $( '#' + idChart).DataTable(
                    {
                    bSort : false,
                    data: dataset ,
                    columns: datasetColumns,
                    columnDefs: datasetColumnsDefs,
                    dom: "<'row'<'col'B><'col-auto'l><'col-sm-6'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                    buttons: [
                        {
                            extend:    'csv',
                            text:      '<i class="fas fa-lg fa-file-csv align-text-bottom"></i>',
                            titleAttr: 'CSV'
                        },
                        {
                            extend:    'pdf',
                            text:      '<i class="fas fa-lg fa-file-pdf align-text-bottom"></i>',
                            titleAttr: 'PDF'
                        },
                        {
                            extend:    'print',
                            text:      '<i class="fas fa-lg fa-print align-text-bottom"></i>',
                            titleAttr: 'print'
                        }
                    ],
                        "language": DataTable.geti18n(lang)

            } )
            }catch (e) {
                return reject(e)
            }
            // finish
            return resolve()
        })
     }

    private static geti18n (lang: string): any {
        switch (lang) {
            case 'fr':
                return {
                    "sProcessing":     "Traitement en cours...",
                    "sSearch":         "Rechercher&nbsp;:",
                    "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
                    "sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
                    "sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
                    "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
                    "sInfoPostFix":    "",
                    "sLoadingRecords": "Chargement en cours...",
                    "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
                    "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
                    "oPaginate": {
                        "sFirst":      "Premier",
                        "sPrevious":   "Pr&eacute;c&eacute;dent",
                        "sNext":       "Suivant",
                        "sLast":       "Dernier"
                    },
                    "oAria": {
                        "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
                        "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
                    }
                }
            default: //en
                return {
                    "sEmptyTable":     "No data available in table",
                    "sInfo":           "Showing _START_ to _END_ of _TOTAL_ entries",
                    "sInfoEmpty":      "Showing 0 to 0 of 0 entries",
                    "sInfoFiltered":   "(filtered from _MAX_ total entries)",
                    "sInfoPostFix":    "",
                    "sInfoThousands":  ",",
                    "sLengthMenu":     "Show _MENU_ entries",
                    "sLoadingRecords": "Loading...",
                    "sProcessing":     "Processing...",
                    "sSearch":         "Search:",
                    "sZeroRecords":    "No matching records found",
                    "oPaginate": {
                        "sFirst":    "First",
                        "sLast":     "Last",
                        "sNext":     "Next",
                        "sPrevious": "Previous"
                    },
                    "oAria": {
                        "sSortAscending":  ": activate to sort column ascending",
                        "sSortDescending": ": activate to sort column descending"
                    }
                }
        }
    }
}

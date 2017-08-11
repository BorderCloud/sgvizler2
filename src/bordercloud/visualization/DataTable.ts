import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

/**
 * Todo.
 * @class bordercloud.visualization.DataTable
 * @tutorial bordercloud._visualization_DataTable
 * @memberof bordercloud.visualization
 */
export class DataTable extends Chart {

    public get icon (): string {
        return 'fa-table'
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

    public constructor () {
        super()
      //  addDependence
    }

    // noinspection JSValidateJSDoc
    /**
     * Draw a chart
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @param {SparqlResultInterface} result
     * @returns {Promise< any >}
     */
    public draw (result: SparqlResultInterface): Promise<any> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            // transform query
            let cols = result.head.vars
            let rows = result.results.bindings
            let noCols = cols.length
            let noRows = rows.length

            // console.log(noCols + " x " + noRows)
            let opt = Object.assign({ headings: true }, currentChart.options)

            // console.log(opt)
            let html = '<table ' + currentChart.getHTMLStyleOrClass() + ' >'
            if (opt.headings) {
                html += '<tr>'
                for (let col of cols) {
                    html += '<th>' + col + '</th>'
                }
                html += '</tr>'
            }

            for (let row of rows) {
                html += '<tr>'
                for (let col of cols) {
                    html += '<td>' + row[col].value + '</td>'
                }
                html += '</tr>'
            }

            html += '</table>'

            let obj = document.getElementById(currentChart.container.id)
            if (obj) {
                obj.innerHTML = html
            }
        })
    }
}

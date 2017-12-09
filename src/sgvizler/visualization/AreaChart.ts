import { Chart } from '../Chart'
import { SparqlTools } from '../SparqlTools'
import { SparqlResultInterface } from '../SparqlResultInterface'

/**
 * Todo AreaChart
 * @class sgvizler.visualization.AreaChart
 * @tutorial sgvizler_visualization_AreaChart
 * @memberof sgvizler.visualization
 */
export class AreaChart extends Chart {

    public get icon (): string {
        return 'fa-AreaChart'
    }

    public get label (): string {
        return 'AreaChart'
    }

    public get subtext (): string {
        return 'simple AreaChart'
    }

    public get classFullName (): string {
        return 'sgvizler.visualization.AreaChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-sgvizler_visualization_AreaChart.html'
    }

    public constructor () {
        super()
      //  addDependence(SparqlResult)
    }

    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf AreaChart
     * @returns {Promise<void>}
     * @param result
     */
    public draw (result: SparqlResultInterface): Promise<any> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let opt = Object.assign({ headings: 'true' }, currentChart.options)

            let cols = result.head.vars
            let rows = result.results.bindings
            let noCols = cols.length
            let noRows = rows.length

            // console.log(opt)
            let html = '<table ' + currentChart.getHTMLStyleOrClass() + ' >'
            if (opt.headings === 'true') {
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
            // finish
            resolve()
        })
    }
}

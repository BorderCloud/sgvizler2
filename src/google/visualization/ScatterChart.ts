import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
import { API } from '../API'

declare let google: any

/**
 * Todo ScatterChart
 * @class google.visualization.ScatterChart
 * @tutorial google_visualization_ScatterChart
 * @memberof google.visualization
 */
export class ScatterChart extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['scatterchart']})
        ScatterChart._isInit = true
    }

    public get icon (): string {
        return 'fa-table'
    }

    public get label (): string {
        return 'ScatterChart'
    }

    public get subtext (): string {
        return 'ScatterChart'
    }

    public get classFullName (): string {
        return 'google.visualization.ScatterChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_ScatterChart.html'
    }

    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf ScatterChart
     * @returns {Promise<void>}
     * @param result
     */
    public draw (result: SparqlResultInterface): Promise<any> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)

            let height = '400'
            if (currentChart.height !== '') {
                height = currentChart.height
            }

            let opt = Object.assign({
                hAxis: {title: 'uuu', minValue: 0, maxValue: 15},
                vAxis: {title: 'ggg', minValue: 0, maxValue: 15},
                height: height,
                width: '100%',
                backgroundColor : 'green',
                title: 'PIB PAR POPULATION'
            }, currentChart.options)

            if (! ScatterChart._isInit) {
                ScatterChart.init()
            }

            /*google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)

                    let table = new google.visualization.ScatterChart(document.getElementById(currentChart.container.id))

                    table.draw(data.getDataTable(), currentChart.options)
                }
            )*/

            google.charts.setOnLoadCallback(drawSeriesChart)

                function drawSeriesChart () {
                    let data = new Data(result)
                    console.log(data.getDataTable())
                    let chart = new google.visualization.ScatterChart(document.getElementById(currentChart.container.id))
                    chart.draw(data.getDataTable(), opt)
                }
            // finish
            return resolve()
        })
    }
}

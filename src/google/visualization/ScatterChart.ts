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

            /*let height = '100%'
            if (currentChart.height !== '') {
                height = currentChart.height
            }
            let data = google.visualization.arrayToDataTable([
                ['Age', 'Weight'],
                [ 8,12],
                [ 4,5.5],
                [ 11,14],
                [ 4,5],
                [ 3,3.5],
                [ 6.5,7]
              ])
            let opt = Object.assign({
                hAxis: {title: 'Age', minValue: 0, maxValue: 15},
                vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
                height: height
            }, currentChart.options)*/

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
            
                function drawSeriesChart() {
                    let data = new Data(result)
                    console.log(data.getDataTable())
                    let options = {
                        width: '100%',
                        height: '400',
                        title: 'PIB PAR POPULATION'
                    }
            
                    let chart = new google.visualization.ScatterChart(document.getElementById(currentChart.container.id))
                    chart.draw(data.getDataTable(), options)
                }
            // finish
            return resolve()
        })
    }
}

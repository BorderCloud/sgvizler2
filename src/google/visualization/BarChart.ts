import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
import { API } from '../API'

declare let google: any

/**
 * Todo BarChart
 * @class google.visualization.BarChart
 * @tutorial google_visualization_BarChart
 * @memberof google.visualization
 */
export class BarChart extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['barchart']})
        BarChart._isInit = true
    }

    public get icon (): string {
        return 'fa-table'
    }

    public get label (): string {
        return 'BarChart'
    }

    public get subtext (): string {
        return 'BarChart'
    }

    public get classFullName (): string {
        return 'google.visualization.BarChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_BarChart.html'
    }

    
    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf BarChart
     * @returns {Promise<void>}
     * @param result
     */
    public draw (result: SparqlResultInterface): Promise<any> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)

            let height = '100%'
            if (currentChart.height !== '') {
                height = currentChart.height
            }

            let opt = Object.assign({
                showRowNumber: true,
                width: '100%',
                height: height
            }, currentChart.options)

            if (! BarChart._isInit) {
                BarChart.init()
            }

            /*google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)
                    let table = new google.visualization.BarChart(document.getElementById(currentChart.container.id))
                    table.draw(data.getDataTable(), currentChart.options)
                }
            )*/

            google.charts.setOnLoadCallback(drawSeriesChart)

            function drawSeriesChart() {
                let data = new Data(result)
                console.log(data.getDataTable())
                console.log(data.getDataTable()["hc"])
                console.log(data.getDataTable().showRowNumber)
                let options = {
                    width: '100%',
                    height: '400',
                    title: 'Population de Paris par année'
                }
        
                let chart = new google.visualization.BarChart(document.getElementById(currentChart.container.id))
                chart.draw(data.getDataTable(), options)
            }
            
            // finish
            return resolve()
        })
    }
}

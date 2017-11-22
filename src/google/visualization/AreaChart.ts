import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
import { API } from '../API'

declare let google: any

/**
 * Todo AreaChart
 * @class google.visualization.AreaChart
 * @tutorial google_visualization_AreaChart
 * @memberof google.visualization
 */
export class AreaChart extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['AreaChart']})
        AreaChart._isInit = true
    }

    public get icon (): string {
        return 'fa-AreaChart'
    }

    public get label (): string {
        return 'AreaChart'
    }

    public get subtext (): string {
        return 'AreaChart'
    }

    public get classFullName (): string {
        return 'google.visualization.AreaChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_AreaChart.html'
    }

    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Table
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
                showRowNumber: false,
                width: currentChart.width,
                height: height
            }, currentChart.options)

            if (! AreaChart._isInit) {
                AreaChart.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)

                    let AreaChart = new google.visualization.AreaChart(document.getElementById(currentChart.container.id))

                    AreaChart.draw(data.getDataTable(), currentChart.options)
                }
            )
            // finish
            return resolve()
        })
    }
}

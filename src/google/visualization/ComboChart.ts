import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
import { API } from '../API'

declare let google: any

/**
 * Todo ComboChart
 * @class google.visualization.ComboChart
 * @tutorial google_visualization_ComboChart
 * @memberof google.visualization
 */
export class ComboChart extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['corechart']})
        ComboChart._isInit = true
    }

    public get icon (): string {
        return 'fa-line-chart'
    }

    public get label (): string {
        return 'ComboChart'
    }

    public get subtext (): string {
        return 'ComboChart'
    }

    public get classFullName (): string {
        return 'google.visualization.ComboChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_ComboChart.html'
    }

    /**
     * Make a standard simple html ComboChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf ComboChart
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
                width: currentChart.width,
                height: height
            }, currentChart.options)

            if (! ComboChart._isInit) {
                ComboChart.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)

                    let comboChart = new google.visualization.ComboChart(document.getElementById(currentChart.container.id))

                    comboChart.draw(data.getDataTable(), currentChart.options)
                }
            )
            // finish
            return resolve()
        })
    }
}

import {
    Chart, Logger, MESSAGES,
    SparqlResultInterface
} from '../../sgvizler'

import { Tools } from '../Tools'
import { Data } from '../Data'
import { API } from '../API'

declare let google: any

/**
 * Todo SteppedAreaChart
 * @class google.visualization.SteppedAreaChart
 * @tutorial google_visualization_SteppedAreaChart
 * @memberof google.visualization
 */
export class SteppedAreaChart extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['corechart']})
        SteppedAreaChart._isInit = true
    }

    public get icon (): string {
        return 'fa-area-chart'
    }

    public get label (): string {
        return 'SteppedAreaChart'
    }

    public get subtext (): string {
        return 'SteppedAreaChart'
    }

    public get classFullName (): string {
        return 'google.visualization.SteppedAreaChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_SteppedAreaChart.html'
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

            let height = 500
            if (currentChart.height !== '') {
                height = Tools.decodeFormatSize(currentChart.height)
            }

            let opt = Object.assign({
                width: Tools.decodeFormatSize(currentChart.width),
                height: height
            }, currentChart.options)

            if (! SteppedAreaChart._isInit) {
                SteppedAreaChart.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    try {
                        let data = new Data(result)
                        let steppedAreaChart = new google.visualization.SteppedAreaChart(document.getElementById(currentChart.container.id))
                        steppedAreaChart.draw(data.getDataTable(), opt)
                    } catch (error) {
                        console.log(error)
                        Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error])
                        Logger.log(currentChart.container,'Chart finished with error : ' + currentChart.container.id)
                    }
                }
            )
            // finish
            return resolve()
        })
    }
}

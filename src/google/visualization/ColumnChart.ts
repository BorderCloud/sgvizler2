import {
    Chart, Logger, MESSAGES,
    SparqlResultInterface
} from '../../sgvizler'

import { Tools } from '../Tools'
import { Data } from '../Data'
import { API } from '../API'

declare let google: any

/**
 * Todo ColumnChart
 * @class google.visualization.ColumnChart
 * @tutorial google_visualization_ColumnChart
 * @memberof google.visualization
 */
export class ColumnChart extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['corechart', 'bar']})
        ColumnChart._isInit = true
    }

    public get icon (): string {
        return 'fa-bar-chart'
    }

    public get label (): string {
        return 'ColumnChart'
    }

    public get subtext (): string {
        return 'ColumnChart'
    }

    public get classFullName (): string {
        return 'google.visualization.ColumnChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_ColumnChart.html'
    }

    /**
     * Make a standard simple html ColumnChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf ColumnChart
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
                reverseCategories: false
            }, currentChart.options)

            // fix the size
            opt = Object.assign(opt, {
                width: Tools.decodeFormatSize(currentChart.width),
                height: height
            })

            if (! ColumnChart._isInit) {
                ColumnChart.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    try {
                        let data = new Data(result)
                        let ColumnChart = new google.visualization.ColumnChart(document.getElementById(currentChart.container.id))
                        ColumnChart.draw(data.getDataTable(), opt)
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

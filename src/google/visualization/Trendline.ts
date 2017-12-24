import {
    Chart, Logger, MESSAGES,
    SparqlResultInterface
} from '../../sgvizler'

import { Tools } from '../Tools'
import { Data } from '../Data'
import { API } from '../API'

declare let google: any

/**
 * Todo Trendline
 * @class google.visualization.Trendline
 * @tutorial google_visualization_Trendline
 * @memberof google.visualization
 */
export class Trendline extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['corechart']})
        Trendline._isInit = true
    }

    public get icon (): string {
        return 'fa-line-chart'
    }

    public get label (): string {
        return 'Trendline'
    }

    public get subtext (): string {
        return 'Trendline'
    }

    public get classFullName (): string {
        return 'google.visualization.Trendline'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_Trendline.html'
    }

    /**
     * Make a standard simple html Trendline.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Trendline
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
                height: height,
                trendlines: { 0: {} }
            }, currentChart.options)

            if (! Trendline._isInit) {
                Trendline.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    try {
                        let data = new Data(result)
                        let chart = new google.visualization.ScatterChart(document.getElementById(currentChart.container.id))
                        chart.draw(data.getDataTable(), opt)
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

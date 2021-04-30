import {
    Chart, Logger, MESSAGES,
    SparqlResultInterface
} from '../../sgvizler'

import { Tools } from '../Tools'
import { Data } from '../Data'
import { API } from '../API'

declare let google: any

/**
 * Todo Pie
 * @class google.visualization.Pie
 * @tutorial google_visualization_Pie
 * @memberof google.visualization
 */
export class Pie extends Chart {
    public get icon (): string {
        return 'fas fa-chart-pie'
    }

    public get label (): string {
        return 'Pie'
    }

    public get subtext (): string {
        return 'Pie'
    }

    public get classFullName (): string {
        return 'google.visualization.Pie'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_Pie.html'
    }

    private static _isInit: boolean = false

    public constructor () {
        super()
        this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', { 'packages': ['corechart'] })
        Pie._isInit = true
    }

    /**
     * Make a standard simple html pie.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Pie
     * @returns {Promise<void>}
     * @param result
     */
    public draw (result: SparqlResultInterface): Promise<void> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)

            let height = 500
            if (currentChart.height !== '') {
                height = Tools.decodeFormatSize(currentChart.height)
            }

            let opt = Object.assign({
                // Default options
            }, currentChart.options)

            // fix the size
            opt = Object.assign(opt, {
                width: Tools.decodeFormatSize(currentChart.width),
                height: height
            })

            if (! Pie._isInit) {
                Pie.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    try {
                        let data = new Data(result)
                        let Pie = new google.visualization.PieChart(document.getElementById(currentChart.container.id))
                        Pie.draw(data.getDataTable(), opt)
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

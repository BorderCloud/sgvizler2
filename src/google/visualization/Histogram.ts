import {
    Chart, Logger, MESSAGES,
    SparqlResultInterface
} from '../../sgvizler'

import { Tools } from '../Tools'
import { Data } from '../Data'
import { API } from '../API'

declare let google: any

/**
 * Todo Histogram
 * @class google.visualization.Histogram
 * @tutorial google_visualization_Histogram
 * @memberof google.visualization
 */
export class Histogram extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['corechart']})
        Histogram._isInit = true
    }

    public get icon (): string {
        return 'fas fa-chart-area'
    }

    public get label (): string {
        return 'Histogram'
    }

    public get subtext (): string {
        return 'Histogram'
    }

    public get classFullName (): string {
        return 'google.visualization.Histogram'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_Histogram.html'
    }

    /**
     * Make a standard simple html Histogram.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Histogram
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
                // Default options
            }, currentChart.options)

            // fix the size
            opt = Object.assign(opt, {
                width: Tools.decodeFormatSize(currentChart.width),
                height: height
            })

            if (! Histogram._isInit) {
                Histogram.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    try {
                        let data = new Data(result)
                        let histogram = new google.visualization.Histogram(document.getElementById(currentChart.container.id))
                        histogram.draw(data.getDataTable(), opt)
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

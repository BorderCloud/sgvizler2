import {
    Chart, Logger, MESSAGES,
    SparqlResultInterface
} from '../../sgvizler'

import { Tools } from '../Tools'
import { Data } from '../Data'
import { API } from '../API'

declare let google: any

/**
 * Todo Calendar
 * @class google.visualization.Calendar
 * @tutorial google_visualization_Calendar
 * @memberof google.visualization
 */
export class Calendar extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['calendar']})
        Calendar._isInit = true
    }

    public get icon (): string {
        return 'fa fa-calendar'
    }

    public get label (): string {
        return 'Calendar'
    }

    public get subtext (): string {
        return 'Calendar'
    }

    public get classFullName (): string {
        return 'google.visualization.Calendar'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_Calendar.html'
    }

    /**
     * Make a standard simple html Calendar.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Calendar
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

            if (! Calendar._isInit) {
                Calendar.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    try {
                        let data = new Data(result)
                        let calendar = new google.visualization.Calendar(document.getElementById(currentChart.container.id))
                       calendar.draw(data.getDataTable(), opt)
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

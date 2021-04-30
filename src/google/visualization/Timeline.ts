import {
    Chart, Logger, MESSAGES,
    SparqlResultInterface
} from '../../sgvizler'

import { Tools } from '../Tools'
import { Data } from '../Data'
import { API } from '../API'

declare let google: any

/**
 * Todo Timeline
 * @class google.visualization.Timeline
 * @tutorial google_visualization_Timeline
 * @memberof google.visualization
 */
export class Timeline extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['timeline']})
        Timeline._isInit = true
    }

    public get icon (): string {
        return 'fa fa-tasks'
    }

    public get label (): string {
        return 'Timeline'
    }

    public get subtext (): string {
        return 'Timeline'
    }

    public get classFullName (): string {
        return 'google.visualization.Timeline'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_Timeline.html'
    }

    /**
     * Make a standard simple html Timeline.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Timeline
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

            if (! Timeline._isInit) {
                Timeline.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    try {
                        let data = new Data(result)
                        let timeline = new google.visualization.Timeline(document.getElementById(currentChart.container.id))
                        timeline.draw(data.getDataTable(), opt)
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

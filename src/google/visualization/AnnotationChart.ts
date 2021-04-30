import {
    Chart, Logger, MESSAGES,
    SparqlResultInterface
} from '../../sgvizler'

import { Tools } from '../Tools'
import { Data } from '../Data'
import { API } from '../API'

declare let google: any

/**
 * Todo AnnotationChart
 * @class google.visualization.AnnotationChart
 * @tutorial google_visualization_AnnotationChart
 * @memberof google.visualization
 */
export class AnnotationChart extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['annotationchart']})
        AnnotationChart._isInit = true
    }

    public get icon (): string {
        return 'fas fa-chart-line'
    }

    public get label (): string {
        return 'AnnotationChart'
    }

    public get subtext (): string {
        return 'AnnotationChart'
    }

    public get classFullName (): string {
        return 'google.visualization.AnnotationChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_AnnotationChart.html'
    }

    /**
     * Make a standard simple html AnnotationChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf AnnotationChart
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

            if (! AnnotationChart._isInit) {
                AnnotationChart.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    try {
                        let data = new Data(result)
                        let AnnotationChart = new google.visualization.AnnotationChart(document.getElementById(currentChart.container.id))
                        AnnotationChart.draw(data.getDataTable(), opt)
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

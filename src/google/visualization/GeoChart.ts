import {
    Chart, Logger, MESSAGES,
    SparqlResultInterface
} from '../../sgvizler'

import { Tools } from '../Tools'
import { Data } from '../Data'
import { API } from '../API'

declare let google: any

/**
 * Todo GeoChart
 * @class google.visualization.GeoChart
 * @tutorial google_visualization_GeoChart
 * @memberof google.visualization
 */
export class GeoChart extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['geochart'], mapsApiKey: API.key})
        GeoChart._isInit = true
    }

    public get icon (): string {
        return 'fa-globe'
    }

    public get label (): string {
        return 'GeoChart'
    }

    public get subtext (): string {
        return 'GeoChart'
    }

    public get classFullName (): string {
        return 'google.visualization.GeoChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_GeoChart.html'
    }

    /**
     * Make a standard simple html geochart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf GeoChart
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

            if (! GeoChart._isInit) {
                GeoChart.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    try {
                        let data = new Data(result)
                        let geochart = new google.visualization.GeoChart(document.getElementById(currentChart.container.id))
                        geochart.draw(data.getDataTable(), opt)
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

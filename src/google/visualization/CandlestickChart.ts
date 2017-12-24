import {
    Chart,
    Logger,
    MESSAGES,
    Messages,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
import { API } from '../API'

declare let google: any

/**
 * Todo CandlestickChart
 * @class google.visualization.CandlestickChart
 * @tutorial google_visualization_CandlestickChart
 * @memberof google.visualization
 */
export class CandlestickChart extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['corechart']})
        CandlestickChart._isInit = true
    }

    public get icon (): string {
        return 'fa-line-chart'
    }

    public get label (): string {
        return 'CandlestickChart'
    }

    public get subtext (): string {
        return 'CandlestickChart'
    }

    public get classFullName (): string {
        return 'google.visualization.CandlestickChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_CandlestickChart.html'
    }

    /**
     * Make a standard simple html CandlestickChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf CandlestickChart
     * @returns {Promise<void>}
     * @param result
     */
    public draw (result: SparqlResultInterface): Promise<any> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            // console.log(noCols + " x " + noRows)

            if (result.results.bindings.length === 0 ) {
                return reject(Messages.get(MESSAGES.ERROR_DATA_NOROW))
            }

            let height = '100%'
            if (currentChart.height !== '') {
                height = currentChart.height
            }

            let opt = Object.assign({
                width: currentChart.width,
                height: height
            }, currentChart.options)

            if (! CandlestickChart._isInit) {
                CandlestickChart.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)

                    let candlestickChart = new google.visualization.CandlestickChart(document.getElementById(currentChart.container.id))

                   candlestickChart.draw(data.getDataTable(), currentChart.options)
                }
            )
            // finish
            return resolve()
        })
    }
}

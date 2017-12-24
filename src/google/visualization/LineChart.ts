import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
import { API } from '../API'

declare let google: any

/**
 * Todo LineChart
 * @class google.visualization.LineChart
 * @tutorial google_visualization_LineChart
 * @memberof google.visualization
 */
export class LineChart extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['corechart','line']})
        LineChart._isInit = true
    }

    public get icon (): string {
        return 'fa-line-chart'
    }

    public get label (): string {
        return 'Line'
    }

    public get subtext (): string {
        return 'Line'
    }

    public get classFullName (): string {
        return 'google.visualization.LineChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_LineChart.html'
    }

    /**
     * Draw a LineChart
     * @memberOf LineChart
     * @returns {Promise<void>}
     * @param result
     */
    public draw (result: SparqlResultInterface): Promise<any> {
        let currentChart = this
        return new Promise(function (resolve, reject) {

            let height = '500'
            if (currentChart.height !== '') {
                height = currentChart.height
            }

            let opt = Object.assign({
                width: currentChart.width,
                height: height
            }, currentChart.options)

            if (! LineChart._isInit) {
                LineChart.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)

                    let line = new google.visualization.LineChart(document.getElementById(currentChart.container.id))
                    line.draw(data.getDataTable(), opt)
                }
            )
            // finish
            return resolve()
        })
    }
}
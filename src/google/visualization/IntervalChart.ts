import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
import { API } from '../API'

declare let google: any

/**
 * Todo IntervalChart
 * @class google.visualization.IntervalChart
 * @tutorial google_visualization_IntervalChart
 * @memberof google.visualization
 */
export class IntervalChart extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['corechart','line']})
        IntervalChart._isInit = true
    }

    public get icon (): string {
        return 'fa-line'
    }

    public get label (): string {
        return 'Line'
    }

    public get subtext (): string {
        return 'Line'
    }

    public get classFullName (): string {
        return 'google.visualization.IntervalChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_IntervalChart.html'
    }

    /**
     * Draw a IntervalChart
     * @memberOf IntervalChart
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

            if (! IntervalChart._isInit) {
                IntervalChart.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)
                    let cols = result.head.vars
                    let noCols = cols.length

                    for (let y = 2; y < noCols; y++) {
                        data.setRole(y,'interval')
                    }

                    let line = new google.visualization.LineChart(document.getElementById(currentChart.container.id))
                    line.draw(data.getDataTable(), opt)
                }
            )
            // finish
            return resolve()
        })
    }
}

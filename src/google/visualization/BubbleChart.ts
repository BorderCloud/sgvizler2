import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
import { API } from '../API'

declare let google: any

/**
 * Todo BubbleChart
 * @class google.visualization.BubbleChart
 * @tutorial google_visualization_BubbleChart
 * @memberof google.visualization
 */
export class BubbleChart extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['corechart']})
        BubbleChart._isInit = true
    }

    public get icon (): string {
        return 'fa-table'
    }

    public get label (): string {
        return 'BubbleChart'
    }

    public get subtext (): string {
        return 'BubbleChart'
    }

    public get classFullName (): string {
        return 'google.visualization.BubbleChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_BubbleChart.html'
    }

    /**
     * Make a standard simple html bubbleChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf BubbleChart
     * @returns {Promise<void>}
     * @param result
     */
    public draw (result: SparqlResultInterface): Promise<any> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)

            let height = '500'
            if (currentChart.height !== '') {
                height = currentChart.height
            }

            let opt = Object.assign({
                width: '100%',
                height: height
            }, currentChart.options)

            if (! BubbleChart._isInit) {
                BubbleChart.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)
                    let chart = new google.visualization.BubbleChart(document.getElementById(currentChart.container.id))
                     chart.draw(data.getDataTable(), opt)
                })
            // finish
            return resolve()
        })
    }
}

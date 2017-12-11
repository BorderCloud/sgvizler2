import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
import { API } from '../API'

declare let google: any

/**
 * Todo Pie
 * @class google.visualization.Pie
 * @tutorial google_visualization_Pie
 * @memberof google.visualization
 */
export class Pie extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['corechart']})
        Pie._isInit = true
    }

    public get icon (): string {
        return 'fa-pie'
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

    /**
     * Make a standard simple html pie.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Pie
     * @returns {Promise<void>}
     * @param result
     */
    public draw (result: SparqlResultInterface): Promise<any> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)

            let height = '300'
            if (currentChart.height !== '') {
                height = currentChart.height
            }
            let opt = Object.assign({
                showRowNumber: false,
                width: currentChart.width,
                height: height
            }, currentChart.options)

            if (! Pie._isInit) {
                Pie.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)

                    let Pie = new google.visualization.PieChart(document.getElementById(currentChart.container.id))
                    Pie.draw(data.getDataTable(), opt)
                }
            )
            // finish
            return resolve()
        })
    }
}

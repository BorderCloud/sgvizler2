import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
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
        return 'fa-Histogram'
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

            let height = '100%'
            if (currentChart.height !== '') {
                height = currentChart.height
            }

            let opt = Object.assign({
                reverseCategories: false,
                width: currentChart.width,
                height: height
            }, currentChart.options)

            if (! Histogram._isInit) {
                Histogram.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)

                    let histogram = new google.visualization.Histogram(document.getElementById(currentChart.container.id))

                    histogram.draw(data.getDataTable(), currentChart.options)
                }
            )
            // finish
            return resolve()
        })
    }
}

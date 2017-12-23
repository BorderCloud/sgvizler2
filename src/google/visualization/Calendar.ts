import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
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
        return 'fa-table'
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

            let height = '100%'
            if (currentChart.height !== '') {
                height = currentChart.height
            }

            let opt = Object.assign({
                width: currentChart.width,
                height: height
            }, currentChart.options)

            if (! Calendar._isInit) {
                Calendar.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)

                    let calendar = new google.visualization.Calendar(document.getElementById(currentChart.container.id))

                   calendar.draw(data.getDataTable(), currentChart.options)
                }
            )
            // finish
            return resolve()
        })
    }
}

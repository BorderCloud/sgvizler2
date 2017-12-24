import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
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
        return 'fa-table'
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

            if (! Timeline._isInit) {
                Timeline.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)

                    let timeline = new google.visualization.Timeline(document.getElementById(currentChart.container.id))

                    timeline.draw(data.getDataTable(), currentChart.options)
                }
            )
            // finish
            return resolve()
        })
    }
}

import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
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
        google.charts.load('current', {'packages': ['geochart']})
        GeoChart._isInit = true
    }

    public get icon (): string {
        return 'fa-geochart'
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

            let height = '100%'
            if (currentChart.height !== '') {
                height = currentChart.height
            }

            let opt = Object.assign({
                showRowNumber: false,
                width: currentChart.width,
                height: height
            }, currentChart.options)

            if (! GeoChart._isInit) {
                GeoChart.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)

                    let geochart = new google.visualization.GeoChart(document.getElementById(currentChart.container.id))

                    geochart.draw(data.getDataTable(), currentChart.options)
                }
            )
            // finish
            return resolve()
        })
    }
}

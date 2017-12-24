import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
import { API } from '../API'

declare let google: any

/**
 * Todo AnnotationChart
 * @class google.visualization.AnnotationChart
 * @tutorial google_visualization_AnnotationChart
 * @memberof google.visualization
 */
export class AnnotationChart extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['annotationchart']})
        AnnotationChart._isInit = true
    }

    public get icon (): string {
        return 'fa-line-chart'
    }

    public get label (): string {
        return 'AnnotationChart'
    }

    public get subtext (): string {
        return 'AnnotationChart'
    }

    public get classFullName (): string {
        return 'google.visualization.AnnotationChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_AnnotationChart.html'
    }

    /**
     * Make a standard simple html AnnotationChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf AnnotationChart
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

            if (! AnnotationChart._isInit) {
                AnnotationChart.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)

                    let AnnotationChart = new google.visualization.AnnotationChart(document.getElementById(currentChart.container.id))

                    AnnotationChart.draw(data.getDataTable(), currentChart.options)
                }
            )
            // finish
            return resolve()
        })
    }
}

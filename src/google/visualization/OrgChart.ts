import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
import { API } from '../API'

declare let google: any

/**
 * Todo OrgChart
 * @class google.visualization.OrgChart
 * @tutorial google_visualization_OrgChart
 * @memberof google.visualization
 */
export class OrgChart extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['orgchart']})
        OrgChart._isInit = true
    }

    public get icon (): string {
        return 'fa-OrgChart'
    }

    public get label (): string {
        return 'OrgChart'
    }

    public get subtext (): string {
        return 'OrgChart'
    }

    public get classFullName (): string {
        return 'google.visualization.OrgChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_OrgChart.html'
    }

    /**
     * Make a standard simple html OrgChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf OrgChart
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
                height: height,
                allowHtml: true
            }, currentChart.options)

            if (! OrgChart._isInit) {
                OrgChart.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)

                    let orgChart = new google.visualization.OrgChart(document.getElementById(currentChart.container.id))

                    orgChart.draw(data.getDataTable(), currentChart.options)
                }
            )
            // finish
            return resolve()
        })
    }
}

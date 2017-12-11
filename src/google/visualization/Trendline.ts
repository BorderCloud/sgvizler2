import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
import { API } from '../API'

declare let google: any

/**
 * Todo Trendline
 * @class google.visualization.Trendline
 * @tutorial google_visualization_Trendline
 * @memberof google.visualization
 */
export class Trendline extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['corechart']})
        Trendline._isInit = true
    }

    public get icon (): string {
        return 'fa-Trendline'
    }

    public get label (): string {
        return 'Trendline'
    }

    public get subtext (): string {
        return 'Trendline'
    }

    public get classFullName (): string {
        return 'google.visualization.Trendline'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_Trendline.html'
    }

    /**
     * Make a standard simple html Trendline.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Trendline
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
                trendlines:'{ 0: {} }',
                legend: 'none',
                width: currentChart.width,
                visibleInLegend: true,
                color: 'none'
            }, currentChart.options)

            if (! Trendline._isInit) {
                Trendline.init()
            }

            opt.trendlines = (new Function("return " + opt.trendlines+ ";")());

            google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)

                    /*  let options = {
                       
                        trendlines: { 0: {} }    // Draw a trendline for data series 0.
                      };*/

                      let chart = new google.visualization.ScatterChart(document.getElementById(currentChart.container.id));
                      chart.draw(data.getDataTable(), opt);
                }
            )
            // finish
            return resolve()
        })
    }
}

import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
import { API } from '../API'

declare let google: any

/**
 * Todo Line
 * @class google.visualization.Line
 * @tutorial google_visualization_Line
 * @memberof google.visualization
 */
export class Line extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['corechart','line']})
        Line._isInit = true
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
        return 'google.visualization.Line'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_Line.html'
    }

    /**
     * Draw a line
     * @memberOf Line
     * @returns {Promise<void>}
     * @param result
     */
    public draw (result: SparqlResultInterface): Promise<any> {
        let currentChart = this
        return new Promise(function (resolve, reject) {

            let opt = Object.assign({
                title: 'Largest cities with female mayor',
                curveType: 'function',
                legend: { position: 'bottom' },
                height: '400'
            }, currentChart.options)

            if (! Line._isInit) {
                Line.init()
            }

            google.charts.setOnLoadCallback(
                () => {
                    let data = new Data(result)

                    let table = new google.visualization.LineChart(document.getElementById(currentChart.container.id))
                    let dataTable = data.getDataTable()
                    table.draw(dataTable, opt)
                }
            )
            // finish
            return resolve()
        })
    }
}

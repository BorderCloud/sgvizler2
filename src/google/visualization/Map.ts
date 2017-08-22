import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import { Data } from './Data'
import { API } from '../API'

declare let google: any

/**
 * Todo Table
 * @class google.visualization.Map
 * @tutorial google_visualization_Map
 * @memberof google.visualization
 */
export class Map extends Chart {
    private static _isInit: boolean = false

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }

    private static init () {
        google.charts.load('current', {'packages': ['map'] , mapsApiKey: API.key })
        Map._isInit = true
    }

    public get icon (): string {
        return 'fa-map'
    }

    public get label (): string {
        return 'Map'
    }

    public get subtext (): string {
        return 'Map'
    }

    public get classFullName (): string {
        return 'google.visualization.Map'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_Map.html'
    }

    /**
     * Make a Google map
     * todo
     * @memberOf Map
     * @returns {Promise<void>}
     * @param result
     */
    public draw (result: SparqlResultInterface): Promise<any> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            let height = '100%'
            if (currentChart.height !== '') {
                height = currentChart.height
            }

            let opt = Object.assign({
                width: currentChart.width,
                height: height,
                showTooltip: true,
                showInfoWindow: true
            }, currentChart.options)

            // fix bug in local
            if (location.origin.startsWith('file:')) {
                opt = Object.assign({
                    icons: {
                        default: {
                            normal: 'https://maps.google.com/mapfiles/ms/micons/red-dot.png',
                            selected: 'https://maps.google.com/mapfiles/ms/micons/blue-dot.png'
                        }
                    }
                }, opt)
            }

            // init only one time
            if (! Map._isInit) {
                Map.init()
            }

             google.charts.setOnLoadCallback(
                 () => {
                    let data = new Data(result)
                    let table = new google.visualization.Map(document.getElementById(currentChart.container.id))
                    table.draw(data.getDataTable(), opt)
                }
            )
            // finish
            resolve()
        })
    }
}

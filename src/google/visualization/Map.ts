import {
    Chart, Logger, MESSAGES,
    SparqlResultInterface
} from '../../sgvizler'

import { Tools } from '../Tools'
import { Data } from '../Data'
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
        return 'fa fa-map'
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
    public draw (result: SparqlResultInterface): Promise<void> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            let height = 500
            if (currentChart.height !== '') {
                height = Tools.decodeFormatSize(currentChart.height)
            }

            let opt = Object.assign({
                showTooltip: false,
                showInfoWindow: true,
                enableScrollWheel: true
            }, currentChart.options)

            // fix the size
            opt = Object.assign(opt, {
                width: Tools.decodeFormatSize(currentChart.width),
                height: height
            })

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
                     try {
                         let messageError = ''
                         let cols = result.head.vars
                         let rows = result.results.bindings
                         let noCols = cols.length
                         let noRows = rows.length

                         let lat
                         let long
                         let description

                         let data = new google.visualization.DataTable()

                         if (noCols <= 2) {
                             messageError = 'Parameters : latitude(xsd:Decimal) longitude(xsd:Decimal) title(xsd:string' +
                                 ' optional) introduction(xsd:string optional) link(IRI optional)'
                         } else {
                             let latitudeCol = 0
                             let longitudeCol = 1
                             let descriptionCol = 2
                             data.addColumn('number', latitudeCol)
                             data.addColumn('number', longitudeCol)

                             if (noCols > 2) {
                                 data.addColumn('string', descriptionCol)
                             }

                             data.addRows(noRows)

                             for (let x = 0; x < noRows; x++) {
                                 lat = parseFloat(rows[x][cols[latitudeCol]].value)
                                 long = parseFloat(rows[x][cols[longitudeCol]].value)
                                 description = ''
                                 if (isNaN(lat) || isNaN(long)) {
                                     messageError = 'Latitude or longitude is not a decimal. Parameters of chart :' +
                                         ' latitude(xsd:Decimal)' +
                                         ' longitude(xsd:Decimal) title(xsd:string' +
                                         ' optional) introduction(xsd:string optional) link(IRI optional). '
                                     break
                                 }
                                 if (noCols >= 6) {
                                     // latitude longitude title text link
                                     let title = rows[x][cols[2]] !== undefined ? rows[x][cols[2]].value : ''
                                     let text = rows[x][cols[3]] !== undefined ? "<p style='margin: 0px'>" + rows[x][cols[3]].value + '</p>' : ''
                                     let link = rows[x][cols[4]] !== undefined ? "<a style='font-size: large;font-style: medium;' href='" + rows[x][cols[4]].value + "' target='_blank'>" + title + '</a>' : title
                                     let img = rows[x][cols[5]] !== undefined ? "<img src='" + rows[x][cols[5]].value + "' style='margin-left:5px;margin-bottom:5px;width:150px;float:right;'/>" : ''

                                     if (rows[x][cols[3]] === undefined || rows[x][cols[3]].value.length === 0) {
                                         description = '<div style="display: flow-root;min-width: 150px;min-height:150px;">' + link + '<div>' + img + '</div></div>'
                                     } else {
                                         description = '<div style="display: flow-root;width: 350px;min-height:150px;">' + link + '<div>' + img + text + '</div></div>'
                                     }

                                     data.setCell(x, latitudeCol, lat)
                                     data.setCell(x, longitudeCol, long)
                                     data.setCell(x, descriptionCol, description)
                                 } else if (noCols === 5) {
                                     // latitude longitude title introduction link
                                     let title = rows[x][cols[2]] !== undefined ? rows[x][cols[2]].value : ''
                                     let text = rows[x][cols[3]] !== undefined ? rows[x][cols[3]].value : ''
                                     let link = rows[x][cols[4]] !== undefined ? "<a href='" + rows[x][cols[4]].value + "'>" + title + '</a>' : title

                                     description = '<b>' + link + '</b><br/>' + text

                                     data.setCell(x, latitudeCol, lat)
                                     data.setCell(x, longitudeCol, long)
                                     data.setCell(x, descriptionCol, description)
                                 } else if (noCols === 4) {
                                     // latitude longitude title introduction
                                     let title = rows[x][cols[2]] !== undefined ? rows[x][cols[2]].value : ''
                                     let text = rows[x][cols[3]] !== undefined ? rows[x][cols[3]].value : ''

                                     description = '<b>' + title + '</b><br/>' + text

                                     data.setCell(x, latitudeCol, lat)
                                     data.setCell(x, longitudeCol, long)
                                     data.setCell(x, descriptionCol, description)
                                 } else if (noCols === 3) {
                                     // latitude longitude title
                                     let title = rows[x][cols[2]] !== undefined ? rows[x][cols[2]].value : ''

                                     description = '<b>' + title + '</br>'

                                     data.setCell(x, latitudeCol, lat)
                                     data.setCell(x, longitudeCol, long)
                                     data.setCell(x, descriptionCol, description)
                                 } else if (noCols === 2) {
                                     // latitude longitude

                                     data.setCell(x, latitudeCol, lat)
                                     data.setCell(x, longitudeCol, long)
                                 }
                             }
                         }
                         if (messageError !== '') {
                             return reject(Error(messageError))
                         }
                        let table = new google.visualization.Map(document.getElementById(currentChart.container.id))
                        table.draw(data, opt)
                     } catch (error) {
                        console.log(error)
                        Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error])
                        Logger.log(currentChart.container,'Chart finished with error : ' + currentChart.container.id)
                    }
                }
            )
            // finish
            return resolve()
        })
    }
}

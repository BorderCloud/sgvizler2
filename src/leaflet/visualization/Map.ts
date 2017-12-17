import {
    Chart,
    SparqlResultInterface,
    Core
} from '../../sgvizler'

import { API } from '../API'
/**
 *
 */
declare let $: any

/**
 *
 */
declare let L: any

/**
 * Todo Table
 * @class leaflet.visualization.Map
 * @tutorial leaflet_visualization_Map
 * @memberof leaflet.visualization
 */
export class Map extends Chart {

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
        return 'leaflet.visualization.Map'
    }

    public get tutorialFilename (): string {
        return 'tutorial-leaflet_visualization_Map.html'
    }

    public constructor () {
        super()
        this.addCss(Core.path + '/lib/leaflet/leaflet.css')
        this.addCss(Core.path + '/lib/leaflet/MarkerCluster.Default.css')

        let dep = this.addScript(Core.path + '/lib/leaflet/leaflet-src.js')
        this.addScript(Core.path + '/lib/leaflet/leaflet.markercluster-src.js',dep)
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
            let messageError = ''
            let cols = result.head.vars
            let rows = result.results.bindings
            let noCols = cols.length
            let noRows = rows.length

            let map
            let height = '180px'
            let idChart = currentChart.container.id + '-leaflet'
            let element = document.getElementById(currentChart.container.id)
            let markerArray: Array<any> = [] // create new markers array
            let group
            let markers
            let marker
            let lat
            let long

            if (currentChart.height !== '') {
                height = currentChart.height
            }

            let opt = Object.assign({
                width: currentChart.width,
                height: height,
                showTooltip: true,
                showInfoWindow: true
            }, currentChart.options)

            if (element) {
                element.innerHTML = "<div id='" + idChart + "' style='width: " + opt.width + '; height: ' + opt.height + ";'></div>"

                let osmLayer = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox.streets',
                    accessToken: API.osmAccessToken
                })

                map = L.map(idChart,{zoom: 13,layers: [osmLayer]})

                // todo insert option
                markers = L.markerClusterGroup({
                    chunkedLoading: true,
                    spiderfyOnMaxZoom: true,
                    showCoverageOnHover: true,
                    zoomToBoundsOnClick: true
                 })

                if (noCols <= 2) {
                    messageError = 'Parameters : latitude(xsd:Decimal) longitude(xsd:Decimal) title(xsd:string' +
                        ' optional) introduction(xsd:string optional) link(IRI optional)'
                }else {
                    for (let row of rows) {
                        lat = parseFloat(row[cols[0]].value)
                        long = parseFloat(row[cols[1]].value)
                        if (isNaN(lat) || isNaN(long)) {
                            messageError = 'Latitude or longitude is not a decimal. Parameters of chart :' +
                                ' latitude(xsd:Decimal)' +
                                ' longitude(xsd:Decimal) title(xsd:string' +
                                ' optional) introduction(xsd:string optional) link(IRI optional). '
                            break
                        }
                        if (noCols >= 6) {
                            // latitude longitude title text link
                            let title = row[cols[2]] !== undefined ? row[cols[2]].value : ''
                            let text = row[cols[3]] !== undefined ? row[cols[3]].value : ''
                            let link = row[cols[4]] !== undefined ? "<a href='" + row[cols[4]].value + "' target='_blank'>" + title + '</a><br/>' : title
                            let img = row[cols[5]] !== undefined ? "<div ' style='width:150px;height:150px;float:left<br/>;' ><img src='" + row[cols[5]].value + "' style='max-width:150px;height:150px;float:right;'/></div>" : ''

                            marker = L.marker([parseFloat(row[cols[0]].value), parseFloat(row[cols[1]].value)])
                            marker.bindPopup('<div style="display: flow-root;"><b>' + link + '</b>' + img + '<br/>' + text + '<br></div>')
                        } else if (noCols === 5) {
                            // latitude longitude title introduction link
                            let title = row[cols[2]] !== undefined ? row[cols[2]].value : ''
                            let text = row[cols[3]] !== undefined ? row[cols[3]].value : ''
                            let link = row[cols[4]] !== undefined ? "<a href='" + row[cols[4]].value + "'>" + title + '</a>' : title

                            marker = L.marker([parseFloat(row[cols[0]].value), parseFloat(row[cols[1]].value)])
                            marker.bindPopup('<b>' + link + '</b><br/>' + text )
                        } else if (noCols === 4) {
                            // latitude longitude title introduction
                            let title = row[cols[2]] !== undefined ? row[cols[2]].value : ''
                            let text = row[cols[3]] !== undefined ? row[cols[3]].value : ''

                            marker = L.marker([parseFloat(row[cols[0]].value), parseFloat(row[cols[1]].value)])
                            marker.bindPopup('<b>' + title + '</b><br/>' + text )
                        } else if (noCols === 3) {
                            // latitude longitude title
                            let title = row[cols[2]] !== undefined ? row[cols[2]].value : ''

                            marker = L.marker([parseFloat(row[cols[0]].value), parseFloat(row[cols[1]].value)])
                            marker.bindPopup('<b>' + title + '</br>')
                        } else if (noCols === 2) {
                            // latitude longitude
                            marker = L.marker([parseFloat(row[cols[0]].value), parseFloat(row[cols[1]].value)])
                            marker.addTo(map)
                        }
                        markers.addLayer(marker)
                        markerArray.push(marker)
                    }
                }

                if (messageError !== '') {
                    return reject(Error(messageError))
                }

                map.addLayer(markers)

                // zoom on the markers
                group = L.featureGroup(markerArray)
                map.fitBounds(group.getBounds())
                // finish
                return resolve()
            }
        })
    }
}

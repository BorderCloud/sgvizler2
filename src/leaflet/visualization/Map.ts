import {
    Chart,
    SparqlResultInterface,
    Core,
    WktLiteral, PointWktLiteral, PolygonWktLiteral, LinestringWktLiteral, EnvelopeWktLiteral
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
        return 'fa fa-map'
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

        let dep = this.addScript(Core.path + '/lib/leaflet/leaflet.js')
        this.addScript(Core.path + '/lib/leaflet/leaflet.markercluster.js',dep)
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
            let messageErrorParameters = 'Incorrect parameters. Parameters of chart :' +
                ' [ wktLiteral(geosparql:wktLiteral) | latitude(xsd:Decimal) longitude(xsd:Decimal)] '+
                ' title(xsd:string optional) introduction(xsd:string optional) link(IRI optional) image(IRI optional). '
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
            let wktLiteralStr
            let wktLiteralType
            let wktLiteral

            if (currentChart.height !== '') {
                height = currentChart.height
            }

            let opt = Object.assign({
                width: currentChart.width,
                height: height,
                showTooltip: true,
                showInfoWindow: true,
                tileLayerTemplate: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
                tileLayerAttribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
                tileLayerId: 'mapbox/streets-v11',
                tileLayerAccessToken: API.osmAccessToken,
                tileLayerTileSize: 512,
                tileLayerZoomOffset: -1,
                tileLayerTms: false,
                tileLayerZoom: 13
            }, currentChart.options)

            if (element) {
                element.innerHTML = "<div id='" + idChart + "' style='width: " + opt.width + '; height: ' + opt.height + ";'></div>"

                let tileLayer = new L.tileLayer(opt.tileLayerTemplate, {
                    attribution: opt.tileLayerAttribution,
                    tileSize: opt.tileLayerTileSize,
                    zoomOffset: opt.tileLayerZoomOffset,
                    maxZoom: 18,
                    id: opt.tileLayerId,
                    accessToken: opt.tileLayerAccessToken,
                    tms: opt.tileLayerTms,
                    zoom: opt.tileZoom,
                })

                //map = L.map(idChart, {zoom: 13, layers: [osmLayer]})
                map = L.map(idChart, {layers: [tileLayer]})

                // todo insert option
                markers = L.markerClusterGroup({
                    chunkedLoading: true,
                    spiderfyOnMaxZoom: true,
                    showCoverageOnHover: true,
                    zoomToBoundsOnClick: true
                })

                if (noCols < 1) {
                    messageError = messageErrorParameters
                } else {
                    for (let row of rows) {
                        wktLiteralType = row[cols[0]].datatype
                        wktLiteralStr = row[cols[0]].value
                        lat = parseFloat(row[cols[0]].value)
                        long = parseFloat(row[cols[1]].value)
                        if (wktLiteralType == "http://www.opengis.net/ont/geosparql#wktLiteral") {
                            wktLiteral = WktLiteral.create(wktLiteralStr);
                            if (wktLiteral instanceof PointWktLiteral) {
                                lat = wktLiteral.lat;
                                long = wktLiteral.long;

                                marker = L.marker([lat, long])
                                marker = Map.readOtherParametersWithPoint(row, cols.slice(1), marker);

                                markers.addLayer(marker)
                                markerArray.push(marker)
                            } else if (wktLiteral instanceof LinestringWktLiteral) {
                            } else if (wktLiteral instanceof EnvelopeWktLiteral) {
                            } else if (wktLiteral instanceof PolygonWktLiteral) {
                            } else {
                                messageError = 'This shape of wktLiteral is unknown. You can create an issue in the project Sgvizler2.';
                            }
                        } else if (!isNaN(lat) && !isNaN(long)) {
                            marker = L.marker([lat, long])
                            marker = Map.readOtherParametersWithPoint(row, cols.slice(2), marker);

                            markers.addLayer(marker)
                            markerArray.push(marker)
                        } else {
                            messageError = messageErrorParameters
                        }
                    }
                }

                if (messageError !== '') {
                    return reject(Error(messageError))
                }

                if (noRows > 0) {
                    map.addLayer(markers)
                    // zoom on the markers
                    group = L.featureGroup(markerArray)
                    map.fitBounds(group.getBounds())
                } else {
                    map.fitWorld({ reset: true }).zoomIn()
                }
                // finish
                return resolve()
            }
        })
    }

    private static readOtherParametersWithPoint(row: any, cols: any, marker: any) {
        const noCols = cols.length;
        if (noCols == 4) {
            // latitude longitude title text link
            let title = row[cols[0]] !== undefined ? row[cols[0]].value : ''
            let text = row[cols[1]] !== undefined ? "<p style='margin: 0px'>" + row[cols[1]].value + '</p>' : ''
            let link = row[cols[2]] !== undefined ? "<a style='font-size: large;font-style: normal;' href='" + row[cols[2]].value + "' target='_blank'>" + title + '</a>' : title
            let img = row[cols[3]] !== undefined ? "<img src='" + row[cols[3]].value + "' style='margin-left:5px;margin-bottom:5px;width:150px;float:right;'/>" : ''
            if (row[cols[3]] === undefined || row[cols[3]].value.length === 0) {
                marker.bindPopup('<div style="display: flow-root;min-width: 150px;min-height:150px;">' + link + '<div>' + img + '</div></div>')
            } else {
                marker.bindPopup('<div style="display: flow-root;min-height:150px;">' + link + '<div>' + img + text + '</div></div>')
            }
        } else if (noCols === 3) {
            // latitude longitude title introduction link
            let title = row[cols[0]] !== undefined ? row[cols[0]].value : ''
            let text = row[cols[1]] !== undefined ? row[cols[1]].value : ''
            let link = row[cols[2]] !== undefined ? "<a href='" + row[cols[2]].value + "'>" + title + '</a>' : title
            marker.bindPopup('<b>' + link + '</b><br/>' + text)
        } else if (noCols === 2) {
            // latitude longitude title introduction
            let title = row[cols[0]] !== undefined ? row[cols[0]].value : ''
            let text = row[cols[1]] !== undefined ? row[cols[1]].value : ''
            marker.bindPopup('<b>' + title + '</b><br/>' + text)
        } else if (noCols === 1) {
            // latitude longitude title
            let title = row[cols[0]] !== undefined ? row[cols[0]].value : ''
            marker.bindPopup('<b>' + title + '</br>')
        }
        return marker;
    }
}

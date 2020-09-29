import {
    Chart,
    SparqlResultInterface,
    Core,
    WktLiteral,
    PointWktLiteral,
    PolygonWktLiteral,
    MultiPolygonWktLiteral,
    LinestringWktLiteral,
    EnvelopeWktLiteral,
    ErrorWktLiteral,
    SparqlTools, SparqlError
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
        this.addCss(Core.path + 'lib/leaflet/leaflet.css')
        this.addCss(Core.path + 'lib/leaflet/MarkerCluster.Default.css')

        let dep = this.addScript(Core.path + 'lib/leaflet/leaflet.js')
        this.addScript(Core.path + 'lib/leaflet/leaflet.markercluster.js',dep)
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
            let groupArray: Array<any> = [] // create new markers array
            let group
            let markers
            let marker
            let lat
            let long
            let wktLiteralStr
            let wktLiteralType
            let wktLiteral
            let tileAttributionFinal
            let polylinelatlngs
            let polyline
            let rectangleBounds
            let rectangle
            let polygon
            let pointWktLiteral
            let linestringWktLiteral
            let envelopeWktLiteral
            let polygonWktLiteral
            let multipolygonWktLiteral
            let polygonPointslatlngs
            let mapUri
            let geoJSON

            if (currentChart.height !== '') {
                height = currentChart.height
            }

            let opt = Object.assign({
                width: currentChart.width,
                height: height,
                // showTooltip: true,
                // showInfoWindow: true,
                tileLayerTemplate: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
                tileLayerAttributionHTML: '© <a href="https://www.mapbox.com/about/maps/" target=\'_blank\'>Mapbox</a> © <a href="http://www.openstreetmap.org/copyright" target=\'_blank\'>OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
                tileLayerAttribution: null,
                tileLayerAttributionLink: null,
                tileLayerId: 'mapbox/streets-v11',
                tileLayerAccessToken: API.osmAccessToken,
                tileLayerTileSize: 512,
                tileLayerZoomOffset: -1,
                tileLayerTms: false,
                tileLayerZoom: 13
            }, currentChart.options)

            if (element) {
                element.innerHTML = "<div id='" + idChart + "' style='width: " + opt.width + '; height: ' + opt.height + ";'></div>"

                if(opt.tileLayerAttribution != null){
                    if(opt.tileLayerAttributionLink != null){
                        tileAttributionFinal = "<a href=\""+opt.tileLayerAttributionLink+"\" target='_blank'>"+opt.tileLayerAttribution+"</a>"
                    }else{
                        tileAttributionFinal = opt.tileLayerAttribution
                    }
                }else{
                    tileAttributionFinal = opt.tileLayerAttributionHTML;
                }
                let tileLayer = new L.tileLayer(opt.tileLayerTemplate, {
                    attribution: tileAttributionFinal,
                    tileSize: opt.tileLayerTileSize,
                    zoomOffset: opt.tileLayerZoomOffset,
                    maxZoom: 18,
                    id: opt.tileLayerId,
                    accessToken: opt.tileLayerAccessToken,
                    tms: opt.tileLayerTms,
                    zoom: opt.tileZoom,
                })

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
                        //check geoJSON
                        if(row[cols[0]].type === "uri"){
                            mapUri = row[cols[0]].value
                            let xhr = new XMLHttpRequest()
                            //mapUri = "http://commons.wikimedia.org/data/main/Data:Paris.map"
                            //mapUri = "https://gist.githubusercontent.com/wavded/1200773/raw/e122cf709898c09758aecfef349964a8d73a83f3/sample.json"
                            xhr.open('GET',mapUri,false)
                            xhr.send(null);

                            if (xhr.status === 200) {
                                // @ts-ignore
                                geoJSON = L.geoJSON(JSON.parse(xhr.response))
                                geoJSON.addTo(map);
                                groupArray.push(geoJSON)
                            }
                            continue
                        }

                        //check  wktLiteral
                        wktLiteralType = row[cols[0]].datatype
                        if (
                            wktLiteralType == "http://www.opengis.net/ont/geosparql#wktLiteral"
                            || wktLiteralType == "http://www.openlinksw.com/schemas/virtrdf#Geometry" // bug in Virtuoso 7
                        ) {
                            wktLiteralStr = row[cols[0]].value
                            try{
                                wktLiteral = WktLiteral.create(wktLiteralStr)
                                if (wktLiteral instanceof PointWktLiteral) {
                                    pointWktLiteral = <PointWktLiteral> wktLiteral
                                    lat = wktLiteral.lat;
                                    long = wktLiteral.long;

                                    marker = L.marker([lat, long])

                                    marker = Map.readOtherParametersWithPoint(row, cols.slice(1), marker)
                                    markers.addLayer(marker)
                                    groupArray.push(marker)
                                } else if (wktLiteral instanceof LinestringWktLiteral) {
                                    linestringWktLiteral = <LinestringWktLiteral> wktLiteral

                                    polylinelatlngs = [];
                                    for (let point of linestringWktLiteral.points) {
                                        polylinelatlngs.push([point.lat,point.long])
                                    }

                                    polyline = L.polyline(polylinelatlngs, {color: 'red'})
                                    polyline = Map.readOtherParametersWithPoint(row, cols.slice(1), polyline)
                                    polyline.addTo(map)
                                    groupArray.push(polyline)
                                } else if (wktLiteral instanceof EnvelopeWktLiteral) {
                                    envelopeWktLiteral = <EnvelopeWktLiteral> wktLiteral

                                    rectangleBounds = [[envelopeWktLiteral.minLat,envelopeWktLiteral.minLong], [envelopeWktLiteral.maxLat,envelopeWktLiteral.maxLong]];

                                    rectangle = L.rectangle(rectangleBounds, {color: "#ff7800", weight: 1})
                                    rectangle = Map.readOtherParametersWithPoint(row, cols.slice(1), rectangle)
                                    rectangle.addTo(map)
                                    groupArray.push(rectangle)
                                } else if (wktLiteral instanceof PolygonWktLiteral) {
                                    polygonWktLiteral = <PolygonWktLiteral> wktLiteral
                                    polygonPointslatlngs = [];

                                    for (let point of polygonWktLiteral.points) {
                                        polygonPointslatlngs.push([point.lat,point.long])
                                    }
                                    polygon = L.polygon(polygonPointslatlngs, {color: 'green', weight: 1})

                                    polygon = Map.readOtherParametersWithPoint(row, cols.slice(1), polygon)
                                    polygon.addTo(map)
                                    groupArray.push(polygon)
                                } else if (wktLiteral instanceof MultiPolygonWktLiteral) {
                                    multipolygonWktLiteral = <MultiPolygonWktLiteral> wktLiteral

                                    for (let polygonWktLiteral of multipolygonWktLiteral.polygons) {
                                        polygonPointslatlngs = [];
                                        for (let point of polygonWktLiteral.points) {
                                            polygonPointslatlngs.push([point.lat, point.long])
                                        }
                                        polygon = L.polygon(polygonPointslatlngs, {color: 'green', weight: 1})
                                        polygon = Map.readOtherParametersWithPoint(row, cols.slice(1), polygon)
                                        polygon.addTo(map)
                                        groupArray.push(polygon)
                                    }
                                }
                            }catch (e) {
                                if (e instanceof ErrorWktLiteral) {
                                    messageError = e.message
                                    // console.log("ERROR SGVIZLER2: wktLiteral: "+  e.message)
                                    // continue //not fail
                                } else {
                                    throw e
                                }
                            }
                        } else {
                            lat = parseFloat(row[cols[0]].value)
                            long = parseFloat(row[cols[1]].value)
                            if (!isNaN(lat) && !isNaN(long)) {
                                marker = L.marker([lat, long])
                                marker = Map.readOtherParametersWithPoint(row, cols.slice(2), marker);

                                markers.addLayer(marker)
                                groupArray.push(marker)
                            } else {
                                messageError = messageErrorParameters
                            }
                        }
                    }
                }

                if (messageError !== '') {
                    return reject(Error(messageError))
                }

                if (noRows > 0) {
                    map.addLayer(markers)
                    // zoom on the markers
                    group = L.featureGroup(groupArray)
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
        const title = row[cols[0]] !== undefined ? row[cols[0]].value : undefined
        const text = row[cols[1]] !== undefined ?  row[cols[1]].value : undefined
        const link = row[cols[2]] !== undefined ? row[cols[2]].value : undefined
        const img = row[cols[3]] !== undefined ? row[cols[3]].value : undefined

        if (
            title === undefined
            && text === undefined
            && link === undefined
            && img === undefined
        ){
            return marker
        }

        if ( img !== undefined ){
            if (
                title !== undefined
                && text !== undefined
                && link !== undefined
            ) {
                marker.bindPopup(
                    '<div style="display: flow-root;min-height:150px;">' +
                    "<a style='font-size: large;font-style: normal;' href='" + link + "' target='_blank'>" + title + '</a>' +
                    '<div style="display: table-cell;vertical-align: top">' +
                    "<p style='margin: 0px'>" + text + '</p>' +
                    '</div>'+
                    '<div style="display: table-cell;">' +
                    "<a href='" + link + "' target='_blank'><img src='" + img + "' style='margin-left:5px;margin-bottom:5px;width:150px;float:right;'/></a>" +
                    '</div>'+
                    '</div>'
                )
            } else if (
                title !== undefined
                && text !== undefined
            ) {
                marker.bindPopup(
                    '<div style="display: flow-root;min-height:150px;min-height:150px;">' +
                    "<span style='font-size: large;font-style: normal;'>" + title + '</span>' +
                    '<div style="display: table-cell;vertical-align: top">' +
                    "<p style='margin: 0px'>" + text + '</p>' +
                    '</div>'+
                    '<div style="display: table-cell;">' +
                    "<a href='" + img + "' target='_blank'><img src='" + img + "' style='margin-left:5px;margin-bottom:5px;width:150px;float:right;'/></a>" +
                    '</div>'+
                    '</div>'
                )
            } else if (
                title !== undefined
                && link !== undefined
            ) {
                marker.bindPopup(
                    '<div style="display: flow-root;min-height:150px;min-height:150px;">' +
                    "<a style='font-size: large;font-style: normal;' href='" + link + "' target='_blank'>" + title + '</a>' +
                    '<div style="display: table-cell;">' +
                    "<a href='" + link + "' target='_blank'><img src='" + img + "' style='margin-left:5px;margin-bottom:5px;width:150px;float:right;'/></a>" +
                    '</div>'+
                    '</div>'
                )
            }else if (
                title !== undefined
            ) {
                marker.bindPopup(
                    '<div style="display: flow-root;min-height:150px;min-height:150px;">' +
                    "<span style='font-size: large;font-style: normal;'>" + title + '</span>' +
                    '<div style="display: table-cell;">' +
                    "<a href='" + img + "' target='_blank'><img src='" + img + "' style='margin-left:5px;margin-bottom:5px;width:150px;float:right;'/></a>" +
                    '</div>'+
                    '</div>'
                )
            }else  {
                marker.bindPopup(
                    '<div style="display: table-cell;">' +
                    "<a href='" + img + "' target='_blank'><img src='" + img + "' style='margin-left:5px;margin-bottom:5px;width:150px;float:right;'/></a>" +
                    '</div>'
                )
            }
        }else{
            if (
                title !== undefined
                && text !== undefined
                && link !== undefined
            ) {
                marker.bindPopup(
                    "<a style='font-size: large;font-style: normal;' href='" + link + "' target='_blank'>" + title + '</a>' +
                    "<p style='margin: 0px'>" + text + '</p>'
                )
            } else if (
                title !== undefined
                && text !== undefined
            ) {
                marker.bindPopup(
                    "<span style='font-size: large;font-style: normal;'>" + title + '</span>' +
                    "<p style='margin: 0px'>" + text + '</p>'
                )
            } else if (
                title !== undefined
                && link !== undefined
            ) {
                marker.bindPopup(
                    "<a style='font-size: large;font-style: normal;' href='" + link + "' target='_blank'>" + title + '</a>'
                )

            }else if (
                title !== undefined
            ) {
                marker.bindPopup(
                    "<span style='font-size: large;font-style: normal;'>" + title + '</span>'
                )
            }
        }
        return marker;
    }
}

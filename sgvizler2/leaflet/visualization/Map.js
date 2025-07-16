import { __awaiter } from "tslib";
import { Chart, Core, WktLiteral, PointWktLiteral, PolygonWktLiteral, MultiPolygonWktLiteral, LinestringWktLiteral, EnvelopeWktLiteral, ErrorWktLiteral } from '../../sgvizler';
import { API } from '../API';
/**
 * Todo Table
 * @class leaflet.visualization.Map
 * @tutorial leaflet_visualization_Map
 * @memberof leaflet.visualization
 */
export class Map extends Chart {
    get icon() {
        return 'fa fa-map';
    }
    get label() {
        return 'Map';
    }
    get subtext() {
        return 'Map';
    }
    get classFullName() {
        return 'leaflet.visualization.Map';
    }
    get tutorialFilename() {
        return 'tutorial-leaflet_visualization_Map.html';
    }
    constructor() {
        super();
        this.addCss(Core.path + 'lib/leaflet/leaflet.css');
        this.addCss(Core.path + 'lib/leaflet/MarkerCluster.Default.css');
        let dep = this.addScript(Core.path + 'lib/leaflet/leaflet.js');
        this.addScript(Core.path + 'lib/leaflet/leaflet.markercluster.js', dep);
    }
    /**
     * Make a Google map
     * todo
     * @memberOf Map
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentChart = this;
            let cols = result.head.vars;
            let rows = result.results.bindings;
            let noCols = cols.length;
            let noRows = rows.length;
            for (let row of rows) {
                //check geoJSON
                if (row[cols[0]].type === "uri") {
                    let mapUri = row[cols[0]].value;
                    if (mapUri.indexOf('commons.wikimedia.org/data/main/') === -1) {
                        //         //mapUri = "https://gist.githubusercontent.com/wavded/1200773/raw/e122cf709898c09758aecfef349964a8d73a83f3/sample.json"
                        try {
                            let result = yield Map.makeRequest("GET", mapUri);
                            row[cols[0]].value = JSON.parse(result);
                            row[cols[0]].type = "geoJSON";
                        }
                        catch (error) {
                            console.error(error);
                        }
                    }
                    else {
                        //         //mapUri = "http://commons.wikimedia.org/data/main/Data:Paris.map"
                        //         //https://commons.wikimedia.org/w/api.php?format=json&formatversion=2&action=jsondata&title=Paris.map&origin=*
                        try {
                            let urlRequest = "https://commons.wikimedia.org/w/api.php?format=json&formatversion=2&action=jsondata&title="
                                + mapUri.substring(mapUri.lastIndexOf('/Data:') + 6)
                                + "&origin=*";
                            let result = yield Map.makeRequest("GET", urlRequest);
                            let j = JSON.parse(result);
                            row[cols[0]].value = j.jsondata.data;
                            row[cols[0]].type = "geoJSON";
                        }
                        catch (error) {
                            console.error(error);
                        }
                    }
                }
            }
            return new Promise(function (resolve, reject) {
                let messageError = '';
                let messageErrorParameters = 'Incorrect parameters. Parameters of chart :' +
                    ' [ wktLiteral(geosparql:wktLiteral) | latitude(xsd:Decimal) longitude(xsd:Decimal)] ' +
                    ' title(xsd:string optional) introduction(xsd:string optional) link(IRI optional) image(IRI optional). ';
                let map;
                let height = '180px';
                let idChart = currentChart.container.id + '-leaflet';
                let element = document.getElementById(currentChart.container.id);
                let groupArray = []; // create new markers array
                let group;
                let markers;
                let marker;
                let lat;
                let long;
                let wktLiteralStr;
                let wktLiteralType;
                let wktLiteral;
                let tileAttributionFinal;
                let polylinelatlngs;
                let polyline;
                let rectangleBounds;
                let rectangle;
                let polygon;
                let pointWktLiteral;
                let linestringWktLiteral;
                let envelopeWktLiteral;
                let polygonWktLiteral;
                let multipolygonWktLiteral;
                let polygonPointslatlngs;
                let mapUri;
                let geoJSON;
                if (currentChart.height !== '') {
                    height = currentChart.height;
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
                }, currentChart.options);
                if (element) {
                    element.innerHTML = "<div id='" + idChart + "' style='width: " + opt.width + '; height: ' + opt.height + ";'></div>";
                    if (opt.tileLayerAttribution != null) {
                        if (opt.tileLayerAttributionLink != null) {
                            tileAttributionFinal = "<a href=\"" + opt.tileLayerAttributionLink + "\" target='_blank'>" + opt.tileLayerAttribution + "</a>";
                        }
                        else {
                            tileAttributionFinal = opt.tileLayerAttribution;
                        }
                    }
                    else {
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
                    });
                    map = L.map(idChart, { layers: [tileLayer] });
                    // todo insert option
                    markers = L.markerClusterGroup({
                        chunkedLoading: true,
                        spiderfyOnMaxZoom: true,
                        showCoverageOnHover: true,
                        zoomToBoundsOnClick: true
                    });
                    if (noCols < 1) {
                        messageError = messageErrorParameters;
                    }
                    else {
                        for (let row of rows) {
                            if (row[cols[0]].type === "geoJSON") {
                                geoJSON = L.geoJSON(row[cols[0]].value);
                                geoJSON.addTo(map);
                                groupArray.push(geoJSON);
                                continue;
                            }
                            //check  wktLiteral
                            wktLiteralType = row[cols[0]].datatype;
                            if (wktLiteralType == "http://www.opengis.net/ont/geosparql#wktLiteral"
                                || wktLiteralType == "http://www.openlinksw.com/schemas/virtrdf#Geometry" // bug in Virtuoso 7
                            ) {
                                wktLiteralStr = row[cols[0]].value;
                                try {
                                    wktLiteral = WktLiteral.create(wktLiteralStr);
                                    if (wktLiteral instanceof PointWktLiteral) {
                                        pointWktLiteral = wktLiteral;
                                        lat = wktLiteral.lat;
                                        long = wktLiteral.long;
                                        marker = L.marker([lat, long]);
                                        marker = Map.readOtherParametersWithPoint(row, cols.slice(1), marker);
                                        markers.addLayer(marker);
                                        groupArray.push(marker);
                                    }
                                    else if (wktLiteral instanceof LinestringWktLiteral) {
                                        linestringWktLiteral = wktLiteral;
                                        polylinelatlngs = [];
                                        for (let point of linestringWktLiteral.points) {
                                            polylinelatlngs.push([point.lat, point.long]);
                                        }
                                        polyline = L.polyline(polylinelatlngs, { color: 'red' });
                                        polyline = Map.readOtherParametersWithPoint(row, cols.slice(1), polyline);
                                        polyline.addTo(map);
                                        groupArray.push(polyline);
                                    }
                                    else if (wktLiteral instanceof EnvelopeWktLiteral) {
                                        envelopeWktLiteral = wktLiteral;
                                        rectangleBounds = [[envelopeWktLiteral.minLat, envelopeWktLiteral.minLong], [envelopeWktLiteral.maxLat, envelopeWktLiteral.maxLong]];
                                        rectangle = L.rectangle(rectangleBounds, { color: "#ff7800", weight: 1 });
                                        rectangle = Map.readOtherParametersWithPoint(row, cols.slice(1), rectangle);
                                        rectangle.addTo(map);
                                        groupArray.push(rectangle);
                                    }
                                    else if (wktLiteral instanceof PolygonWktLiteral) {
                                        polygonWktLiteral = wktLiteral;
                                        polygonPointslatlngs = [];
                                        for (let point of polygonWktLiteral.points) {
                                            polygonPointslatlngs.push([point.lat, point.long]);
                                        }
                                        polygon = L.polygon(polygonPointslatlngs, { color: 'green', weight: 1 });
                                        polygon = Map.readOtherParametersWithPoint(row, cols.slice(1), polygon);
                                        polygon.addTo(map);
                                        groupArray.push(polygon);
                                    }
                                    else if (wktLiteral instanceof MultiPolygonWktLiteral) {
                                        multipolygonWktLiteral = wktLiteral;
                                        for (let polygonWktLiteral of multipolygonWktLiteral.polygons) {
                                            polygonPointslatlngs = [];
                                            for (let point of polygonWktLiteral.points) {
                                                polygonPointslatlngs.push([point.lat, point.long]);
                                            }
                                            polygon = L.polygon(polygonPointslatlngs, { color: 'green', weight: 1 });
                                            polygon = Map.readOtherParametersWithPoint(row, cols.slice(1), polygon);
                                            polygon.addTo(map);
                                            groupArray.push(polygon);
                                        }
                                    }
                                }
                                catch (e) {
                                    if (e instanceof ErrorWktLiteral) {
                                        messageError = e.message;
                                        // console.log("ERROR SGVIZLER2: wktLiteral: "+  e.message)
                                        // continue //not fail
                                    }
                                    else {
                                        throw e;
                                    }
                                }
                            }
                            else {
                                lat = parseFloat(row[cols[0]].value);
                                long = parseFloat(row[cols[1]].value);
                                if (!isNaN(lat) && !isNaN(long)) {
                                    marker = L.marker([lat, long]);
                                    marker = Map.readOtherParametersWithPoint(row, cols.slice(2), marker);
                                    markers.addLayer(marker);
                                    groupArray.push(marker);
                                }
                                else {
                                    messageError = messageErrorParameters;
                                }
                            }
                        }
                    }
                    if (messageError !== '') {
                        return reject(Error(messageError));
                    }
                    if (noRows > 0) {
                        if (groupArray.length > 0) {
                            map.addLayer(markers);
                            // zoom on the markers
                            group = L.featureGroup(groupArray);
                            map.fitBounds(group.getBounds());
                        }
                        else {
                            map.fitWorld({ reset: true }).zoomIn();
                        }
                    }
                    else {
                        map.fitWorld({ reset: true }).zoomIn();
                    }
                    // finish
                    return resolve();
                }
            });
        });
    }
    static readOtherParametersWithPoint(row, cols, marker) {
        const title = row[cols[0]] !== undefined ? row[cols[0]].value : undefined;
        const text = row[cols[1]] !== undefined ? row[cols[1]].value : undefined;
        const link = row[cols[2]] !== undefined ? row[cols[2]].value : undefined;
        const img = row[cols[3]] !== undefined ? row[cols[3]].value : undefined;
        if (title === undefined
            && text === undefined
            && link === undefined
            && img === undefined) {
            return marker;
        }
        if (img !== undefined) {
            if (title !== undefined
                && text !== undefined
                && link !== undefined) {
                marker.bindPopup('<div style="display: flow-root;min-height:150px;">' +
                    "<a style='font-size: large;font-style: normal;' href='" + link + "' target='_blank'>" + title + '</a>' +
                    '<div style="display: table-cell;vertical-align: top">' +
                    "<p style='margin: 0px'>" + text + '</p>' +
                    '</div>' +
                    '<div style="display: table-cell;">' +
                    "<a href='" + link + "' target='_blank'><img src='" + img + "' style='margin-left:5px;margin-bottom:5px;width:150px;float:right;'/></a>" +
                    '</div>' +
                    '</div>');
            }
            else if (title !== undefined
                && text !== undefined) {
                marker.bindPopup('<div style="display: flow-root;min-height:150px;min-height:150px;">' +
                    "<span style='font-size: large;font-style: normal;'>" + title + '</span>' +
                    '<div style="display: table-cell;vertical-align: top">' +
                    "<p style='margin: 0px'>" + text + '</p>' +
                    '</div>' +
                    '<div style="display: table-cell;">' +
                    "<a href='" + img + "' target='_blank'><img src='" + img + "' style='margin-left:5px;margin-bottom:5px;width:150px;float:right;'/></a>" +
                    '</div>' +
                    '</div>');
            }
            else if (title !== undefined
                && link !== undefined) {
                marker.bindPopup('<div style="display: flow-root;min-height:150px;min-height:150px;">' +
                    "<a style='font-size: large;font-style: normal;' href='" + link + "' target='_blank'>" + title + '</a>' +
                    '<div style="display: table-cell;">' +
                    "<a href='" + link + "' target='_blank'><img src='" + img + "' style='margin-left:5px;margin-bottom:5px;width:150px;float:right;'/></a>" +
                    '</div>' +
                    '</div>');
            }
            else if (title !== undefined) {
                marker.bindPopup('<div style="display: flow-root;min-height:150px;min-height:150px;">' +
                    "<span style='font-size: large;font-style: normal;'>" + title + '</span>' +
                    '<div style="display: table-cell;">' +
                    "<a href='" + img + "' target='_blank'><img src='" + img + "' style='margin-left:5px;margin-bottom:5px;width:150px;float:right;'/></a>" +
                    '</div>' +
                    '</div>');
            }
            else {
                marker.bindPopup('<div style="display: table-cell;">' +
                    "<a href='" + img + "' target='_blank'><img src='" + img + "' style='margin-left:5px;margin-bottom:5px;width:150px;float:right;'/></a>" +
                    '</div>');
            }
        }
        else {
            if (title !== undefined
                && text !== undefined
                && link !== undefined) {
                marker.bindPopup("<a style='font-size: large;font-style: normal;' href='" + link + "' target='_blank'>" + title + '</a>' +
                    "<p style='margin: 0px'>" + text + '</p>');
            }
            else if (title !== undefined
                && text !== undefined) {
                marker.bindPopup("<span style='font-size: large;font-style: normal;'>" + title + '</span>' +
                    "<p style='margin: 0px'>" + text + '</p>');
            }
            else if (title !== undefined
                && link !== undefined) {
                marker.bindPopup("<a style='font-size: large;font-style: normal;' href='" + link + "' target='_blank'>" + title + '</a>');
            }
            else if (title !== undefined) {
                marker.bindPopup("<span style='font-size: large;font-style: normal;'>" + title + '</span>');
            }
        }
        return marker;
    }
    static makeRequest(method, url) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                }
                else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xlYWZsZXQvdmlzdWFsaXphdGlvbi9NYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDSCxLQUFLLEVBRUwsSUFBSSxFQUNKLFVBQVUsRUFDVixlQUFlLEVBQ2YsaUJBQWlCLEVBQ2pCLHNCQUFzQixFQUN0QixvQkFBb0IsRUFDcEIsa0JBQWtCLEVBQ2xCLGVBQWUsRUFFbEIsTUFBTSxnQkFBZ0IsQ0FBQTtBQUV2QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBVzVCOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLEdBQUksU0FBUSxLQUFLO0lBRTFCLElBQVcsSUFBSTtRQUNYLE9BQU8sV0FBVyxDQUFBO0lBQ3RCLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDWixPQUFPLEtBQUssQ0FBQTtJQUNoQixDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2QsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQUVELElBQVcsYUFBYTtRQUNwQixPQUFPLDJCQUEyQixDQUFBO0lBQ3RDLENBQUM7SUFFRCxJQUFXLGdCQUFnQjtRQUN2QixPQUFPLHlDQUF5QyxDQUFBO0lBQ3BELENBQUM7SUFFRDtRQUNJLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLHlCQUF5QixDQUFDLENBQUE7UUFDbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLHVDQUF1QyxDQUFDLENBQUE7UUFFaEUsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLHdCQUF3QixDQUFDLENBQUE7UUFDOUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLHNDQUFzQyxFQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzFFLENBQUM7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
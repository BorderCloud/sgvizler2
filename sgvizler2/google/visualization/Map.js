import { Chart, Logger, MESSAGES } from '../../sgvizler';
import { Tools } from '../Tools';
import { API } from '../API';
/**
 * Todo Table
 * @class google.visualization.Map
 * @tutorial google_visualization_Map
 * @memberof google.visualization
 */
export class Map extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['map'], mapsApiKey: API.key });
        Map._isInit = true;
    }
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
        return 'google.visualization.Map';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_Map.html';
    }
    /**
     * Make a Google map
     * todo
     * @memberOf Map
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
                showTooltip: false,
                showInfoWindow: true,
                enableScrollWheel: true
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools.decodeFormatSize(currentChart.width),
                height: height
            });
            // fix bug in local
            if (location.origin.startsWith('file:')) {
                opt = Object.assign({
                    icons: {
                        default: {
                            normal: 'https://maps.google.com/mapfiles/ms/micons/red-dot.png',
                            selected: 'https://maps.google.com/mapfiles/ms/micons/blue-dot.png'
                        }
                    }
                }, opt);
            }
            // init only one time
            if (!Map._isInit) {
                Map.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let messageError = '';
                    let cols = result.head.vars;
                    let rows = result.results.bindings;
                    let noCols = cols.length;
                    let noRows = rows.length;
                    let lat;
                    let long;
                    let description;
                    let data = new google.visualization.DataTable();
                    if (noCols <= 2) {
                        messageError = 'Parameters : latitude(xsd:Decimal) longitude(xsd:Decimal) title(xsd:string' +
                            ' optional) introduction(xsd:string optional) link(IRI optional)';
                    }
                    else {
                        let latitudeCol = 0;
                        let longitudeCol = 1;
                        let descriptionCol = 2;
                        data.addColumn('number', latitudeCol);
                        data.addColumn('number', longitudeCol);
                        if (noCols > 2) {
                            data.addColumn('string', descriptionCol);
                        }
                        data.addRows(noRows);
                        for (let x = 0; x < noRows; x++) {
                            lat = parseFloat(rows[x][cols[latitudeCol]].value);
                            long = parseFloat(rows[x][cols[longitudeCol]].value);
                            description = '';
                            if (isNaN(lat) || isNaN(long)) {
                                messageError = 'Latitude or longitude is not a decimal. Parameters of chart :' +
                                    ' latitude(xsd:Decimal)' +
                                    ' longitude(xsd:Decimal) title(xsd:string' +
                                    ' optional) introduction(xsd:string optional) link(IRI optional). ';
                                break;
                            }
                            if (noCols >= 6) {
                                // latitude longitude title text link
                                let title = rows[x][cols[2]] !== undefined ? rows[x][cols[2]].value : '';
                                let text = rows[x][cols[3]] !== undefined ? "<p style='margin: 0px'>" + rows[x][cols[3]].value + '</p>' : '';
                                let link = rows[x][cols[4]] !== undefined ? "<a style='font-size: large;font-style: medium;' href='" + rows[x][cols[4]].value + "' target='_blank'>" + title + '</a>' : title;
                                let img = rows[x][cols[5]] !== undefined ? "<img src='" + rows[x][cols[5]].value + "' style='margin-left:5px;margin-bottom:5px;width:150px;float:right;'/>" : '';
                                if (rows[x][cols[3]] === undefined || rows[x][cols[3]].value.length === 0) {
                                    description = '<div style="display: flow-root;min-width: 150px;min-height:150px;">' + link + '<div>' + img + '</div></div>';
                                }
                                else {
                                    description = '<div style="display: flow-root;width: 350px;min-height:150px;">' + link + '<div>' + img + text + '</div></div>';
                                }
                                data.setCell(x, latitudeCol, lat);
                                data.setCell(x, longitudeCol, long);
                                data.setCell(x, descriptionCol, description);
                            }
                            else if (noCols === 5) {
                                // latitude longitude title introduction link
                                let title = rows[x][cols[2]] !== undefined ? rows[x][cols[2]].value : '';
                                let text = rows[x][cols[3]] !== undefined ? rows[x][cols[3]].value : '';
                                let link = rows[x][cols[4]] !== undefined ? "<a href='" + rows[x][cols[4]].value + "'>" + title + '</a>' : title;
                                description = '<b>' + link + '</b><br/>' + text;
                                data.setCell(x, latitudeCol, lat);
                                data.setCell(x, longitudeCol, long);
                                data.setCell(x, descriptionCol, description);
                            }
                            else if (noCols === 4) {
                                // latitude longitude title introduction
                                let title = rows[x][cols[2]] !== undefined ? rows[x][cols[2]].value : '';
                                let text = rows[x][cols[3]] !== undefined ? rows[x][cols[3]].value : '';
                                description = '<b>' + title + '</b><br/>' + text;
                                data.setCell(x, latitudeCol, lat);
                                data.setCell(x, longitudeCol, long);
                                data.setCell(x, descriptionCol, description);
                            }
                            else if (noCols === 3) {
                                // latitude longitude title
                                let title = rows[x][cols[2]] !== undefined ? rows[x][cols[2]].value : '';
                                description = '<b>' + title + '</br>';
                                data.setCell(x, latitudeCol, lat);
                                data.setCell(x, longitudeCol, long);
                                data.setCell(x, descriptionCol, description);
                            }
                            else if (noCols === 2) {
                                // latitude longitude
                                data.setCell(x, latitudeCol, lat);
                                data.setCell(x, longitudeCol, long);
                            }
                        }
                    }
                    if (messageError !== '') {
                        return reject(Error(messageError));
                    }
                    let table = new google.visualization.Map(document.getElementById(currentChart.container.id));
                    table.draw(data, opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
Map._isInit = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dvb2dsZS92aXN1YWxpemF0aW9uL01hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBRTFCLE1BQU0sZ0JBQWdCLENBQUE7QUFFdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUVoQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBSTVCOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLEdBQUksU0FBUSxLQUFLO0lBRzFCO1FBQ0ksS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVPLE1BQU0sQ0FBQyxJQUFJO1FBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUcsVUFBVSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQzNFLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO0lBQ3RCLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDWCxPQUFPLFdBQVcsQ0FBQTtJQUN0QixDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ1osT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQUVELElBQVcsT0FBTztRQUNkLE9BQU8sS0FBSyxDQUFBO0lBQ2hCLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDcEIsT0FBTywwQkFBMEIsQ0FBQTtJQUNyQyxDQUFDO0lBRUQsSUFBVyxnQkFBZ0I7UUFDdkIsT0FBTyx3Q0FBd0MsQ0FBQTtJQUNuRCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksSUFBSSxDQUFFLE1BQTZCO1FBQ3RDLElBQUksWUFBWSxHQUFHLElBQUksQ0FB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
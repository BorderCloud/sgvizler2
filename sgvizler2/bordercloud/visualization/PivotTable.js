import { Core, Chart, MESSAGES, Logger, Tools } from '../../sgvizler';
/**
 * This table uses <a href="https://pivottable.js.org/examples/">PivotTable.js</a>.
 *
 * @class bordercloud.visualization.PivotTable
 * @memberof bordercloud.visualization
 */
export class PivotTable extends Chart {
    //private _pivotUIOptions:any = null;
    constructor() {
        super();
        // let lang = this.container.lang
        this.addCss(Core.path + 'lib/pivottable/dist/pivot.min.css');
        this.addCss(Core.path + 'lib/jquery-ui/jquery-ui.min.css');
        this.addCss(Core.path + 'lib/c3/c3.min.css');
        let dep = this.addScript(Core.path + 'lib/jquery-ui/jquery-ui.min.js');
        let touch = this.addScript(Core.path + 'lib/jquery-ui.touch-punch/jquery.ui.touch-punch.min.js', dep);
        let pivot = this.addScript(Core.path + 'lib/pivottable/dist/pivot.min.js', touch);
        let plotly = this.addScript(Core.path + 'lib/plotly/plotly-latest.min.js', pivot);
        this.addScript(Core.path + 'lib/pivottable/dist/plotly_renderers.js', plotly);
        let d3 = this.addScript(Core.path + 'lib/d3/d3.min.js', pivot);
        let c3 = this.addScript(Core.path + 'lib/c3/c3.min.js', d3);
        this.addScript(Core.path + 'lib/pivottable/dist/d3_renderers.js', d3);
        this.addScript(Core.path + 'lib/pivottable/dist/c3_renderers.js', c3);
        this.addScript(Core.path + 'lib/pivottable/dist/export_renderers.js', pivot);
        let gchart = this.addScript('https://www.gstatic.com/charts/loader.js', pivot);
        this.addScript(Core.path + 'lib/pivottable/dist/gchart_renderers.js', gchart);
        this.addScript(Core.path + 'lib/pivottable/dist/pivot.fr.min.js', pivot);
    }
    static init() {
        google.load("visualization", "1", { packages: ["corechart", "charteditor"] });
        PivotTable._isInit = true;
    }
    get icon() {
        return 'fa fa-table';
    }
    get label() {
        return 'PivotTable';
    }
    get subtext() {
        return 'PivotTable';
    }
    get classFullName() {
        return 'bordercloud.visualization.PivotTable';
    }
    get tutorialFilename() {
        return 'tutorial-bordercloud_visualization_PivotTable.html';
    }
    /**
     * Draw a chart
     * Options are interactives
     *
     * @param {SparqlResultInterface} result
     * @returns {Promise< any >}
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            try {
                let obj = document.getElementById(currentChart.container.id);
                if (!obj) {
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART_UNKNOWN, [currentChart.container.id]);
                    return resolve();
                }
                let lang = currentChart.container.lang;
                let cols = result.head.vars;
                let rows = result.results.bindings;
                let row;
                let datasetRow;
                let noCols = cols.length;
                let noRows = rows.length;
                let idContainer = currentChart.container.id;
                let idChart = currentChart.container.id + '-pivot';
                let dataset = [];
                let idSwith = currentChart.container.id + '-showUI';
                let divElement = document.createElement('div');
                let divId = document.createAttribute('id');
                let defaultOptions = {
                    renderers: $.extend($.pivotUtilities.renderers, $.pivotUtilities.plotly_renderers, $.pivotUtilities.d3_renderers, $.pivotUtilities.c3_renderers, $.pivotUtilities.gchart_renderers, $.pivotUtilities.export_renderers),
                    rendererOptions: {
                        width: Tools.sizeConvertInteger(currentChart.width),
                        height: Tools.sizeConvertInteger(currentChart.height)
                    }
                };
                let pivotUIOptions = null;
                divId.value = idChart;
                divElement.setAttributeNode(divId);
                obj.appendChild(divElement);
                for (let r = 0; r < noRows; r++) {
                    row = rows[r];
                    datasetRow = {};
                    // loop cells
                    for (let c = 0; c < noCols; c += 1) {
                        datasetRow[cols[c]] = row[cols[c]] !== undefined ? row[cols[c]].value : null;
                    }
                    dataset[r] = datasetRow;
                }
                try {
                    pivotUIOptions = JSON.parse(currentChart.optionsRaw);
                }
                catch (e) {
                    pivotUIOptions = {};
                }
                let config = Object.assign(pivotUIOptions, defaultOptions);
                $('#' + idChart).pivotUI(dataset, config, true, lang);
                let txtchecked = (config.showUI === true || config.showUI === undefined) ? "checked" : "";
                $('#' + idContainer).prepend("<div class=\"custom-control custom-switch float-right\"" +
                    "style='z-index: 2; right: 0;'>\n" + //position: absolute;
                    "  <input type=\"checkbox\" class=\"custom-control-input\" id=\"" + idSwith + "\" " + txtchecked + ">\n" +
                    "  <label class=\"custom-control-label\" for=\"" + idSwith + "\"> </label>\n" +
                    "</div>");
                $('#' + idSwith).on("change", function () {
                    let config = $('#' + idChart).data("pivotUIOptions");
                    config.showUI = this.checked;
                    $('#' + idChart).pivotUI(dataset, config, true, lang);
                });
            }
            catch (e) {
                return reject(e);
            }
            // finish
            return resolve();
        });
    }
    get newOptionsRaw() {
        let idChart = this.container.id + '-pivot';
        var config = $('#' + idChart).data("pivotUIOptions");
        return JSON.stringify(config, ['rowOrder', 'rows', 'cols', 'aggregatorName', 'vals', 'rendererName', 'showUI']);
    }
}
PivotTable._isInit = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGl2b3RUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ib3JkZXJjbG91ZC92aXN1YWxpemF0aW9uL1Bpdm90VGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILElBQUksRUFDSixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixLQUFLLEVBQ1IsTUFBTSxnQkFBZ0IsQ0FBQTtBQUl2Qjs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTyxVQUFXLFNBQVEsS0FBSztJQUdqQyxxQ0FBcUM7SUFFckM7UUFDSSxLQUFLLEVBQUUsQ0FBQTtRQUVQLGlDQUFpQztRQUVqQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsbUNBQW1DLENBQUMsQ0FBQTtRQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsaUNBQWlDLENBQUMsQ0FBQTtRQUMxRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUMsQ0FBQTtRQUU1QyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsZ0NBQWdDLENBQUMsQ0FBQTtRQUN0RSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsd0RBQXdELEVBQUMsR0FBRyxDQUFDLENBQUE7UUFDcEcsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGtDQUFrQyxFQUFDLEtBQUssQ0FBQyxDQUFBO1FBRWhGLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksR0FBSSxpQ0FBaUMsRUFBQyxLQUFLLENBQUMsQ0FBQTtRQUNqRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcs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
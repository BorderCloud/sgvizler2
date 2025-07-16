'use strict';
// Namespace
import * as S from './sgvizler';
export const sgvizler = S;
import * as bordercloudNS from './bordercloud';
export const bordercloud = bordercloudNS;
import * as googleNS from './google';
export const google = googleNS;
import * as d3NS from './d3';
export const d3 = d3NS;
import * as leafletNS from './leaflet';
export const leaflet = leafletNS;
/**
 * Todo
 * @const
 *
 */
export const VERSION = S.Core.VERSION;
/**
 * Todo
 * @const
 */
export const HOMEPAGE = S.Core.HOMEPAGE;
/**
 * Draws the sgvizler-containers with the given element id.
 *
 */
export function containerLoadAll() {
    S.Container.loadAllDependencies();
}
function readOptions(options) {
    if (options) {
        if (typeof options === 'object') {
            google.API.key = options.googleApiKey ? options.googleApiKey : '';
            leaflet.API.osmAccessToken = options.osmAccessToken ? options.osmAccessToken : '';
            if (options.path) {
                S.Core.path = options.path.endsWith('/') ? options.path : options.path + '/';
            }
            else {
                S.Core.path = '';
            }
        }
    }
}
/**
 * Draws the sgvizler-containers with the given element id.
 * @param {string} elementID
 */
export function containerDraw(elementID, options) {
    // S.Container.loadDependenciesId(elementID)
    readOptions(options);
    S.Container.drawWithElementId(elementID);
    return S.Logger;
}
/**
 * Todo.
 */
export function containerDrawAll(options) {
    // S.Container.loadAllDependencies()
    readOptions(options);
    S.Container.drawAll();
    return S.Logger;
}
/**
 * Todo.
 */
export function selectDraw(elementID) {
    // S.Select.loadDependencies()
    S.Select.drawWithElementId(elementID);
    return S.Logger;
}
/**
 * Todo.
 */
export function selectDrawAll() {
    // S.Select.loadDependencies()
    S.Select.drawAll();
    return S.Logger;
}
/**
 * Todo.
 * @param {string} className
 * @param {string} pathDoc
 * @returns {string}
 */
export function getChartDoc(className, pathDoc) {
    return S.Select.getChartDoc(className, pathDoc);
}
/**
 * Todo.
 * @param {string} className
 * @param {string} pathDoc
 * @returns {string}
 */
export function getChartOptions(elementID) {
    let optionsChart = "";
    S.Container.list.forEach((container) => {
        if (container.id === elementID) {
            optionsChart = container.chart.newOptionsRaw;
        }
    });
    return optionsChart;
}
export function encodeHtml(str) {
    return S.Tools.encodeHtml(str);
}
export function decodeHtml(str) {
    return S.Tools.decodeHtml(str);
}
export function giveHTMLAndScript(idDivOfSgvizler, idHtmlOfSgvizler, idScriptOfSgvizler, options) {
    let div = document.getElementById(idDivOfSgvizler);
    let htmlDiv = document.getElementById(idHtmlOfSgvizler);
    let scriptDiv = document.getElementById(idScriptOfSgvizler);
    if (div) {
        if (htmlDiv) {
            htmlDiv.textContent = new XMLSerializer().serializeToString(div)
                .replace(/&#10;/g, "\n")
                .replace(/xmlns="http:\/\/www.w3.org\/1999\/xhtml"/g, "")
                .replace(/ data-/gm, "\ndata-");
        }
        if (scriptDiv) {
            let script = "<script src=\"../browser/sgvizler2.js\"><\/script>\n" +
                "<script>\n";
            if (options) {
                script += "var options = {\n" +
                    "             googleApiKey : \"YOUR_GOOGLE_MAP_API_KEY\",\n" +
                    "             //OpenStreetMap Access Token\n" +
                    "             // https://www.mapbox.com/\n" +
                    "             osmAccessToken:  \"YOUR_OSM_ACCESS_TOKEN\"\n" +
                    "};\n";
                script += "//Draw a chart\n" +
                    "//sgvizler2.containerDraw('result',options);\n" +
                    "//or\n" +
                    "//$(\"#result\").containerchart(options);\n" +
                    "\n" +
                    "//Draw all Chart\n" +
                    "sgvizler2.containerDrawAll(options);\n";
            }
            else {
                script +=
                    "//Draw a chart\n" +
                        "//sgvizler2.containerDraw('" + idDivOfSgvizler + "');\n" +
                        "//or\n" +
                        "//$(\"#" + idDivOfSgvizler + "\").containerchart();\n" +
                        "\n" +
                        "//Draw all Chart\n" +
                        "sgvizler2.containerDrawAll();\n";
            }
            script += "<\/script>";
            scriptDiv.textContent = script;
        }
    }
}
export function showTabHtmlAndScript(idDivOfSgvizler, options) {
    $("#" + idDivOfSgvizler).before('<ul class="nav nav-tabs" role="tablist" idDivOfSgvizler="' + idDivOfSgvizler + 'tab">\n' +
        '    <li class="nav-item">\n' +
        '         <a class="nav-link active" data-toggle="tab" href="#' + idDivOfSgvizler + 'Tab" role="tab" aria-expanded="true">Result</a>\n' +
        '         </li>\n' +
        '         <li class="nav-item">\n' +
        '         <a class="nav-link" data-toggle="tab" href="#' + idDivOfSgvizler + 'htmlTab" role="tab" aria-expanded="false">HTML</a>\n' +
        '         </li>\n' +
        '         <li class="nav-item">\n' +
        '         <a class="nav-link" data-toggle="tab" href="#' + idDivOfSgvizler + 'scriptTab" role="tab" aria-expanded="false">Javascript</a>\n' +
        '         </li>\n' +
        '</ul>\n' +
        '<div class="tab-content">\n' +
        '         <div class="tab-pane active" id="' + idDivOfSgvizler + 'Tab" role="tabpanel" aria-expanded="true">' +
        '              <div id="' + idDivOfSgvizler + 'example" style="padding: 25px;"></div>' +
        '         </div>\n' +
        '         <div class="tab-pane" id="' + idDivOfSgvizler + 'htmlTab" role="tabpanel" aria-expanded="false">\n' +
        '            <div class="bg-faded" style="padding: 25px;"><pre lang="html" id="' + idDivOfSgvizler + 'Html"></pre></div>\n' +
        '         </div>\n' +
        '         <div class="tab-pane" id="' + idDivOfSgvizler + 'scriptTab" role="tabpanel" aria-expanded="false">\n' +
        '            <div class="bg-faded" style="padding: 25px;"><pre lang="html" id="' + idDivOfSgvizler + 'Script"></pre></div>\n' +
        '         </div>\n' +
        '</div>');
    var element = $("#" + idDivOfSgvizler).detach();
    $('#' + idDivOfSgvizler + 'example').append(element);
    giveHTMLAndScript(idDivOfSgvizler, idDivOfSgvizler + "Html", idDivOfSgvizler + "Script", options);
}
/**
 * Todo
 * @param {string} elementID
 * @param {string} endpoint
 * @param {string} query
 * @param {string} chartName
 * @param {string} options
 * @param {string} loglevel
 * @returns {string}
 */
export function create(elementID, endpoint, query, chartName, options, loglevel, output, method, parameter, lang) {
    return S.Container.create(elementID, endpoint, query, chartName, options, loglevel, output, method, parameter, lang);
}
// noinspection JSPotentiallyInvalidConstructorUsage
jQuery.fn.extend({
    selectchart: function (param, option) {
        let $this = this;
        let action = 'render';
        if (param) {
            if (typeof param === 'string') {
                action = param;
            }
            else if (typeof param === 'object') {
                action = param.action ? param.action : action;
            }
        }
        // Return the jQuery object for chaining.
        return $this.each(function (index, obj) {
            if (index >= 0 && action === 'render') {
                if (param && typeof param === 'object') {
                    S.Select.draw(obj, param);
                }
                else {
                    S.Select.draw(obj);
                }
            }
        });
    },
    containerchart: function (param, option) {
        let $this = this;
        let action = 'render';
        if (param) {
            if (typeof param === 'string') {
                action = param;
            }
            else if (typeof param === 'object') {
                action = param.action ? param.action : action;
            }
        }
        // Return the jQuery object for chaining.
        return $this.each(function (index, obj) {
            if (index >= 0 && action === 'render') {
                if (param && typeof param === 'object') {
                    readOptions(param);
                }
                S.Container.drawWithElementId($(obj).attr('id'));
            }
        });
    }
});
S.Loader.detectRoot();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFBO0FBS1osWUFBWTtBQUNaLE9BQU8sS0FBSyxDQUFDLE1BQU0sWUFBWSxDQUFBO0FBQy9CLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUE7QUFFekIsT0FBTyxLQUFLLGFBQWEsTUFBTSxlQUFlLENBQUE7QUFDOUMsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQTtBQUV4QyxPQUFPLEtBQUssUUFBUSxNQUFNLFVBQVUsQ0FBQTtBQUNwQyxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFBO0FBRTlCLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFBO0FBQzVCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUE7QUFFdEIsT0FBTyxLQUFLLFNBQVMsTUFBTSxXQUFXLENBQUE7QUFDdEMsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQTtBQUVoQzs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBRTdDOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQTtBQUUvQzs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCO0lBQzFCLENBQUMsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtBQUN2QyxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUUsT0FBWTtJQUM5QixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ1YsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMs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
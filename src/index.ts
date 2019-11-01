'use strict'

/** @module example */
import * as jqueryProxy from 'jquery'

// Namespace
import * as S from './sgvizler'
export const sgvizler = S

import * as bordercloudNS from './bordercloud'
export const bordercloud = bordercloudNS

import * as googleNS from './google'
export const google = googleNS

import * as d3NS from './d3'
export const d3 = d3NS

import * as leafletNS from './leaflet'
export const leaflet = leafletNS

/**
 * Todo
 * @const
 *
 */
export const VERSION: string = S.Core.VERSION

/**
 * Todo
 * @const
 */
export const HOMEPAGE: string = S.Core.HOMEPAGE

/**
 * Draws the sgvizler-containers with the given element id.
 *
 */
export function containerLoadAll () {
      S.Container.loadAllDependencies()
}

function readOptions (options: any) {
    if (options) {
        if (typeof options === 'object') {
            google.API.key = options.googleApiKey ? options.googleApiKey : ''
            leaflet.API.osmAccessToken = options.osmAccessToken ? options.osmAccessToken : ''
            S.Core.path = options.path ? options.path : ''
        }
    }
}

/**
 * Draws the sgvizler-containers with the given element id.
 * @param {string} elementID
 */
export function containerDraw (elementID: string,options: any): S.Logger {
   // S.Container.loadDependenciesId(elementID)
    readOptions(options)
    S.Container.drawWithElementId(elementID);
    return S.Logger
}

/**
 * Todo.
 */
export function containerDrawAll (options?: any) : S.Logger {
   // S.Container.loadAllDependencies()
    readOptions(options)
    S.Container.drawAll()
    return S.Logger
}

/**
 * Todo.
 */
export function selectDraw (elementID: string) : S.Logger {
    // S.Select.loadDependencies()
    S.Select.drawWithElementId(elementID)
    return S.Logger
}

/**
 * Todo.
 */
export function selectDrawAll () : S.Logger {
   // S.Select.loadDependencies()
    S.Select.drawAll()
    return S.Logger
}

/**
 * Todo.
 * @param {string} className
 * @param {string} pathDoc
 * @returns {string}
 */
export function getChartDoc (className: string,pathDoc?: string) {
    return S.Select.getChartDoc(className,pathDoc)
}

/**
 * Todo.
 * @param {string} className
 * @param {string} pathDoc
 * @returns {string}
 */
export function getChartOptions(elementID: string): S.Logger {
    let optionsChart = ""
    S.Container.list.forEach(
        (container) => {
            if(container.id === elementID) {
                optionsChart = container.chart.newOptionsRaw
            }
        }
    )
    return optionsChart
}

export function encodeHtml (str: string):string  {
    return S.Tools.encodeHtml(str)
}
export function decodeHtml (str: string):string  {
    return S.Tools.decodeHtml(str)
}

export function giveHTMLAndScript(idDivOfSgvizler: string,idHtmlOfSgvizler: string,idScriptOfSgvizler: string, options?: any){
    let div = document.getElementById(idDivOfSgvizler);
    let htmlDiv = document.getElementById(idHtmlOfSgvizler);
    let scriptDiv = document.getElementById(idScriptOfSgvizler);

    if(div){
        if(htmlDiv){
            htmlDiv.textContent = new XMLSerializer().serializeToString(div)
                .replace(/&#10;/g,"\n")
                .replace(/xmlns="http:\/\/www.w3.org\/1999\/xhtml"/g,"")
                .replace(/ data-/gm,"\ndata-");
        }
        if(scriptDiv){
            let script = "<script src=\"../browser/sgvizler2.js\"><\/script>\n" +
                "<script>\n" ;
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
            }else{
                script +=
                    "//Draw a chart\n" +
                    "//sgvizler2.containerDraw('"+idDivOfSgvizler+"');\n" +
                    "//or\n" +
                    "//$(\"#"+idDivOfSgvizler+"\").containerchart();\n"+
                    "\n" +
                    "//Draw all Chart\n" +
                    "sgvizler2.containerDrawAll();\n" ;
            }

            script +="<\/script>"
            scriptDiv.textContent = script;
        }
    }
}

export function showTabHtmlAndScript(idDivOfSgvizler: string, options?: any){
    $("#"+idDivOfSgvizler).before(
        '<ul class="nav nav-tabs" role="tablist" idDivOfSgvizler="'+idDivOfSgvizler+'tab">\n' +
        '    <li class="nav-item">\n' +
        '         <a class="nav-link active" data-toggle="tab" href="#'+idDivOfSgvizler+'Tab" role="tab" aria-expanded="true">Result</a>\n' +
        '         </li>\n' +
        '         <li class="nav-item">\n' +
        '         <a class="nav-link" data-toggle="tab" href="#'+idDivOfSgvizler+'htmlTab" role="tab" aria-expanded="false">HTML</a>\n' +
        '         </li>\n' +
        '         <li class="nav-item">\n' +
        '         <a class="nav-link" data-toggle="tab" href="#'+idDivOfSgvizler+'scriptTab" role="tab" aria-expanded="false">Javascript</a>\n' +
        '         </li>\n' +
        '</ul>\n' +
        '<div class="tab-content">\n' +
        '         <div class="tab-pane active" id="'+idDivOfSgvizler+'Tab" role="tabpanel" aria-expanded="true">' +
        '              <div id="'+idDivOfSgvizler+'example" style="padding: 25px;"></div>' +
        '         </div>\n' +
        '         <div class="tab-pane" id="'+idDivOfSgvizler+'htmlTab" role="tabpanel" aria-expanded="false">\n' +
        '            <div class="bg-faded" style="padding: 25px;"><pre lang="html" id="'+idDivOfSgvizler+'Html"></pre></div>\n' +
        '         </div>\n' +
        '         <div class="tab-pane" id="'+idDivOfSgvizler+'scriptTab" role="tabpanel" aria-expanded="false">\n' +
        '            <div class="bg-faded" style="padding: 25px;"><pre lang="html" id="'+idDivOfSgvizler+'Script"></pre></div>\n' +
        '         </div>\n' +
        '</div>');

    var element = $("#"+idDivOfSgvizler).detach();
    $('#'+idDivOfSgvizler+'example').append(element);
    giveHTMLAndScript(idDivOfSgvizler,idDivOfSgvizler+"Html",idDivOfSgvizler+"Script",options);
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
export function create (
    elementID: string,
    endpoint: string,
    query: string,
    chartName: string,
    options?: string,
    loglevel?: string,
    output?: string,
    method?: string,
    parameter?: string,
    lang?: string
) {
    return S.Container.create(
        elementID,
        endpoint,
        query,
        chartName,
        options,
        loglevel,
        output,
        method,
        parameter,
        lang
    )
}

/**
 * Todo
 */
interface JQuery {

    /**
     * Todo selectchart
     * @param param
     * @param option
     * @returns {JQuery}
     */
    selectchart (param?: any,option?: any): JQuery

    /**
     * todo containerchart
     * @param param
     * @param option
     * @returns {JQuery}
     */
    containerchart (param?: any,option?: any): JQuery

}

// noinspection JSPotentiallyInvalidConstructorUsage
jQuery.fn.extend(
    {
        selectchart : function (param?: any,option?: any): JQuery {
            let $this = this
            let action = 'render'
            if (param) {
                if (typeof param === 'string') {
                    action = param
                } else if (typeof param === 'object') {
                    action = param.action ? param.action : action
                }
            }
            // Return the jQuery object for chaining.
            return $this.each(function (index: any,obj: any) {
                if (index >= 0 && action === 'render') {
                    if (param && typeof param === 'object') {
                        S.Select.draw(obj,param)
                    } else {
                        S.Select.draw(obj)
                    }
                }
            })
        },
        containerchart : function (param?: any,option?: any): JQuery {
            let $this = this
            let action = 'render'
            if (param) {
                if (typeof param === 'string') {
                    action = param
                } else if (typeof param === 'object') {
                    action = param.action ? param.action : action
                }
            }
            // Return the jQuery object for chaining.
            return $this.each(function (index: any,obj: any) {
                if (index >= 0 && action === 'render') {
                    if (param && typeof param === 'object') {
                        readOptions(param)
                    }
                    S.Container.drawWithElementId($(obj).attr('id') as string)
                }
            })
        }
    }
)

S.Loader.detectRoot()

'use strict'

/** @module example */
import * as jqueryProxy from 'jquery'
const jquery: JQueryStatic = (jqueryProxy as any).default || jqueryProxy

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
export function containerDraw (elementID: string,options: any): void {
   // S.Container.loadDependenciesId(elementID)
    readOptions(options)
    S.Container.drawWithElementId(elementID)
}

/**
 * Todo.
 */
export function containerDrawAll (options?: any) {
   // S.Container.loadAllDependencies()
    readOptions(options)
    S.Container.drawAll()
}

/**
 * Todo.
 */
export function selectDraw (elementID: string) {
    // S.Select.loadDependencies()
    S.Select.drawWithElementId(elementID)
}

/**
 * Todo.
 */
export function selectDrawAll () {
   // S.Select.loadDependencies()
    S.Select.drawAll()
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
    parameter?: string
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
        parameter
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
jqueryProxy.prototype.extend(
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
                        S.Container.drawWithElementId($(obj).attr('id') as string,param)
                    } else {
                        S.Container.drawWithElementId($(obj).attr('id') as string)
                    }
                }
            })
        }
    }
)

S.Loader.detectRoot()

import * as S from './sgvizler';
export declare const sgvizler: typeof S;
import * as bordercloudNS from './bordercloud';
export declare const bordercloud: typeof bordercloudNS;
import * as googleNS from './google';
export declare const google: typeof googleNS;
import * as d3NS from './d3';
export declare const d3: typeof d3NS;
import * as leafletNS from './leaflet';
export declare const leaflet: typeof leafletNS;
/**
 * Todo
 * @const
 *
 */
export declare const VERSION: string;
/**
 * Todo
 * @const
 */
export declare const HOMEPAGE: string;
/**
 * Draws the sgvizler-containers with the given element id.
 *
 */
export declare function containerLoadAll(): void;
/**
 * Draws the sgvizler-containers with the given element id.
 * @param {string} elementID
 */
export declare function containerDraw(elementID: string, options: any): S.Logger;
/**
 * Todo.
 */
export declare function containerDrawAll(options?: any): S.Logger;
/**
 * Todo.
 */
export declare function selectDraw(elementID: string): S.Logger;
/**
 * Todo.
 */
export declare function selectDrawAll(): S.Logger;
/**
 * Todo.
 * @param {string} className
 * @param {string} pathDoc
 * @returns {string}
 */
export declare function getChartDoc(className: string, pathDoc?: string): string;
/**
 * Todo.
 * @param {string} className
 * @param {string} pathDoc
 * @returns {string}
 */
export declare function getChartOptions(elementID: string): S.Logger;
export declare function encodeHtml(str: string): string;
export declare function decodeHtml(str: string): string;
export declare function giveHTMLAndScript(idDivOfSgvizler: string, idHtmlOfSgvizler: string, idScriptOfSgvizler: string, options?: any): void;
export declare function showTabHtmlAndScript(idDivOfSgvizler: string, options?: any): void;
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
export declare function create(elementID: string, endpoint: string, query: string, chartName: string, options?: string, loglevel?: string, output?: string, method?: string, parameter?: string, lang?: string): string;

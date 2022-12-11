import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * This table uses <a href="https://pivottable.js.org/examples/">PivotTable.js</a>.
 *
 * @class bordercloud.visualization.PivotTable
 * @memberof bordercloud.visualization
 */
export declare class PivotTable extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Draw a chart
     * Options are interactives
     *
     * @param {SparqlResultInterface} result
     * @returns {Promise< any >}
     */
    draw(result: SparqlResultInterface): Promise<void>;
    get newOptionsRaw(): string;
}

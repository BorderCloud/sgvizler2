import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo ColumnChart
 * @class google.visualization.ColumnChart
 * @tutorial google_visualization_ColumnChart
 * @memberof google.visualization
 */
export declare class ColumnChart extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Make a standard simple html ColumnChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf ColumnChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

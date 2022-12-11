import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo BarChart
 * @class google.visualization.BarChart
 * @tutorial google_visualization_BarChart
 * @memberof google.visualization
 */
export declare class BarChart extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf BarChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

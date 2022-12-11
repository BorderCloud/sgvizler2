import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo ScatterChart
 * @class google.visualization.ScatterChart
 * @tutorial google_visualization_ScatterChart
 * @memberof google.visualization
 */
export declare class ScatterChart extends Chart {
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
     * @memberOf ScatterChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

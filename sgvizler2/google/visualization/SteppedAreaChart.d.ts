import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo SteppedAreaChart
 * @class google.visualization.SteppedAreaChart
 * @tutorial google_visualization_SteppedAreaChart
 * @memberof google.visualization
 */
export declare class SteppedAreaChart extends Chart {
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
     * @memberOf Table
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

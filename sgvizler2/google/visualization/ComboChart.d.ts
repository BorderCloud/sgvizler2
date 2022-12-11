import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo ComboChart
 * @class google.visualization.ComboChart
 * @tutorial google_visualization_ComboChart
 * @memberof google.visualization
 */
export declare class ComboChart extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Make a standard simple html ComboChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf ComboChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

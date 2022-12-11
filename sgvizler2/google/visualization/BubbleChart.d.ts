import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo BubbleChart
 * @class google.visualization.BubbleChart
 * @tutorial google_visualization_BubbleChart
 * @memberof google.visualization
 */
export declare class BubbleChart extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Make a standard simple html bubbleChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf BubbleChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

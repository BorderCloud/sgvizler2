import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo CandlestickChart
 * @class google.visualization.CandlestickChart
 * @tutorial google_visualization_CandlestickChart
 * @memberof google.visualization
 */
export declare class CandlestickChart extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Make a standard simple html CandlestickChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf CandlestickChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

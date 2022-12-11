import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo Histogram
 * @class google.visualization.Histogram
 * @tutorial google_visualization_Histogram
 * @memberof google.visualization
 */
export declare class Histogram extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Make a standard simple html Histogram.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Histogram
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo Trendline
 * @class google.visualization.Trendline
 * @tutorial google_visualization_Trendline
 * @memberof google.visualization
 */
export declare class Trendline extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Make a standard simple html Trendline.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Trendline
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

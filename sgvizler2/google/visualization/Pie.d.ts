import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo Pie
 * @class google.visualization.Pie
 * @tutorial google_visualization_Pie
 * @memberof google.visualization
 */
export declare class Pie extends Chart {
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    private static _isInit;
    constructor();
    private static init;
    /**
     * Make a standard simple html pie.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Pie
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

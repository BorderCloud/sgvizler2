import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo Calendar
 * @class google.visualization.Calendar
 * @tutorial google_visualization_Calendar
 * @memberof google.visualization
 */
export declare class Calendar extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Make a standard simple html Calendar.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Calendar
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

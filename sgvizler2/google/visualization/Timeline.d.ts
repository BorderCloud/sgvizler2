import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo Timeline
 * @class google.visualization.Timeline
 * @tutorial google_visualization_Timeline
 * @memberof google.visualization
 */
export declare class Timeline extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Make a standard simple html Timeline.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Timeline
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

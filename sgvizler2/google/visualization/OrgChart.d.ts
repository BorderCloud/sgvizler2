import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo OrgChart
 * @class google.visualization.OrgChart
 * @tutorial google_visualization_OrgChart
 * @memberof google.visualization
 */
export declare class OrgChart extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Make a standard simple html OrgChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf OrgChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

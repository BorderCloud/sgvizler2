import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo GeoChart
 * @class google.visualization.GeoChart
 * @tutorial google_visualization_GeoChart
 * @memberof google.visualization
 */
export declare class GeoChart extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Make a standard simple html geochart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf GeoChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

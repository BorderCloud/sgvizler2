import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo AnnotationChart
 * @class google.visualization.AnnotationChart
 * @tutorial google_visualization_AnnotationChart
 * @memberof google.visualization
 */
export declare class AnnotationChart extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Make a standard simple html AnnotationChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf AnnotationChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

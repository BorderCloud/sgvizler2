import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo IntervalChart
 * @class google.visualization.IntervalChart
 * @tutorial google_visualization_IntervalChart
 * @memberof google.visualization
 */
export declare class IntervalChart extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Draw a IntervalChart
     * @memberOf IntervalChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

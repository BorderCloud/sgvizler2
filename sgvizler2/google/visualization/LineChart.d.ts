import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo LineChart
 * @class google.visualization.LineChart
 * @tutorial google_visualization_LineChart
 * @memberof google.visualization
 */
export declare class LineChart extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Draw a LineChart
     * @memberOf LineChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

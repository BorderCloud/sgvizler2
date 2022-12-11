import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo ScatterChart
 * @class d3.visualization.ScatterChart
 * @tutorial d3_visualization_ScatterChart
 * @memberof d3.visualization
 */
export declare class ScatterChart extends Chart {
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    constructor();
    /**
     * Make a simple ScatterChart.
     * Available options:
     * -
     * @memberOf ScatterChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

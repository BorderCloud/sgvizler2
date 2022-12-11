import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo ColumnChart
 * @class d3.visualization.ColumnChart
 * @tutorial d3_visualization_ColumnChart
 * @memberof d3.visualization
 */
export declare class ColumnChart extends Chart {
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    constructor();
    /**
     * Make a simple ColumnChart.
     * Available options:
     * -
     * @memberOf ColumnChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

/** Work in progress, help us ! */
import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo BarChart
 * @class d3.visualization.BarChart
 * @tutorial d3_visualization_BarChart
 * @memberof d3.visualization
 */
export declare class BarChart extends Chart {
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    constructor();
    /**
     * Make a simple pie.
     * Available options:
     * -
     * @memberOf BarChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

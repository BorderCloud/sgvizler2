import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo AreaChart
 * @class d3.visualization.AreaChart
 * @tutorial d3_visualization_AreaChart
 * @memberof d3.visualization
 */
export declare class AreaChart extends Chart {
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    constructor();
    /**
     * Make a simple line.
     * Available options:
     * -
     * @memberOf AreaChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

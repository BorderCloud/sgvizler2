import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo Pie
 * @class d3.visualization.Pie
 * @tutorial d3_visualization_Pie
 * @memberof d3.visualization
 */
export declare class Pie extends Chart {
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
     * @memberOf Pie
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

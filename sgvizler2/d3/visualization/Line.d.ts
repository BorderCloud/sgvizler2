import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo Line
 * @class d3.visualization.Line
 * @tutorial d3_visualization_Line
 * @memberof d3.visualization
 */
export declare class Line extends Chart {
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
     * @memberOf Line
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

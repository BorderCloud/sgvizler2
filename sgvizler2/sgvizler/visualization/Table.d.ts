import { Chart } from '../Chart';
import { SparqlResultInterface } from '../SparqlResultInterface';
/**
 * Todo Table
 * @class sgvizler.visualization.Table
 * @tutorial sgvizler_visualization_Table
 * @memberof sgvizler.visualization
 */
export declare class Table extends Chart {
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    constructor();
    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Table
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

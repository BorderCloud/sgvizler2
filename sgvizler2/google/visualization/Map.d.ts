import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo Table
 * @class google.visualization.Map
 * @tutorial google_visualization_Map
 * @memberof google.visualization
 */
export declare class Map extends Chart {
    private static _isInit;
    constructor();
    private static init;
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    /**
     * Make a Google map
     * todo
     * @memberOf Map
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
}

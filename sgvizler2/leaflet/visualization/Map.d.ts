import { Chart, SparqlResultInterface } from '../../sgvizler';
/**
 * Todo Table
 * @class leaflet.visualization.Map
 * @tutorial leaflet_visualization_Map
 * @memberof leaflet.visualization
 */
export declare class Map extends Chart {
    get icon(): string;
    get label(): string;
    get subtext(): string;
    get classFullName(): string;
    get tutorialFilename(): string;
    constructor();
    /**
     * Make a Google map
     * todo
     * @memberOf Map
     * @returns {Promise<void>}
     * @param result
     */
    draw(result: SparqlResultInterface): Promise<void>;
    private static readOtherParametersWithPoint;
    private static makeRequest;
}

/**
 *
 * @memberof gvizler
 */
export declare class Select {
    private static readonly CLASS_NAME;
    private static classOfChartSelectedByDefault;
    /**
     * Stores the charts
     */
    private static charts;
    /**
     *
     * @param {string} elementID
     * @returns {Promise<void>}
     */
    static drawWithElementId(elementID: string): Promise<void>;
    /**
     *
     * @param {Element} element
     * @param options
     * @returns {Promise<void>}
     */
    static draw(element: Element, options?: any): Promise<void>;
    /**
     * todo
     */
    static drawAll(): void;
    /**
     * Build url of chart's doc
     * @param {string} classFullName
     * @param {string} pathDoc
     * @returns {string} absolute or relative URL
     */
    static getChartDoc(classFullName: string, pathDoc?: string): string;
    private static getSelectOptions;
}

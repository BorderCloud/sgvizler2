import { SparqlResultInterface } from '../sgvizler';
/**
 * Data
 * @class google.Data
 * @memberof google.Data
 */
export declare class Data {
    private _dataTable;
    constructor(result: SparqlResultInterface, raw?: boolean);
    setRole(col: Number, role: string): void;
    getDataTable(): any;
    private convertResult;
    private convertResultRaw;
}

import {
    Chart,
    SparqlResultInterface,
    MESSAGES,
    Logger
} from '../../sgvizler'

declare let google: any

/**
 * Todo Table
 * @class google.visualization.Table
 * @tutorial google_visualization_Table
 * @memberof google.visualization
 */
export class Data {

    private _dataTable: any

    constructor(result: SparqlResultInterface){
        let data = new google.visualization.DataTable();

        let cols = result.head.vars
        let rows = result.results.bindings
        //let noCols = cols.length
        //let noRows = rows.length

        // console.log(opt)

        for (let col of cols) {
            data.addColumn('string', col);
            //data.addColumn('number', 'Salary');
            //data.addColumn('boolean', 'Full Time Employee');
        }

        let arrayData = []
        let i = 0
        for (let row of rows) {
            arrayData[i] = []
            for (let col of cols) {
                arrayData[i].push(<never> row[col].value)
            }
            i++
        }
        data.addRows(arrayData)
        this._dataTable = data
    }

    getDataTable(){
        return this._dataTable
    }
}

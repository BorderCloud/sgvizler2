import {
    Logger, MESSAGES,
    SparqlResultInterface
} from '../sgvizler'

declare let google: any

/**
 * Data
 * @class google.Data
 * @memberof google.Data
 */
export class Data {

    private _dataTable: any

    constructor (result: SparqlResultInterface, raw: boolean = false) {
        if (raw) {
            this.convertResultRaw(result)
        } else {
            this.convertResult(result)
        }
    }

    setRole (col: Number, role: string) {
        this._dataTable.setColumnProperty(col, 'role', role)
    }

    getDataTable () {
        return this._dataTable
    }

    private convertResult (result: SparqlResultInterface) {
        let data = new google.visualization.DataTable()

        let cols = result.head.vars
        let rows = result.results.bindings
        let noCols = cols.length
        let noRows = rows.length

        for (let col of cols) {
            // RDF Term	JSON form
            // IRI I	{"type": "uri", "value": "I"}
            // Literal S	{"type": "literal","value": "S"}
            // Literal S with language tag L	{ "type": "literal", "value": "S", "xml:lang": "L"}
            // Literal S with datatype IRI D	{ "type": "literal", "value": "S", "datatype": "D"}
            // Blank node, label B	{"type": "bnode", "value": "B"}
            let colName = col.replace('_',' ')
            if (noRows > 0) {
                let type = rows[0][col] !== undefined ? rows[0][col].datatype : ''
                if (type === 'http://www.w3.org/2001/XMLSchema#decimal' ||
                    type === 'http://www.w3.org/2001/XMLSchema#integer') {
                    data.addColumn('number', colName)
                } else if (type === 'http://www.w3.org/2001/XMLSchema#boolean') {
                    data.addColumn('boolean', colName)
                } else if (type === 'http://www.w3.org/2001/XMLSchema#date') {
                    data.addColumn('date', colName)
                } else if (type === 'http://www.w3.org/2001/XMLSchema#dateTime') {
                    data.addColumn('datetime', colName)
                } else if (type === 'http://www.w3.org/2001/XMLSchema#time') {
                    data.addColumn('timeofday', colName)
                } else {
                    data.addColumn('string', colName)
                }
            } else {
                data.addColumn('string', colName)
            }
        }

        if (noRows > 0) {
            data.addRows(noRows)
            let i = 0
            for (let x = 0; x < noRows; x++) {
                for (let y = 0; y < noCols; y++) {
                    // data.setCell(x,y,rows[x][cols[y]].value)
                    let type = rows[x][cols[y]] !== undefined && rows[x][cols[y]].hasOwnProperty('datatype') ? rows[x][cols[y]].datatype : ''
                    if (type === 'http://www.w3.org/2001/XMLSchema#integer') {
                        data.setCell(x, y, parseInt(rows[x][cols[y]].value, 10))
                    } else if (type === 'http://www.w3.org/2001/XMLSchema#decimal' || type === 'http://www.w3.org/2001/XMLSchema#float') {
                        data.setCell(x, y, parseFloat(rows[x][cols[y]].value))
                    } else if (type === 'http://www.w3.org/2001/XMLSchema#boolean') {
                        // todo test
                        // 'boolean' - JavaScript boolean value ('true' or 'false'). Example value: v:'true'
                        data.setCell(x, y, rows[x][cols[y]].value === 'true' ? true : false)
                    } else if (type === 'http://www.w3.org/2001/XMLSchema#date') {
                        // todo test
                        // 'date' - JavaScript Date object (zero-based month), with the time truncated. Example value: v:new Date(2008, 0, 15)
                        data.setCell(x, y, new Date(rows[x][cols[y]].value))
                    } else if (type === 'http://www.w3.org/2001/XMLSchema#dateTime') {
                        // todo test
                        // 'datetime' - JavaScript Date object including the time. Example value: v:new Date(2008, 0, 15, 14, 30, 45)
                        data.setCell(x, y, new Date(rows[x][cols[y]].value))
                    } else if (type === 'http://www.w3.org/2001/XMLSchema#time') {
                        // todo test
                        // 'timeofday' - Array of three numbers and an optional fourth, representing hour (0 indicates midnight), minute, second, and optional millisecond. Example values: v:[8, 15, 0], v: [6, 12, 1, 144]
                        let time: any = new Date(rows[x][cols[y]].value)
                        data.setCell(x, y, [time.getHours(), time.getHours(), time.getSeconds(), time.getMilliseconds()])
                    } else {
                        if (rows[x][cols[y]] === undefined) {
                            data.setCell(x, y, null)
                        } else {
                            // 'string' - JavaScript string value. Example value: v:'hello'
                            //let value = rows[x][cols[y]] !== undefined ? rows[x][cols[y]].value : ''
                            data.setCell(x, y, rows[x][cols[y]].value)
                        }
                    }
                    // console.log('rows['+x+'][cols['+y+']].value = ' + rows[x][cols[y]].value + ' ' +
                    // rows[x][cols[y]].datatype)
                }
            }
        }

        this._dataTable = data
    }

    private convertResultRaw (result: SparqlResultInterface) {
        let data = new google.visualization.DataTable()

        let cols = result.head.vars
        let rows = result.results.bindings
        let noCols = cols.length
        let noRows = rows.length

        for (let col of cols) {
            data.addColumn('string', col)
        }

        if (noRows > 0) {
            data.addRows(noRows)
            let i = 0
            for (let x = 0; x < noRows; x++) {
                for (let y = 0; y < noCols; y++) {
                    if (rows[x][cols[y]] === undefined) {
                        data.setCell(x, y, '')
                    } else {
                        data.setCell(x, y, rows[x][cols[y]].value.toString())
                    }
                }
            }
        }

        this._dataTable = data
    }
}

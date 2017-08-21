import {
    SparqlResultInterface
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
        let noCols = cols.length
        let noRows = rows.length

        for (let col of cols) {
            // RDF Term	JSON form
            // IRI I	{"type": "uri", "value": "I"}
            // Literal S	{"type": "literal","value": "S"}
            // Literal S with language tag L	{ "type": "literal", "value": "S", "xml:lang": "L"}
            // Literal S with datatype IRI D	{ "type": "literal", "value": "S", "datatype": "D"}
            // Blank node, label B	{"type": "bnode", "value": "B"}
            if( noRows>0 ){
                let type = rows[0][col].datatype
                if(type === "http://www.w3.org/2001/XMLSchema#decimal" ||
                    type === "http://www.w3.org/2001/XMLSchema#integer"){
                    data.addColumn('number', col)
                }else if(type === "http://www.w3.org/2001/XMLSchema#boolean"){
                    data.addColumn('boolean', col)
                }else if(type === "http://www.w3.org/2001/XMLSchema#date"){
                    data.addColumn('date', col)
                }else if(type === "http://www.w3.org/2001/XMLSchema#dateTime"){
                    data.addColumn('datetime', col)
                }else if(type === "http://www.w3.org/2001/XMLSchema#time"){
                    data.addColumn('timeofday', col)
                }else{
                    data.addColumn('string', col)
                }
            }else{
                data.addColumn('string', col)
            }
        }

        data.addRows(noRows);

        let i = 0
        for (let x = 0 ; x < noRows ; x++) {
            for (let y = 0 ; y < noCols ; y++) {
                //arrayData[i].push(<never> row[col].value)
                data.setCell(x,y,rows[x][cols[y]].value);

                let type = rows[0][cols[y]].datatype
                if(type === "http://www.w3.org/2001/XMLSchema#decimal"){
                    // 'number' - JavaScript number value. Example values: v:7 , v:3.14, v:-55
                    data.setCell(x,y,parseFloat(rows[x][cols[y]].value));

                    // todo... ?
                    //data.setCell(0, 1, 10000, '$10,000');
                }else if(type === "http://www.w3.org/2001/XMLSchema#integer"){
                    // todo test
                    // 'number' - JavaScript number value. Example values: v:7 , v:3.14, v:-55
                    data.setCell(x,y,parseInt(rows[x][cols[y]].value,10));
                }else if(type === "http://www.w3.org/2001/XMLSchema#boolean"){
                    // todo test
                    // 'boolean' - JavaScript boolean value ('true' or 'false'). Example value: v:'true'
                    data.setCell(x,y,rows[x][cols[y]].value == 'true' ? true : false);
                }else if(type === "http://www.w3.org/2001/XMLSchema#date"){
                    // todo test
                    // 'date' - JavaScript Date object (zero-based month), with the time truncated. Example value: v:new Date(2008, 0, 15)
                    data.setCell(x,y,Date.parse(rows[x][cols[y]].value));
                }else if(type === "http://www.w3.org/2001/XMLSchema#dateTime"){
                    // todo test
                    // 'datetime' - JavaScript Date object including the time. Example value: v:new Date(2008, 0, 15, 14, 30, 45)
                    data.setCell(x,y,Date.parse(rows[x][cols[y]].value));
                }else if(type === "http://www.w3.org/2001/XMLSchema#time"){
                    // todo test
                    // 'timeofday' - Array of three numbers and an optional fourth, representing hour (0 indicates midnight), minute, second, and optional millisecond. Example values: v:[8, 15, 0], v: [6, 12, 1, 144]
                    let time:any = Date.parse(rows[x][cols[y]].value)
                    data.setCell(x,y,[time.getHours(), time.getHours(),  time.getSeconds(), time.getMilliseconds()]);
                }else{
                    // 'string' - JavaScript string value. Example value: v:'hello'
                    data.setCell(x,y,rows[x][cols[y]].value);
                }

                console.log('rows['+x+'][cols['+y+']].value = ' + rows[x][cols[y]].value + ' ' + rows[x][cols[y]].datatype)
            }
        }

        this._dataTable = data
    }

    getDataTable(){
        return this._dataTable
    }
}

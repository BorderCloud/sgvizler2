/**
 * Data
 * @class google.Data
 * @memberof google.Data
 */
export class Data {
    constructor(result, raw = false) {
        if (raw) {
            this.convertResultRaw(result);
        }
        else {
            this.convertResult(result);
        }
    }
    setRole(col, role) {
        this._dataTable.setColumnProperty(col, 'role', role);
    }
    getDataTable() {
        return this._dataTable;
    }
    convertResult(result) {
        let data = new google.visualization.DataTable();
        let cols = result.head.vars;
        let rows = result.results.bindings;
        let noCols = cols.length;
        let noRows = rows.length;
        for (let col of cols) {
            // RDF Term	JSON form
            // IRI I	{"type": "uri", "value": "I"}
            // Literal S	{"type": "literal","value": "S"}
            // Literal S with language tag L	{ "type": "literal", "value": "S", "xml:lang": "L"}
            // Literal S with datatype IRI D	{ "type": "literal", "value": "S", "datatype": "D"}
            // Blank node, label B	{"type": "bnode", "value": "B"}
            let colName = col.replace('_', ' ');
            if (noRows > 0) {
                let type = rows[0][col] !== undefined ? rows[0][col].datatype : '';
                if (type === 'http://www.w3.org/2001/XMLSchema#decimal' ||
                    type === 'http://www.w3.org/2001/XMLSchema#integer') {
                    data.addColumn('number', colName);
                }
                else if (type === 'http://www.w3.org/2001/XMLSchema#boolean') {
                    data.addColumn('boolean', colName);
                }
                else if (type === 'http://www.w3.org/2001/XMLSchema#date') {
                    data.addColumn('date', colName);
                }
                else if (type === 'http://www.w3.org/2001/XMLSchema#dateTime') {
                    data.addColumn('datetime', colName);
                }
                else if (type === 'http://www.w3.org/2001/XMLSchema#time') {
                    data.addColumn('timeofday', colName);
                }
                else {
                    data.addColumn('string', colName);
                }
            }
            else {
                data.addColumn('string', colName);
            }
        }
        if (noRows > 0) {
            data.addRows(noRows);
            let i = 0;
            for (let x = 0; x < noRows; x++) {
                for (let y = 0; y < noCols; y++) {
                    // data.setCell(x,y,rows[x][cols[y]].value)
                    let type = rows[x][cols[y]] !== undefined && rows[x][cols[y]].hasOwnProperty('datatype') ? rows[x][cols[y]].datatype : '';
                    if (type === 'http://www.w3.org/2001/XMLSchema#integer') {
                        data.setCell(x, y, parseInt(rows[x][cols[y]].value, 10));
                    }
                    else if (type === 'http://www.w3.org/2001/XMLSchema#decimal' || type === 'http://www.w3.org/2001/XMLSchema#float') {
                        data.setCell(x, y, parseFloat(rows[x][cols[y]].value));
                    }
                    else if (type === 'http://www.w3.org/2001/XMLSchema#boolean') {
                        // todo test
                        // 'boolean' - JavaScript boolean value ('true' or 'false'). Example value: v:'true'
                        data.setCell(x, y, rows[x][cols[y]].value === 'true' ? true : false);
                    }
                    else if (type === 'http://www.w3.org/2001/XMLSchema#date') {
                        // todo test
                        // 'date' - JavaScript Date object (zero-based month), with the time truncated. Example value: v:new Date(2008, 0, 15)
                        data.setCell(x, y, new Date(rows[x][cols[y]].value));
                    }
                    else if (type === 'http://www.w3.org/2001/XMLSchema#dateTime') {
                        // todo test
                        // 'datetime' - JavaScript Date object including the time. Example value: v:new Date(2008, 0, 15, 14, 30, 45)
                        data.setCell(x, y, new Date(rows[x][cols[y]].value));
                    }
                    else if (type === 'http://www.w3.org/2001/XMLSchema#time') {
                        // todo test
                        // 'timeofday' - Array of three numbers and an optional fourth, representing hour (0 indicates midnight), minute, second, and optional millisecond. Example values: v:[8, 15, 0], v: [6, 12, 1, 144]
                        let time = new Date(rows[x][cols[y]].value);
                        data.setCell(x, y, [time.getHours(), time.getHours(), time.getSeconds(), time.getMilliseconds()]);
                    }
                    else {
                        if (rows[x][cols[y]] === undefined) {
                            data.setCell(x, y, null);
                        }
                        else {
                            // 'string' - JavaScript string value. Example value: v:'hello'
                            //let value = rows[x][cols[y]] !== undefined ? rows[x][cols[y]].value : ''
                            data.setCell(x, y, rows[x][cols[y]].value);
                        }
                    }
                    // console.log('rows['+x+'][cols['+y+']].value = ' + rows[x][cols[y]].value + ' ' +
                    // rows[x][cols[y]].datatype)
                }
            }
        }
        this._dataTable = data;
    }
    convertResultRaw(result) {
        let data = new google.visualization.DataTable();
        let cols = result.head.vars;
        let rows = result.results.bindings;
        let noCols = cols.length;
        let noRows = rows.length;
        for (let col of cols) {
            data.addColumn('string', col);
        }
        if (noRows > 0) {
            data.addRows(noRows);
            let i = 0;
            for (let x = 0; x < noRows; x++) {
                for (let y = 0; y < noCols; y++) {
                    if (rows[x][cols[y]] === undefined) {
                        data.setCell(x, y, '');
                    }
                    else {
                        data.setCell(x, y, rows[x][cols[y]].value.toString());
                    }
                }
            }
        }
        this._dataTable = data;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9nb29nbGUvRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQTs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLElBQUk7SUFJYixZQUFhLE1BQTZCLEVBQUUsTUFBZSxLQUFLO1FBQzVELElBQUksR0FBRyxFQUFFLENBQUM7WUFDTixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDakMsQ0FBQzthQUFNLENBQUM7WUFDSixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzlCLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBTyxDQUFFLEdBQVcsRUFBRSxJQUFZO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBRUQsWUFBWTtRQUNSLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQTtJQUMxQixDQUFDO0lBRU8sYUFBYSxDQUFFLE1BQTZCO1FBQ2hELElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUUvQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQTtRQUMzQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQTtRQUNsQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBQ3hCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7UUFFeEIsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNuQixxQkFBcUI7WUFDckIsc0NBQXNDO1lBQ3RDLDZDQUE2QztZQUM3QyxvRkFBb0Y7WUFDcEYsb0ZBQW9GO1lBQ3BGLHNEQUFzRDtZQUN0RCxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQTtZQUNsQyxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7Z0JBQ2xFLElBQUksSUFBSSxLQUFLLDBDQUEwQztvQkFDbkQsSUFBSSxLQUFLLDBDQUEwQyxFQUFFLENBQUM7b0JBQ3RELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFBO2dCQUNyQyxDQUFDO3FCQUFNLElBQUksSUFBSSxLQUFLLDBDQUEwQyxFQUFFLENBQUM7b0JBQzdELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFBO2dCQUN0QyxDQUFDO3FCQUFNLElBQUksSUFBSSxLQUFLLHVDQUF1QyxFQUFFLENBQUM7b0JBQzFELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO2dCQUNuQyxDQUFDO3FCQUFNLElBQUksSUFBSSxLQUFLLDJDQUEyQyxFQUFFLENBQUM7b0JBQzlELElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFBO2dCQUN2QyxDQUFDO3FCQUFNLElBQUksSUFBSSxLQUFLLHVDQUF1QyxFQUFFLENBQUM7b0JBQzFELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFBO2dCQUN4QyxDQUFDO3FCQUFNLENBQUM7b0JBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUE7Z0JBQ3JDLENBQUM7WUFDTCxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFDckMsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ1QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQzlCLDJDQUEyQztvQkFDM0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7b0JBQ3pILElBQUksSUFBSSxLQUFLLDBDQUEwQyxFQUFFLENBQUM7d0JBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO29CQUM1RCxDQUFDO3lCQUFNLElBQUksSUFBSSxLQUFLLDBDQUEwQyxJQUFJLElBQUksS0FBSyx3Q0FBd0MsRUFBRSxDQUFDO3dCQUNsSCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO29CQUMxRCxDQUFDO3lCQUFNLElBQUksSUFBSSxLQUFLLDBDQUEwQyxFQUFFLENBQUM7d0JBQzdELFlBQVk7d0JBQ1osb0ZBQW9GO3dCQUNwRixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQ3hFLENBQUM7eUJBQU0sSUFBSSxJQUFJLEtBQUssdUNBQXVDLEVBQUUsQ0FBQzt3QkFDMUQsWUFBWTt3QkFDWixzSEFBc0g7d0JBQ3RILElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtvQkFDeEQsQ0FBQzt5QkFBTSxJQUFJLElBQUksS0FBSywyQ0FBMkMsRUFBRSxDQUFDO3dCQUM5RCxZQUFZO3dCQUNaLDZHQUE2Rzt3QkFDN0csSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO29CQUN4RCxDQUFDO3lCQUFNLElBQUksSUFBSSxLQUFLLHVDQUF1QyxFQUFFLENBQUM7d0JBQzFELFlBQVk7d0JBQ1osb01BQW9NO3dCQUNwTSxJQUFJLElBQUksR0FBUSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7d0JBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQ3JHLENBQUM7eUJBQU0sQ0FBQzt3QkFDSixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUUsQ0FBQzs0QkFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO3dCQUM1QixDQUFDOzZCQUFNLENBQUM7NEJBQ0osK0RBQStEOzRCQUMvRCwwRUFBMEU7NEJBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7d0JBQzlDLENBQUM7b0JBQ0wsQ0FBQztvQkFDRCxtRkFBbUY7b0JBQ25GLDZCQUE2QjtnQkFDakMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUE7SUFDMUIsQ0FBQztJQUVPLGdCQUFnQixDQUFFLE1BQTZCO1FBQ25ELElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUUvQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQTtRQUMzQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQTtRQUNsQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBQ3hCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7UUFFeEIsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNqQyxDQUFDO1FBRUQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNULEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUM5QixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUUsQ0FBQzt3QkFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO29CQUMxQixDQUFDO3lCQUFNLENBQUM7d0JBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtvQkFDekQsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQTtJQUMxQixDQUFDO0NBQ0oifQ==
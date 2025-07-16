import { Chart } from '../Chart';
/**
 * Todo Table
 * @class sgvizler.visualization.Table
 * @tutorial sgvizler_visualization_Table
 * @memberof sgvizler.visualization
 */
export class Table extends Chart {
    get icon() {
        return 'fa fa-table';
    }
    get label() {
        return 'Table';
    }
    get subtext() {
        return 'simple table';
    }
    get classFullName() {
        return 'sgvizler.visualization.Table';
    }
    get tutorialFilename() {
        return 'tutorial-sgvizler_visualization_Table.html';
    }
    constructor() {
        super();
        //  addDependence(SparqlResult)
    }
    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Table
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let opt = Object.assign({ headings: 'true' }, currentChart.options);
            let cols = result.head.vars;
            let rows = result.results.bindings;
            let noCols = cols.length;
            let noRows = rows.length;
            // console.log(opt)
            let html = '<table ' + currentChart.getHTMLStyleOrClass() + ' >';
            if (opt.headings === 'true') {
                html += '<tr>';
                for (let col of cols) {
                    html += '<th>' + col + '</th>';
                }
                html += '</tr>';
            }
            for (let row of rows) {
                html += '<tr>';
                for (let col of cols) {
                    html += '<td>' + row[col].value + '</td>';
                }
                html += '</tr>';
            }
            html += '</table>';
            let obj = document.getElementById(currentChart.container.id);
            if (obj) {
                obj.innerHTML = html;
            }
            // finish
            resolve();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2d2aXpsZXIvdmlzdWFsaXphdGlvbi9UYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBSWhDOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLEtBQU0sU0FBUSxLQUFLO0lBRTVCLElBQVcsSUFBSTtRQUNYLE9BQU8sYUFBYSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDWixPQUFPLE9BQU8sQ0FBQTtJQUNsQixDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2QsT0FBTyxjQUFjLENBQUE7SUFDekIsQ0FBQztJQUVELElBQVcsYUFBYTtRQUNwQixPQUFPLDhCQUE4QixDQUFBO0lBQ3pDLENBQUM7SUFFRCxJQUFXLGdCQUFnQjtRQUN2QixPQUFPLDRDQUE0QyxDQUFBO0lBQ3ZELENBQUM7SUFFRDtRQUNJLEtBQUssRUFBRSxDQUFBO1FBQ1QsK0JBQStCO0lBQ2pDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksSUFBSSxDQUFFLE1BQTZCO1FBQ3RDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQTtRQUN2QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU07WUFDeEMsa0JBQWtCO1lBQ2xCLHVDQUF1QztZQUN2QyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUVuRSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQTtZQUMzQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQTtZQUNsQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1lBQ3hCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7WUFFeEIsbUJBQW1CO1lBQ25CLElBQUksSUFBSSxHQUFHLFNBQVMsR0FBRyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxJQUFJLENBQUE7WUFDaEUsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRSxDQUFDO2dCQUMxQixJQUFJLElBQUksTUFBTSxDQUFBO2dCQUNkLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ25CLElBQUksSUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQTtnQkFDbEMsQ0FBQztnQkFDRCxJQUFJLElBQUksT0FBTyxDQUFBO1lBQ25CLENBQUM7WUFFRCxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNuQixJQUFJLElBQUksTUFBTSxDQUFBO2dCQUNkLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ25CLElBQUksSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUE7Z0JBQzdDLENBQUM7Z0JBQ0QsSUFBSSxJQUFJLE9BQU8sQ0FBQTtZQUNuQixDQUFDO1lBRUQsSUFBSSxJQUFJLFVBQVUsQ0FBQTtZQUVsQixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDNUQsSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDTixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtZQUN4QixDQUFDO1lBQ0QsU0FBUztZQUNULE9BQU8sRUFBRSxDQUFBO1FBQ2IsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0oifQ==
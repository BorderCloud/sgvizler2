import {
    Chart,
    SparqlResultInterface
} from '../../sgvizler'

import {Data} from "./Data";
import {API} from "../API";

declare let google: any

/**
 * Todo Table
 * @class google.visualization.Table
 * @tutorial google_visualization_Table
 * @memberof google.visualization
 */
export class Table extends Chart {
    private static _isInit:boolean = false

    private static init(){
        google.charts.load('current', {'packages':['table']});
        Table._isInit = true
    }

    public get icon (): string {
        return 'fa-table'
    }

    public get label (): string {
        return 'Table'
    }

    public get subtext (): string {
        return 'Table'
    }

    public get classFullName (): string {
        return 'google.visualization.Table'
    }

    public get tutorialFilename (): string {
        return 'tutorial-google_visualization_Table.html'
    }

    public constructor () {
        super()
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js')
    }
    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Table
     * @returns {Promise<void>}
     * @param result
     */
    public draw (result: SparqlResultInterface): Promise<any> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)

            let height = '100%'
            if(currentChart.height !== ''){
                height = currentChart.height
            }

            let opt = Object.assign({
                showRowNumber: false,
                width: currentChart.width,
                height: height
            }, currentChart.options)

            if(! Table._isInit){
                Table.init()
            }

            google.charts.setOnLoadCallback(
                ()=>{
                    let data = new Data(result)

                    var table = new google.visualization.Table(document.getElementById(currentChart.container.id));

                    table.draw(data.getDataTable(), currentChart.options);
                }
            );
        })
    }
}

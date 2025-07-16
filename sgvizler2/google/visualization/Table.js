import { Chart, Logger, MESSAGES } from '../../sgvizler';
import { Tools } from '../Tools';
import { Data } from '../Data';
/**
 * Todo Table
 * @class google.visualization.Table
 * @tutorial google_visualization_Table
 * @memberof google.visualization
 */
export class Table extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['table'] });
        Table._isInit = true;
    }
    get icon() {
        return 'fa fa-table';
    }
    get label() {
        return 'Table';
    }
    get subtext() {
        return 'Table';
    }
    get classFullName() {
        return 'google.visualization.Table';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_Table.html';
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
            let height = '100%';
            if (currentChart.height !== '') {
                height = Tools.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
                raw: true,
                showRowNumber: false
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!Table._isInit) {
                Table.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result, opt.raw);
                    let table = new google.visualization.Table(document.getElementById(currentChart.container.id));
                    table.draw(data.getDataTable(), opt);
                }
                catch (error) {
                    console.log(error);
                    Logger.displayFeedback(currentChart.container, MESSAGES.ERROR_CHART, [error]);
                    Logger.log(currentChart.container, 'Chart finished with error : ' + currentChart.container.id);
                }
            });
            // finish
            return resolve();
        });
    }
}
Table._isInit = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ29vZ2xlL3Zpc3VhbGl6YXRpb24vVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUUxQixNQUFNLGdCQUFnQixDQUFBO0FBRXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDaEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQUs5Qjs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTyxLQUFNLFNBQVEsS0FBSztJQUc1QjtRQUNJLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUFFTyxNQUFNLENBQUMsSUFBSTtRQUNmLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUMsQ0FBQTtRQUN0RCxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtJQUN4QixDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ1gsT0FBTyxhQUFhLENBQUE7SUFDeEIsQ0FBQztJQUVELElBQVcsS0FBSztRQUNaLE9BQU8sT0FBTyxDQUFBO0lBQ2xCLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxPQUFPLE9BQU8sQ0FBQTtJQUNsQixDQUFDO0lBRUQsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sNEJBQTRCLENBQUE7SUFDdkMsQ0FBQztJQUVELElBQVcsZ0JBQWdCO1FBQ3ZCLE9BQU8sMENBQTBDLENBQUE7SUFDckQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxJQUFJLENBQUUsTUFBNkI7UUFDdEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtZQUN4QyxrQkFBa0I7WUFDbEIsdUNBQXVDO1lBRXZDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQTtZQUNuQixJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQzdCLE1BQU0sR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3hELENBQUM7WUFFRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNwQixHQUFHLEVBQUUsSUFBSTtnQkFDVCxhQUFhLEVBQUUsS0FBSzthQUN2QixFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUV4QixlQUFlO1lBQ2YsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dCQUNyQixLQUFLLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQ2pELE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQTtZQUVGLElBQUksQ0FBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2xCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUNoQixDQUFDO1lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FDM0IsR0FBRyxFQUFFO2dCQUNELElBQUksQ0FBQztvQkFDRCxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUNuQyxJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO29CQUM5RixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDeEMsQ0FBQztnQkFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO29CQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQ2xCLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtvQkFDN0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFDLDhCQUE4QixHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ2pHLENBQUM7WUFDTCxDQUFDLENBQ0osQ0FBQTtZQUNELFNBQVM7WUFDVCxPQUFPLE9BQU8sRUFBRSxDQUFBO1FBQ3BCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQzs7QUFsRmMsYUFBTyxHQUFZLEtBQUssQ0FBQSJ9
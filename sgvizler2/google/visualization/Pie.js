import { Chart, Logger, MESSAGES } from '../../sgvizler';
import { Tools } from '../Tools';
import { Data } from '../Data';
/**
 * Todo Pie
 * @class google.visualization.Pie
 * @tutorial google_visualization_Pie
 * @memberof google.visualization
 */
export class Pie extends Chart {
    get icon() {
        return 'fas fa-chart-pie';
    }
    get label() {
        return 'Pie';
    }
    get subtext() {
        return 'Pie';
    }
    get classFullName() {
        return 'google.visualization.Pie';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_Pie.html';
    }
    constructor() {
        super();
        this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        Pie._isInit = true;
    }
    /**
     * Make a standard simple html pie.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Pie
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            let height = 500;
            if (currentChart.height !== '') {
                height = Tools.decodeFormatSize(currentChart.height);
            }
            let opt = Object.assign({
            // Default options
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!Pie._isInit) {
                Pie.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let Pie = new google.visualization.PieChart(document.getElementById(currentChart.container.id));
                    Pie.draw(data.getDataTable(), opt);
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
Pie._isInit = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGllLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dvb2dsZS92aXN1YWxpemF0aW9uL1BpZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBRTFCLE1BQU0sZ0JBQWdCLENBQUE7QUFFdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUNoQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBSzlCOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLEdBQUksU0FBUSxLQUFLO0lBQzFCLElBQVcsSUFBSTtRQUNYLE9BQU8sa0JBQWtCLENBQUE7SUFDN0IsQ0FBQztJQUVELElBQVcsS0FBSztRQUNaLE9BQU8sS0FBSyxDQUFBO0lBQ2hCLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxPQUFPLEtBQUssQ0FBQTtJQUNoQixDQUFDO0lBRUQsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sMEJBQTBCLENBQUE7SUFDckMsQ0FBQztJQUVELElBQVcsZ0JBQWdCO1FBQ3ZCLE9BQU8sd0NBQXdDLENBQUE7SUFDbkQsQ0FBQztJQUlEO1FBQ0ksS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsU0FBUyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUVPLE1BQU0sQ0FBQyxJQUFJO1FBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzVELEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO0lBQ3RCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksSUFBSSxDQUFFLE1BQTZCO1FBQ3RDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQTtRQUN2QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU07WUFDeEMsa0JBQWtCO1lBQ2xCLHVDQUF1QztZQUV2QyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUE7WUFDaEIsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUM3QixNQUFNLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN4RCxDQUFDO1lBRUQsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNwQixrQkFBa0I7YUFDckIsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUE7WUFFeEIsZUFBZTtZQUNmLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDckIsS0FBSyxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO2dCQUNqRCxNQUFNLEVBQUUsTUFBTTthQUNqQixDQUFDLENBQUE7WUFFRixJQUFJLENBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNoQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDZCxDQUFDO1lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FDM0IsR0FBRyxFQUFFO2dCQUNELElBQUksQ0FBQztvQkFDRCxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDM0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFDL0YsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQ3RDLENBQUM7Z0JBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztvQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNsQixNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7b0JBQzdFLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBQyw4QkFBOEIsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUNqRyxDQUFDO1lBQ0wsQ0FBQyxDQUNKLENBQUE7WUFDRCxTQUFTO1lBQ1QsT0FBTyxPQUFPLEVBQUUsQ0FBQTtRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7O0FBN0RjLFdBQU8sR0FBWSxLQUFLLENBQUEifQ==
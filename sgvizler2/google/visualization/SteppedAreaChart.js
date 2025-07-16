import { Chart, Logger, MESSAGES } from '../../sgvizler';
import { Tools } from '../Tools';
import { Data } from '../Data';
/**
 * Todo SteppedAreaChart
 * @class google.visualization.SteppedAreaChart
 * @tutorial google_visualization_SteppedAreaChart
 * @memberof google.visualization
 */
export class SteppedAreaChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        SteppedAreaChart._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-area';
    }
    get label() {
        return 'SteppedAreaChart';
    }
    get subtext() {
        return 'SteppedAreaChart';
    }
    get classFullName() {
        return 'google.visualization.SteppedAreaChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_SteppedAreaChart.html';
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
            if (!SteppedAreaChart._isInit) {
                SteppedAreaChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let steppedAreaChart = new google.visualization.SteppedAreaChart(document.getElementById(currentChart.container.id));
                    steppedAreaChart.draw(data.getDataTable(), opt);
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
SteppedAreaChart._isInit = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RlcHBlZEFyZWFDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nb29nbGUvdmlzdWFsaXphdGlvbi9TdGVwcGVkQXJlYUNoYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFFMUIsTUFBTSxnQkFBZ0IsQ0FBQTtBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ2hDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFLOUI7Ozs7O0dBS0c7QUFDSCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsS0FBSztJQUd2QztRQUNJLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUFFTyxNQUFNLENBQUMsSUFBSTtRQUNmLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLFVBQVUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQTtRQUMxRCxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO0lBQ25DLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDWCxPQUFPLG1CQUFtQixDQUFBO0lBQzlCLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDWixPQUFPLGtCQUFrQixDQUFBO0lBQzdCLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxPQUFPLGtCQUFrQixDQUFBO0lBQzdCLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDcEIsT0FBTyx1Q0FBdUMsQ0FBQTtJQUNsRCxDQUFDO0lBRUQsSUFBVyxnQkFBZ0I7UUFDdkIsT0FBTyxxREFBcUQsQ0FBQTtJQUNoRSxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLElBQUksQ0FBRSxNQUE2QjtRQUN0QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUE7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLGtCQUFrQjtZQUNsQix1Q0FBdUM7WUFFdkMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFBO1lBQ2hCLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDN0IsTUFBTSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDeEQsQ0FBQztZQUVELElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDcEIsa0JBQWtCO2FBQ3JCLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBRXhCLGVBQWU7WUFDZixHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ3JCLEtBQUssRUFBRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztnQkFDakQsTUFBTSxFQUFFLE1BQU07YUFDakIsQ0FBQyxDQUFBO1lBRUYsSUFBSSxDQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM3QixnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUMzQixDQUFDO1lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FDM0IsR0FBRyxFQUFFO2dCQUNELElBQUksQ0FBQztvQkFDRCxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDM0IsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQ3BILGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQ25ELENBQUM7Z0JBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztvQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNsQixNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7b0JBQzdFLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBQyw4QkFBOEIsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUNqRyxDQUFDO1lBQ0wsQ0FBQyxDQUNKLENBQUE7WUFDRCxTQUFTO1lBQ1QsT0FBTyxPQUFPLEVBQUUsQ0FBQTtRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7O0FBakZjLHdCQUFPLEdBQVksS0FBSyxDQUFBIn0=
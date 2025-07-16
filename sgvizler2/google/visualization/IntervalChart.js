import { Chart, Logger, MESSAGES } from '../../sgvizler';
import { Tools } from '../Tools';
import { Data } from '../Data';
/**
 * Todo IntervalChart
 * @class google.visualization.IntervalChart
 * @tutorial google_visualization_IntervalChart
 * @memberof google.visualization
 */
export class IntervalChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart', 'line'] });
        IntervalChart._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-line';
    }
    get label() {
        return 'Interval';
    }
    get subtext() {
        return 'Interval';
    }
    get classFullName() {
        return 'google.visualization.IntervalChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_IntervalChart.html';
    }
    /**
     * Draw a IntervalChart
     * @memberOf IntervalChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
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
            if (!IntervalChart._isInit) {
                IntervalChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let cols = result.head.vars;
                    let noCols = cols.length;
                    for (let y = 2; y < noCols; y++) {
                        data.setRole(y, 'interval');
                    }
                    let line = new google.visualization.LineChart(document.getElementById(currentChart.container.id));
                    line.draw(data.getDataTable(), opt);
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
IntervalChart._isInit = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJ2YWxDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nb29nbGUvdmlzdWFsaXphdGlvbi9JbnRlcnZhbENoYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFFMUIsTUFBTSxnQkFBZ0IsQ0FBQTtBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ2hDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFLOUI7Ozs7O0dBS0c7QUFDSCxNQUFNLE9BQU8sYUFBYyxTQUFRLEtBQUs7SUFHcEM7UUFDSSxLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsMENBQTBDLENBQUMsQ0FBQTtJQUN4RSxDQUFDO0lBRU8sTUFBTSxDQUFDLElBQUk7UUFDZixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQyxVQUFVLEVBQUUsQ0FBQyxXQUFXLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUFBO1FBQ2pFLGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO0lBQ2hDLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDWCxPQUFPLG1CQUFtQixDQUFBO0lBQzlCLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDWixPQUFPLFVBQVUsQ0FBQTtJQUNyQixDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2QsT0FBTyxVQUFVLENBQUE7SUFDckIsQ0FBQztJQUVELElBQVcsYUFBYTtRQUNwQixPQUFPLG9DQUFvQyxDQUFBO0lBQy9DLENBQUM7SUFFRCxJQUFXLGdCQUFnQjtRQUN2QixPQUFPLGtEQUFrRCxDQUFBO0lBQzdELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLElBQUksQ0FBRSxNQUE2QjtRQUN0QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUE7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNO1lBRXhDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQTtZQUNoQixJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQzdCLE1BQU0sR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3hELENBQUM7WUFFRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3BCLGtCQUFrQjthQUNyQixFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUV4QixlQUFlO1lBQ2YsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dCQUNyQixLQUFLLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQ2pELE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQTtZQUVGLElBQUksQ0FBRSxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzFCLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUN4QixDQUFDO1lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FDM0IsR0FBRyxFQUFFO2dCQUNELElBQUksQ0FBQztvQkFDRCxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDM0IsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7b0JBQzNCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7b0JBRXhCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsVUFBVSxDQUFDLENBQUE7b0JBQzlCLENBQUM7b0JBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFDakcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQ3ZDLENBQUM7Z0JBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztvQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNsQixNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7b0JBQzdFLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBQyw4QkFBOEIsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUNqRyxDQUFDO1lBQ0wsQ0FBQyxDQUNKLENBQUE7WUFDRCxTQUFTO1lBQ1QsT0FBTyxPQUFPLEVBQUUsQ0FBQTtRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7O0FBcEZjLHFCQUFPLEdBQVksS0FBSyxDQUFBIn0=
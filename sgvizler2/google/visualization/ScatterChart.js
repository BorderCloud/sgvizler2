import { Chart, Logger, MESSAGES } from '../../sgvizler';
import { Tools } from '../Tools';
import { Data } from '../Data';
/**
 * Todo ScatterChart
 * @class google.visualization.ScatterChart
 * @tutorial google_visualization_ScatterChart
 * @memberof google.visualization
 */
export class ScatterChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        ScatterChart._isInit = true;
    }
    get icon() {
        return 'fa fa-circle';
    }
    get label() {
        return 'ScatterChart';
    }
    get subtext() {
        return 'ScatterChart';
    }
    get classFullName() {
        return 'google.visualization.ScatterChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_ScatterChart.html';
    }
    /**
     * Make a standard simple html table.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf ScatterChart
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
            if (!ScatterChart._isInit) {
                ScatterChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let chart = new google.visualization.ScatterChart(document.getElementById(currentChart.container.id));
                    chart.draw(data.getDataTable(), opt);
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
ScatterChart._isInit = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NhdHRlckNoYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dvb2dsZS92aXN1YWxpemF0aW9uL1NjYXR0ZXJDaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBRTFCLE1BQU0sZ0JBQWdCLENBQUE7QUFFdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUNoQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBSzlCOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLFlBQWEsU0FBUSxLQUFLO0lBR25DO1FBQ0ksS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVPLE1BQU0sQ0FBQyxJQUFJO1FBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUMsVUFBVSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxDQUFBO1FBQzFELFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO0lBQy9CLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDWCxPQUFPLGNBQWMsQ0FBQTtJQUN6QixDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ1osT0FBTyxjQUFjLENBQUE7SUFDekIsQ0FBQztJQUVELElBQVcsT0FBTztRQUNkLE9BQU8sY0FBYyxDQUFBO0lBQ3pCLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDcEIsT0FBTyxtQ0FBbUMsQ0FBQTtJQUM5QyxDQUFDO0lBRUQsSUFBVyxnQkFBZ0I7UUFDdkIsT0FBTyxpREFBaUQsQ0FBQTtJQUM1RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLElBQUksQ0FBRSxNQUE2QjtRQUN0QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUE7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLGtCQUFrQjtZQUNsQix1Q0FBdUM7WUFFdkMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFBO1lBQ2hCLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDN0IsTUFBTSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDeEQsQ0FBQztZQUVELElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDcEIsa0JBQWtCO2FBQ3JCLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBRXhCLGVBQWU7WUFDZixHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ3JCLEtBQUssRUFBRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztnQkFDakQsTUFBTSxFQUFFLE1BQU07YUFDakIsQ0FBQyxDQUFBO1lBRUYsSUFBSSxDQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDekIsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ3ZCLENBQUM7WUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUMzQixHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxDQUFDO29CQUNELElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUMzQixJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO29CQUNyRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDeEMsQ0FBQztnQkFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO29CQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQ2xCLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtvQkFDN0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFDLDhCQUE4QixHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ2pHLENBQUM7WUFDTCxDQUFDLENBQ0osQ0FBQTtZQUVELFNBQVM7WUFDVCxPQUFPLE9BQU8sRUFBRSxDQUFBO1FBQ3BCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQzs7QUFsRmMsb0JBQU8sR0FBWSxLQUFLLENBQUEifQ==
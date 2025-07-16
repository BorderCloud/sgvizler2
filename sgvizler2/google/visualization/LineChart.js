import { Chart, Logger, MESSAGES } from '../../sgvizler';
import { Tools } from '../Tools';
import { Data } from '../Data';
/**
 * Todo LineChart
 * @class google.visualization.LineChart
 * @tutorial google_visualization_LineChart
 * @memberof google.visualization
 */
export class LineChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart', 'line'] });
        LineChart._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-line';
    }
    get label() {
        return 'Line';
    }
    get subtext() {
        return 'Line';
    }
    get classFullName() {
        return 'google.visualization.LineChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_LineChart.html';
    }
    /**
     * Draw a LineChart
     * @memberOf LineChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            let height = '500';
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
            if (!LineChart._isInit) {
                LineChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
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
LineChart._isInit = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGluZUNoYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dvb2dsZS92aXN1YWxpemF0aW9uL0xpbmVDaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBRTFCLE1BQU0sZ0JBQWdCLENBQUE7QUFFdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUNoQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBSzlCOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLFNBQVUsU0FBUSxLQUFLO0lBR2hDO1FBQ0ksS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVPLE1BQU0sQ0FBQyxJQUFJO1FBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUMsVUFBVSxFQUFFLENBQUMsV0FBVyxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQTtRQUNqRSxTQUFTLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtJQUM1QixDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ1gsT0FBTyxtQkFBbUIsQ0FBQTtJQUM5QixDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ1osT0FBTyxNQUFNLENBQUE7SUFDakIsQ0FBQztJQUVELElBQVcsT0FBTztRQUNkLE9BQU8sTUFBTSxDQUFBO0lBQ2pCLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDcEIsT0FBTyxnQ0FBZ0MsQ0FBQTtJQUMzQyxDQUFDO0lBRUQsSUFBVyxnQkFBZ0I7UUFDdkIsT0FBTyw4Q0FBOEMsQ0FBQTtJQUN6RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxJQUFJLENBQUUsTUFBNkI7UUFDdEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtZQUV4QyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUE7WUFDbEIsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUM3QixNQUFNLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN4RCxDQUFDO1lBRUQsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNwQixrQkFBa0I7YUFDckIsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUE7WUFFeEIsZUFBZTtZQUNmLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDckIsS0FBSyxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO2dCQUNqRCxNQUFNLEVBQUUsTUFBTTthQUNqQixDQUFDLENBQUE7WUFFRixJQUFJLENBQUUsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN0QixTQUFTLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDcEIsQ0FBQztZQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQzNCLEdBQUcsRUFBRTtnQkFDRCxJQUFJLENBQUM7b0JBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7b0JBQzNCLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQ2pHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO2dCQUN2QyxDQUFDO2dCQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7b0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDbEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO29CQUM3RSxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUMsOEJBQThCLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDakcsQ0FBQztZQUNMLENBQUMsQ0FDSixDQUFBO1lBQ0QsU0FBUztZQUNULE9BQU8sT0FBTyxFQUFFLENBQUE7UUFDcEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDOztBQTdFYyxpQkFBTyxHQUFZLEtBQUssQ0FBQSJ9
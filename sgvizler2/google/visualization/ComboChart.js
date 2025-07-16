import { Chart, Logger, MESSAGES } from '../../sgvizler';
import { Tools } from '../Tools';
import { Data } from '../Data';
/**
 * Todo ComboChart
 * @class google.visualization.ComboChart
 * @tutorial google_visualization_ComboChart
 * @memberof google.visualization
 */
export class ComboChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        ComboChart._isInit = true;
    }
    get icon() {
        return 'fa fa-signal';
    }
    get label() {
        return 'ComboChart';
    }
    get subtext() {
        return 'ComboChart';
    }
    get classFullName() {
        return 'google.visualization.ComboChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_ComboChart.html';
    }
    /**
     * Make a standard simple html ComboChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf ComboChart
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
            if (!ComboChart._isInit) {
                ComboChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let comboChart = new google.visualization.ComboChart(document.getElementById(currentChart.container.id));
                    comboChart.draw(data.getDataTable(), opt);
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
ComboChart._isInit = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tYm9DaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nb29nbGUvdmlzdWFsaXphdGlvbi9Db21ib0NoYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFFMUIsTUFBTSxnQkFBZ0IsQ0FBQTtBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ2hDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFLOUI7Ozs7O0dBS0c7QUFDSCxNQUFNLE9BQU8sVUFBVyxTQUFRLEtBQUs7SUFHakM7UUFDSSxLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsMENBQTBDLENBQUMsQ0FBQTtJQUN4RSxDQUFDO0lBRU8sTUFBTSxDQUFDLElBQUk7UUFDZixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDNUQsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUE7SUFDN0IsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNYLE9BQU8sY0FBYyxDQUFBO0lBQ3pCLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDWixPQUFPLFlBQVksQ0FBQTtJQUN2QixDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2QsT0FBTyxZQUFZLENBQUE7SUFDdkIsQ0FBQztJQUVELElBQVcsYUFBYTtRQUNwQixPQUFPLGlDQUFpQyxDQUFBO0lBQzVDLENBQUM7SUFFRCxJQUFXLGdCQUFnQjtRQUN2QixPQUFPLCtDQUErQyxDQUFBO0lBQzFELENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksSUFBSSxDQUFFLE1BQTZCO1FBQ3RDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQTtRQUN2QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU07WUFDeEMsa0JBQWtCO1lBQ2xCLHVDQUF1QztZQUV2QyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUE7WUFDaEIsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUM3QixNQUFNLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN4RCxDQUFDO1lBRUQsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNwQixrQkFBa0I7YUFDckIsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUE7WUFFeEIsZUFBZTtZQUNmLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDckIsS0FBSyxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO2dCQUNqRCxNQUFNLEVBQUUsTUFBTTthQUNqQixDQUFDLENBQUE7WUFFRixJQUFJLENBQUUsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN2QixVQUFVLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDckIsQ0FBQztZQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQzNCLEdBQUcsRUFBRTtnQkFDRCxJQUFJLENBQUM7b0JBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7b0JBQzNCLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQ3hHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO2dCQUM3QyxDQUFDO2dCQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7b0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDbEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO29CQUM3RSxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUMsOEJBQThCLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDakcsQ0FBQztZQUNMLENBQUMsQ0FDSixDQUFBO1lBQ0QsU0FBUztZQUNULE9BQU8sT0FBTyxFQUFFLENBQUE7UUFDcEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDOztBQWpGYyxrQkFBTyxHQUFZLEtBQUssQ0FBQSJ9
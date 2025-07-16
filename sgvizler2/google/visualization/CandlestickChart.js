import { Chart, Logger, MESSAGES, Messages } from '../../sgvizler';
import { Tools } from '../Tools';
import { Data } from '../Data';
/**
 * Todo CandlestickChart
 * @class google.visualization.CandlestickChart
 * @tutorial google_visualization_CandlestickChart
 * @memberof google.visualization
 */
export class CandlestickChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        CandlestickChart._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-line';
    }
    get label() {
        return 'CandlestickChart';
    }
    get subtext() {
        return 'CandlestickChart';
    }
    get classFullName() {
        return 'google.visualization.CandlestickChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_CandlestickChart.html';
    }
    /**
     * Make a standard simple html CandlestickChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf CandlestickChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // console.log(noCols + " x " + noRows)
            if (result.results.bindings.length === 0) {
                return reject(Messages.get(MESSAGES.ERROR_DATA_NOROW));
            }
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
            if (!CandlestickChart._isInit) {
                CandlestickChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let candlestickChart = new google.visualization.CandlestickChart(document.getElementById(currentChart.container.id));
                    candlestickChart.draw(data.getDataTable(), opt);
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
CandlestickChart._isInit = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FuZGxlc3RpY2tDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nb29nbGUvdmlzdWFsaXphdGlvbi9DYW5kbGVzdGlja0NoYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLEVBRVgsTUFBTSxnQkFBZ0IsQ0FBQTtBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ2hDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFLOUI7Ozs7O0dBS0c7QUFDSCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsS0FBSztJQUd2QztRQUNJLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUFFTyxNQUFNLENBQUMsSUFBSTtRQUNmLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLFVBQVUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQTtRQUMxRCxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO0lBQ25DLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDWCxPQUFPLG1CQUFtQixDQUFBO0lBQzlCLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDWixPQUFPLGtCQUFrQixDQUFBO0lBQzdCLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxPQUFPLGtCQUFrQixDQUFBO0lBQzdCLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDcEIsT0FBTyx1Q0FBdUMsQ0FBQTtJQUNsRCxDQUFDO0lBRUQsSUFBVyxnQkFBZ0I7UUFDdkIsT0FBTyxxREFBcUQsQ0FBQTtJQUNoRSxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLElBQUksQ0FBRSxNQUE2QjtRQUN0QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUE7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLHVDQUF1QztZQUV2QyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUcsQ0FBQztnQkFDeEMsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBO1lBQzFELENBQUM7WUFFRCxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUE7WUFDaEIsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUM3QixNQUFNLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN4RCxDQUFDO1lBRUQsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNwQixrQkFBa0I7YUFDckIsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUE7WUFFeEIsZUFBZTtZQUNmLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDckIsS0FBSyxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO2dCQUNqRCxNQUFNLEVBQUUsTUFBTTthQUNqQixDQUFDLENBQUE7WUFFRixJQUFJLENBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzdCLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFBO1lBQzNCLENBQUM7WUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUMzQixHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxDQUFDO29CQUNELElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUMzQixJQUFJLGdCQUFnQixHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFDckgsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDbEQsQ0FBQztnQkFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO29CQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQ2xCLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtvQkFDN0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFDLDhCQUE4QixHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ2pHLENBQUM7WUFDTCxDQUFDLENBQ0osQ0FBQTtZQUNELFNBQVM7WUFDVCxPQUFPLE9BQU8sRUFBRSxDQUFBO1FBQ3BCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQzs7QUFwRmMsd0JBQU8sR0FBWSxLQUFLLENBQUEifQ==
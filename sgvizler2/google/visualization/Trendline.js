import { Chart, Logger, MESSAGES } from '../../sgvizler';
import { Tools } from '../Tools';
import { Data } from '../Data';
/**
 * Todo Trendline
 * @class google.visualization.Trendline
 * @tutorial google_visualization_Trendline
 * @memberof google.visualization
 */
export class Trendline extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        Trendline._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-line';
    }
    get label() {
        return 'Trendline';
    }
    get subtext() {
        return 'Trendline';
    }
    get classFullName() {
        return 'google.visualization.Trendline';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_Trendline.html';
    }
    /**
     * Make a standard simple html Trendline.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Trendline
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
                trendlines: { 0: {} }
            }, currentChart.options);
            // fix the size
            opt = Object.assign(opt, {
                width: Tools.decodeFormatSize(currentChart.width),
                height: height
            });
            if (!Trendline._isInit) {
                Trendline.init();
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
Trendline._isInit = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlbmRsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dvb2dsZS92aXN1YWxpemF0aW9uL1RyZW5kbGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBRTFCLE1BQU0sZ0JBQWdCLENBQUE7QUFFdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUNoQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBSzlCOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLFNBQVUsU0FBUSxLQUFLO0lBR2hDO1FBQ0ksS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVPLE1BQU0sQ0FBQyxJQUFJO1FBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzNELFNBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO0lBQzVCLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDWCxPQUFPLG1CQUFtQixDQUFBO0lBQzlCLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDWixPQUFPLFdBQVcsQ0FBQTtJQUN0QixDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2QsT0FBTyxXQUFXLENBQUE7SUFDdEIsQ0FBQztJQUVELElBQVcsYUFBYTtRQUNwQixPQUFPLGdDQUFnQyxDQUFBO0lBQzNDLENBQUM7SUFFRCxJQUFXLGdCQUFnQjtRQUN2QixPQUFPLDhDQUE4QyxDQUFBO0lBQ3pELENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksSUFBSSxDQUFFLE1BQTZCO1FBQ3RDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQTtRQUN2QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU07WUFDeEMsa0JBQWtCO1lBQ2xCLHVDQUF1QztZQUV2QyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUE7WUFDaEIsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUM3QixNQUFNLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN4RCxDQUFDO1lBRUQsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDcEIsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRTthQUN4QixFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUV4QixlQUFlO1lBQ2YsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dCQUNyQixLQUFLLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQ2pELE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQTtZQUVGLElBQUksQ0FBRSxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3RCLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUNwQixDQUFDO1lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FDM0IsR0FBRyxFQUFFO2dCQUNELElBQUksQ0FBQztvQkFDRCxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDM0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFDckcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQ3hDLENBQUM7Z0JBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztvQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNsQixNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7b0JBQzdFLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBQyw4QkFBOEIsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUNqRyxDQUFDO1lBQ0wsQ0FBQyxDQUNKLENBQUE7WUFDRCxTQUFTO1lBQ1QsT0FBTyxPQUFPLEVBQUUsQ0FBQTtRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7O0FBakZjLGlCQUFPLEdBQVksS0FBSyxDQUFBIn0=
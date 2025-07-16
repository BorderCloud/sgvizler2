import { Chart, Logger, MESSAGES } from '../../sgvizler';
import { Tools } from '../Tools';
import { Data } from '../Data';
/**
 * Todo BubbleChart
 * @class google.visualization.BubbleChart
 * @tutorial google_visualization_BubbleChart
 * @memberof google.visualization
 */
export class BubbleChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        BubbleChart._isInit = true;
    }
    get icon() {
        return 'fa fa-circle';
    }
    get label() {
        return 'BubbleChart';
    }
    get subtext() {
        return 'BubbleChart';
    }
    get classFullName() {
        return 'google.visualization.BubbleChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_BubbleChart.html';
    }
    /**
     * Make a standard simple html bubbleChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf BubbleChart
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
            if (!BubbleChart._isInit) {
                BubbleChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let chart = new google.visualization.BubbleChart(document.getElementById(currentChart.container.id));
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
BubbleChart._isInit = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnViYmxlQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ29vZ2xlL3Zpc3VhbGl6YXRpb24vQnViYmxlQ2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUUxQixNQUFNLGdCQUFnQixDQUFBO0FBRXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDaEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQUs5Qjs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTyxXQUFZLFNBQVEsS0FBSztJQUdsQztRQUNJLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUFFTyxNQUFNLENBQUMsSUFBSTtRQUNmLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLFVBQVUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQTtRQUMxRCxXQUFXLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtJQUM5QixDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ1gsT0FBTyxjQUFjLENBQUE7SUFDekIsQ0FBQztJQUVELElBQVcsS0FBSztRQUNaLE9BQU8sYUFBYSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxPQUFPLGFBQWEsQ0FBQTtJQUN4QixDQUFDO0lBRUQsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sa0NBQWtDLENBQUE7SUFDN0MsQ0FBQztJQUVELElBQVcsZ0JBQWdCO1FBQ3ZCLE9BQU8sZ0RBQWdELENBQUE7SUFDM0QsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxJQUFJLENBQUUsTUFBNkI7UUFDdEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtZQUN4QyxrQkFBa0I7WUFDbEIsdUNBQXVDO1lBRXZDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQTtZQUNoQixJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQzdCLE1BQU0sR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3hELENBQUM7WUFFRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3BCLGtCQUFrQjthQUNyQixFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUV4QixlQUFlO1lBQ2YsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dCQUNyQixLQUFLLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQ2pELE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQTtZQUVGLElBQUksQ0FBRSxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3hCLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUN0QixDQUFDO1lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FDM0IsR0FBRyxFQUFFO2dCQUNELElBQUksQ0FBQztvQkFDRCxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDM0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFDbkcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQ3pDLENBQUM7Z0JBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztvQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNsQixNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7b0JBQzdFLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBQyw4QkFBOEIsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUNqRyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDTixTQUFTO1lBQ1QsT0FBTyxPQUFPLEVBQUUsQ0FBQTtRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7O0FBaEZjLG1CQUFPLEdBQVksS0FBSyxDQUFBIn0=
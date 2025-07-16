import { Chart, Logger, MESSAGES } from '../../sgvizler';
import { Tools } from '../Tools';
import { Data } from '../Data';
/**
 * Todo AnnotationChart
 * @class google.visualization.AnnotationChart
 * @tutorial google_visualization_AnnotationChart
 * @memberof google.visualization
 */
export class AnnotationChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['annotationchart'] });
        AnnotationChart._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-line';
    }
    get label() {
        return 'AnnotationChart';
    }
    get subtext() {
        return 'AnnotationChart';
    }
    get classFullName() {
        return 'google.visualization.AnnotationChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_AnnotationChart.html';
    }
    /**
     * Make a standard simple html AnnotationChart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf AnnotationChart
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
            if (!AnnotationChart._isInit) {
                AnnotationChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let AnnotationChart = new google.visualization.AnnotationChart(document.getElementById(currentChart.container.id));
                    AnnotationChart.draw(data.getDataTable(), opt);
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
AnnotationChart._isInit = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5ub3RhdGlvbkNoYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dvb2dsZS92aXN1YWxpemF0aW9uL0Fubm90YXRpb25DaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBRTFCLE1BQU0sZ0JBQWdCLENBQUE7QUFFdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUNoQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBSzlCOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLGVBQWdCLFNBQVEsS0FBSztJQUd0QztRQUNJLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUFFTyxNQUFNLENBQUMsSUFBSTtRQUNmLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLFVBQVUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEVBQUMsQ0FBQyxDQUFBO1FBQ2hFLGVBQWUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO0lBQ2xDLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDWCxPQUFPLG1CQUFtQixDQUFBO0lBQzlCLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDWixPQUFPLGlCQUFpQixDQUFBO0lBQzVCLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxPQUFPLGlCQUFpQixDQUFBO0lBQzVCLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDcEIsT0FBTyxzQ0FBc0MsQ0FBQTtJQUNqRCxDQUFDO0lBRUQsSUFBVyxnQkFBZ0I7UUFDdkIsT0FBTyxvREFBb0QsQ0FBQTtJQUMvRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLElBQUksQ0FBRSxNQUE2QjtRQUN0QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUE7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLGtCQUFrQjtZQUNsQix1Q0FBdUM7WUFFdkMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFBO1lBQ2hCLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDN0IsTUFBTSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDeEQsQ0FBQztZQUVELElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDcEIsa0JBQWtCO2FBQ3JCLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBRXhCLGVBQWU7WUFDZixHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ3JCLEtBQUssRUFBRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztnQkFDakQsTUFBTSxFQUFFLE1BQU07YUFDakIsQ0FBQyxDQUFBO1lBRUYsSUFBSSxDQUFFLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFBO1lBQzFCLENBQUM7WUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUMzQixHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxDQUFDO29CQUNELElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUMzQixJQUFJLGVBQWUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO29CQUNsSCxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDbEQsQ0FBQztnQkFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO29CQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQ2xCLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtvQkFDN0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFDLDhCQUE4QixHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ2pHLENBQUM7WUFDTCxDQUFDLENBQ0osQ0FBQTtZQUNELFNBQVM7WUFDVCxPQUFPLE9BQU8sRUFBRSxDQUFBO1FBQ3BCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQzs7QUFqRmMsdUJBQU8sR0FBWSxLQUFLLENBQUEifQ==
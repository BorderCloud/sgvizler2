import { Chart, Logger, MESSAGES } from '../../sgvizler';
import { Tools } from '../Tools';
import { Data } from '../Data';
/**
 * Todo Histogram
 * @class google.visualization.Histogram
 * @tutorial google_visualization_Histogram
 * @memberof google.visualization
 */
export class Histogram extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['corechart'] });
        Histogram._isInit = true;
    }
    get icon() {
        return 'fas fa-chart-area';
    }
    get label() {
        return 'Histogram';
    }
    get subtext() {
        return 'Histogram';
    }
    get classFullName() {
        return 'google.visualization.Histogram';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_Histogram.html';
    }
    /**
     * Make a standard simple html Histogram.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf Histogram
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
            if (!Histogram._isInit) {
                Histogram.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let histogram = new google.visualization.Histogram(document.getElementById(currentChart.container.id));
                    histogram.draw(data.getDataTable(), opt);
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
Histogram._isInit = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGlzdG9ncmFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dvb2dsZS92aXN1YWxpemF0aW9uL0hpc3RvZ3JhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBRTFCLE1BQU0sZ0JBQWdCLENBQUE7QUFFdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUNoQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBSzlCOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLFNBQVUsU0FBUSxLQUFLO0lBR2hDO1FBQ0ksS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVPLE1BQU0sQ0FBQyxJQUFJO1FBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUMsVUFBVSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxDQUFBO1FBQzFELFNBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO0lBQzVCLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDWCxPQUFPLG1CQUFtQixDQUFBO0lBQzlCLENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDWixPQUFPLFdBQVcsQ0FBQTtJQUN0QixDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2QsT0FBTyxXQUFXLENBQUE7SUFDdEIsQ0FBQztJQUVELElBQVcsYUFBYTtRQUNwQixPQUFPLGdDQUFnQyxDQUFBO0lBQzNDLENBQUM7SUFFRCxJQUFXLGdCQUFnQjtRQUN2QixPQUFPLDhDQUE4QyxDQUFBO0lBQ3pELENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksSUFBSSxDQUFFLE1BQTZCO1FBQ3RDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQTtRQUN2QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU07WUFDeEMsa0JBQWtCO1lBQ2xCLHVDQUF1QztZQUV2QyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUE7WUFDaEIsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUM3QixNQUFNLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN4RCxDQUFDO1lBRUQsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNwQixrQkFBa0I7YUFDckIsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUE7WUFFeEIsZUFBZTtZQUNmLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDckIsS0FBSyxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO2dCQUNqRCxNQUFNLEVBQUUsTUFBTTthQUNqQixDQUFDLENBQUE7WUFFRixJQUFJLENBQUUsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN0QixTQUFTLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDcEIsQ0FBQztZQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQzNCLEdBQUcsRUFBRTtnQkFDRCxJQUFJLENBQUM7b0JBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7b0JBQzNCLElBQUksU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQ3RHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO2dCQUM1QyxDQUFDO2dCQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7b0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDbEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO29CQUM3RSxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUMsOEJBQThCLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDakcsQ0FBQztZQUNMLENBQUMsQ0FDSixDQUFBO1lBQ0QsU0FBUztZQUNULE9BQU8sT0FBTyxFQUFFLENBQUE7UUFDcEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDOztBQWpGYyxpQkFBTyxHQUFZLEtBQUssQ0FBQSJ9
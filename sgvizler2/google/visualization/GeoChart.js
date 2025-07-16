import { Chart, Logger, MESSAGES } from '../../sgvizler';
import { Tools } from '../Tools';
import { Data } from '../Data';
import { API } from '../API';
/**
 * Todo GeoChart
 * @class google.visualization.GeoChart
 * @tutorial google_visualization_GeoChart
 * @memberof google.visualization
 */
export class GeoChart extends Chart {
    constructor() {
        super();
        let dep = this.addScript('https://www.gstatic.com/charts/loader.js');
    }
    static init() {
        google.charts.load('current', { 'packages': ['geochart'], mapsApiKey: API.key });
        GeoChart._isInit = true;
    }
    get icon() {
        return 'fa fa-globe';
    }
    get label() {
        return 'GeoChart';
    }
    get subtext() {
        return 'GeoChart';
    }
    get classFullName() {
        return 'google.visualization.GeoChart';
    }
    get tutorialFilename() {
        return 'tutorial-google_visualization_GeoChart.html';
    }
    /**
     * Make a standard simple html geochart.
     * Available options:
     * - 'headings'   :  "true" / "false"  (default: "true")
     * @memberOf GeoChart
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
            if (!GeoChart._isInit) {
                GeoChart.init();
            }
            google.charts.setOnLoadCallback(() => {
                try {
                    let data = new Data(result);
                    let geochart = new google.visualization.GeoChart(document.getElementById(currentChart.container.id));
                    geochart.draw(data.getDataTable(), opt);
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
GeoChart._isInit = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VvQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ29vZ2xlL3Zpc3VhbGl6YXRpb24vR2VvQ2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUUxQixNQUFNLGdCQUFnQixDQUFBO0FBRXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDaEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQUM5QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBSTVCOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLFFBQVMsU0FBUSxLQUFLO0lBRy9CO1FBQ0ksS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVPLE1BQU0sQ0FBQyxJQUFJO1FBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUMsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFBO1FBQzlFLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO0lBQzNCLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDWCxPQUFPLGFBQWEsQ0FBQTtJQUN4QixDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ1osT0FBTyxVQUFVLENBQUE7SUFDckIsQ0FBQztJQUVELElBQVcsT0FBTztRQUNkLE9BQU8sVUFBVSxDQUFBO0lBQ3JCLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDcEIsT0FBTywrQkFBK0IsQ0FBQTtJQUMxQyxDQUFDO0lBRUQsSUFBVyxnQkFBZ0I7UUFDdkIsT0FBTyw2Q0FBNkMsQ0FBQTtJQUN4RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLElBQUksQ0FBRSxNQUE2QjtRQUN0QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUE7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLGtCQUFrQjtZQUNsQix1Q0FBdUM7WUFFdkMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFBO1lBQ2hCLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDN0IsTUFBTSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDeEQsQ0FBQztZQUVELElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDcEIsa0JBQWtCO2FBQ3JCLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBRXhCLGVBQWU7WUFDZixHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ3JCLEtBQUssRUFBRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztnQkFDakQsTUFBTSxFQUFFLE1BQU07YUFDakIsQ0FBQyxDQUFBO1lBRUYsSUFBSSxDQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ25CLENBQUM7WUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUMzQixHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxDQUFDO29CQUNELElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUMzQixJQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO29CQUNwRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDM0MsQ0FBQztnQkFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO29CQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQ2xCLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtvQkFDN0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFDLDhCQUE4QixHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ2pHLENBQUM7WUFDTCxDQUFDLENBQ0osQ0FBQTtZQUNELFNBQVM7WUFDVCxPQUFPLE9BQU8sRUFBRSxDQUFBO1FBQ3BCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQzs7QUFqRmMsZ0JBQU8sR0FBWSxLQUFLLENBQUEifQ==
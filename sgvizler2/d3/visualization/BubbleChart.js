import { Chart, Core } from '../../sgvizler';
/**
 * Todo BubbleChart
 * @class d3.visualization.BubbleChart
 * @tutorial d3_visualization_BubbleChart
 * @memberof d3.visualization
 */
export class BubbleChart extends Chart {
    get icon() {
        return 'fas fa-chart-pie';
    }
    get label() {
        return 'BubbleChart';
    }
    get subtext() {
        return 'BubbleChart';
    }
    get classFullName() {
        return 'd3.visualization.BubbleChart';
    }
    get tutorialFilename() {
        return 'tutorial-d3_visualization_BubbleChart.html';
    }
    constructor() {
        super();
        //this.addCss(Core.path + '/lib/d3/d3.css')
        let dep = this.addScript(Core.path + 'lib/d3/d3.min.js');
    }
    /**
     * Make a simple pie.
     * Available options:
     * -
     * @memberOf Pie
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            let heightOpt = '100%';
            if (currentChart.height !== '') {
                heightOpt = currentChart.height;
            }
            let opt = Object.assign({
                showRowNumber: false,
                width: currentChart.width,
                height: heightOpt
            }, currentChart.options);
            // build the datatable
            let cols = result.head.vars;
            let rows = result.results.bindings;
            let noCols = cols.length;
            let noRows = rows.length;
            /*let dataset: Array<any> = []
            let label
            let counter
            for (let row of rows) {
                label = row[cols[0]].value
                counter = Number(row[cols[1]].value)
                if ( label === undefined || counter === undefined) {
                    Logger.logSimple('Erreur ? D3JS:pie label ' + label + ' count ' + counter)
                } else {
                    dataset.push({ label: label , count: counter })
                }
            }*/
            // console.log(data)
            // Example
            let containerElement = d3.select('#' + currentChart.container.id);
            let containerElementNode = containerElement.node();
            if (containerElementNode) {
                let width = containerElementNode.clientWidth !== 0 ? containerElementNode.clientWidth : 300;
                let height = containerElementNode.clientHeight !== 0 ? containerElementNode.clientHeight : 150;
                let svg = containerElement.append('svg') // associate our data with the document
                    .attr('width', width)
                    .attr('height', height)
                    .attr('id', 'idtest');
                let margin = { top: 20, right: 20, bottom: 30, left: 40 };
                let widthChart = width - (margin.left + margin.right);
                let heightChart = height - (margin.top + margin.bottom);
                let xScale = d3.scaleLinear();
                let yScale = d3.scaleLinear();
                let xAxisCall = d3.axisBottom();
                let yAxisCall = d3.axisLeft();
                xScale.domain([0, 100]).range([0, widthChart]);
                yScale.domain([0, 100]).range([heightChart, 0]);
                xAxisCall.scale(xScale);
                yAxisCall.scale(yScale);
                let newX = svg.append('g')
                    // .attr('class', 'x axis')
                    .attr('transform', 'translate(' + [margin.left, heightChart + margin.top] + ')')
                    .call(xAxisCall);
                let newY = svg.append('g')
                    // .attr('class', 'y axis')
                    .attr('transform', 'translate(' + [margin.left, margin.top] + ')')
                    .call(yAxisCall);
            }
            // finish
            return resolve();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnViYmxlQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZDMvdmlzdWFsaXphdGlvbi9CdWJibGVDaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsS0FBSyxFQUdMLElBQUksRUFDUCxNQUFNLGdCQUFnQixDQUFBO0FBSXZCOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLFdBQVksU0FBUSxLQUFLO0lBRTlCLElBQVcsSUFBSTtRQUNYLE9BQU8sa0JBQWtCLENBQUE7SUFDN0IsQ0FBQztJQUVELElBQVcsS0FBSztRQUNaLE9BQU8sYUFBYSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxPQUFPLGFBQWEsQ0FBQTtJQUN4QixDQUFDO0lBRUQsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sOEJBQThCLENBQUE7SUFDekMsQ0FBQztJQUVELElBQVcsZ0JBQWdCO1FBQ3ZCLE9BQU8sNENBQTRDLENBQUE7SUFDdkQsQ0FBQztJQUVEO1FBQ0ksS0FBSyxFQUFFLENBQUE7UUFDUCwyQ0FBMkM7UUFDM0MsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxJQUFJLENBQUUsTUFBNkI7UUFDdEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtZQUN4QyxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUE7WUFDdEIsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUM3QixTQUFTLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQTtZQUNuQyxDQUFDO1lBRUQsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDcEIsYUFBYSxFQUFFLEtB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
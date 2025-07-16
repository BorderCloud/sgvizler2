import { Chart, Core } from '../../sgvizler';
/**
 * Todo AreaChart
 * @class d3.visualization.AreaChart
 * @tutorial d3_visualization_AreaChart
 * @memberof d3.visualization
 */
export class AreaChart extends Chart {
    get icon() {
        return 'fas fa-chart-area';
    }
    get label() {
        return 'AreaChart';
    }
    get subtext() {
        return 'AreaChart';
    }
    get classFullName() {
        return 'd3.visualization.AreaChart';
    }
    get tutorialFilename() {
        return 'tutorial-d3_visualization_AreaChart.html';
    }
    constructor() {
        super();
        //this.addCss(Core.path + '/lib/d3/d3.css')
        let dep = this.addScript(Core.path + 'lib/d3/d3.min.js');
    }
    /**
     * Make a simple line.
     * Available options:
     * -
     * @memberOf AreaChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            console.log('test');
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
            /*let cols = result.head.vars
            let rows = result.results.bindings
            let noCols = cols.length
            let noRows = rows.length
            let dataset: Array<any> = []
            let label
            let count
            let data = [{
                date: '1-May-12',
                close: 58.1
            }]
            for (let row of rows) {
                label = row[cols[0]].value
                count = Number(row[cols[1]].value)
                if ( label === undefined || count === undefined) {
                    Logger.logSimple('Erreur ? D3JS:pie label ' + label + ' count ' + count)
                } else {
                    dataset.push({ label: label , count: count })
                }
            }

            console.log(data)
            let margin = {
                top: 30,
                right: 20 * 3,
                bottom: 30,
                left: 50
            }
            let width = 800 - margin.left - margin.right
            let height = 570 - margin.top - margin.bottom
            let parseDate = d3.time.format('%d-%b-%y').parse
            // x axis
            let x = d3.scalePoint().range([0, width])
            let xAxis = d3.axisBottom().scale(x).ticks(15)
            // y axis
            let y = d3.scaleLinear().range([height, 0])
            let yAxis = d3.axisRight().scale(y).ticks(17)

            let valueline = d3.line()
                .x(function (d: any) {
                  return x(d.date)
                })
                .y(function (d: any) {
                  return y(d.close)
                })
            let svg = d3.select( '#' + currentChart.container.id)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
// get data

data.forEach(function (d: any) {
    d.date = parseDate(d.date)
    d.close = +d.close
})
            svg.append('path') // Add the valueline path.
            // .attr('fill', 'none')
           // .attr('stroke', 'steelblue')
           // .attr('stroke-linejoin', 'round')
           // .attr('stroke-linecap', 'round')
           // .attr('stroke-width', 1.5)
          //  .attr('d', valueline(dataset))
           .attr('d', valueline(data))
            svg.append('g') // Add the X Axis
            .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis)
            svg.append('g') // Add the Y Axis
                .attr('class', 'y axis')
                .call(yAxis)*/
            // finish
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
            return resolve();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJlYUNoYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2QzL3Zpc3VhbGl6YXRpb24vQXJlYUNoYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxLQUFLLEVBR0wsSUFBSSxFQUNQLE1BQU0sZ0JBQWdCLENBQUE7QUFJdkI7Ozs7O0dBS0c7QUFDSCxNQUFNLE9BQU8sU0FBVSxTQUFRLEtBQUs7SUFFaEMsSUFBVyxJQUFJO1FBQ1gsT0FBTyxtQkFBbUIsQ0FBQTtJQUM5QixDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ1osT0FBTyxXQUFXLENBQUE7SUFDdEIsQ0FBQztJQUVELElBQVcsT0FBTztRQUNkLE9BQU8sV0FBVyxDQUFBO0lBQ3RCLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDcEIsT0FBTyw0QkFBNEIsQ0FBQTtJQUN2QyxDQUFDO0lBRUQsSUFBVyxnQkFBZ0I7UUFDdkIsT0FBTywwQ0FBMEMsQ0FBQTtJQUNyRCxDQUFDO0lBRUQ7UUFDSSxLQUFLLEVBQUUsQ0FBQTtRQUNQLDJDQUEyQztRQUMzQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUMsQ0FBQTtJQUM1RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLElBQUksQ0FBRSxNQUE2QjtRQUN0QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUE7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLGtCQUFrQjtZQUNsQix1Q0FBdUM7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNuQixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUE7WUFDdEIsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUM3QixTQUFTLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQTtZQUNuQyxD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
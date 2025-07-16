/** Work in progress, help us ! */
import { Chart, Logger, Core } from '../../sgvizler';
/**
 * Todo BarChart
 * @class d3.visualization.BarChart
 * @tutorial d3_visualization_BarChart
 * @memberof d3.visualization
 */
export class BarChart extends Chart {
    get icon() {
        return 'far fa-chart-bar';
    }
    get label() {
        return 'BarChart';
    }
    get subtext() {
        return 'BarChart';
    }
    get classFullName() {
        return 'd3.visualization.BarChart';
    }
    get tutorialFilename() {
        return 'tutorial-d3_visualization_BarChart.html';
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
     * @memberOf BarChart
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
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
            let dataset = [];
            let label;
            let counter;
            for (let row of rows) {
                label = row[cols[0]].value;
                counter = Number(row[cols[1]].value);
                if (label === undefined || counter === undefined) {
                    Logger.logSimple('Erreur ? D3JS:pie label ' + label + ' count ' + counter);
                }
                else {
                    dataset.push({ label: label, count: counter });
                }
            }
            // console.log(data)
            let containerElement = d3.select('#' + currentChart.container.id);
            let containerElementNode = containerElement.node();
            if (containerElementNode) {
                let width = containerElementNode.clientWidth !== 0 ? containerElementNode.clientWidth : 300;
                let height = containerElementNode.clientHeight !== 0 ? containerElementNode.clientHeight : 150;
                let svg = containerElement.append('svg') // associate our data with the document
                    .attr('width', width)
                    .attr('height', height)
                    .attr('id', 'idtest');
                let radius = Math.min(width, height) / 2;
                svg = svg.append('g') // make a group to hold our pie chart
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
                // var donutWidth = 75;
                /*let legendRectSize = 18
                let legendSpacing = 4
                let color = d3.scaleOrdinal(d3.schemeCategory10)*/
                /*let arc = d3.arc()
                   // .innerRadius(radius - donutWidth)
                    .innerRadius(0)
                    .outerRadius(radius)
                let pie = d3.pie()
                    .value(function (d: any) { return d.count })
                    .sort(null)*/
                /*let path = svg.selectAll('path')
                    .data(pie(dataset)
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function (d: any, i: any) {
                        return color(d.data.label)
                    })*/
                let bars = svg.selectAll('rect')
                    .data(dataset)
                    .enter()
                    .append('rect')
                    .attr('width', function (i) { return i.count / 10000; })
                    .attr('height', 50)
                    .attr('y', function (i, j) { return j * 50; })
                    .attr('fill', '#3399FF');
                console.log('dataset : ' + dataset);
                // Todo limit nb (look pie chart of Google)
                /*let legend = svg.selectAll('.legend')
                    .data(color.domain())
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function (d: any, i: any) {
                        let height = legendRectSize + legendSpacing
                        let offset = height * color.domain().length / 2
                        let horz = -2 * legendRectSize
                        let vert = i * height - offset
                        return 'translate(' + (horz + radius * 2 + 20 ) + ',' + vert + ')'
                    })
                legend.append('rect')
                    .attr('width', legendRectSize)
                    .attr('height', legendRectSize)
                    .style('fill', color)
                    .style('stroke', color)
                legend.append('text')
                    .attr('x', legendRectSize + legendSpacing)
                    .attr('y', legendRectSize - legendSpacing)
                    .text(function (d: any) { return d })*/
            }
            // finish
            return resolve();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFyQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZDMvdmlzdWFsaXphdGlvbi9CYXJDaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxrQ0FBa0M7QUFFbEMsT0FBTyxFQUNILEtBQUssRUFFTCxNQUFNLEVBQ04sSUFBSSxFQUNQLE1BQU0sZ0JBQWdCLENBQUE7QUFJdkI7Ozs7O0dBS0c7QUFDSCxNQUFNLE9BQU8sUUFBUyxTQUFRLEtBQUs7SUFFL0IsSUFBVyxJQUFJO1FBQ1gsT0FBTyxrQkFBa0IsQ0FBQTtJQUM3QixDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ1osT0FBTyxVQUFVLENBQUE7SUFDckIsQ0FBQztJQUVELElBQVcsT0FBTztRQUNkLE9BQU8sVUFBVSxDQUFBO0lBQ3JCLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDcEIsT0FBTywyQkFBMkIsQ0FBQTtJQUN0QyxDQUFDO0lBRUQsSUFBVyxnQkFBZ0I7UUFDdkIsT0FBTyx5Q0FBeUMsQ0FBQTtJQUNwRCxDQUFDO0lBRUQ7UUFDSSxLQUFLLEVBQUUsQ0FBQTtRQUNQLDJDQUEyQztRQUMzQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUMsQ0FBQTtJQUM1RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLElBQUksQ0FBRSxNQUE2QjtRQUN0QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUE7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLGtCQUFrQjtZQUNsQix1Q0FBdUM7WUFFdkMsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFBO1lBQ3RCLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDN0IsU0FBUyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUE7WUFDbkMsQ0FBQztZQUVELElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ3BCLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUs7Z0JBQ3pCLE1BQU0sRUFBRSxTQUFTO2FBQ3BCLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBRXhCLHNCQUFzQjtZQUN0QixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQTtZQUMzQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQTtZQUNsQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1lBQ3hCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7WUFDeEIsSUFBSSxPQUFPLEdBQWUsRUFBRSxDQUFBO1lBQzVCLElBQUksS0FBSyxDQUFBO1lBQ1QsSUFBSSxPQUFPLENBQUE7WUFDWCxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNuQixLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtnQkFDMUIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3BDLElBQUssS0FBSyxLQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFLENBQUM7b0JBQ2hELE1BQU0sQ0FBQyxTQUFTLENBQUMsMEJBQTBCLEdBQUcsS0FBSyxHQUFHLFNBQVMsR0FBRyxPQUFPLENBQUMsQ0FBQTtnQkFDOUUsQ0FBQztxQkFBSyxDQUFDO29CQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFHLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO2dCQUNuRCxDQUFDO1lBQ0wsQ0FBQztZQUVELG9CQUFvQjtZQUNwQixJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDakUsSUFBSSxvQkFBb0IsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQVMsQ0FBQTtZQUN6RCxJQUFJLG9CQUFvQixFQUFFLENBQUM7Z0JBQ3ZCLElBQUksS0FBSyxHQUFHLG9CQUFvQixDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO2dCQUMzRixJQUFJLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtnQkFDOUYsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLHVDQUF1QztxQkFDM0UsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7cUJBQ3BCLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO3FCQUN0QixJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO2dCQUV6QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBRXhDLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLHFDQUFxQztxQkFDdEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxZQUFZLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFBO2dCQUU3RSx1QkFBdUI7Z0JBQ3ZCOztrRUFFa0Q7Z0JBRWxEOzs7Ozs7aUNBTWlCO2dCQUNqQjs7Ozs7Ozt3QkFPUTtnQkFFUixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztxQkFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQztxQkFDYixLQUFLLEVBQUU7cUJBQ1AsTUFBTSxDQUFDLE1BQU0sQ0FBQztxQkFDZCxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUM7cUJBQzNELElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO3FCQUNsQixJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBTSxFQUFFLENBQU0sSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUM7cUJBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUE7Z0JBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFBO2dCQUduQywyQ0FBMkM7Z0JBQzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyREFvQjJDO1lBQy9DLENBQUM7WUFDRCxTQUFTO1lBQ1QsT0FBTyxPQUFPLEVBQUUsQ0FBQTtRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FFSiJ9
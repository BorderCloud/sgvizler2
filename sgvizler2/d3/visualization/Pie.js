import { Chart, Logger, Core } from '../../sgvizler';
/**
 * Todo Pie
 * @class d3.visualization.Pie
 * @tutorial d3_visualization_Pie
 * @memberof d3.visualization
 */
export class Pie extends Chart {
    get icon() {
        return 'fas fa-chart-pie';
    }
    get label() {
        return 'Pie';
    }
    get subtext() {
        return 'Pie';
    }
    get classFullName() {
        return 'd3.visualization.Pie';
    }
    get tutorialFilename() {
        return 'tutorial-d3_visualization_Pie.html';
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
                let legendRectSize = 18;
                let legendSpacing = 4;
                let color = d3.scaleOrdinal(d3.schemeCategory10);
                let arc = d3.arc()
                    // .innerRadius(radius - donutWidth)
                    .innerRadius(0)
                    .outerRadius(radius);
                let pie = d3.pie()
                    .value(function (d) { return d.count; })
                    .sort(null);
                let path = svg.selectAll('path')
                    .data(pie(dataset))
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function (d, i) {
                    return color(d.data.label);
                });
                // Todo limit nb (look pie chart of Google)
                let legend = svg.selectAll('.legend')
                    .data(color.domain())
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function (d, i) {
                    let height = legendRectSize + legendSpacing;
                    let offset = height * color.domain().length / 2;
                    let horz = -2 * legendRectSize;
                    let vert = i * height - offset;
                    return 'translate(' + (horz + radius * 2 + 20) + ',' + vert + ')';
                });
                legend.append('rect')
                    .attr('width', legendRectSize)
                    .attr('height', legendRectSize)
                    .style('fill', color)
                    .style('stroke', color);
                legend.append('text')
                    .attr('x', legendRectSize + legendSpacing)
                    .attr('y', legendRectSize - legendSpacing)
                    .text(function (d) { return d; });
            }
            // finish
            return resolve();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGllLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2QzL3Zpc3VhbGl6YXRpb24vUGllLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxLQUFLLEVBRUwsTUFBTSxFQUNOLElBQUksRUFDUCxNQUFNLGdCQUFnQixDQUFBO0FBSXZCOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLEdBQUksU0FBUSxLQUFLO0lBRTFCLElBQVcsSUFBSTtRQUNYLE9BQU8sa0JBQWtCLENBQUE7SUFDN0IsQ0FBQztJQUVELElBQVcsS0FBSztRQUNaLE9BQU8sS0FBSyxDQUFBO0lBQ2hCLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxPQUFPLEtBQUssQ0FBQTtJQUNoQixDQUFDO0lBRUQsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sc0JBQXNCLENBQUE7SUFDakMsQ0FBQztJQUVELElBQVcsZ0JBQWdCO1FBQ3ZCLE9BQU8sb0NBQW9DLENBQUE7SUFDL0MsQ0FBQztJQUVEO1FBQ0ksS0FBSyxFQUFFLENBQUE7UUFDUCwyQ0FBMkM7UUFDM0MsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxJQUFJLENBQUUsTUFBNkI7UUFDdEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtZQUd4QyxrQkFBa0I7WUFDbEIsdUNBQXVDO1lBRXZDLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQTtZQUN0QixJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQzdCLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFBO1lBQ25DLENBQUM7WUFFRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFD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
import { Chart, Core } from '../../sgvizler';
/**
 * Todo ColumnChart
 * @class d3.visualization.ColumnChart
 * @tutorial d3_visualization_ColumnChart
 * @memberof d3.visualization
 */
export class ColumnChart extends Chart {
    get icon() {
        return 'far fa-chart-bar';
    }
    get label() {
        return 'ColumnChart';
    }
    get subtext() {
        return 'ColumnChart';
    }
    get classFullName() {
        return 'd3.visualization.ColumnChart';
    }
    get tutorialFilename() {
        return 'tutorial-d3_visualization_ColumnChart.html';
    }
    constructor() {
        super();
        //this.addCss(Core.path + '/lib/d3/d3.css')
        let dep = this.addScript(Core.path + 'lib/d3/d3.min.js');
    }
    /**
     * Make a simple ColumnChart.
     * Available options:
     * -
     * @memberOf ColumnChart
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
            /*
                        // build the datatable
                        let cols = result.head.vars
                        let rows = result.results.bindings
                        let noCols = cols.length
                        let noRows = rows.length
                        let dataset: Array<any> = []
                        let label
                        let counter
                        for (let row of rows) {
                            label = row[cols[0]].value
                            counter = Number(row[cols[1]].value)
                            if ( label === undefined || counter === undefined) {
                                Logger.logSimple('Erreur ? D3JS:ColumnChart label ' + label + ' count ' + counter)
                            }else {
                                dataset.push({ label: label , count: counter })
                            }
                        }
            
                        // console.log(data)
                        let containerElement = d3.select('#' + currentChart.container.id)
                        let containerElementNode = containerElement.node() as any
                        if (containerElementNode) {
                            let width = containerElementNode.clientWidth !== 0 ? containerElementNode.clientWidth : 300
                            let height = containerElementNode.clientHeight !== 0 ? containerElementNode.clientHeight : 150
                            let svg = containerElement.append('svg') // associate our data with the document
                                .attr('width', width)
                                .attr('height', height)
                                .attr('id', 'idtest')
            
                            let radius = Math.min(width, height) / 2
            
                            svg = svg.append('g') // make a group to hold our ColumnChart chart
                                .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
            
                            // var donutWidth = 75;
                            let legendRectSize = 18
                            let legendSpacing = 4
                            let color = d3.scaleOrdinal(d3.schemeCategory10)
            
                            let arc = d3.arc()
                               // .innerRadius(radius - donutWidth)
                                .innerRadius(0)
                                .outerRadius(radius)
                            let ColumnChart = d3.ColumnChart()
                                .value(function (d: any) { return d.count })
                                .sort(null)
                            let path = svg.selectAll('path')
                                .data(ColumnChart(dataset))
                                .enter()
                                .append('path')
                                .attr('d', arc)
                                .attr('fill', function (d: any, i: any) {
                                    return color(d.data.label)
                                })
            
                            // Todo limit nb (look ColumnChart chart of Google)
                            let legend = svg.selectAll('.legend')
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
                                .text(function (d: any) { return d })
                        }
                        */
            // finish
            return resolve();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sdW1uQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZDMvdmlzdWFsaXphdGlvbi9Db2x1bW5DaGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsS0FBSyxFQUdMLElBQUksRUFDUCxNQUFNLGdCQUFnQixDQUFBO0FBSXZCOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLFdBQVksU0FBUSxLQUFLO0lBRWxDLElBQVcsSUFBSTtRQUNYLE9BQU8sa0JBQWtCLENBQUE7SUFDN0IsQ0FBQztJQUVELElBQVcsS0FBSztRQUNaLE9BQU8sYUFBYSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxPQUFPLGFBQWEsQ0FBQTtJQUN4QixDQUFDO0lBRUQsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sOEJBQThCLENBQUE7SUFDekMsQ0FBQztJQUVELElBQVcsZ0JBQWdCO1FBQ3ZCLE9BQU8sNENBQTRDLENBQUE7SUFDdkQsQ0FBQztJQUVEO1FBQ0ksS0FBSyxFQUFFLENBQUE7UUFDUCwyQ0FBMkM7UUFDM0MsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxJQUFJLENBQUUsTUFBNkI7UUFDdEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtZQUN4QyxrQkFBa0I7WUFDbEIsdUNBQXVDO1lBRXZDLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQTtZQUN0QixJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQzdCLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFBO1lBQ25DLENBQUM7WUFFRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNwQixhQUFhLEVBQUUsS0FBSztnQkFDcEIsS0FBSyxFQUFFLFlBQVksQ0FBQyxLQUFLO2dCQUN6QixNQUFNLEVBQUUsU0FBUzthQUNwQixFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkErRWM7WUFDRixTQUFTO1lBQ1QsT0FBTyxPQUFPLEVBQUUsQ0FBQTtRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FFSiJ9
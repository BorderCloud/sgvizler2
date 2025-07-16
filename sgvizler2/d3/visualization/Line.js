import { Chart, Logger, Core } from '../../sgvizler';
/**
 * Todo Line
 * @class d3.visualization.Line
 * @tutorial d3_visualization_Line
 * @memberof d3.visualization
 */
export class Line extends Chart {
    get icon() {
        return 'fas fa-chart-line';
    }
    get label() {
        return 'Line';
    }
    get subtext() {
        return 'Line';
    }
    get classFullName() {
        return 'd3.visualization.Line';
    }
    get tutorialFilename() {
        return 'tutorial-d3_visualization_Line.html';
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
     * @memberOf Line
     * @returns {Promise<void>}
     * @param result
     */
    draw(result) {
        let currentChart = this;
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            //console.log('test')
            let heightOpt = '100%';
            if (currentChart.height !== '') {
                heightOpt = currentChart.height;
            }
            let opt = Object.assign({
                showRowNumber: true,
                width: currentChart.width,
                height: heightOpt
                // hAxisscaleType: true
            }, currentChart.options);
            // build the datatable
            let cols = result.head.vars;
            let rows = result.results.bindings;
            let noCols = cols.length;
            let noRows = rows.length;
            let dataset = [];
            let label;
            let count;
            for (let row of rows) {
                label = row[cols[0]].value;
                count = Number(row[cols[1]].value);
                if (label === undefined || count === undefined) {
                    Logger.logSimple('Erreur ? D3JS:pie label ' + label + ' count ' + count);
                }
                else {
                    dataset.push({ label: label, count: count });
                }
            }
            console.log(dataset);
            let margin = {
                top: 30,
                right: 20 * 3,
                bottom: 30,
                left: 70
            };
            let width = 800 - margin.left - margin.right;
            let height = 570 - margin.top - margin.bottom;
            // x axis
            let x = d3.scalePoint()
                .domain(dataset.map(function (entry) {
                return entry.label;
            }))
                .rangeRound([0, 800])
                .padding(0.5);
            let xAxis = d3.axisBottom().scale(x).ticks(15);
            // y axis
            let y = d3.scaleLinear().range([height, 0]);
            y.domain([0, d3.max(dataset, function (d) {
                    return d.count;
                })]);
            let yAxis = d3.axisLeft().scale(y).ticks(17);
            let valueline = d3.line()
                .x(function (d) {
                return x(d.label);
            })
                .y(function (d) {
                return y(d.count);
            });
            let svg = d3.select('#' + currentChart.container.id)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            svg.append('path') // Add the valueline path.
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke-linejoin', 'round')
                .attr('stroke-linecap', 'round')
                .attr('stroke-width', 1.5)
                .attr('d', valueline(dataset));
            svg.append('g') // Add the X Axis
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis);
            svg.append('g') // Add the Y Axis
                .attr('class', 'y axis')
                .call(yAxis);
            // finish
            return resolve();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kMy92aXN1YWxpemF0aW9uL0xpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILEtBQUssRUFFTCxNQUFNLEVBQ04sSUFBSSxFQUNQLE1BQU0sZ0JBQWdCLENBQUE7QUFJdkI7Ozs7O0dBS0c7QUFDSCxNQUFNLE9BQU8sSUFBSyxTQUFRLEtBQUs7SUFFM0IsSUFBVyxJQUFJO1FBQ1gsT0FBTyxtQkFBbUIsQ0FBQTtJQUM5QixDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ1osT0FBTyxNQUFNLENBQUE7SUFDakIsQ0FBQztJQUVELElBQVcsT0FBTztRQUNkLE9BQU8sTUFBTSxDQUFBO0lBQ2pCLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDcEIsT0FBTyx1QkFBdUIsQ0FBQTtJQUNsQyxDQUFDO0lBRUQsSUFBVyxnQkFBZ0I7UUFDdkIsT0FBTyxxQ0FBcUMsQ0FBQTtJQUNoRCxDQUFDO0lBRUQ7UUFDSSxLQUFLLEVBQUUsQ0FBQTtRQUNQLDJDQUEyQztRQUMzQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUMsQ0FBQTtJQUM1RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLElBQUksQ0FBRSxNQUE2QjtRQUN0QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUE7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLGtCQUFrQjtZQUNsQix1Q0FBdUM7WUFDdkMscUJBQXFCO1lBQ3JCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQTtZQUN0QixJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQzdCLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFBO1lBQ25DLENBQUM7WUFFRCxJQUFJLEdBQUcsR0FBRyxNQUFN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
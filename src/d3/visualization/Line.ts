import {
    Chart,
    SparqlResultInterface,
    Logger,
    Core
} from '../../sgvizler'

declare let d3: any

/**
 * Todo Line
 * @class d3.visualization.Line
 * @tutorial d3_visualization_Line
 * @memberof d3.visualization
 */
export class Line extends Chart {

    public get icon (): string {
        return 'fa-line-chart'
    }

    public get label (): string {
        return 'Line'
    }

    public get subtext (): string {
        return 'Line'
    }

    public get classFullName (): string {
        return 'd3.visualization.Line'
    }

    public get tutorialFilename (): string {
        return 'tutorial-d3_visualization_Line.html'
    }

    public constructor () {
        super()
        //this.addCss(Core.path + '/lib/d3/d3.css')
        let dep = this.addScript(Core.path + '/lib/d3/d3.min.js')
    }

    /**
     * Make a simple line.
     * Available options:
     * -
     * @memberOf Line
     * @returns {Promise<void>}
     * @param result
     */
    public draw (result: SparqlResultInterface): Promise<any> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
            //console.log('test')
            let heightOpt = '100%'
            if (currentChart.height !== '') {
                heightOpt = currentChart.height
            }

            let opt = Object.assign({
                showRowNumber: true,
                width: currentChart.width,
                height: heightOpt
               // hAxisscaleType: true
            }, currentChart.options)

            // build the datatable
            let cols = result.head.vars
            let rows = result.results.bindings
            let noCols = cols.length
            let noRows = rows.length
            let dataset: Array<any> = []
            let label
            let count
            for (let row of rows) {
                label = row[cols[0]].value
                count = Number(row[cols[1]].value)
                if ( label === undefined || count === undefined) {
                    Logger.logSimple('Erreur ? D3JS:pie label ' + label + ' count ' + count)
                } else {
                    dataset.push({ label: label , count: count })
                }
            }

            console.log(dataset)
            let margin = {
                top: 30,
                right: 20 * 3,
                bottom: 30,
                left: 70
            }
            let width = 800 - margin.left - margin.right
            let height = 570 - margin.top - margin.bottom
            // x axis
            let x = d3.scalePoint()
            .domain(dataset.map(function (entry) {
                return entry.label
            }))
            .rangeRound([0, 800])
            .padding(0.5)
            let xAxis = d3.axisBottom().scale(x).ticks(15)
            // y axis
            let y = d3.scaleLinear().range([height, 0])
            y.domain([0, d3.max(dataset, function (d: any) {
            return d.count
            })])
            let yAxis = d3.axisLeft().scale(y).ticks(17)

            let valueline = d3.line()
                .x(function (d: any) {
                  return x(d.label)
                })
                .y(function (d: any) {
                  return y(d.count)
                })
            let svg = d3.select( '#' + currentChart.container.id)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

            svg.append('path') // Add the valueline path.
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 1.5)
            .attr('d', valueline(dataset))
            svg.append('g') // Add the X Axis
            .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis)
            svg.append('g') // Add the Y Axis
                .attr('class', 'y axis')
                .call(yAxis)
            // finish
            return resolve()
        })
    }

}

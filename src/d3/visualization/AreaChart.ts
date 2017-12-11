import {
    Chart,
    SparqlResultInterface,
    Logger,
    Core
} from '../../sgvizler'

declare let d3: any

/**
 * Todo AreaChart
 * @class d3.visualization.AreaChart
 * @tutorial d3_visualization_AreaChart
 * @memberof d3.visualization
 */
export class AreaChart extends Chart {

    public get icon (): string {
        return 'fa-areaChart-chart'
    }

    public get label (): string {
        return 'AreaChart'
    }

    public get subtext (): string {
        return 'AreaChart'
    }

    public get classFullName (): string {
        return 'd3.visualization.AreaChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-d3_visualization_AreaChart.html'
    }

    public constructor () {
        super()
        this.addCss(Core.path + '/lib/d3/d3.css')
        let dep = this.addScript(Core.path + '/lib/d3/d3.js')
    }

    /**
     * Make a simple line.
     * Available options:
     * -
     * @memberOf AreaChart
     * @returns {Promise<void>}
     * @param result
     */
    public draw (result: SparqlResultInterface): Promise<any> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)
console.log('test')
            let heightOpt = '100%'
            if (currentChart.height !== '') {
                heightOpt = currentChart.height
            }

            let opt = Object.assign({
                showRowNumber: false,
                width: currentChart.width,
                height: heightOpt
            }, currentChart.options)

            // build the datatable
            let cols = result.head.vars
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
                .call(yAxis)
            // finish
            return resolve()
                })
            }
        }
    

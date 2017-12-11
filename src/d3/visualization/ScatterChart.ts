import {
    Chart,
    SparqlResultInterface,
    Logger,
    Core
} from '../../sgvizler'

declare let d3: any

/**
 * Todo ScatterChart
 * @class d3.visualization.ScatterChart
 * @tutorial d3_visualization_ScatterChart
 * @memberof d3.visualization
 */
export class ScatterChart extends Chart {

    public get icon (): string {
        return 'fa-ScatterChart-chart'
    }

    public get label (): string {
        return 'ScatterChart'
    }

    public get subtext (): string {
        return 'ScatterChart'
    }

    public get classFullName (): string {
        return 'd3.visualization.ScatterChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-d3_visualization_ScatterChart.html'
    }

    public constructor () {
        super()
        this.addCss(Core.path + '/lib/d3/d3.css')
        let dep = this.addScript(Core.path + '/lib/d3/d3.js')
    }

    /**
     * Make a simple ScatterChart.
     * Available options:
     * -
     * @memberOf ScatterChart
     * @returns {Promise<void>}
     * @param result
     */
    public draw (result: SparqlResultInterface): Promise<any> {
        let currentChart = this
        return new Promise(function (resolve, reject) {
            // transform query
            // console.log(noCols + " x " + noRows)

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
            let counter
            for (let row of rows) {
                label = row[cols[0]].value
                counter = Number(row[cols[1]].value)
                if ( label === undefined || counter === undefined) {
                    Logger.logSimple('Erreur ? D3JS:ScatterChart label ' + label + ' count ' + counter)
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

                svg = svg.append('g') // make a group to hold our ScatterChart chart
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')

                // var donutWidth = 75;
                let legendRectSize = 18
                let legendSpacing = 4
                let color = d3.scaleOrdinal(d3.schemeCategory10)

                let arc = d3.arc()
                   // .innerRadius(radius - donutWidth)
                    .innerRadius(0)
                    .outerRadius(radius)
                let ScatterChart = d3.ScatterChart()
                    .value(function (d: any) { return d.count })
                    .sort(null)
                let path = svg.selectAll('path')
                    .data(ScatterChart(dataset))
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function (d: any, i: any) {
                        return color(d.data.label)
                    })

                // Todo limit nb (look ScatterChart chart of Google)
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
            // finish
            return resolve()
        })
    }

}

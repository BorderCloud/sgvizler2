/** Work in progress, help us ! */

import {
    Chart,
    SparqlResultInterface,
    Logger,
    Core
} from '../../sgvizler'

declare let d3: any

/**
 * Todo BarChart
 * @class d3.visualization.BarChart
 * @tutorial d3_visualization_BarChart
 * @memberof d3.visualization
 */
export class BarChart extends Chart {

    public get icon (): string {
        return 'fa-bar-chart'
    }

    public get label (): string {
        return 'BarChart'
    }

    public get subtext (): string {
        return 'BarChart'
    }

    public get classFullName (): string {
        return 'd3.visualization.BarChart'
    }

    public get tutorialFilename (): string {
        return 'tutorial-d3_visualization_BarChart.html'
    }

    public constructor () {
        super()
        this.addCss(Core.path + '/lib/d3/d3.css')
        let dep = this.addScript(Core.path + '/lib/d3/d3.js')
    }

    /**
     * Make a simple pie.
     * Available options:
     * -
     * @memberOf BarChart
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
                    Logger.logSimple('Erreur ? D3JS:pie label ' + label + ' count ' + counter)
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

                svg = svg.append('g') // make a group to hold our pie chart
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')

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
                    .attr('width', function (i: any) { return i.count / 10000 })
                    .attr('height', 50)
                    .attr('y', function (i: any, j: any) { return j * 50 })
                    .attr('fill', '#3399FF')
                console.log('dataset : ' + dataset)


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
            return resolve()
        })
    }

}

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
            let cols = result.head.lets
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

            console.log(dataset)
            // let containerElement = d3.select('#' + currentChart.container.id)
          //  let containerElementNode = containerElement.node() as any
            /*if (containerElementNode) {
                let width = containerElementNode.clientWidth !== 0 ? containerElementNode.clientWidth : 300
                let height = containerElementNode.clientHeight !== 0 ? containerElementNode.clientHeight : 150
                let svg = containerElement.append('svg') // associate our data with the document
                    .attr('width', width)
                    .attr('height', height)
                    .attr('id', 'idtest')

                let radius = Math.min(width, height) / 2

                svg = svg.append('g') // make a group to hold our ScatterChart chart
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')

                // let donutWidth = 75;
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
                    .text(function (d: any) { return d })*/

                    let width = 500
                    let height = 300
                    let padding = 30
                    let numDataPoints = 50
                    let xRange = Math.random() * 1000
                    let yRange = Math.random() * 1000
                for (let i = 0; i < numDataPoints; i++) {
                  let newNumber1 = Math.floor(Math.random() * xRange)
                  let newNumber2 = Math.floor(Math.random() * yRange)
                   dataset.push([newNumber1, newNumber2])
                }
                // Create scale functions
                let xScale = d3.scale.linear()
                               .domain([0, d3.max(dataset, function (d: any) {
                                 return d[0]
                               }) ])
                               .range([padding, width - padding * 2])
                let yScale = d3.scale.linear()
                               .domain([0, d3.max(dataset, function (d: any) {
                                 return d[1]
                               })])
                               .range([height - padding, padding])
                let rScale = d3.scale.linear()
                                             .domain([0, d3.max(dataset, function (d: any) {
                                 return d[1]
                               })])
                                            .range([2, 5])
                let formatAsPercentage = d3.tickFormat('.1%')
               // Define X axis
                let xAxis = d3.svg.axis()
                              .scale(xScale)
                              .orient('bottom')
                              .ticks(5)
                              .tickFormat(formatAsPercentage)
                // Define Y axis
                let yAxis = d3.svg.axis()
                              .scale(yScale)
                                            .orient('left')
                                            .ticks(5)
                                            .tickFormat(formatAsPercentage)
                // Create SVG element
                let svg = d3.select('#' + currentChart.container.id)
                                        .append('svg')
                                        .attr('width', width)
                                        .attr('height', height)
                                        .append('g')
                // Create circles
                svg.selectAll('circle')
                     .data(dataset)
                   .enter()
                     .append('circle')
                     .attr('cx', function (d: any) {
                       return xScale(d[0])
                     })
                     .attr('cy', function (d: any) {
                       return yScale(d[1])
                     })
                     .attr('r', function (d: any) {
                       return rScale(d[1])
                     })
                // Create labels
                svg.selectAll('text')
                   .data(dataset)
                   .enter()
                   .append('text')
                   .text(function (d: any) {
                           return d[0] + ',' + d[1]
                   })
                   .attr('x', function (d: any) {
                           return xScale(d[0])
                   })
                   .attr('y', function (d: any) {
                           return yScale(d[1])
                   })
                   .attr('font-family', 'sans-serif')
                   .attr('font-size', '11px')
                   .attr('fill', 'red')
                // Create X axis
                svg.append('g')
                   .attr('class', 'axis')
                   .attr('transform', 'translate(0,' + (height - padding) + ')')
                   .call(xAxis)
                // Create Y axis
                svg.append('g')
                   .attr('class', 'axis')
                   .attr('transform', 'translate(' + padding + ',0)')
                   .call(yAxis)
            // finish
            return resolve()
        })
    }

}

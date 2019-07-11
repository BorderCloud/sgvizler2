import {
    Chart,
    SparqlResultInterface,
    Logger,
    Core
} from '../../sgvizler'

declare let d3: any

/**
 * Todo BubbleChart
 * @class d3.visualization.BubbleChart
 * @tutorial d3_visualization_BubbleChart
 * @memberof d3.visualization
 */
export class BubbleChart extends Chart {

        public get icon (): string {
            return 'fas fa-chart-pie'
        }

        public get label (): string {
            return 'BubbleChart'
        }

        public get subtext (): string {
            return 'BubbleChart'
        }

        public get classFullName (): string {
            return 'd3.visualization.BubbleChart'
        }

        public get tutorialFilename (): string {
            return 'tutorial-d3_visualization_BubbleChart.html'
        }

        public constructor () {
            super()
            //this.addCss(Core.path + '/lib/d3/d3.css')
            let dep = this.addScript(Core.path + '/lib/d3/d3.min.js')
        }

        /**
         * Make a simple pie.
         * Available options:
         * -
         * @memberOf Pie
         * @returns {Promise<void>}
         * @param result
         */
        public draw (result: SparqlResultInterface): Promise<any> {
            let currentChart = this
            return new Promise(function (resolve, reject) {
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
                /*let dataset: Array<any> = []
                let label
                let counter
                for (let row of rows) {
                    label = row[cols[0]].value
                    counter = Number(row[cols[1]].value)
                    if ( label === undefined || counter === undefined) {
                        Logger.logSimple('Erreur ? D3JS:pie label ' + label + ' count ' + counter)
                    } else {
                        dataset.push({ label: label , count: counter })
                    }
                }*/

                // console.log(data)

                // Example
                let containerElement = d3.select('#' + currentChart.container.id)
                let containerElementNode = containerElement.node() as any
                if (containerElementNode) {
                    let width = containerElementNode.clientWidth !== 0 ? containerElementNode.clientWidth : 300
                    let height = containerElementNode.clientHeight !== 0 ? containerElementNode.clientHeight : 150
                    let svg = containerElement.append('svg') // associate our data with the document
                        .attr('width', width)
                        .attr('height', height)
                        .attr('id', 'idtest')

                    let margin = { top: 20, right: 20, bottom: 30, left: 40 }
                    let widthChart = width - (margin.left + margin.right)
                    let heightChart = height - (margin.top + margin.bottom)

                    let xScale = d3.scaleLinear()
                    let yScale = d3.scaleLinear()

                    let xAxisCall = d3.axisBottom()
                    let yAxisCall = d3.axisLeft()

                    xScale.domain([0, 100]).range([0, widthChart])
                    yScale.domain([0, 100]).range([heightChart, 0])

                    xAxisCall.scale(xScale)
                    yAxisCall.scale(yScale)

                    let newX = svg.append('g')
                        // .attr('class', 'x axis')
                        .attr('transform', 'translate(' + [margin.left, heightChart + margin.top] + ')')
                        .call(xAxisCall)
                    let newY = svg.append('g')
                        // .attr('class', 'y axis')
                        .attr('transform', 'translate(' + [margin.left, margin.top] + ')')
                        .call(yAxisCall)

                }
                // finish
                return resolve()
            })
        }

    }

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
            return 'fa-pie-chart'
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
            this.addCss(Core.path + '/lib/d3/d3.css')
            let dep = this.addScript(Core.path + '/lib/d3/d3.js')
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
                let margin = {
                    left: 50,
                    top : 30,
                    bottom : 30,
                    right : 60,
                }
                let x = 2
                let y = 4
                let width = 800 - margin.left - margin.right
                let height = 570 - margin.top - margin.bottom
                let xAxis = d3.axisBottom().scale(x).ticks(192)
                let yAxis = d3.axisRight().scale(y).ticks(192)

                let svg = d3.select('#' + currentChart.container.id)
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', 'trasnlate(' + margin.left + ',' + margin.top + ')')
                svg.append('g')
                    .attr('class', 'x axis')
                        .attr('transform', 'trasnlate(0,' + height + ')')
                        .call(xAxis)
                svg.append('g')
                .attr('class', 'y axis')
                    .call(yAxis)
                // finish
                return resolve()
            })
        }
    
    }
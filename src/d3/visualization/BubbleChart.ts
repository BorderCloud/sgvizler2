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
                let pays
                let pib
                let population
                let continent
                for (let row of rows) {
                    pays = row[cols[0]].value
                    pib = Number(row[cols[1]].value)
                    population = Number(row[cols[2]].value)
                    continent = row[cols[3]].value
                    if ( pays === undefined || pib === undefined || population === undefined || continent === undefined) {
                        Logger.logSimple('Erreur ? D3JS:pie pays ' + pays + ' pib ' + pib+ ' population ' + population+ 'continent ' + continent)
                    }else {
                        dataset.push({ pays: pays , pib: pib, population: population, continent: continent})
                    }
                }
                console.log(dataset)


                //============ BUBBLE ===========//
                /*var diameter = 600
                var color = d3.scaleOrdinal(d3.schemeCategory20)
                var bubble = d3.pack(dataset)
                    .size([diameter,diameter])
                    .padding(1.5)
                let svg = d3.select('#' + currentChart.container.id)
                    .append('svg')
                    .attr('width', diameter)
                    .attr('height', diameter)
                    .attr('class', 'bubble')
                var nodes = d3.hierarchy(dataset)
                    .sum(function(d:any) {return d.responseCount})
                var node = svg.selectAll(".node")
                    .data(bubble(nodes).descendants())
                    .enter()
                    .filter(function(d:any){
                        return !d.children
                    })
                    .append('g')
                    .attr('class', 'node')
                    .attr('trasnform', function(d:any){
                        return 'translate(' + d.x +','+d.y+')'
                    })
                node.append('title')
                    .text(function(d:any){
                        return d.pays
                    })    
                node.append('circle')
                    .attr('r', function(d:any){
                        return 50
                    })  
                    .style('fill', function(d:any){
                        return color(d.continent)
                    })
                node.append('text')
                    .attr('dy', '.3em')
                    .style('text-anchor', 'middle')
                    .text(function(d:any){
                        return d.data.pays
                    })
                d3.select(self.frameElement)
                    .style('height', diameter + 'px')*/


                    
                //============ Axes X et Y ===========//
                var diameter = 600
                var color = d3.scaleOrdinal(d3.schemeCategory20)
                var bubble = d3.pack(dataset)
                    .size([diameter,diameter])
                    .padding(1.5)
                let margin = {
                    top: 30,
                    right: 20 * 3,
                    bottom: 30,
                    left: 50
                }
                let width = 800 - margin.left - margin.right
                let height = 570 - margin.top - margin.bottom
                // x axis
                let x = d3.scalePoint()
                .domain(dataset.map(function (entry) {
                    return entry.population
                }))
                .rangeRound([0, 800])
                .padding(0.5)
                let xAxis = d3.axisBottom().scale(x).ticks(10)
                // y axis
                let y = d3.scaleLinear().range([height, 0])
                y.domain([0, d3.max(dataset, function (d: any) {
                return d.pib
                })])
                let yAxis = d3.axisRight().scale(y).ticks(7)
    
                let svg = d3.select( '#' + currentChart.container.id)
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                    .attr('width', diameter)
                    .attr('height', diameter)
                    .attr('class', 'bubble')
                svg.append('g') // Add the X Axis
                .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(xAxis)
                svg.append('g') // Add the Y Axis
                    .attr('class', 'y axis')
                    .call(yAxis)
                    var nodes = d3.hierarchy(dataset)
                    .sum(function(d:any) {return d.responseCount})
                var node = svg.selectAll(".node")
                    .data(bubble(nodes).descendants())
                    .enter()
                    .filter(function(d:any){
                        return !d.children
                    })
                    .append('g')
                    .attr('class', 'node')
                    .attr('trasnform', function(d:any){
                        return 'translate(' + d.x +','+d.y+')'
                    })
                node.append('title')
                    .text(function(d:any){
                        return d.pays
                    })    
                node.append('circle')
                    .attr('r', function(d:any){
                        return 50
                    })  
                    .style('fill', function(d:any){
                        return color(d.continent)
                    })
                node.append('text')
                    .attr('dy', '.3em')
                    .style('text-anchor', 'middle')
                    .text(function(d:any){
                        return d.data.pays
                    })
                d3.select(self.frameElement)
                    .style('height', diameter + 'px')
                // finish
                return resolve()
            })
        }
    
    }
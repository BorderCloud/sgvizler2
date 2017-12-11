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
                let margin = {
                    left: 50,
                    top : 30,
                    bottom : 30,
                    right : 60,
                }
                let width = 500 - margin.left - margin.right
                let height = 500 - margin.top - margin.bottom
                let x = d3.scalePoint()
                    .domain(dataset.map(function(entry:any){
                    return entry.label
                }))
                .rangeRound([0,1000])
                .padding(0.5)
                let y = d3.scaleLinear().range([height,0])
                y.domain([0, d3.max(dataset, function(d:any){
                    return d.count
                })])
                
                let xAxis = d3.axisBottom().scale(x).ticks(4)
                let yAxis = d3.axisRight().scale(y).ticks(4)

                var diameter = 500;

                var bubble = d3.pack()
                .size([diameter,diameter])
                .padding(1.5)

                let svg = d3.select('#' + currentChart.container.id)
                    .append('svg')
                    .attr('width', diameter)
                    .attr('height', diameter)
                    .attr('class', 'bubble')
                svg.append('g')
                    .attr('class', 'x axis')
                        .attr('transform', 'translate(0,' + height + ')')
                        .call(xAxis)
                svg.append('g')
                .attr('class', 'y axis')
                    .call(yAxis)

                var data:any = dataset.map(function(d:any){ d.value = +d["count"]; return d; });
                var nodes = d3.hierarchy(dataset)
                    .sum(function(d:any){return d.responseCount;})
                    
                var node = svg.append("g")
                    .attr("transform", "translate(0,0)")
                    .selectAll(".nodes")
                        .data(bubble(nodes).descendants())
                    .data(nodes)
                    .enter();

                node.append("circle")
                    .attr("r", function(d:any){ return d.r; })
                    .attr("cx", function(d:any){ return d.x; })
                    .attr("cy", function(d:any){ return d.y; })

                node.append("text")
                    .attr("x", function(d:any){ return d.x; })
                    .attr("y", function(d:any){ return d.y + 5; })
                    .attr("text-anchor", "middle")
                    .text(function(d:any){ return d["label"]; })

                // finish
                return resolve()
            })
        }
    
    }
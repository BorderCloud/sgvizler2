import {
    Chart,
    SparqlResultInterface,
    Logger
} from '../../sgvizler'

declare let d3: any

/**
 * Todo Pie
 * @class d3.visualization.Pie
 * @tutorial d3_visualization_Pie
 * @memberof d3.visualization
 */
export class Pie extends Chart {

    public get icon(): string {
        return 'fa-table'
    }

    public get label(): string {
        return 'Pie'
    }

    public get subtext(): string {
        return 'Pie'
    }

    public get classFullName(): string {
        return 'd3.visualization.Pie'
    }

    public get tutorialFilename(): string {
        return 'tutorial-d3_visualization_Pie.html'
    }

    public constructor() {
        super()

        this.addCss('lib/d3/d3.css')
        let dep = this.addScript('lib/d3/d3.js')
    }

    /**
     * Make a simple pie.
     * Available options:
     * -
     * @memberOf Pie
     * @returns {Promise<void>}
     * @param result
     */
    public draw(result: SparqlResultInterface): Promise<any> {
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
            let dataset:Array<any> = []
            let label
            let counter
            for (let row of rows) {
                label =  row[cols[0]].value
                counter = Number(row[cols[1]].value)
                if( label === undefined || counter === undefined){
                    Logger.log("Erreur ? D3JS:pie label "+ label + " count "+ counter)
                }else{
                    dataset.push({ label: label , count: counter })
                }
            }

            // console.log(data)
            let containerElement = d3.select("#" + currentChart.container.id)
            let containerElementNode = <any>containerElement.node()
            if (containerElementNode) {
                let width = containerElementNode.clientWidth !== 0 ? containerElementNode.clientWidth : 300;
                let height = containerElementNode.clientHeight !== 0 ? containerElementNode.clientHeight : 150;
                let svg = containerElement.append("svg")              //associate our data with the document
                    .attr("width", width)
                    .attr("height", height)
                    .attr("id", "idtest")

                let radius = Math.min(width, height) / 2

                svg = svg.append("g") //make a group to hold our pie chart
                    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")    //move the

                //var donutWidth = 75;
                var legendRectSize = 18;
                var legendSpacing = 4;
                var color = d3.scaleOrdinal(d3.schemeCategory10);

                var arc = d3.arc()
                   // .innerRadius(radius - donutWidth)
                    .innerRadius(0)
                    .outerRadius(radius);
                var pie = d3.pie()
                    .value(function(d:any) { return d.count; })
                    .sort(null);
                var path = svg.selectAll('path')
                    .data(pie(dataset))
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function(d:any, i:any) {
                        return color(d.data.label);
                    });

                // Todo limit nb (look pie chart of Google)
                var legend = svg.selectAll('.legend')
                    .data(color.domain())
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function(d:any, i:any) {
                        var height = legendRectSize + legendSpacing;
                        var offset =  height * color.domain().length / 2;
                        var horz = -2 * legendRectSize;
                        var vert = i * height - offset;
                        return 'translate(' + (horz + radius * 2 + 20 ) +',' + vert + ')';
                    });
                legend.append('rect')
                    .attr('width', legendRectSize)
                    .attr('height', legendRectSize)
                    .style('fill', color)
                    .style('stroke', color);
                legend.append('text')
                    .attr('x', legendRectSize + legendSpacing)
                    .attr('y', legendRectSize - legendSpacing)
                    .text(function(d:any) { return d; });
            }
        })
    }

}

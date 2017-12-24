import {
    Tools,
    Chart,
    Core
} from '../sgvizler'

/**
 *
 * @memberof gvizler
 */
export class Select {
    private static readonly CLASS_NAME: string = 'sgvizler-select'

    private static classOfChartSelectedByDefault: string = 'bordercloud.visualization.DataTable'

    /**
     * Stores the charts
     */
    private static charts = [
        {
            // optgroup
            label: 'bordercloud.visualization',
            charts: [
                'bordercloud.visualization.DataTable'
            ]
        },
        {
            // optgroup
            label: 'd3.visualization',
            charts: [
                /*'d3.visualization.AreaChart',
                'd3.visualization.BarChart',
                'd3.visualization.BubbleChart',
                'd3.visualization.ColumnChart',*/
                'd3.visualization.Line',
                'd3.visualization.Pie'
                /*,
                'd3.visualization.ScatterChart'
                */
            ]
        },
        {
            // optgroup
            label: 'leaflet.visualization',
            charts: [
                'leaflet.visualization.Map'
            ]
        },
        {
            // optgroup
            label: 'google.visualization',
            charts: [
                'google.visualization.AnnotationChart',
                'google.visualization.AreaChart',
                'google.visualization.BarChart',
                'google.visualization.BubbleChart',
                'google.visualization.Calendar',
                'google.visualization.CandlestickChart',
                'google.visualization.ColumnChart',
                'google.visualization.ComboChart',
                'google.visualization.GeoChart',
                'google.visualization.Histogram',
                'google.visualization.IntervalChart',
                'google.visualization.LineChart',
                'google.visualization.Map',
                // 'google.visualization.OrgChart',
                'google.visualization.Pie',
                'google.visualization.ScatterChart',
                'google.visualization.Table',
                'google.visualization.Trendline'
            ]
        },
        {
            // optgroup
            label: 'sgvizler.visualization',
            charts:
                [
                    'sgvizler.visualization.Table'
                ]
        }
    ]

    /**
     *
     * @param {string} elementID
     * @returns {Promise<void>}
     */
    public static async drawWithElementId (elementID: string) {
        let element = document.getElementById(elementID)
        if (element) {
            await Select.draw(element)
        }
    }

    /**
     *
     * @param {Element} element
     * @param options
     * @returns {Promise<void>}
     */
    public static async draw (element: Element,options?: any) {
        let nodesOption = Select.getSelectOptions(options)
        for (let node of nodesOption) {
            element.appendChild(node.cloneNode(true))
        }
    }

    /**
     * todo
     */
    public static drawAll () {
        let nodesOption = Select.getSelectOptions()

        let nodesSnapshot = document.evaluate("//select[contains(@class, '" + Select.CLASS_NAME + "')]",
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null )
        for ( let i = 0 ; i < nodesSnapshot.snapshotLength; i++ ) {
            for (let node of nodesOption) {
                nodesSnapshot.snapshotItem(i).appendChild(node.cloneNode(true))
            }
        }
    }

    /**
     * Build url of chart's doc
     * @param {string} classFullName
     * @param {string} pathDoc
     * @returns {string} absolute or relative URL
     */
    public static getChartDoc (classFullName: string,pathDoc?: string) {
        let chartClass = Tools.getObjectByPath(classFullName) as Chart

        let path: string = ''

        if (pathDoc !== undefined) {
            path = pathDoc
        }else {
            path = Core.DOCPATH
        }

        return path + chartClass.tutorialFilename
    }

    private static getSelectOptions (options?: any) {
        let chartClass
        let nodeOption
        let nodeOptgroup
        let attrLabel
        let attrValue
        let attrIcon
        let attrSub
        let attrSelected
        let nodes: Array<Node> = []

        // todo: write the option selected in the doc
        let classSelected = options && options.selected ? options.selected : this.classOfChartSelectedByDefault
        for (let optgroup of this.charts) {

            nodeOptgroup = document.createElement('optgroup')
            attrLabel = document.createAttribute('label')
            attrLabel.value = optgroup.label
            nodeOptgroup.setAttributeNode(attrLabel)

            for (let chart of optgroup.charts) {
                chartClass = Tools.getObjectByPath(chart) as Chart
                nodeOption = document.createElement('option')
                attrIcon = document.createAttribute('data-icon')
                attrIcon.value = chartClass.icon
                attrSub = document.createAttribute('data-subtext')
                // todo: write the option subtext in the doc
                if (options.subtext === 'classFullName') {
                    attrSub.value = chartClass.classFullName
                } else {
                    attrSub.value = chartClass.subtext
                }
                attrValue = document.createAttribute('value')
                attrValue.value = chartClass.classFullName

                if (classSelected === chart) {
                    attrSelected = document.createAttribute('selected')
                    nodeOption.setAttributeNode(attrSelected)
                }
                nodeOption.text = chartClass.label
                nodeOption.setAttributeNode(attrIcon)
                nodeOption.setAttributeNode(attrSub)
                nodeOption.setAttributeNode(attrValue)
                nodeOptgroup.appendChild(nodeOption)
            }
            nodes.push(nodeOptgroup)
        }
        return nodes
    }
}

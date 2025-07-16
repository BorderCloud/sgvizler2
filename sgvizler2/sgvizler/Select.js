import { __awaiter } from "tslib";
import { Tools, Core } from '../sgvizler';
/**
 *
 * @memberof gvizler
 */
export class Select {
    /**
     *
     * @param {string} elementID
     * @returns {Promise<void>}
     */
    static drawWithElementId(elementID) {
        return __awaiter(this, void 0, void 0, function* () {
            let element = document.getElementById(elementID);
            if (element) {
                yield Select.draw(element);
            }
        });
    }
    /**
     *
     * @param {Element} element
     * @param options
     * @returns {Promise<void>}
     */
    static draw(element, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let nodesOption = Select.getSelectOptions(options);
            for (let node of nodesOption) {
                element.appendChild(node.cloneNode(true));
            }
        });
    }
    /**
     * todo
     */
    static drawAll() {
        let nodesOption = Select.getSelectOptions();
        let nodesSnapshot = document.evaluate("//select[contains(@class, '" + Select.CLASS_NAME + "')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0; i < nodesSnapshot.snapshotLength; i++) {
            for (let node of nodesOption) {
                // @ts-ignore
                nodesSnapshot.snapshotItem(i).appendChild(node.cloneNode(true));
            }
        }
    }
    /**
     * Build url of chart's doc
     * @param {string} classFullName
     * @param {string} pathDoc
     * @returns {string} absolute or relative URL
     */
    static getChartDoc(classFullName, pathDoc) {
        let chartClass = Tools.getObjectByPath(classFullName);
        let path = '';
        if (pathDoc !== undefined) {
            path = pathDoc;
        }
        else {
            path = Core.DOCPATH;
        }
        return path + chartClass.tutorialFilename;
    }
    static getSelectOptions(options) {
        let chartClass;
        let nodeOption;
        let nodeOptgroup;
        let attrLabel;
        let attrValue;
        let attrIcon;
        let attrSub;
        let attrSelected;
        let nodes = [];
        // todo: write the option selected in the doc
        let classSelected = options && options.selected ? options.selected : this.classOfChartSelectedByDefault;
        for (let optgroup of this.charts) {
            nodeOptgroup = document.createElement('optgroup');
            attrLabel = document.createAttribute('label');
            attrLabel.value = optgroup.label;
            nodeOptgroup.setAttributeNode(attrLabel);
            for (let chart of optgroup.charts) {
                chartClass = Tools.getObjectByPath(chart);
                nodeOption = document.createElement('option');
                attrIcon = document.createAttribute('data-icon');
                attrIcon.value = chartClass.icon;
                attrSub = document.createAttribute('data-subtext');
                // todo: write the option subtext in the doc
                if (options.subtext === 'classFullName') {
                    attrSub.value = chartClass.classFullName;
                }
                else {
                    attrSub.value = chartClass.subtext;
                }
                attrValue = document.createAttribute('value');
                attrValue.value = chartClass.classFullName;
                if (classSelected === chart) {
                    attrSelected = document.createAttribute('selected');
                    nodeOption.setAttributeNode(attrSelected);
                }
                nodeOption.text = chartClass.label;
                nodeOption.setAttributeNode(attrIcon);
                nodeOption.setAttributeNode(attrSub);
                nodeOption.setAttributeNode(attrValue);
                nodeOptgroup.appendChild(nodeOption);
            }
            nodes.push(nodeOptgroup);
        }
        return nodes;
    }
}
Select.CLASS_NAME = 'sgvizler-select';
Select.classOfChartSelectedByDefault = 'bordercloud.visualization.DataTable';
/**
 * Stores the charts
 */
Select.charts = [
    {
        // optgroup
        label: 'bordercloud.visualization',
        charts: [
            'bordercloud.visualization.DataTable',
            'bordercloud.visualization.PivotTable'
        ]
    },
    // { // not ready
    //     // optgroup
    //     label: 'd3.visualization',
    //     charts: [
    //         /*'d3.visualization.AreaChart',
    //         'd3.visualization.BarChart',
    //         'd3.visualization.BubbleChart',
    //         'd3.visualization.ColumnChart',*/
    //         'd3.visualization.Line',
    //         'd3.visualization.Pie'
    //         /*,
    //         'd3.visualization.ScatterChart'
    //         */
    //     ]
    // },
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
            'google.visualization.SteppedAreaChart',
            'google.visualization.Table',
            'google.visualization.Trendline',
            'google.visualization.Timeline',
            'google.visualization.TreeMap'
        ]
    },
    {
        // optgroup
        label: 'sgvizler.visualization',
        charts: [
            'sgvizler.visualization.Table'
        ]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Nndml6bGVyL1NlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILEtBQUssRUFFTCxJQUFJLEVBQ1AsTUFBTSxhQUFhLENBQUE7QUFFcEI7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLE1BQU07SUE0RWY7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBTyxpQkFBaUIsQ0FBRSxTQUFpQjs7WUFDcEQsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUNoRCxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUM5QixDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQU8sSUFBSSxDQUFFLE9BQWdCLEVBQUMsT0FBYTs7WUFDcEQsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2xELEtBQUssSUFBSSxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQzdDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxPQUFPO1FBQ2pCLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1FBRTNDLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsNkJBQTZCLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxLQUFLLEVBQzNGLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ25FLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FB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
/*global escape: true */
/*exported bcValidateSPARQL */
/*jshint -W061 */
var imageObjWaiting = null;
var canvas = null;
var div = null;
//var canvas_legend = null;
//var ctx = null;
//var ctx_tooltip = null;
//
var rotation = 0;
var processusWaiting = null;
var messageWaiting = 'Waiting...';
//
//
//var graph = null;
//var datasetSelected = null;
//
//var docDatasets = null;
//var doc_links = null;
//
//var requestGetDatasetJson = null;
//var requestGetLinksetJson = null;

function makeTable(docDatasets) {
	var
		table,
		i,
		i1,
		ii;

	table = '<table class="wikitable sortable">';
	table += '<tr>';
	for (i in docDatasets.head.vars)
	{
		if (docDatasets.head.vars.hasOwnProperty(i)) {
			table += '<th>';
			table += docDatasets.head.vars[i];
			table += '</th>';
		}
	}
	table += '</tr>';

	for (i1 in docDatasets.results.bindings)
	{
		if (docDatasets.results.bindings.hasOwnProperty(i1)) {
			table += '<tr>';
			for (ii in docDatasets.results.bindings[i1])
			{
				if (docDatasets.results.bindings[i1].hasOwnProperty(ii)) {
					table += '<td>';
					table += docDatasets.results.bindings[i1][ii].value;
					table += '</td>';
				}
			}
			table += '</tr>';
		}
	}

	table += '</table>';
	return table;
}

function downloadDatasets(endpoint, query) {
	//send request
	var
		req = new XMLHttpRequest(),
		docDatasets;

	req.open('GET', endpoint + '/?output=json&query=' + escape(query.replace('\\n', '')),
			true);
	req.onreadystatechange = function () {
		if (req.readyState === 4) {
			if (req.status === 200 || req.status === 0) {
				if (req.responseText === '') {
					messageWaiting = 'Error : The domain in the query is different of Web site...';
					return;
				}
				docDatasets = eval('(' + req.responseText + ')');
				//docDatasets = JSON.parse(json); // no with Chrome
				//messageWaiting = "Reading the datasets...";

				div.innerHTML =  makeTable(docDatasets);
				// download_links();	
			} else {
				messageWaiting = 'Error loading page';
			}
		}
	};
	req.send(null);
}

function waiting() {
	var
		ctx = canvas.getContext('2d'),
		xcenter = ctx.canvas.width / 2,
		ycenter = ctx.canvas.height / 2,
		sourceWidth = 65,
		sourceHeight = 65;
		//ximage = xcenter - sourceWidth/2,
		//yimage = ycenter - sourceHeight/2;

	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	ctx.save();
	ctx.translate(xcenter, ycenter);// to get it in the origin
	rotation -= 2;
	ctx.rotate(rotation * Math.PI / 64);//rotate in origin
	ctx.drawImage(imageObjWaiting, -sourceWidth / 2, -sourceHeight / 2);
	ctx.restore();

	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = '#474754';
	ctx.font = '30px arial';
	ctx.fillText(messageWaiting, xcenter, ycenter + sourceHeight / 2 + 50);
}

function bcValidateSPARQL(endpoint, query) {
	imageObjWaiting = document.getElementById('canvas-image-wait');
	div = document.getElementById('bc_div');

	if (canvas === null) {
		div.innerHTML = '<canvas id="bc_canvas"></canvas>';
		canvas = document.getElementById('bc_canvas');
	}

	canvas.setAttribute('width', 300);
	canvas.setAttribute('height', 200);

	//var ctx = canvas.getContext('2d');

	//Waiting logo
	processusWaiting = setInterval(waiting, 20);

//	//write
//	messageWaiting = "TTTT";
//	
//	//kill
//	clearInterval(processusWaiting);
//	
//	
//	div.innerHTML = '<table class="wikitable sortable">\
//		<tr>\
//		<th>x</th>\
//		<th>y</th>\
//		<th>z\
//		</th></tr>\
//		<tr>\
//		<td><a href="http://www.openlinksw.com/schemas/virtrdf#DefaultQuadMap-G" class="external free" rel="nofollow">http://www.openlinksw.com/schemas/virtrdf#DefaultQuadMap-G</a></td>\
//		<td><a href="http://www.w3.org/1999/02/22-rdf-syntax-ns#type" class="external free" rel="nofollow">http://www.w3.org/1999/02/22-rdf-syntax-ns#type</a></td>\
//\
//		<td><a href="http://www.openlinksw.com/schemas/virtrdf#QuadMapValue" class="external free" rel="nofollow">http://www.openlinksw.com/schemas/virtrdf#QuadMapValue</a>\
//		</td></tr>\
//		<tr bgcolor="#f5f5f5">\
//		<td><a href="http://www.openlinksw.com/schemas/virtrdf#DefaultQuadMap-S" class="external free" rel="nofollow">http://www.openlinksw.com/schemas/virtrdf#DefaultQuadMap-S</a></td>\
//		<td><a href="http://www.w3.org/1999/02/22-rdf-syntax-ns#type" class="external free" rel="nofollow">http://www.w3.org/1999/02/22-rdf-syntax-ns#type</a></td>\
//		<td><a href="http://www.openlinksw.com/schemas/virtrdf#QuadMapValue" class="external free" rel="nofollow">http://www.openlinksw.com/schemas/virtrdf#QuadMapValue</a>\
//		</td></tr>\
//		</table>';



	//requestGetDatasetJson = requestGetSparqlDatasetJson;

	downloadDatasets(endpoint, query);
}

//function initDatasetJson(json){
//	requestGetDatasetJson = json;
//}



//document.onmousemove = function (ev) {
//	if(graph != null){
//		
//		var x, y;
//
//		// Get the mouse position relative to the canvas element.
//		if (ev.layerX || ev.layerX == 0) { // Firefox
//			x = ev.layerX;
//			y = ev.layerY;
//		} else if (ev.offsetX || ev.offsetX == 0) { // Opera
//			x = ev.offsetX;
//			y = ev.offsetY;
//		}
//
//		var dataset = null;
//		
//		if ( graph.datasetArray.length == 0 ) 
//		{
//			return;
//		}
//
//		ctx_tooltip.clearRect( 0, 0, 1500, 1000 );
//		
//		// for every node,
//		for( var i = 0; i < graph.datasetArray.length; i++ ) 
//		{
//		var node = graph.datasetArray[i];
//		
//		// draw a circle.
//		var x1 = node.x;
//		var y1 = node.y;
//
//		var t = Math.pow(Math.abs(x1-x),2)+Math.pow(Math.abs(y1-y),2);
//		var t2 = Math.pow(node.meta.circleRadius,2);
//		
//		if(Math.pow(node.meta.circleRadius,2) >= Math.pow(Math.abs(x1-x),2)+Math.pow(Math.abs(y1-y),2)){
//			//canvas.style.cursor= "pointer";
//			dataset = node;
//
//			
//			var toolTipLOD =  new ToolTipLOD(ctx_tooltip,node.meta.label,x1,y1,node.meta.circleRadius,"Arial 16px",16,"#000000");
//			toolTipLOD.draw();
//			break;
//		}
//			
//		}
//		
//	}
//	
//	if(dataset != null){
//		document.body.style.cursor= "pointer";
//
//		datasetSelected =  dataset;
//	}else{
//		document.body.style.cursor= "default";
//		datasetSelected =  null;
//	}
//	}
//
//
//document.onclick = function (ev) {
//
//	
//	if(datasetSelected != null){
//		window.open(datasetSelected.meta.iri, '_blank');
//	}
//}
//

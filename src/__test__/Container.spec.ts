import { test } from 'ava'
import {fixture} from 'ava-browser-fixture'
import {sgvizler} from 'sgvizler2'

import * as jqueryProxy from 'jquery'
const jquery: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy


// import $ from 'jquery'
// import {$} from 'jquery'
//import $ = require('jquery')

/*
test('Container is an object' , t => {
    let c = new sgvizler.Container()
    t.is(typeof(c), 'object')
})
*/

test.beforeEach('setup fixture',
    fixture("./src/__test__/html/container.html")
);
/*
test("Test JQuery", t => {
    jqueryProxy(t.context.document).ready(function () {
        jqueryProxy('#test').append("test" )
     });
});
*/
/*
test("Example download HTML", t => {
    t.is(
        t.context.document.documentElement
            .querySelector("title")
            .textContent,
        "Sgvizler"
    )
});

test("Read attributes HTML", t => {
    t.is(
        t.context.document.getElementById("test1").attributes["data-sgvizler-endpoint"].value,
        "https://query.wikidata.org/sparql"
    )
    t.is(
        t.context.document.getElementById("test1").attributes["data-sgvizler-query"].value,
        "SELECT ?o ?p ?v WHERE { ?o ?p ?v } LIMIT 10"
    )
    t.is(
        t.context.document.getElementById("test1").attributes["data-sgvizler-chart"].value,
        "sgvizler.visualization.TableExtension"
    )
    t.is(
        t.context.document.getElementById("test1").attributes["data-sgvizler-chart-options"].value,
        "Width:100%"
    )
    t.is(
        t.context.document.getElementById("test1").attributes["data-sgvizler-log"].value,
        "2"
    )
});
*/

test("Create object container", t => {
    let c = new sgvizler.Container("test1_1")
    t.is(c.request.endpoint, "https://query.wikidata.org/sparql")
    t.is(c.request.query,"SELECT ?o ?p ?v WHERE { ?o ?p ?v } LIMIT 10")
    t.is(c.chartName,"sgvizler.visualization.Table")
    t.is(c.chartOptions,"Width:100%")
    t.is(c.loglevel,2)

});

test("Check log when there is a error", t => {
    let clog0 = new sgvizler.Container("test_log_0")
    let clog1 = new sgvizler.Container("test_log_1")
    let clog2 = new sgvizler.Container("test_log_2")

    t.is(t.context.document.getElementById(clog0.id).textContent,"")
    t.is(t.context.document.getElementById(clog1.id).textContent,"")
    t.is(t.context.document.getElementById(clog2.id).firstChild.textContent,
        "The chart sgvizler.visualization.IMPOSSIBLE does not exist.")
});

/*
TODO : when JQUERY will be supported, remove the comment
test("Read styles of container", t => {
    let container = new sgvizler.Container("test2_1")
    let chart = container.chart
    t.is(chart.width, '150px')
    t.is(chart.height, '160px')

    container = new sgvizler.Container("test2_2")
    chart = container.chart
    t.is(chart.width, '200%')
    t.is(chart.height, '160px')
});
*/




import {TestSuite} from "testyts/build/lib/decorators/testSuite.decorator.js";

@TestSuite() // @ts-ignore
export class ChartTestSuite {
//     test('Create object container', t => {
//     let c = new sgvizler.Container('test1_1')
//     t.is(c.request.endpoint, 'https://query.wikidata.org/sparql')
//     t.is(c.request.query,'SELECT ?o ?p ?v WHERE { ?o ?p ?v } LIMIT 10')
//     t.is(c.chartName,'sgvizler.visualization.Table')
//     t.is(c.chartOptions,'Width:100%')
//     t.is(c.loglevel,2)
//
// })
//
// test('Check log when there is a error', t => {
//     let clog0 = new sgvizler.Container('test_log_0')
//     let clog1 = new sgvizler.Container('test_log_1')
//     let clog2 = new sgvizler.Container('test_log_2')
//
//     t.is(t.context.document.getElementById(clog0.id).textContent,'')
//     t.is(t.context.document.getElementById(clog1.id).textContent,'')
//     t.is(t.context.document.getElementById(clog2.id).firstChild.textContent,
//         'The chart sgvizler.visualization.IMPOSSIBLE does not exist.')
// })
//
// /*
// TODO : when JQUERY will be supported, remove the comment
// test("Read styles of container", t => {
//     let container = new sgvizler.Container("test2_1")
//     let chart = container.chart
//     t.is(chart.width, '150px')
//     t.is(chart.height, '160px')
//
//     container = new sgvizler.Container("test2_2")
//     chart = container.chart
//     t.is(chart.width, '200%')
//     t.is(chart.height, '160px')
// });
// */

}

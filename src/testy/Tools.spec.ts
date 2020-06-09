import {TestSuite} from "testyts/build/lib/decorators/testSuite.decorator";

@TestSuite() // @ts-ignore
export class ChartTestSuite {

// test('Test function : getObjectByPath ' , t => {
//     t.true(
//         sgvizler.Tools.getObjectByPath('sgvizler.visualization.Table')
//         instanceof sgvizler.visualization.Table
//     )
//
// })
//
// test('Test function : decodeHtml ' , t => {
//     t.is( sgvizler.Tools.decodeHtml('select * where &#123;?x&#160;?y&#160;?z . &#125; LIMIT 15'),
//         'select * where {?x ?y ?z . } LIMIT 15')
//     //t.is( sgvizler.Tools.encodeHtml('select * where {?x ?y ?z . } LIMIT 15'),
//     //    'select * where &#123;?x ?y ?z . &#125; LIMIT 15')
// })
}
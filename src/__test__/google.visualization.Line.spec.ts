import {test} from 'ava'
import {fixture} from 'ava-browser-fixture'
import * as sgvizler2 from 'sgvizler2'

import * as jqueryProxy from 'jquery'

const jquery: JQueryStatic = (jqueryProxy as any).default || jqueryProxy

test.beforeEach('setup fixture',
    fixture('./build/docs/google.visualization.Line.html')
)

test('test fails', t => {
    sgvizler2.containerDrawAll()
    // t.is(t.context.document.getElementById('google-visualization-errors-0').textContent, 'All series on a given axis must be of the same data type')
    t.pass('todo')
})

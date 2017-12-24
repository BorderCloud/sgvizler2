import { test } from 'ava'
import { fixture } from 'ava-browser-fixture'
import * as sgvizler2 from 'sgvizler2'

import * as jqueryProxy from 'jquery'
const jquery: JQueryStatic = (jqueryProxy as any).default || jqueryProxy

test.beforeEach('setup fixture',
    fixture('./build/docs/tutorial-google_visualization_Table.html')
)

test('Test JQuery', t => {
    jqueryProxy(t.context.document).on('load',() => {
        sgvizler2.containerDrawAll()
    })
    t.pass('Test query')
})

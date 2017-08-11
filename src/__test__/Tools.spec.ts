import { test } from 'ava'
import {sgvizler} from 'sgvizler2'

test('Test function : getObjectByPath ' , t => {
    t.true(
        sgvizler.Tools.getObjectByPath("sgvizler.visualization.Table")
        instanceof sgvizler.visualization.Table
    )


})

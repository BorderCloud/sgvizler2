import { test } from 'ava'
import {sgvizler} from 'sgvizler2'

test('Core is an object' , t => {
    let c = new sgvizler.Core()
    t.is(typeof(c), 'object')
})

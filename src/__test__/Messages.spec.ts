import { test } from 'ava'
import {sgvizler} from 'sgvizler2'

test('function get' , t => {
    t.is(sgvizler.Messages.get(sgvizler.MESSAGES.ERROR_CHART_UNKNOWN,["Test.Chart"]), "The chart Test.Chart does not exist.")
})

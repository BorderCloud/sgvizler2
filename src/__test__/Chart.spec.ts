import { test } from 'ava'
import {sgvizler} from 'sgvizler2'

// test('Chart is an object' , t => {
//     let c = new sgvizler.visualization.Table()
//     t.is(typeof(c), 'object')
// })

test('Chart : function doParseOptionsRaw : without option' , t => {
    let c = new sgvizler.visualization.Table()
    t.is(c.width, '100%')
    t.is(c.height, '')
    t.is(c.optionsRaw, '')
    t.is(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.EMPTY)

})

test('Chart : function doParseOptionsRaw : style pattern' , t => {
    let c = new sgvizler.visualization.Table()
    c.optionsRaw = "Width:200%"
    t.is(c.width, '200%')
    t.is(c.height, '')
    t.is(c.optionsRaw, 'Width:200%')
    t.is(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.STYLE)

    c.optionsRaw = "width:100%"
    t.is(c.width, '100%')
    t.is(c.height, '')
    t.is(c.optionsRaw, 'width:100%')
    t.is(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.STYLE)

    c.optionsRaw = "Width:100%;Height:150px"
    t.is(c.width, '100%')
    t.is(c.height, '150px')
    t.is(c.optionsRaw,  "Width:100%;Height:150px")
    t.is(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.STYLE)

    c.optionsRaw =  "Height:160px;Width:100%;"
    t.is(c.width, '100%')
    t.is(c.height, '160px')
    t.is(c.optionsRaw, 'Height:160px;Width:100%;')
    t.is(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.STYLE)

})

test('Chart : function doParseOptionsRaw with the variable pattern' , t => {
    let c = new sgvizler.visualization.Table()
    c.optionsRaw =  "Height=160px|Width=100%"
    t.is(c.width, '100%')
    t.is(c.height, '160px')
    t.is(c.optionsRaw, 'Height=160px|Width=100%')
    t.is(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.VARIABLE)
})

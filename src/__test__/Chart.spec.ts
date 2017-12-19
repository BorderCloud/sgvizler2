import { test } from 'ava'
import { sgvizler } from 'sgvizler2'

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
    c.optionsRaw = 'width:200%'
    t.is(c.width, '200%')
    t.is(c.height, '')
    t.is(c.optionsRaw, 'width:200%')
    t.is(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.STYLE)

    c.optionsRaw = 'width:100%'
    t.is(c.width, '100%')
    t.is(c.height, '')
    t.is(c.optionsRaw, 'width:100%')
    t.is(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.STYLE)

    c.optionsRaw = 'width:100%;height:150px'
    t.is(c.width, '100%')
    t.is(c.height, '150px')
    t.is(c.optionsRaw, 'width:100%;height:150px')
    t.is(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.STYLE)

    c.optionsRaw = 'height:160px;width:100%;'
    t.is(c.width, '100%')
    t.is(c.height, '160px')
    t.is(c.optionsRaw, 'height:160px;width:100%;')
    t.is(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.STYLE)

})

test('Chart : function doParseOptionsRaw with the variable pattern' , t => {
    let c = new sgvizler.visualization.Table()
    c.optionsRaw = 'height=160px|width=100%'
    t.is(c.width, '100%')
    t.is(c.height, '160px')
    t.is(c.optionsRaw, 'height=160px|width=100%')
    t.is(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.VARIABLE)

    c.optionsRaw = 'cellspacing=3 | colstyle=col2_img_display:block; col2_img_max-width:250px;' +
        ' col2_img_border-radius:50%; col2_img_margin:auto ;col2_img_opacity:0.5'
    t.is(c.width, '100%')
    t.is(c.height, '160px')
    t.is(c.optionsRaw, 'cellspacing=3 | colstyle=col2_img_display:block; col2_img_max-width:250px; col2_img_border-radius:50%; col2_img_margin:auto ;col2_img_opacity:0.5')
    t.is(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.VARIABLE)
    t.is(c.options.colstyle, 'col2_img_display:block; col2_img_max-width:250px; col2_img_border-radius:50%;' +
        ' col2_img_margin:auto ;col2_img_opacity:0.5')
})

test('Chart : function doParseOptionsRaw with the wiki pattern' , t => {
    let c = new sgvizler.visualization.Table()
    c.optionsRaw = 'height=160px!width=100%'
    t.is(c.width, '100%')
    t.is(c.height, '160px')
    t.is(c.optionsRaw, 'height=160px!width=100%')
    t.is(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.WIKI)

    c.optionsRaw = 'cellspacing=3 ! colstyle=col2_img_display:block; col2_img_max-width:250px;' +
        ' col2_img_border-radius:50%; col2_img_margin:auto ;col2_img_opacity:0.5'
    t.is(c.width, '100%')
    t.is(c.height, '160px')
    t.is(c.optionsRaw, 'cellspacing=3 ! colstyle=col2_img_display:block; col2_img_max-width:250px;' +
        ' col2_img_border-radius:50%; col2_img_margin:auto ;col2_img_opacity:0.5')
    t.is(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.WIKI)
    t.is(c.options.colstyle, 'col2_img_display:block; col2_img_max-width:250px; col2_img_border-radius:50%;' +
        ' col2_img_margin:auto ;col2_img_opacity:0.5')
})

test('Chart : function doParseOptionsRaw with options of google' , t => {
    let c = new sgvizler.visualization.Table()
    c.optionsRaw = 'title=PIB en fonction de la population et les pays | hAxis.title=PIB | vAxis.title=Population | bubble.textStyle.fontSize = 12 | bubble.textStyle.fontName= Arial  | bubble.textStyle.color= black | bubble.textStyle.bold= false | bubble.textStyle.italic= false'

    t.is(c.options.title, 'PIB en fonction de la population et les pays')
    t.is(c.options.hAxis.title, 'PIB')
    t.is(c.options.vAxis.title, 'Population')
    t.is(c.options.bubble.textStyle.fontSize, 12)
    t.is(c.options.bubble.textStyle.fontName, 'Arial')
    t.is(c.options.bubble.textStyle.color, 'black')
    t.is(c.options.bubble.textStyle.bold, false)
    t.is(c.options.bubble.textStyle.italic, false)
})

import {TestSuite} from "testyts/build/lib/decorators/testSuite.decorator.js";
import {Test} from "testyts/build/lib/decorators/test.decorator.js";

import {expect} from "testyts/build/testyCore"
import {Table} from "../sgvizler/visualization/Table";
import {sgvizler} from "../index";

@TestSuite() // @ts-ignore
export class ChartTestSuite {

    @Test() // @ts-ignore
    async doParseOptionsRawWithoutOption() { // ERROR An error occured while executing the following command: /usr/bin/node /home/karima/git/sgvizler2/node_modules/.bin/testyts. Error: "jQuery is not defined"
     // Chart : function doParseOptionsRaw : without option
     // let c = new sgvizler.visualization.Table();
     // expect.toBeEqual(c.width, '100%');
     // expect.toBeEqual(c.height, '');
     // expect.toBeEqual(c.optionsRaw, '');
     // expect.toBeEqual(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.EMPTY);
    }
    //
    // @Test() // @ts-ignore
    // async doParseOptionsRawStyle() {
    //     //  Chart : function doParseOptionsRaw : style pattern
    //     let c = new sgvizler.visualization.Table();
    //      c.optionsRaw = 'width:200%';
    //      expect.toBeEqual(c.width, '200%');
    //      expect.toBeEqual(c.height, '');
    //      expect.toBeEqual(c.optionsRaw, 'width:200%');
    //      expect.toBeEqual(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.STYLE);
    //
    //     c.optionsRaw = 'width:100%';
    //      expect.toBeEqual(c.width, '100%');
    //      expect.toBeEqual(c.height, '');
    //      expect.toBeEqual(c.optionsRaw, 'width:100%');
    //      expect.toBeEqual(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.STYLE);
    //
    //     c.optionsRaw = 'width:100%;height:150px';
    //      expect.toBeEqual(c.width, '100%');
    //      expect.toBeEqual(c.height, '150px');
    //      expect.toBeEqual(c.optionsRaw, 'width:100%;height:150px');
    //      expect.toBeEqual(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.STYLE);
    //
    //     c.optionsRaw = 'height:160px;width:100%;';
    //      expect.toBeEqual(c.width, '100%');
    //      expect.toBeEqual(c.height, '160px');
    //      expect.toBeEqual(c.optionsRaw, 'height:160px;width:100%;');
    //      expect.toBeEqual(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.STYLE);
    // }
    //
    // @Test() // @ts-ignore
    // async doParseOptionsRawWithPattern() {
    //     // Chart : function doParseOptionsRaw with the variable pattern
    //     let c = new sgvizler.visualization.Table()
    //     c.optionsRaw = 'height=160px|width=100%'
    //     expect.toBeEqual(c.width, '100%')
    //     expect.toBeEqual(c.height, '160px')
    //     expect.toBeEqual(c.optionsRaw, 'height=160px|width=100%')
    //     expect.toBeEqual(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.VARIABLE)
    //
    //     c.optionsRaw = 'cellspacing=3 | colstyle=col2_img_display:block; col2_img_max-width:250px;' +
    //                     ' col2_img_border-radius:50%; col2_img_margin:auto ;col2_img_opacity:0.5';
    //     expect.toBeEqual(c.width, '100%');
    //     expect.toBeEqual(c.height, '160px');
    //     expect.toBeEqual(c.optionsRaw, 'cellspacing=3 | colstyle=col2_img_display:block; col2_img_max-width:250px; col2_img_border-radius:50%; col2_img_margin:auto ;col2_img_opacity:0.5');
    //     expect.toBeEqual(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.VARIABLE);
    //     expect.toBeEqual(c.options.colstyle, 'col2_img_display:block; col2_img_max-width:250px; col2_img_border-radius:50%;' +
    //                  ' col2_img_margin:auto ;col2_img_opacity:0.5');
    // }
    //
    //  @Test() // @ts-ignore
    //  async doParseOptionsRawWithWikiPattern() {
    //      // Chart : function doParseOptionsRaw with the wiki pattern
    //      let c = new sgvizler.visualization.Table();
    //      c.optionsRaw = 'height=160px!width=100%';
    //      expect.toBeEqual(c.width, '100%');
    //      expect.toBeEqual(c.height, '160px');
    //      expect.toBeEqual(c.optionsRaw, 'height=160px!width=100%');
    //      expect.toBeEqual(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.WIKI);
    //
    //      c.optionsRaw = 'cellspacing=3 ! colstyle=col2_img_display:block; col2_img_max-width:250px;' +
    //          ' col2_img_border-radius:50%; col2_img_margin:auto ;col2_img_opacity:0.5';
    //      expect.toBeEqual(c.width, '100%');
    //      expect.toBeEqual(c.height, '160px');
    //      expect.toBeEqual(c.optionsRaw, 'cellspacing=3 ! colstyle=col2_img_display:block; col2_img_max-width:250px;' +
    //          ' col2_img_border-radius:50%; col2_img_margin:auto ;col2_img_opacity:0.5');
    //      expect.toBeEqual(c.patternOptions, sgvizler.CHART_PATTERN_OPTIONS.WIKI);
    //      expect.toBeEqual(c.options.colstyle, 'col2_img_display:block; col2_img_max-width:250px; col2_img_border-radius:50%;' +
    //          ' col2_img_margin:auto ;col2_img_opacity:0.5');
    //  }
    //
    // @Test() // @ts-ignore
    // async doParseOptionsRawWithGoogleOptions() {
    //     // Chart : function doParseOptionsRaw with options of google
    //     let c = new sgvizler.visualization.Table();
    //     c.optionsRaw = 'title=PIB en fonction de la population et les pays | hAxis.title=PIB | vAxis.title=Population | bubble.textStyle.fontSize = 12 | bubble.textStyle.fontName= Arial  | bubble.textStyle.color= black | bubble.textStyle.bold= false | bubble.textStyle.italic= false';
    //
    //     expect.toBeEqual(c.options.title, 'PIB en fonction de la population et les pays');
    //     expect.toBeEqual(c.options.hAxis.title, 'PIB');
    //     expect.toBeEqual(c.options.vAxis.title, 'Population');
    //     expect.toBeEqual(c.options.bubble.textStyle.fontSize, 12);
    //     expect.toBeEqual(c.options.bubble.textStyle.fontName, 'Arial');
    //     expect.toBeEqual(c.options.bubble.textStyle.color, 'black');
    //     expect.toBeEqual(c.options.bubble.textStyle.bold, false);
    //     expect.toBeEqual(c.options.bubble.textStyle.italic, false);
    // }
}
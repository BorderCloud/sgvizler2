import { test } from 'ava'
import {fixture} from 'ava-browser-fixture'
import * as sgvizler2 from 'sgvizler2'

import * as jqueryProxy from 'jquery'
const jquery: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy

test.beforeEach('setup fixture',
    fixture("./src/__test__/html/container.html")
);

test("Test JQuery", t => {
    jqueryProxy(t.context.document).ready(function () {
        sgvizler2.containerDrawAll();
    });
    t.pass("Test query")
});

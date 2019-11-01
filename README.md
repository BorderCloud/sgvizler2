[![Build Status](https://travis-ci.org/BorderCloud/sgvizler2.svg?branch=master)](https://travis-ci.org/BorderCloud/sgvizler2)
[![NPM version](https://img.shields.io/npm/v/sgvizler2.svg)](https://www.npmjs.com/package/sgvizler2)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![dependencies Status](https://david-dm.org/bordercloud/sgvizler2/status.svg)](https://david-dm.org/bordercloud/sgvizler2)
[![devDependencies Status](https://david-dm.org/bordercloud/sgvizler2/dev-status.svg)](https://david-dm.org/bordercloud/sgvizler2?type=dev)

# sgvizler2

Sgvizler2 is a javascript wrapper for easy visualisation of SPARQL result sets (and a jQuery plugin). See [the demo](http://bordercloud.github.io/sgvizler2/tutorial-A_Editor.html) (in the menu "tutorial", there are examples) and the [typedoc](http://bordercloud.github.io/sgvizler2/typedoc/index.html).

This project is the reboot in Typescript of project [Sgvizler](https://github.com/mgskjaeveland/sgvizler) of Martin G.
Skjæveland.

Add visualisations directly into your webpages like this:
```html
<div id="result"
     data-sgvizler-endpoint="https://query.wikidata.org/sparql"
     data-sgvizler-chart="bordercloud.visualization.DataTable"
     data-sgvizler-query="
     PREFIX rdfs: &amp;lt;http://www.w3.org/2000/01/rdf-schema#&amp;gt;
     SELECT  *
     WHERE {
             ?object ?property ?valueOrObject .
     }
     LIMIT 4
     "
     ></div>
 <script src="sgvizler2/sgvizler2.js"></script>
 <!--script src="node_modules/sgvizler2/build/browser/sgvizler2.js"></script-->
 <script>
    //Draw a chart
    //sgvizler2.containerDraw('result');
    //or
    //$("#result").containerchart();

    //Draw all Chart
    sgvizler2.containerDrawAll();
 </script>
```

Generate your chart with [our SPARQL editor](https://bordercloud.github.io/sgvizler2/tutorial-A_Editor.html) and to
read their docs.


It is possible to execute a function when the graph is finished or failed.
```javascript
sgvizler2.containerDraw('result',options)
    .done(
        function() {
            console.log("Success!");
        }
    )
    .fail(
        function() {
            console.log("There is a problem");
        }
    );
```

## Download directly Sgvizler2

[Download the last version](https://github.com/BorderCloud/sgvizler2/releases)

The path of Sgvizler2 will be :
```html
<script src="sgvizler2/sgvizler2.js"></script>
```

Dependencies:
```
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" ></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
```

Other dependencies, if you use the select control:
```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css">
<link rel="stylesheet" href="sgvizler2//lib/bootstrap-select/css/bootstrap-select.min.css">
<script src="sgvizler2/lib/bootstrap-select/js/bootstrap-select.min.js"></script>
<script src="sgvizler2/lib/bootstrap-select/js/i18n/defaults-fr_FR.min.js"></script>
<script src="sgvizler2/lib/bootstrap-select/js/i18n/defaults-en_US.min.js"></script>
```

## Install the package via yarn or npm

With yarn or npm
```
yarn add sgvizler2
# or
npm install sgvizler2
```
The path of Sgvizler2 will be :
```html
 <script src="node_modules/sgvizler2/build/browser/sgvizler2.js"></script>
```

## Get started

You can use the [SPARQL editor](http://bordercloud.github.io/sgvizler2/tutorial-A_Editor.html) to generate an example
with your SPARQL query and see examples for each charts, maps and tables in this project.

## Why reboot the project ?
The project could not be easily extensible and the docs was not automatically generate in the packages for composer,
yarn, npm, etc.
The project can exist without Google and new libs of charts exist. For example with D3JS,...

And why with Typescript ? The project is now too complex and there are hard problems to debug with
several charts of Google. I search solutions... but finally, I have to reboot with
the [start project typescript](https://github.com/bitjson/typescript-starter).
It's possible to generate a compatible lib in Javascript with unit test and coverage of code. So...
There are only a problem with JSDoc that not support several token of Typescript. I try TypeDoc but it do not generate
tutorials like JSDoc :( The JSDoc of project generates only tutorials for the moment.

If you want to participate at this project, [read this doc](https://github.com/BorderCloud/sgvizler2/blob/master/DEVELOPMENT.md).

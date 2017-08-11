[![Build Status](https://travis-ci.org/bordercloud/sgvizler2.svg?branch=master)](https://travis-ci
.org/bordercloud/sgvizler2)
[![Codecov](https://img.shields.io/codecov/c/github/bordercloud/sgvizler2.svg)](https://codecov.io/gh/bordercloud/sgvizler2)
[![NPM version](https://img.shields.io/npm/v/sgvizler2.svg)](https://www.npmjs.com/package/sgvizler2)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![dependencies Status](https://david-dm.org/bordercloud/sgvizler2/status.svg)](https://david-dm.org/bordercloud/sgvizler2)
[![devDependencies Status](https://david-dm.org/bordercloud/sgvizler2/dev-status.svg)](https://david-dm.org/bordercloud/sgvizler2?type=dev)

# sgvizler2

Sgvizler2 is a javascript wrapper for easy visualisation of SPARQL result sets (and a jQuery plugin).

This project is the reboot in Typescript of project [Sgvizler](https://github.com/mgskjaeveland/sgvizler) of Martin G.
Skjæveland.

Add visualisations directly into your webpages like this:
```html
<div id="example"
     data-sgvizler-endpoint="http://sws.ifi.uio.no/sparql/npd"
     data-sgvizler-query="SELECT ?class (count(?instance) AS ?noOfInstances)
                          WHERE{ ?instance a ?class }
                          GROUP BY ?class
                          ORDER BY ?class"
     data-sgvizler-chart="google.visualization.PieChart"
     style="width:800px; height:400px;"></div>
```

Generate your chart with [our SPARQL editor](tutorial-A_Editor.html) and to
read their docs.

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

## Create a new chart

The class Table is a example of "chart".

When you create a new class of chart, you have to add it in :
* the namespace file
* the class sgvizler.Select
* Check it, if your chart exists and works via the SPARQL editor of tutorial.

Finally, you can create a new tutorial in the folder tutorial(duplicate the example of class Table) and change the file
tutorials.json.

## Create a new namespace

The project simulate the concept of namespace because there are again problems in typescript.

if you want create a new namespace, you can create a new folder with the same name and in the root add a file where you
export your new classes. See example :  file sgvizler.ts and sgvizler/namespace.ts

NB : need to precise in the classes their namespace with the tag jsdoc @memberof sgvizler.visualization

To check namespace :
 ```
 yarn docs:all
 ```

## Get started

You can use the [SPARQL editor](Todo put url...) to generate an example with Sgvizler2.

## Development zen

Read the doc of [start project typescript](https://www.typescriptlang.org/)

Commands :
```
yarn build
yarn test
yarn deploy
yarn docs:html
```

## Docs

The project generate only tutorials because JSdoc3 cannot parse correctly Typescript, for the moment...

You can generate all the docs but you need to :
* delete the file jsdoc_template/template/tmpl/layout.tmpl
* rename layout.old by layout.tmpl
* change jsdoc.json
* build the docs

Command :
```
yarn docs:html
```

[![Build Status](https://travis-ci.org/BorderCloud/sgvizler2.svg?branch=master)](https://travis-ci.org/BorderCloud/sgvizler2)
[![Codecov](https://img.shields.io/codecov/c/github/BorderCloud/sgvizler2.svg)](https://codecov.io/gh/BorderCloud/sgvizler2)
[![NPM version](https://img.shields.io/npm/v/sgvizler2.svg)](https://www.npmjs.com/package/sgvizler2)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![dependencies Status](https://david-dm.org/bordercloud/sgvizler2/status.svg)](https://david-dm.org/bordercloud/sgvizler2)
[![devDependencies Status](https://david-dm.org/bordercloud/sgvizler2/dev-status.svg)](https://david-dm.org/bordercloud/sgvizler2?type=dev)

# sgvizler2

Sgvizler2 is a javascript wrapper for easy visualisation of SPARQL result sets (and a jQuery plugin). The project is
under construction. The first release will available at the end of 2017.

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

Generate your chart with [our SPARQL editor](https://bordercloud.github.io/sgvizler2/tutorial-A_Editor.html) and to
read their docs.

## Install

With yarn or npm
```
yarn add sgvizler2
# or
npm install sgvizler2
```

## Docs

In the website of this project, you can find a Sparql editor and examples for each chart, map or table available in the
last version.

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


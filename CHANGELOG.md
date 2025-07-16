#### 1.7.4 (2025-07-16)
Update all libs in package.json (not in /lib)

##### Chores

* **deps:**
  *  bump follow-redirects from 1.15.2 to 1.15.4 (baf883d5)
  *  bump browserify-sign from 4.2.1 to 4.2.2 (f30cd311)
  *  bump @babel/traverse from 7.20.5 to 7.23.2 (1fa4b681)
  *  bump tough-cookie from 4.1.2 to 4.1.3 (e0aa5c33)
  *  bump postcss from 8.4.19 to 8.4.31 (2eab5a3f)
  *  bump semver from 5.7.1 to 5.7.2 (888fa3d1)
  *  bump word-wrap from 1.2.3 to 1.2.5 (92006794)
  *  bump http-cache-semantics from 4.1.0 to 4.1.1 (2be24ac7)
  *  bump json5 from 1.0.1 to 1.0.2 (5bd9b2de)
* **deps-dev:**  bump chromedriver from 108.0.0 to 119.0.1 (63bb7fa8)

##### Other Changes

* BorderCloud/sgvizler2 (a7983f03)

# Changelog

#### 1.7.3 (2022-12-11)
Update all libs in package.json (not in /lib)

##### Chores

* **deps:**
  *  bump qs from 6.5.2 to 6.5.3 (b1ec2721)
  *  bump decode-uri-component from 0.2.0 to 0.2.2 (601a7234)
  *  bump minimatch from 3.0.4 to 3.1.2 (21c64710)
  *  bump terser from 5.7.0 to 5.14.2 (b50b93c8)
  *  bump shell-quote from 1.7.2 to 1.7.3 (81c483cb)
* **deps-dev:**
  *  bump moment from 2.29.2 to 2.29.4 (2a73d82b)
  *  bump moment from 2.29.1 to 2.29.2 (a4a58085)

-----

### [1.7.2](https://github.com/BorderCloud/sgvizler2/compare/v1.7.1...v1.7.2) (2022-03-12)

### [1.7.1](https://github.com/BorderCloud/sgvizler2/compare/v1.6.0...v1.7.1) (2022-03-12)

## [1.7.0](https://github.com/BorderCloud/sgvizler2/compare/v1.6.2...v1.7.0) (2021-04-30)

### Security Fixes
* upgrade all libs

### Features
* **GeoJson** extract GeoJson of Wikidata via API of commons.wikimedia.org #32

## [1.6.0](https://github.com/BorderCloud/sgvizler2/compare/v1.5.1...v1.6.0) (2020-09-29)

### Features

* **leaflet:** Add Virtuoso type http://www.openlinksw.com/schemas/virtrdf#Geometry ([84fa3b1](https://github.com/BorderCloud/sgvizler2/commit/84fa3b135102c0c762d102b68d10fbe82d03e35d))

### [1.5.1](https://github.com/BorderCloud/sgvizler2/compare/v1.5.0...v1.5.1) (2020-08-06)


### Bug Fixes

* **leaflet:** supported different syntaxes of multipolygon ([40a27e5](https://github.com/BorderCloud/sgvizler2/commit/40a27e5e0c492fb9a001123055192619cb66c7c1))

## [1.5.0](https://github.com/BorderCloud/sgvizler2/compare/v1.4.1...v1.5.0) (2020-08-05)


### Features

* **leaflet:** supported shape of WktLiteral datatype : multipolygon ([44da636](https://github.com/BorderCloud/sgvizler2/commit/44da636c44e78aad91ab21d81ae3b4725e910c5c))

### [1.4.1](https://github.com/BorderCloud/sgvizler2/compare/v1.4.0...v1.4.1) (2020-07-09)


### Bug Fixes

* **datatable:** problems with the bootstrap libs ([32f5ddc](https://github.com/BorderCloud/sgvizler2/commit/32f5ddc3d21c1716f891a2adffb105c0c62dd612)), closes [#26](https://github.com/BorderCloud/sgvizler2/issues/26)

## [1.4.0](https://github.com/BorderCloud/sgvizler2/compare/v1.3.3...v1.4.0) (2020-06-11)


### Features

* **Datatables:** support now type uri, xsd:date and xsd:dateTime ([4ce4016](https://github.com/BorderCloud/sgvizler2/commit/4ce40167ab960314cd47f58d3e9061abb916f50e)), closes [#2](https://github.com/BorderCloud/sgvizler2/issues/2)
* **leaflet:** add GeoJson ([ac4654e](https://github.com/BorderCloud/sgvizler2/commit/ac4654edacfd5527a5d2c3ac826fa644c9d79a95)), closes [#25](https://github.com/BorderCloud/sgvizler2/issues/25)
* **leaflet:** supported shape of WktLiteral datatype : point, envelope, line and polygon ([2b19c02](https://github.com/BorderCloud/sgvizler2/commit/2b19c0274c3ce6a3472ffb0aacc21e5cde13dcd7)), closes [#24](https://github.com/BorderCloud/sgvizler2/issues/24)


### Bug Fixes

* **leaflet:** migrating the modern Static Tiles API of mapbox ([e5868e1](https://github.com/BorderCloud/sgvizler2/commit/e5868e1b7b309ef96c5f04f93e55eaba68c860ab)), closes [#23](https://github.com/BorderCloud/sgvizler2/issues/23) [#24](https://github.com/BorderCloud/sgvizler2/issues/24)

### [1.3.3](https://github.com/BorderCloud/sgvizler2/compare/v1.3.2...v1.3.3) (2019-11-01)


### Bug Fixes

* **jquery:** options are not read in the Jquery function ([1dfd0db](https://github.com/BorderCloud/sgvizler2/commit/1dfd0db))
* **mediawiki:** mediawiki cannot load bootstrap-select correctly ([128a346](https://github.com/BorderCloud/sgvizler2/commit/128a346))



### [1.3.2](https://github.com/BorderCloud/sgvizler2/compare/v1.3.1...v1.3.2) (2019-10-23)


### Bug Fixes

* **loadingIcon:** Center the loading icon in the container ([6469540](https://github.com/BorderCloud/sgvizler2/commit/6469540))
* **mediawiki:** mediawiki cannot load bootstrap-select ([4200dbf](https://github.com/BorderCloud/sgvizler2/commit/4200dbf))


### [1.3.1](https://github.com/BorderCloud/sgvizler2/compare/v1.3.0...v1.3.1) (2019-08-20)


### Bug Fixes

* **loadingIcon:** loading icons work now when there are several charts ([568177c](https://github.com/BorderCloud/sgvizler2/commit/568177c))



## [1.3.0](https://github.com/BorderCloud/sgvizler2/compare/v1.2.2...v1.3.0) (2019-08-19)

### Features 

* add [PivotTable.js](https://github.com/nicolaskruchten/pivottable) with the lang french. We adapted the PivotTable renderers to support the options width and height.
* add a callback when the chart is finished and failed 
* add an icon loading
* add a new option : language
* DataTable : add the language fr and buttons with icons
* there are new functions to generate a tab panel around a chart to show its HTML and its script.

([0bb8dec](https://github.com/BorderCloud/sgvizler2/commit/0bb8dec))

### Bug Fixes 

* loader: the order of dependencies to download is fixed
* docs: remove all redundant code in tutorial pages

([0bb8dec](https://github.com/BorderCloud/sgvizler2/commit/0bb8dec))

### [1.2.2](https://github.com/BorderCloud/sgvizler2/compare/v1.2.1...v1.2.2) (2019-07-13)


### Bug Fixes

* keep the  newline character in the query ([24e246e](https://github.com/BorderCloud/sgvizler2/commit/24e246e))



### [1.2.1](https://github.com/BorderCloud/sgvizler2/compare/v1.2.0...v1.2.1) (2019-07-11)


### Bug Fixes

* update class for fontawesome and fix bug in Datatable ([0a95719](https://github.com/BorderCloud/sgvizler2/commit/0a95719)), closes [#123](https://github.com/BorderCloud/sgvizler2/issues/123)



## [1.2.0](https://github.com/BorderCloud/sgvizler2/compare/v1.1.0...v1.2.0) (2019-07-11)


### Features

* **libs:** update Bootstrap-select version 1.13.10 ([82e8ebe](https://github.com/BorderCloud/sgvizler2/commit/82e8ebe))
* **libs:** update D3 version 5.9.7 ([7ff83c1](https://github.com/BorderCloud/sgvizler2/commit/7ff83c1))
* **libs:** update Datables version 1.10.15 ([7a62470](https://github.com/BorderCloud/sgvizler2/commit/7a62470))
* **libs:** update Leaflet v1.5.1 and markercluster version v1.4.1 ([1e57ec3](https://github.com/BorderCloud/sgvizler2/commit/1e57ec3))



## [1.1.0](https://github.com/BorderCloud/sgvizler2/compare/v1.0.9...v1.1.0) (2019-07-06)


### Features

* **jsdoc:** clean the template ([bf26aae](https://github.com/BorderCloud/sgvizler2/commit/bf26aae))
* **libs:** Update libs and clean the project ([7ff319f](https://github.com/BorderCloud/sgvizler2/commit/7ff319f))



<a name="1.0.9"></a>
## [1.0.9](https://github.com/BorderCloud/sgvizler2/compare/v1.0.8...v1.0.9) (2018-01-13)


### Bug Fixes

* **mediawiki:** fix error for minify version. ([b497895](https://github.com/BorderCloud/sgvizler2/commit/b497895))



<a name="1.0.8"></a>
## [1.0.8](https://github.com/BorderCloud/sgvizler2/compare/v1.0.7...v1.0.8) (2018-01-07)


### Bug Fixes

* **mediawiki:** minify, size of Google chart, nbsp in query, maps empty, etc. Disable require Jquery of Bootstrap-select. ([974500a](https://github.com/BorderCloud/sgvizler2/commit/974500a))



<a name="1.0.7"></a>
## [1.0.7](https://github.com/BorderCloud/sgvizler2/compare/v1.0.6...v1.0.7) (2018-01-01)


### Bug Fixes

* **request:** catch status 0 of XMLHttpRequest for errors : 404, CORS, etc ([fd023b7](https://github.com/BorderCloud/sgvizler2/commit/fd023b7))



<a name="1.0.6"></a>
## [1.0.6](https://github.com/BorderCloud/sgvizler2/compare/v1.0.5...v1.0.6) (2017-12-30)


### Bug Fixes

* **selectchart:** add charts in the function selectchart and send warning for old charts ([52ed5d1](https://github.com/BorderCloud/sgvizler2/commit/52ed5d1))



<a name="1.0.5"></a>
## [1.0.5](https://github.com/BorderCloud/sgvizler2/compare/v1.0.2...v1.0.5) (2017-12-30)


### Bug Fixes

* **selectchart:** fixed bugs in the function selectchart and in css of bootstrap-select ([26b7cb7](https://github.com/BorderCloud/sgvizler2/commit/26b7cb7))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/BorderCloud/sgvizler2/compare/v1.0.1...v1.0.2) (2017-12-29)



<a name="1.0.1"></a>
## [1.0.1](https://github.com/BorderCloud/sgvizler2/compare/v0.0.17...v1.0.1) (2017-12-24)



<a name="0.0.17"></a>
## [0.0.17](https://github.com/BorderCloud/sgvizler2/compare/v0.0.16...v0.0.17) (2017-11-20)



<a name="0.0.16"></a>
## [0.0.16](https://github.com/BorderCloud/sgvizler2/compare/v0.0.15...v0.0.16) (2017-11-20)



<a name="0.0.15"></a>
## [0.0.15](https://github.com/BorderCloud/sgvizler2/compare/v0.0.14...v0.0.15) (2017-08-30)



<a name="0.0.14"></a>
## [0.0.14](https://github.com/BorderCloud/sgvizler2/compare/v0.0.13...v0.0.14) (2017-08-30)



<a name="0.0.13"></a>
## [0.0.13](https://github.com/BorderCloud/sgvizler2/compare/v0.0.12...v0.0.13) (2017-08-29)



<a name="0.0.12"></a>
## [0.0.12](https://github.com/BorderCloud/sgvizler2/compare/v0.0.11...v0.0.12) (2017-08-23)



<a name="0.0.11"></a>
## [0.0.11](https://github.com/BorderCloud/sgvizler2/compare/v0.0.10...v0.0.11) (2017-08-23)



<a name="0.0.10"></a>
## [0.0.10](https://github.com/BorderCloud/sgvizler2/compare/v0.0.9...v0.0.10) (2017-08-23)



<a name="0.0.9"></a>
## [0.0.9](https://github.com/BorderCloud/sgvizler2/compare/v0.0.8...v0.0.9) (2017-08-23)



<a name="0.0.8"></a>
## [0.0.8](https://github.com/BorderCloud/sgvizler2/compare/v0.0.7...v0.0.8) (2017-08-23)



<a name="0.0.7"></a>
## [0.0.7](https://github.com/BorderCloud/sgvizler2/compare/v0.0.6...v0.0.7) (2017-08-11)



<a name="0.0.6"></a>
## [0.0.6](https://github.com/BorderCloud/sgvizler2/compare/v0.0.4...v0.0.6) (2017-08-11)



<a name="0.0.5"></a>
## [0.0.5](https://github.com/BorderCloud/sgvizler2/compare/v0.0.4...v0.0.5) (2017-08-11)



<a name="0.0.4"></a>
## [0.0.4](https://github.com/BorderCloud/sgvizler2/compare/v0.0.3...v0.0.4) (2017-08-11)



<a name="0.0.3"></a>
## [0.0.3](https://github.com/BorderCloud/sgvizler2/compare/v0.0.2...v0.0.3) (2017-08-11)



<a name="0.0.2"></a>
## [0.0.2](https://github.com/BorderCloud/sgvizler2/compare/v0.0.1...v0.0.2) (2017-08-11)



<a name="0.0.1"></a>
## 0.0.1 (2017-08-11)



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# How participate to SGVIZLER2 ?

Please. Read this document before to participate.

## Fork the project in github

You can fork the project and debug or add a new chart in this project. At the end, you can send a pull request to merge
your code in this project.

## Update libs

 ```
yarn upgrade-interactive --latest
 ```

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

## Development zen

Commands :
```
yarn docs:open
```

## Docs

* build only the docs

Command :
```
yarn docs:html
```

Read this docs before your first commit : [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)


## Tests and development

Command Development :
```
yarn dev:httpd

# Build all
yarn clean
yarn docs:all
```

You can see the result here : http://localhost:8000

## Tests 

Command :
```
# start Selenium Hub and the Web server
yarn test:start

#  run Selenium's tests
yarn test:run

# stop Selenium Hub and the Web server
yarn test:stop
```

The test suite is in the file : test/tests.side


## Make a new release

Commands :
```
yarn clean
q
#yarn std-version-major
yarn std-version-minor
# Avoid problems in yarn/npm publish
yarn pack
# check the package before to publish
yarn publish sgvizler2-vVERSION.tgz  --new-version VERSION

yarn docs:all
yarn docs:publish
```

## Remove (before the first release and )

npm unpublish sgvizler@0.0.XXX

## Deprecate

npm deprecate my-thing@"< 0.2.3" "critical bug fixed in v0.2.3"

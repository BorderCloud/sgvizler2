# How participate to SGVIZLER2 ?

Please. Read this document before to participate.

## Fork the project in github

You can fork the project and debug or add a new chart in this project. At the end, you can send a pull request to merge
your code in this project.

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

Read the doc of [start project typescript](https://www.typescriptlang.org/)

Commands :
```
yarn build
yarn test
yarn docs:publish
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

## Make a new release

Commands :
```
yarn test
yarn buildall
yarn changelog
yarn docs:publish

# Avoid a problem in yarn publish
yarn pack
yarn publish sgvizler2-vVERSION.tgz
```

## Remove (before the first release and )

npm unpublish sgvizler@0.0.XXX

## Deprecate

npm deprecate my-thing@"< 0.2.3" "critical bug fixed in v0.2.3"

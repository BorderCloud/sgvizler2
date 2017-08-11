/**
 *
 * @class sgvizler.SPARQL_RESULT
 * @memberof sgvizler
 */
export enum SPARQL_RESULT {
    xml,
    json,
    jsonp
}

/**
 *
 * @class sgvizler.SparqlTools
 * @memberof gvizler
 */
export class SparqlTools {

    public static getOutputLabel (id: SPARQL_RESULT) {
        let str: string = ''
        switch (id) {
            case SPARQL_RESULT.xml :
                str = 'xml'
                break
            case SPARQL_RESULT.json :
                str = 'json'
                break
            case SPARQL_RESULT.jsonp :
                str = 'jsonp'
                break
        }
        return str
    }

    public static getXMLHttpRequestResponseType (id: SPARQL_RESULT): XMLHttpRequestResponseType {
        let type: string = ''
        switch (id) {
            case SPARQL_RESULT.xml :
                type = '' // 	DOMString (this is the default value for xhr)
                break
            case SPARQL_RESULT.json :
            case SPARQL_RESULT.jsonp :
                type = 'json'
                break
        }
        return type as XMLHttpRequestResponseType
    }

    public static getHeaderAccept (id: SPARQL_RESULT) {
        let str: string = ''
        switch (id) {
            case SPARQL_RESULT.xml :
                str = 'application/sparql-results+xml'
                break
            case SPARQL_RESULT.json :
            case SPARQL_RESULT.jsonp :
                str = 'application/sparql-results+json'
                break
        }
        return str
    }

    public static convertString (label: string ): SPARQL_RESULT {
        let result: SPARQL_RESULT = SPARQL_RESULT.json
        switch (label) {
            case 'xml' :
                result = SPARQL_RESULT.xml
                break
            case 'json' :
                result = SPARQL_RESULT.json
                break
            case 'jsonp' :
                result = SPARQL_RESULT.jsonp
                break
        }
        return result
    }
}

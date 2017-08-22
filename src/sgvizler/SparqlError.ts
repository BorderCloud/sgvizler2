/**
 * todo
 * @class sgvizler.SparqlError
 * @memberof sgvizler
 */
export class SparqlError {

    public static getErrorMessage (xhr: XMLHttpRequest) {
        let patternWikidata = /MalformedQueryException: *(.*)/m // tslint:disable-line

        let errorWikidata = patternWikidata.exec(xhr.response)
        if (errorWikidata !== null) {
            return errorWikidata[1]
        }

        return xhr.response
    }
}

/**
 * todo
 * @class sgvizler.SparqlError
 * @memberof sgvizler
 */
export class SparqlError {

    public static getErrorMessageWithStatus200 (xhr: XMLHttpRequest) {
        let patternWikidata = /MalformedQueryException: *(.*)/m // tslint:disable-line

        let errorWikidata = patternWikidata.exec(xhr.response)
        if (errorWikidata !== null) {
            return errorWikidata[1]
        }

        return xhr.response
    }
    public static getErrorWithOtherStatus (xhr: XMLHttpRequest,url: string) {
        let linkError = '<a href="' + url + '" target="_blank">See this error</a>'
        let message = ''
        if (xhr.status === 0) {
            if (xhr.statusText !== '') {
                message = xhr.statusText + '(' + xhr.status + ')'
            } else {
                message = 'You need to allow running insecure content in your navigator or this SPARQL service doesn\'t exist or timed out or CORS violation or no Access-Control-Allow-Origin header set. (see console log)'
            }
        } else {
            message = xhr.statusText + '(' + xhr.status + ')'
        }
        return message + '<br/>\n' + linkError
    }

}

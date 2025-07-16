/**
 * todo
 * @class sgvizler.SparqlError
 * @memberof sgvizler
 */
export class SparqlError {
    static getErrorMessageWithStatus200(xhr) {
        let patternWikidata = /MalformedQueryException: *(.*)/m; // tslint:disable-line
        let errorWikidata = patternWikidata.exec(xhr.response);
        if (errorWikidata !== null) {
            return errorWikidata[1];
        }
        return xhr.response;
    }
    static getErrorWithOtherStatus(xhr, url) {
        let linkError = '<a href="' + url + '" target="_blank">See this error</a>';
        let message = '';
        if (xhr.status === 0) {
            if (xhr.statusText !== '') {
                message = xhr.statusText + '(' + xhr.status + ')';
            }
            else {
                message = 'You need to allow running insecure content in your navigator or this SPARQL service doesn\'t exist or timed out or CORS violation or no Access-Control-Allow-Origin header set. (see console log)';
            }
        }
        else {
            message = xhr.statusText + '(' + xhr.status + ')';
        }
        return message + '<br/>\n' + linkError;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BhcnFsRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2d2aXpsZXIvU3BhcnFsRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxXQUFXO0lBRWIsTUFBTSxDQUFDLDRCQUE0QixDQUFFLEdBQW1CO1FBQzNELElBQUksZUFBZSxHQUFHLGlDQUFpQyxDQUFBLENBQUMsc0JBQXNCO1FBRTlFLElBQUksYUFBYSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3RELElBQUksYUFBYSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3pCLE9BQU8sYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzNCLENBQUM7UUFFRCxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUE7SUFDdkIsQ0FBQztJQUNNLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBRSxHQUFtQixFQUFDLEdBQVc7UUFDbEUsSUFBSSxTQUFTLEdBQUcsV0FBVyxHQUFHLEdBQUcsR0FBRyxzQ0FBc0MsQ0FBQTtRQUMxRSxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUE7UUFDaEIsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ25CLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDeEIsT0FBTyxHQUFHLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO1lBQ3JELENBQUM7aUJBQU0sQ0FBQztnQkFDSixPQUFPLEdBQUcsbU1BQW1NLENBQUE7WUFDak4sQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ0osT0FBTyxHQUFHLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO1FBQ3JELENBQUM7UUFDRCxPQUFPLE9BQU8sR0FBRyxTQUFTLEdBQUcsU0FBUyxDQUFBO0lBQzFDLENBQUM7Q0FFSiJ9
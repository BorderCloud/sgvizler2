/**
 *
 * @class sgvizler.SPARQL_RESULT
 * @memberof sgvizler
 */
export var SPARQL_RESULT;
(function (SPARQL_RESULT) {
    SPARQL_RESULT[SPARQL_RESULT["xml"] = 0] = "xml";
    SPARQL_RESULT[SPARQL_RESULT["json"] = 1] = "json";
    SPARQL_RESULT[SPARQL_RESULT["jsonp"] = 2] = "jsonp";
})(SPARQL_RESULT || (SPARQL_RESULT = {}));
/**
 *
 * @class sgvizler.SparqlTools
 * @memberof gvizler
 */
export class SparqlTools {
    static getOutputLabel(id) {
        let str = '';
        switch (id) {
            case SPARQL_RESULT.xml:
                str = 'xml';
                break;
            case SPARQL_RESULT.json:
                str = 'json';
                break;
            case SPARQL_RESULT.jsonp:
                str = 'jsonp';
                break;
        }
        return str;
    }
    static getXMLHttpRequestResponseType(id) {
        let type = '';
        switch (id) {
            case SPARQL_RESULT.xml:
                type = ''; // 	DOMString (this is the default value for xhr)
                break;
            case SPARQL_RESULT.json:
            case SPARQL_RESULT.jsonp:
                type = 'json';
                break;
        }
        return type;
    }
    static getHeaderAccept(id) {
        let str = '';
        switch (id) {
            case SPARQL_RESULT.xml:
                str = 'application/sparql-results+xml';
                break;
            case SPARQL_RESULT.json:
            case SPARQL_RESULT.jsonp:
                str = 'application/sparql-results+json';
                break;
        }
        return str;
    }
    static convertString(label) {
        let result = SPARQL_RESULT.json;
        switch (label) {
            case 'xml':
                result = SPARQL_RESULT.xml;
                break;
            case 'json':
                result = SPARQL_RESULT.json;
                break;
            case 'jsonp':
                result = SPARQL_RESULT.jsonp;
                break;
        }
        return result;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BhcnFsVG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2d2aXpsZXIvU3BhcnFsVG9vbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILE1BQU0sQ0FBTixJQUFZLGFBSVg7QUFKRCxXQUFZLGFBQWE7SUFDckIsK0NBQUcsQ0FBQTtJQUNILGlEQUFJLENBQUE7SUFDSixtREFBSyxDQUFBO0FBQ1QsQ0FBQyxFQUpXLGFBQWEsS0FBYixhQUFhLFFBSXhCO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxXQUFXO0lBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBRSxFQUFpQjtRQUMzQyxJQUFJLEdBQUcsR0FBVyxFQUFFLENBQUE7UUFDcEIsUUFBUSxFQUFFLEVBQUUsQ0FBQztZQUNULEtBQUssYUFBYSxDQUFDLEdBQUc7Z0JBQ2xCLEdBQUcsR0FBRyxLQUFLLENBQUE7Z0JBQ1gsTUFBSztZQUNULEtBQUssYUFBYSxDQUFDLElBQUk7Z0JBQ25CLEdBQUcsR0FBRyxNQUFNLENBQUE7Z0JBQ1osTUFBSztZQUNULEtBQUssYUFBYSxDQUFDLEtBQUs7Z0JBQ3BCLEdBQUcsR0FBRyxPQUFPLENBQUE7Z0JBQ2IsTUFBSztRQUNiLENBQUM7UUFDRCxPQUFPLEdBQUcsQ0FBQTtJQUNkLENBQUM7SUFFTSxNQUFNLENBQUMsNkJBQTZCLENBQUUsRUFBaUI7UUFDMUQsSUFBSSxJQUFJLEdBQVcsRUFBRSxDQUFBO1FBQ3JCLFFBQVEsRUFBRSxFQUFFLENBQUM7WUFDVCxLQUFLLGFBQWEsQ0FBQyxHQUFHO2dCQUNsQixJQUFJLEdBQUcsRUFBRSxDQUFBLENBQUMsaURBQWlEO2dCQUMzRCxNQUFLO1lBQ1QsS0FBSyxhQUFhLENBQUMsSUFBSSxDQUFFO1lBQ3pCLEtBQUssYUFBYSxDQUFDLEtBQUs7Z0JBQ3BCLElBQUksR0FBRyxNQUFNLENBQUE7Z0JBQ2IsTUFBSztRQUNiLENBQUM7UUFDRCxPQUFPLElBQWtDLENBQUE7SUFDN0MsQ0FBQztJQUVNLE1BQU0sQ0FBQyxlQUFlLENBQUUsRUFBaUI7UUFDNUMsSUFBSSxHQUFHLEdBQVcsRUFBRSxDQUFBO1FBQ3BCLFFBQVEsRUFBRSxFQUFFLENBQUM7WUFDVCxLQUFLLGFBQWEsQ0FBQyxHQUFHO2dCQUNsQixHQUFHLEdBQUcsZ0NBQWdDLENBQUE7Z0JBQ3RDLE1BQUs7WUFDVCxLQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUU7WUFDekIsS0FBSyxhQUFhLENBQUMsS0FBSztnQkFDcEIsR0FBRyxHQUFHLGlDQUFpQyxDQUFBO2dCQUN2QyxNQUFLO1FBQ2IsQ0FBQztRQUNELE9BQU8sR0FBRyxDQUFBO0lBQ2QsQ0FBQztJQUVNLE1BQU0sQ0FBQyxhQUFhLENBQUUsS0FBYTtRQUN0QyxJQUFJLE1BQU0sR0FBa0IsYUFBYSxDQUFDLElBQUksQ0FBQTtRQUM5QyxRQUFRLEtBQUssRUFBRSxDQUFDO1lBQ1osS0FBSyxLQUFLO2dCQUNOLE1BQU0sR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFBO2dCQUMxQixNQUFLO1lBQ1QsS0FBSyxNQUFNO2dCQUNQLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFBO2dCQUMzQixNQUFLO1lBQ1QsS0FBSyxPQUFPO2dCQUNSLE1BQU0sR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFBO2dCQUM1QixNQUFLO1FBQ2IsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFBO0lBQ2pCLENBQUM7Q0FDSiJ9
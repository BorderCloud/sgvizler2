/**
 * todo
 * @class sgvizler.MESSAGES
 * @memberof sgvizler
 */
export var MESSAGES;
(function (MESSAGES) {
    MESSAGES[MESSAGES["ERROR_CHART_UNKNOWN"] = 0] = "ERROR_CHART_UNKNOWN";
    MESSAGES[MESSAGES["ERROR_CHART_PATTERN_OPTION_UNKNOWN"] = 1] = "ERROR_CHART_PATTERN_OPTION_UNKNOWN";
    MESSAGES[MESSAGES["ERROR_REQUEST"] = 2] = "ERROR_REQUEST";
    MESSAGES[MESSAGES["ERROR_CHART"] = 3] = "ERROR_CHART";
    MESSAGES[MESSAGES["ERROR_DEPENDENCIES"] = 4] = "ERROR_DEPENDENCIES";
    MESSAGES[MESSAGES["ERROR_ENDPOINT_FORGOT"] = 5] = "ERROR_ENDPOINT_FORGOT";
    MESSAGES[MESSAGES["ERROR_DATA_EMPTY"] = 6] = "ERROR_DATA_EMPTY";
    MESSAGES[MESSAGES["ERROR_DATA_NOROW"] = 7] = "ERROR_DATA_NOROW";
})(MESSAGES || (MESSAGES = {}));
/**
 *
 * @class sgvizler.Messages
 * @memberof sgvizler
 */
export class Messages {
    static get(id, args) {
        let message = '';
        switch (id) {
            case MESSAGES.ERROR_CHART_UNKNOWN:
                message = 'The chart $0 does not exist.';
                break;
            case MESSAGES.ERROR_CHART_PATTERN_OPTION_UNKNOWN:
                message = "The pattern of chart options is unknown : '$0'" +
                    "Use 'variable1=value1|variable1=value1' or for style 'width:100%;font:red;' or 'class1 class2'";
                break;
            case MESSAGES.ERROR_REQUEST:
                message = 'Sorry, the sparql server sent an error. </br> $0';
                break;
            case MESSAGES.ERROR_CHART:
                message = 'Sorry, the chart sent an error. </br> $0';
                break;
            case MESSAGES.ERROR_DEPENDENCIES:
                message = 'The chart dependencies sent an error. </br> $0';
                break;
            case MESSAGES.ERROR_ENDPOINT_FORGOT:
                message = 'The endpoint of Sparql service is forgotten (data-sgvizler-endpoint).';
                break;
            case MESSAGES.ERROR_DATA_EMPTY:
                message = 'The resquest sent null.';
                break;
            case MESSAGES.ERROR_DATA_NOROW:
                message = 'The resquest sent no row.';
                break;
        }
        if (args) {
            for (let i = 0, len = args.length; i < len; i++) { // tslint:disable-line
                message = message.replace('$' + i, args[i]);
            }
        }
        return message;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2d2aXpsZXIvTWVzc2FnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILE1BQU0sQ0FBTixJQUFZLFFBU1g7QUFURCxXQUFZLFFBQVE7SUFDaEIscUVBQW1CLENBQUE7SUFDbkIsbUdBQWtDLENBQUE7SUFDbEMseURBQWEsQ0FBQTtJQUNiLHFEQUFXLENBQUE7SUFDWCxtRUFBa0IsQ0FBQTtJQUNsQix5RUFBcUIsQ0FBQTtJQUNyQiwrREFBZ0IsQ0FBQTtJQUNoQiwrREFBZ0IsQ0FBQTtBQUNwQixDQUFDLEVBVFcsUUFBUSxLQUFSLFFBQVEsUUFTbkI7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLFFBQVE7SUFDVixNQUFNLENBQUMsR0FBRyxDQUFFLEVBQVksRUFBQyxJQUFvQjtRQUNoRCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUE7UUFDaEIsUUFBUSxFQUFFLEVBQUUsQ0FBQztZQUNULEtBQUssUUFBUSxDQUFDLG1CQUFtQjtnQkFDN0IsT0FBTyxHQUFHLDhCQUE4QixDQUFBO2dCQUN4QyxNQUFLO1lBQ1QsS0FBSyxRQUFRLENBQUMsa0NBQWtDO2dCQUM1QyxPQUFPLEdBQUcsZ0RBQWdEO29CQUN0RCxnR0FBZ0csQ0FBQTtnQkFDcEcsTUFBSztZQUNULEtBQUssUUFBUSxDQUFDLGFBQWE7Z0JBQ3ZCLE9BQU8sR0FBRyxrREFBa0QsQ0FBQTtnQkFDNUQsTUFBSztZQUNULEtBQUssUUFBUSxDQUFDLFdBQVc7Z0JBQ3JCLE9BQU8sR0FBRywwQ0FBMEMsQ0FBQTtnQkFDcEQsTUFBSztZQUNULEtBQUssUUFBUSxDQUFDLGtCQUFrQjtnQkFDNUIsT0FBTyxHQUFHLGdEQUFnRCxDQUFBO2dCQUMxRCxNQUFLO1lBQ1QsS0FBSyxRQUFRLENBQUMscUJBQXFCO2dCQUMvQixPQUFPLEdBQUcsdUVBQXVFLENBQUE7Z0JBQ2pGLE1BQUs7WUFDVCxLQUFLLFFBQVEsQ0FBQyxnQkFBZ0I7Z0JBQzFCLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQTtnQkFDbkMsTUFBSztZQUNULEtBQUssUUFBUSxDQUFDLGdCQUFnQjtnQkFDMUIsT0FBTyxHQUFHLDJCQUEyQixDQUFBO2dCQUNyQyxNQUFLO1FBQ2IsQ0FBQztRQUVELElBQUksSUFBSSxFQUFFLENBQUM7WUFDUCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxzQkFBc0I7Z0JBQ3JFLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDL0MsQ0FBQztRQUNMLENBQUM7UUFFRCxPQUFPLE9BQU8sQ0FBQTtJQUNsQixDQUFDO0NBQ0oifQ==
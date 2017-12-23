/**
 * todo
 * @class sgvizler.MESSAGES
 * @memberof sgvizler
 */
export enum MESSAGES {
    ERROR_CHART_UNKNOWN,
    ERROR_CHART_PATTERN_OPTION_UNKNOWN,
    ERROR_REQUEST,
    ERROR_CHART,
    ERROR_DEPENDENCIES,
    ERROR_ENDPOINT_FORGOT,
    ERROR_DATA_EMPTY,
    ERROR_DATA_NOROW
}

/**
 *
 * @class sgvizler.Messages
 * @memberof sgvizler
 */
export class Messages {
    public static get (id: Messages,args?: Array<string>) {
        let message = ''
        switch (id) {
            case MESSAGES.ERROR_CHART_UNKNOWN :
                message = 'The chart $0 does not exist.'
                break
            case MESSAGES.ERROR_CHART_PATTERN_OPTION_UNKNOWN :
                message = "The pattern of chart options is unknown : '$0'" +
                    "Use 'variable1=value1|variable1=value1' or for style 'width:100%;font:red;' or 'class1 class2'"
                break
            case MESSAGES.ERROR_REQUEST :
                message = 'Sorry, the sparql server sent an error. </br> $0'
                break
            case MESSAGES.ERROR_CHART :
                message = 'Sorry, the chart sent an error. </br> $0'
                break
            case MESSAGES.ERROR_DEPENDENCIES :
                message = 'The chart dependencies sent an error. </br> $0'
                break
            case MESSAGES.ERROR_ENDPOINT_FORGOT :
                message = 'The endpoint of Sparql service is forgotten (data-sgvizler-endpoint).'
                break
            case MESSAGES.ERROR_DATA_EMPTY :
                message = 'The resquest sent null.'
                break
            case MESSAGES.ERROR_DATA_NOROW :
                message = 'The resquest sent no row.'
                break
        }

        if (args) {
            for (let i = 0, len = args.length; i < len; i++) { // tslint:disable-line
                message = message.replace('$' + i, args[i])
            }
        }

        return message
    }
}

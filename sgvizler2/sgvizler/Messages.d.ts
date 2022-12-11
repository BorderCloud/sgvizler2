/**
 * todo
 * @class sgvizler.MESSAGES
 * @memberof sgvizler
 */
export declare enum MESSAGES {
    ERROR_CHART_UNKNOWN = 0,
    ERROR_CHART_PATTERN_OPTION_UNKNOWN = 1,
    ERROR_REQUEST = 2,
    ERROR_CHART = 3,
    ERROR_DEPENDENCIES = 4,
    ERROR_ENDPOINT_FORGOT = 5,
    ERROR_DATA_EMPTY = 6,
    ERROR_DATA_NOROW = 7
}
/**
 *
 * @class sgvizler.Messages
 * @memberof sgvizler
 */
export declare class Messages {
    static get(id: Messages, args?: Array<string>): string;
}

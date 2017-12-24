/**
 * Tools
 * @class google.Tools
 * @memberof google
 */
export class Tools {
    public static decodeFormatSize (value: any): any {
        let result = value
        if (Number.isNaN(Number(value))) {
            result = result.replace('px', '')
            if (! Number.isNaN(Number(result))) {
                result = Number(result)
            }
        }
        return result
    }
}

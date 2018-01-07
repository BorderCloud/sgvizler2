/**
 * Tools
 * @class google.Tools
 * @memberof google
 */
export class Tools {
    public static decodeFormatSize (value: any): any {
        let result = value
        if (Number.isNaN(Number(value))) {
            let patternPercent = /%/gi
            let patternPixel = /px/gi

            if (result.search(patternPixel) >= 0) {
                result = result.replace('px', '')
                if (! Number.isNaN(Number(result))) {
                    result = Number(result)
                }
            } else if (result.search(patternPercent) >= 0) {
                // do nothing
            }
        }
        return result
    }
}

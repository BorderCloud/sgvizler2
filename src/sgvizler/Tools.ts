import * as sgvizler2 from '../index'

/**
 * Todo comment
 * @class sgvizler.Tools
 * @memberof sgvizler
 */
export class Tools {

    // noinspection JSValidateJSDoc
    /**
     * Gets the object located at `path` from `object`. `path`
     * is given in dot notation.
     * Search in first in the library and after in window object
     * @param {string} path
     * @param object
     * @returns { any }  or undefined
     */
    public static getObjectByPath (path: string, object?: any): any {
        let i
        let len
        let segments = path.split('.')
        let cursor = object || sgvizler2  // search in the lib if object is empty

        for (i = 0, len = segments.length; i < len; i += 1) {
            if (cursor === undefined) {                             // create new child element.
               break
            }
            if (i < len - 1) {
                cursor = cursor[segments[i]]     // if cursor is undefined, it remains undefined.
            } else {
                try {
                    cursor = new cursor[segments[i]]() // create an instance
                } catch (e) {
                    // do nothing
                    // cursor[segments[i]]() is not a constructor]
                    cursor = undefined
                }
            }
        }

        if (cursor === undefined && ! object) {// window is the global scope.
            cursor = this.getObjectByPath(path, window)
        }
        return cursor
    }

    public static assignProperty (obj: any, path: string, value: any): any {
        return Tools.assignJSON(obj,Tools.getJSONByPath(path,value))
    }

    // public static escapeHtml (str: string): string {
    //     let text = document.createTextNode(str)
    //     let div = document.createElement('div')
    //     div.appendChild(text)
    //     return div.innerHTML
    // }

    // public static decodeHtml (html: string): any {
    // //     let element = document.createElement('div')
    // //     element.innerHTML = html
    // //     return element.textContent
    // // }
    // // function decodeHTMLEntities(text) {
    // }

    public static encodeHtml (str: string) {
        let buf = []
        for (let i = str.length - 1 ;i >= 0 ; i--) {
            buf.unshift(['&#', str.charCodeAt(i) , ';'].join(''))
        }
        return buf.join('')
    }

    public static decodeHtml (str: string) {
        let text = str.replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec)
                })
        // remove \u00a0 of &nbsp;
        text = text.replace(/(?:\s|\u00a0)/g, function (match, dec) {
            return ' '
        })
        return text
    }

    private static getJSONByPath (path: string, value: any): string {
        let json = ''

        let propertyName: string = ''
        let nextPath: string = ''
        if (path.length === 0 || ! value) {
            return json
        }

        let positionDot = path.search(/\./)

        if (positionDot === -1) {
            propertyName = path.trim()
            if (Number.isNaN(Number(value))) {
                let valueBoolean = Tools.convertToBoolean(value)
                if (valueBoolean === undefined) {
                    let str = JSON.stringify(String(value))
                    str = str.substring(1, str.length - 1)
                    json = '{"' + propertyName + '":"' + str + '"}'
                } else {
                    json = '{"' + propertyName + '":' + value + '}'
                }
            } else {
                json = '{"' + propertyName + '":' + value + '}'
            }
        } else {
            propertyName = path.substring(0,positionDot)
            nextPath = path.substring(positionDot + 1,path.length)
            json = '{"' + propertyName.trim() + '": ' + Tools.getJSONByPath(nextPath,value) + ' }'
        }
        return json
    }

    private static assignJSON (obj: any, json: string): any {
        Tools.mergeInObject(obj, JSON.parse(json))
        return obj
    }

    private static convertToBoolean (input: string): boolean | undefined {
        if (input.length <= 5) {
            try {
                return JSON.parse(input)
            } catch (e) {
                return undefined
            }
        }
        return undefined
    }

    // Convert to typescript : https://github.com/gmasmejean/recursiveAssign/blob/master/index.js
    private static assign (ref: any, key: any, value: any) {
        if (Tools.isPlainObject(value)) {
            if (!Tools.isPlainObject(ref[key])) {
                ref[key] = {}
            }
            Tools.mergeInObject(ref[key], value)
        } else {
            ref[key] = value
        }
    }

    private static mergeInObject (dest: any, data: any) {
        Object.keys(data).forEach(key => {
            Tools.assign(dest, key, data[key])
        })
    }

    private static isPlainObject (o: any) {
        return o !== undefined && o.constructor !== undefined && o.constructor.prototype === Object.prototype
    }
}

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
            }else {
                try {
                    cursor = new cursor[segments[i]]() // create an instance
                }catch (e) {
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

    public static escapeHtml (str: string): string {
        let text = document.createTextNode(str)
        let div = document.createElement('div')
        div.appendChild(text)
        return div.innerHTML
    }

    public static decodeHtml (html: string): any {
        let element = document.createElement('div')
        element.innerHTML = html
        return element.textContent
    }
}

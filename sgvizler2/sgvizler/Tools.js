import * as sgvizler2 from '../index';
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
    static getObjectByPath(path, object) {
        let i;
        let len;
        let segments = path.split('.');
        let cursor = object || sgvizler2; // search in the lib if object is empty
        for (i = 0, len = segments.length; i < len; i += 1) {
            if (cursor === undefined) { // create new child element.
                break;
            }
            if (i < len - 1) {
                cursor = cursor[segments[i]]; // if cursor is undefined, it remains undefined.
            }
            else {
                try {
                    cursor = new cursor[segments[i]](); // create an instance
                }
                catch (e) {
                    // do nothing
                    // cursor[segments[i]]() is not a constructor]
                    cursor = undefined;
                }
            }
        }
        if (cursor === undefined && !object) { // window is the global scope.
            cursor = this.getObjectByPath(path, window);
        }
        return cursor;
    }
    static assignProperty(obj, path, value) {
        return Tools.assignJSON(obj, Tools.getJSONByPath(path, value));
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
    static encodeHtml(str) {
        let buf = [];
        for (let i = str.length - 1; i >= 0; i--) {
            // let iC = str.charCodeAt(i)
            // if (iC < 65 || iC > 127 ) { //|| (iC>90 && iC<97)
            //     buf.unshift(['&#', iC, ';'].join(''))
            // } else {
            //     buf.unshift(str[i])
            // }
            switch (str[i]) {
                case '&':
                    buf.unshift('&amp;');
                    break;
                case '"':
                    buf.unshift('&quot;');
                    break;
                case "'":
                    buf.unshift('&apos;');
                    break;
                case '<':
                    buf.unshift('&lt;');
                    break;
                case '>':
                    buf.unshift('&gt;');
                    break;
                // case '':
                //     buf.unshift(['&#', str.charCodeAt(i), ';'].join(''))
                //     break;
                default:
                    buf.unshift(str[i]);
            }
        }
        return buf.join('');
    }
    static decodeHtml(str) {
        let text = str.replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        });
        // remove \u00a0 of &nbsp;
        text = text.replace(/(?:[^\S\r\n]|\u00a0)/g, function (match, dec) {
            return ' ';
        });
        return text;
    }
    static getJSONByPath(path, value) {
        let json = '';
        let propertyName = '';
        let nextPath = '';
        if (path.length === 0 || !value) {
            return json;
        }
        let positionDot = path.search(/\./);
        if (positionDot === -1) {
            propertyName = path.trim();
            if (Number.isNaN(Number(value))) {
                let valueBoolean = Tools.convertToBoolean(value);
                if (valueBoolean === undefined) {
                    let str = JSON.stringify(String(value));
                    str = str.substring(1, str.length - 1);
                    json = '{"' + propertyName + '":"' + str + '"}';
                }
                else {
                    json = '{"' + propertyName + '":' + value + '}';
                }
            }
            else {
                json = '{"' + propertyName + '":' + value + '}';
            }
        }
        else {
            propertyName = path.substring(0, positionDot);
            nextPath = path.substring(positionDot + 1, path.length);
            json = '{"' + propertyName.trim() + '": ' + Tools.getJSONByPath(nextPath, value) + ' }';
        }
        return json;
    }
    static assignJSON(obj, json) {
        Tools.mergeInObject(obj, JSON.parse(json));
        return obj;
    }
    static convertToBoolean(input) {
        if (input.length <= 5) {
            try {
                return JSON.parse(input);
            }
            catch (e) {
                return undefined;
            }
        }
        return undefined;
    }
    // Convert to typescript : https://github.com/gmasmejean/recursiveAssign/blob/master/index.js
    static assign(ref, key, value) {
        if (Tools.isPlainObject(value)) {
            if (!Tools.isPlainObject(ref[key])) {
                ref[key] = {};
            }
            Tools.mergeInObject(ref[key], value);
        }
        else {
            ref[key] = value;
        }
    }
    static mergeInObject(dest, data) {
        Object.keys(data).forEach(key => {
            Tools.assign(dest, key, data[key]);
        });
    }
    static isPlainObject(o) {
        return o !== undefined && o.constructor !== undefined && o.constructor.prototype === Object.prototype;
    }
    static sizeConvertInteger(x) {
        var val = x;
        // Fix bug: TypeError: x.replace is not a function
        if (typeof x !== 'number') {
            val = parseInt(x.replace("px", ""), 10);
        }
        if (isNaN(val)) {
            return null;
        }
        return val;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2d2aXpsZXIvVG9vbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLFNBQVMsTUFBTSxVQUFVLENBQUE7QUFFckM7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxLQUFLO0lBRWQsK0JBQStCO0lBQy9COzs7Ozs7O09BT0c7SUFDSSxNQUFNLENBQUMsZUFBZSxDQUFFLElBQVksRUFBRSxNQUFZO1FBQ3JELElBQUksQ0FBQyxDQUFBO1FBQ0wsSUFBSSxHQUFHLENBQUE7UUFDUCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzlCLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxTQUFTLENBQUEsQ0FBRSx1Q0FBdUM7UUFFekUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2pELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRSxDQUFDLENBQTZCLDRCQUE0QjtnQkFDakYsTUFBSztZQUNSLENBQUM7WUFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFLLGdEQUFnRDtZQUNyRixDQUFDO2lCQUFNLENBQUM7Z0JBQ0osSUFBSSxDQUFDO29CQUNELE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBLENBQUMscUJBQXFCO2dCQUM1RCxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQ1QsYUFBYTtvQkFDYiw4Q0FBOEM7b0JBQzlDLE1BQU0sR0FBRyxTQUFTLENBQUE7Z0JB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
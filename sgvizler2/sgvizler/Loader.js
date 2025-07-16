import { Logger, ScriptDependency, CssDependency } from '../sgvizler';
/**
 * Todo
 *
 * @class sgvizler.visualization.Loader
 * @memberof sgvizler.visualization
 */
export class Loader {
    static on(event, fn) {
        if (event === 'loaded') {
            Loader._listCallEvent.push(fn);
        }
    }
    static detectRoot() {
        let resultXpath = document.evaluate('//script[contains(@src,"sgvizler2.js")]/@src', document, null, XPathResult.STRING_TYPE, null);
        let srcScript = resultXpath.stringValue;
        let match = /^(.*)sgvizler2\.js$/.exec(srcScript);
        if (match) {
            Loader._pathScripts = match[1];
        }
    }
    static isLoad(dep) {
        return Loader._load.indexOf(dep.url) !== -1;
    }
    static isLoaded(dep) {
        return Loader._loaded.indexOf(dep.url) !== -1;
    }
    static load(dep) {
        if (dep instanceof ScriptDependency) {
            Loader.loadScript(dep);
        }
        else if (dep instanceof CssDependency) {
            Loader.loadCss(dep);
        }
    }
    static fireEvent(event) {
        for (let call of Loader._listCallEvent) {
            call(event);
        }
    }
    static checkDependenciesToLoad() {
        //filter doublons
        Loader._dependenciesToLoad = Loader._dependenciesToLoad.filter((v, i, a) => a.indexOf(v) === i);
        let len = Loader._dependenciesToLoad.length;
        for (let i = 0; i < len; i++) {
            let dep = Loader._dependenciesToLoad[i];
            if (dep === undefined || Loader.isLoaded(dep)) {
                //this._dependenciesToLoad.splice(i)
                delete this._dependenciesToLoad[i];
            }
        }
        Loader._dependenciesToLoad.forEach((dep) => {
            if (dep instanceof ScriptDependency) {
                Loader.loadScript(dep);
            }
            else if (dep instanceof ScriptDependency) {
                Loader.loadCss(dep);
            }
        });
    }
    static getAbsoluteURL(url) {
        if (url.match(/^(\/\/|https?)/)) {
            return url;
        }
        else {
            return Loader._pathScripts + url;
        }
    }
    static loadScript(dep) {
        let url = dep.url;
        return new Promise(function (resolve, reject) {
            if (dep.loadBefore && !dep.loadBefore.endDownload) {
                //Logger.logSimple('Waiting : ' + dep.loadBefore.url + ' before ' + dep.url)
                Loader._dependenciesToLoad.push(dep);
                Loader.load(dep.loadBefore);
                return resolve();
            }
            // include script only once
            if (Loader.isLoad(dep)) {
                return resolve(); // false;
            }
            else {
                Loader._load.push(url);
            }
            Logger.logSimple('Loading : ' + dep.url);
            // Adding the script tag to the head as suggested before
            let head = document.getElementsByTagName('head')[0];
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = Loader.getAbsoluteURL(url);
            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            script.onload = function () {
                Loader._loaded.push(url); // in first
                dep.callBack();
                // remember included script
                Loader.fireEvent('loaded');
                Loader.checkDependenciesToLoad();
            };
            // Fire the loading
            head.appendChild(script);
        });
    }
    static loadCss(dep) {
        let url = dep.url;
        return new Promise(function (resolve, reject) {
            if (dep.loadBefore && !dep.loadBefore.endDownload) {
                Loader._dependenciesToLoad.push(dep);
                Loader.load(dep.loadBefore);
                return resolve();
            }
            // include script only once
            if (Loader.isLoad(dep)) {
                return resolve(); // false;
            }
            else {
                Loader._load.push(url);
            }
            // <link rel="stylesheet" type="text/css" href="../dist/datatables.min.css"/>
            let head = document.getElementsByTagName('head')[0];
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = Loader.getAbsoluteURL(url);
            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            link.onload = function () {
                Loader._loaded.push(url);
                Logger.logSimple('Loaded : ' + url);
                dep.callBack();
                // remember included script
                Loader.fireEvent('loaded');
                Loader.checkDependenciesToLoad();
            };
            // Fire the loading
            head.appendChild(link);
        });
    }
}
Loader._load = [];
Loader._loaded = [];
Loader._dependenciesToLoad = [];
Loader._pathScripts = '';
Loader._listCallEvent = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Nndml6bGVyL0xvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsTUFBTSxFQUNOLGdCQUFnQixFQUNoQixhQUFhLEVBRWhCLE1BQU0sYUFBYSxDQUFBO0FBRXBCOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLE1BQU07SUFPUixNQUFNLENBQUMsRUFBRSxDQUFFLEtBQWEsRUFBQyxFQUFPO1FBQ25DLElBQUksS0FBSyxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2xDLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVU7UUFDcEIsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyw4Q0FBOEMsRUFDOUUsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2xELElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUE7UUFFdkMsSUFBSSxLQUFLLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ2pELElBQUksS0FBSyxFQUFFLENBQUM7WUFDUixNQUFNLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNsQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUUsR0FBZTtRQUNqQyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUMvQyxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBRSxHQUFlO1FBQ25DLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FB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
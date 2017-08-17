import {
    Logger,
    ScriptDependency,
    CssDependency,
    Dependency
} from '../sgvizler'

/**
 * Todo
 *
 * @class sgvizler.visualization.Loader
 * @memberof sgvizler.visualization
 */
export class Loader {
    private static _load: Array<string> = []
    private static _loaded: Array<string> = []
    private static _dependenciesToLoad: Array<Dependency> = []
    private static _pathScripts: string = ''
    private static _listCallEvent: Array<any> = []

    public static on (event: string,fn: any): void {
        if (event === 'loaded') {
            Loader._listCallEvent.push(fn)
        }
    }

    public static detectRoot (): void {
        let resultXpath = document.evaluate('//script[contains(@src,"sgvizler2.js")]/@src',
            document, null, XPathResult.STRING_TYPE, null )
        let srcScript = resultXpath.stringValue

        let match = /^(.*)sgvizler2\.js$/.exec(srcScript)
        if (match) {
            Loader._pathScripts = match[1]
        }
    }

    public static isLoad (dep: Dependency) {
        return Loader._load.indexOf(dep.url) !== -1
    }

    public static isLoaded (dep: Dependency) {
        return Loader._loaded.indexOf(dep.url) !== -1
    }

    public static load (dep: Dependency) {
        if (dep instanceof ScriptDependency) {
            Loader.loadScript(dep)
        }else if (dep instanceof CssDependency) {
            Loader.loadCss(dep)
        }
    }

    private static fireEvent (event: string): void {
        for (let call of Loader._listCallEvent) {
            call(event)
        }
    }

    private static checkDependenciesToLoad () {
        let len = Loader._dependenciesToLoad.length
        for (let i = 0; i < len ; i++) {
            let dep = Loader._dependenciesToLoad[i]
            if (dep === undefined || Loader.isLoaded(dep)) {
                this._dependenciesToLoad.splice(i)
            }else {
                if (dep instanceof ScriptDependency) {
                    Loader.loadScript(dep)
                }else if (dep instanceof ScriptDependency) {
                    Loader.loadCss(dep)
                }
            }
        }
    }

    private static getAbsoluteURL(url: string){
        if(url.match(/^(\/\/|https?)/)){
            return url
        }else{
            return Loader._pathScripts + url
        }
    }

    private static loadScript (dep: CssDependency): Promise<any> {
        let url = dep.url
        return new Promise(function (resolve, reject) {
            if (dep.loadBefore && ! dep.loadBefore.endDownload) {
                Logger.log('Waiting : ' + dep.loadBefore.url + ' before ' + dep.url)
                Loader._dependenciesToLoad.push(dep)
                return Loader.load(dep.loadBefore)
            }

            // include script only once
            if (Loader.isLoad(dep)) {
                return // false;
            }else {
                Loader._load.push(url)
            }

            Logger.log('Loading : ' + dep.url)
            // Adding the script tag to the head as suggested before
            let head = document.getElementsByTagName('head')[0]
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = Loader.getAbsoluteURL(url)

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            script.onload = function () {
                Loader._loaded.push(url) // in first
                dep.callBack()
                Loader.checkDependenciesToLoad()
                // remember included script
                Loader.fireEvent('loaded')
                }

            // Fire the loading
            head.appendChild(script)
        })
    }

    private static loadCss (dep: CssDependency): Promise<any> {
        let url = dep.url
        return new Promise(function (resolve, reject) {
            if (dep.loadBefore && ! dep.loadBefore.endDownload) {
                Loader._dependenciesToLoad.push(dep)
                return Loader.load(dep.loadBefore)
            }

            // include script only once
            if (Loader.isLoad(dep)) {
                return // false;
            }else {
                Loader._load.push(url)
            }

            // <link rel="stylesheet" type="text/css" href="../dist/datatables.min.css"/>
            let head = document.getElementsByTagName('head')[0]
            let link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = Loader.getAbsoluteURL(url)

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            link.onload = function () {
                Loader._loaded.push(url)
                Logger.log('Loaded : ' + url )
                dep.callBack()
                Loader.checkDependenciesToLoad()
                // remember included script
                Loader.fireEvent('loaded')
            }

            // Fire the loading
            head.appendChild(link)
        })
    }
}

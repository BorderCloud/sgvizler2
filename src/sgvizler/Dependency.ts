import {
    Loader,
    Logger
} from '../sgvizler'

export abstract class Dependency {
    public url: string
    public loadBefore: Dependency|null
    public endDownload: boolean
    public startDownload: boolean

    constructor (url: string,loadBefore?: Dependency) {
        this.url = url
        this.loadBefore = loadBefore ? loadBefore : null
        this.endDownload = false
        this.startDownload = false
    }

    public load (): void {
        if (! this.isLoaded()) {
            this.startDownload = true
            Logger.logSimple('Load started :' + this.url)
            Loader.load(this)
        }
    }

    public isLoaded () {
        if (Loader.isLoaded(this)) {
            this.startDownload = true
            this.endDownload = true
        }
        return this.endDownload
    }

    public callBack () {
        this.endDownload = true
        Logger.logSimple('Load ended :' + this.url)
    }
}

export class ScriptDependency extends Dependency {}

export class CssDependency extends Dependency {}

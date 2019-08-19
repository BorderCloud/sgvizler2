import * as S from '../sgvizler'
import {LoadingIcon} from "./LoadingIcon";

/**
 * Handles all logging, either to console or designated HTML
 * container.
 *
 * @class sgvizler.Logger
 * @memberof sgvizler
 */
export class Logger {
    private static _doneCallEvent: (elementID: string) => void; //Callback
    private static _failCallEvent: (elementID: string) => void; //Callback

    public static done (callback: any) : Logger {
        this._doneCallEvent = callback
        return this
    }
    public static fireDoneEvent (container: S.Container): void {
        LoadingIcon.hideLoadingIcon(container);
        if(this._doneCallEvent){
            this._doneCallEvent(container.id)
        }
    }

    public static fail (callback: any) : Logger {
        this._failCallEvent = callback
        return this
    }
    public static fireFailEvent (container: S.Container): void {
        LoadingIcon.hideLoadingIcon(container);
        if(this._failCallEvent) {
            this._failCallEvent(container.id)
        }
    }

    /**
     * The timestamp for the load start of the current running
     * version of sgvizler. Used to calculate time elapse of
     * future events.
     */
    private static _startTime = Date.now()

    /**
     * Logs a message.
     * @method log
     * @protected
     * @param {string} message The message to log.
     */
    public static log (container: S.Container, message: string) {
        if (container.loglevel === 2) {
            console.log(this.elapsedTime() + 's: ' + message)
        }
    }

    public static logSimple (message: string) {
        console.log(this.elapsedTime() + 's: ' + message)
    }

    /**
     * Todo
     * @param {Container} container
     * @param {MESSAGES} messageName
     * @param {Array<string>} args
     */
    public static displayFeedback (container: S.Container, messageName: S.MESSAGES, args?: Array<string>) {
        let message = S.Messages.get(messageName,args)

        if (container.loglevel === 2) {
            if (message) {
                let obj = document.getElementById(container.id)
                if (obj) {
                    obj.innerHTML = "<p style='color:red'>" + message + '</p>'
                }
            }
        }

        Logger.fireFailEvent(container);
    }

    /**
     * @method timeElapsed
     * @private
     * @return {number} The number of seconds elapsed since
     * this sgvizler got loaded.
     */
    private static elapsedTime (): number {
        return (Date.now() - this._startTime) / 1000
    }
}

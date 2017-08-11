import * as S from '../sgvizler'

/**
 * Handles all logging, either to console or designated HTML
 * container.
 *
 * @class sgvizler.Logger
 * @memberof sgvizler
 */
export class Logger {
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
    public static log (message: string) {
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
